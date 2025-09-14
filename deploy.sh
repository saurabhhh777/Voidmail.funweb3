#!/bin/bash

# VoidMail.fun Deployment Script
# Usage: ./deploy.sh [dev|build|prod|stop|clean]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_requirements() {
    print_status "Checking requirements..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ and try again."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm and try again."
        exit 1
    fi
    
    # Check Node.js version
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18 or higher is required. Current version: $(node --version)"
        exit 1
    fi
    
    print_success "Requirements check passed"
}

# Setup environment files
setup_env() {
    print_status "Setting up environment files..."
    
    # Backend .env
    if [ ! -f "backend/.env" ]; then
        print_status "Creating backend/.env file..."
        cat > backend/.env << EOF
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/voidmail
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-secret-key-change-in-production
SOLANA_RPC_URL=https://api.devnet.solana.com
PROGRAM_ID=9kuRSh73N6BU8g5qtrcik6RP67YvdrDXE6ZpiM9gvSw9
SMTP_PORT=2525
SMTP_HOST=0.0.0.0
EOF
        print_success "Backend .env created"
    fi
    
    # Frontend .env.local
    if [ ! -f "frontend/.env.local" ]; then
        print_status "Creating frontend/.env.local file..."
        cat > frontend/.env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_PROGRAM_ID=9kuRSh73N6BU8g5qtrcik6RP67YvdrDXE6ZpiM9gvSw9
NEXT_PUBLIC_NETWORK=devnet
NEXT_PUBLIC_SMTP_DOMAINS=voidmail.fun,voidmail.email,bigtimer.site,asksaurabh.xyz
EOF
        print_success "Frontend .env.local created"
    fi
    
    # SMTP Server .env
    if [ ! -f "SmtpServer/.env" ]; then
        print_status "Creating SmtpServer/.env file..."
        cat > SmtpServer/.env << EOF
BACKEND_URL=http://localhost:5000
SMTP_PORT=2525
SMTP_HOST=0.0.0.0
EOF
        print_success "SMTP Server .env created"
    fi
}

# Install dependencies
install_deps() {
    print_status "Installing dependencies..."
    
    # Frontend dependencies
    print_status "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    print_success "Frontend dependencies installed"
    
    # Backend dependencies
    print_status "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    print_success "Backend dependencies installed"
    
    # SMTP Server dependencies
    print_status "Installing SMTP server dependencies..."
    cd SmtpServer
    npm install
    cd ..
    print_success "SMTP server dependencies installed"
    
    # Contract dependencies (if needed)
    if [ -d "contract" ]; then
        print_status "Installing contract dependencies..."
        cd contract
        npm install
        cd ..
        print_success "Contract dependencies installed"
    fi
}

# Start development servers
start_dev() {
    print_status "Starting development servers..."
    
    # Kill existing processes
    pkill -f "node.*backend" || true
    pkill -f "node.*SmtpServer" || true
    pkill -f "next.*frontend" || true
    
    # Start backend
    print_status "Starting backend server..."
    cd backend
    npm run dev &
    BACKEND_PID=$!
    cd ..
    
    # Wait a bit for backend to start
    sleep 3
    
    # Start SMTP server
    print_status "Starting SMTP server..."
    cd SmtpServer
    node index.js &
    SMTP_PID=$!
    cd ..
    
    # Wait a bit for SMTP to start
    sleep 2
    
    # Start frontend
    print_status "Starting frontend server..."
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    
    # Save PIDs for later cleanup
    echo $BACKEND_PID > .backend.pid
    echo $SMTP_PID > .smtp.pid
    echo $FRONTEND_PID > .frontend.pid
    
    print_success "All development servers started!"
    print_status "Frontend: http://localhost:3000"
    print_status "Backend: http://localhost:5000"
    print_status "SMTP Server: localhost:2525"
    print_warning "Press Ctrl+C to stop all servers"
    
    # Wait for user interrupt
    trap 'stop_dev; exit' INT TERM
    wait
}

# Stop development servers
stop_dev() {
    print_status "Stopping development servers..."
    
    # Kill processes using PID files
    if [ -f ".backend.pid" ]; then
        kill $(cat .backend.pid) 2>/dev/null || true
        rm .backend.pid
    fi
    
    if [ -f ".smtp.pid" ]; then
        kill $(cat .smtp.pid) 2>/dev/null || true
        rm .smtp.pid
    fi
    
    if [ -f ".frontend.pid" ]; then
        kill $(cat .frontend.pid) 2>/dev/null || true
        rm .frontend.pid
    fi
    
    # Fallback: kill by process name
    pkill -f "node.*backend" || true
    pkill -f "node.*SmtpServer" || true
    pkill -f "next.*frontend" || true
    
    print_success "All servers stopped"
}

# Build for production
build_prod() {
    print_status "Building for production..."
    
    # Build frontend
    print_status "Building frontend..."
    cd frontend
    npm run build
    cd ..
    print_success "Frontend built successfully"
    
    # Backend doesn't need building for Node.js
    print_success "Backend ready for production"
    
    print_success "Production build completed!"
    print_status "Frontend build: frontend/.next"
    print_status "Backend ready: backend/"
    print_status "SMTP Server ready: SmtpServer/"
}

# Start production servers
start_prod() {
    print_status "Starting production servers..."
    
    # Check if build exists
    if [ ! -d "frontend/.next" ]; then
        print_error "Frontend not built. Run './deploy.sh build' first."
        exit 1
    fi
    
    # Set production environment
    export NODE_ENV=production
    
    # Start backend
    print_status "Starting backend server in production mode..."
    cd backend
    npm start &
    BACKEND_PID=$!
    cd ..
    
    # Start SMTP server
    print_status "Starting SMTP server..."
    cd SmtpServer
    node index.js &
    SMTP_PID=$!
    cd ..
    
    # Start frontend
    print_status "Starting frontend server in production mode..."
    cd frontend
    npm start &
    FRONTEND_PID=$!
    cd ..
    
    # Save PIDs
    echo $BACKEND_PID > .backend.prod.pid
    echo $SMTP_PID > .smtp.prod.pid
    echo $FRONTEND_PID > .frontend.prod.pid
    
    print_success "Production servers started!"
    print_status "Frontend: http://localhost:3000"
    print_status "Backend: http://localhost:5000"
    print_status "SMTP Server: localhost:2525"
}

# Stop production servers
stop_prod() {
    print_status "Stopping production servers..."
    
    if [ -f ".backend.prod.pid" ]; then
        kill $(cat .backend.prod.pid) 2>/dev/null || true
        rm .backend.prod.pid
    fi
    
    if [ -f ".smtp.prod.pid" ]; then
        kill $(cat .smtp.prod.pid) 2>/dev/null || true
        rm .smtp.prod.pid
    fi
    
    if [ -f ".frontend.prod.pid" ]; then
        kill $(cat .frontend.prod.pid) 2>/dev/null || true
        rm .frontend.prod.pid
    fi
    
    print_success "Production servers stopped"
}

# Clean build artifacts and dependencies
clean() {
    print_status "Cleaning build artifacts and dependencies..."
    
    # Remove node_modules
    rm -rf frontend/node_modules
    rm -rf backend/node_modules
    rm -rf SmtpServer/node_modules
    rm -rf contract/node_modules
    
    # Remove build artifacts
    rm -rf frontend/.next
    rm -rf frontend/dist
    rm -rf backend/dist
    
    # Remove lock files
    rm -f frontend/package-lock.json
    rm -f backend/package-lock.json
    rm -f SmtpServer/package-lock.json
    rm -f contract/package-lock.json
    
    # Remove PID files
    rm -f .*.pid
    
    print_success "Cleanup completed"
}

# Show help
show_help() {
    echo "VoidMail.fun Deployment Script"
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  dev     - Start development servers with hot reload"
    echo "  build   - Build for production"
    echo "  prod    - Start production servers"
    echo "  stop    - Stop all running servers"
    echo "  clean   - Clean all build artifacts and dependencies"
    echo "  help    - Show this help message"
    echo ""
    echo "Development workflow:"
    echo "  1. $0 dev     # Start development"
    echo "  2. $0 stop    # Stop when done"
    echo ""
    echo "Production workflow:"
    echo "  1. $0 build   # Build for production"
    echo "  2. $0 prod    # Start production servers"
    echo "  3. $0 stop    # Stop when needed"
}

# Main script logic
case "$1" in
    "dev")
        check_requirements
        setup_env
        install_deps
        start_dev
        ;;
    "build")
        check_requirements
        setup_env
        install_deps
        build_prod
        ;;
    "prod")
        check_requirements
        setup_env
        start_prod
        ;;
    "stop")
        stop_dev
        stop_prod
        ;;
    "clean")
        stop_dev
        stop_prod
        clean
        ;;
    "help"|"--help"|"-h")
        show_help
        ;;
    "")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        show_help
        exit 1
        ;;
esac 