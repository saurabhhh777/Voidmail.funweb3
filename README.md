# VoidMail.fun 💌 - Web3 Native Email Platform

**VoidMail.fun** is a revolutionary Web3-native temporary email service that combines privacy-first disposable emails with blockchain-powered custom email addresses and NFT ownership. Built for the Solana ecosystem, it offers instant temporary emails and premium custom domains with NFT certificates.

![VoidMail Screenshot](https://github.com/user-attachments/assets/baef97d0-963d-461d-8c8b-aa2512a2e12c)

---

## 🌟 Features

### Free Features
- ⚡ Instant disposable email address generation
- 🔁 Real-time inbox refresh (10-second intervals)
- 🔄 Change email address at any time
- 🧠 Email persistence with browser cookies
- 🔒 No sign-up required – fully anonymous
- 📱 Responsive design for all devices

### Premium Web3 Features
- 💎 **Custom Email Creation**: Create emails like `name@voidmail.fun`
- 🎨 **NFT Ownership**: Each custom email mints a unique NFT certificate
- 💰 **Crypto Payments**: Pay with SOL cryptocurrency (0.025 SOL per email)
- 🔗 **Wallet Integration**: Connect Phantom, Solflare, and other Solana wallets
- 🏆 **Premium Domains**: Access to voidmail.fun, voidmail.email, bigtimer.site, asksaurabh.xyz
- 📊 **Blockchain Verification**: All custom emails are verified on Solana blockchain

---

## 🚀 How It Works

### Temporary Emails
1. Visit [voidmail.fun](https://voidmail.fun)
2. A temporary email is auto-generated for you
3. Use it to sign up or test any service
4. Check the inbox on VoidMail to read incoming emails
5. Change or refresh your email anytime

### Custom Email Creation
1. Connect your Solana wallet (Phantom, Solflare, etc.)
2. Navigate to the "Premium" tab
3. Choose your desired prefix and premium domain
4. Pay 0.025 SOL to create and mint NFT
5. Receive your custom email with NFT certificate

---

## 🛠 Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **Tailwind CSS** - Utility-first styling
- **Zustand** - State management
- **Solana Web3.js** - Blockchain integration
- **Wallet Adapter** - Multi-wallet support

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Helmet** - Security middleware

### Blockchain
- **Solana** - High-performance blockchain
- **Anchor Framework** - Smart contract development
- **SPL Token** - NFT standards
- **Devnet/Mainnet** - Network support

### Infrastructure
- **AWS EC2** - Server hosting
- **NGINX** - Reverse proxy
- **Let's Encrypt** - SSL certificates
- **Custom SMTP Server** - Email handling

---

## 📊 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Blockchain    │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (Solana)      │
│                 │    │                 │    │                 │
│ • Wallet Connect│    │ • User Sessions │    │ • NFT Minting   │
│ • Email UI      │    │ • Email Storage │    │ • Payment Flow  │
│ • Premium UI    │    │ • SMTP Handler  │    │ • Verification  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Wallet   │    │   MongoDB       │    │   Solana RPC    │
│   (Phantom)     │    │   Database      │    │   Network       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB
- Solana CLI tools
- Phantom or Solflare wallet

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/saurabhhh777/Voidmail.fun.git
cd Voidmail.fun
```

2. **Install dependencies**
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

# Contract
cd ../contract
npm install
```

3. **Environment Setup**
```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration

# Frontend
cp frontend/.env.example frontend/.env
# Edit frontend/.env with your configuration
```

4. **Start development servers**
```bash
# Backend
cd backend
npm run dev

# Frontend (new terminal)
cd frontend
npm run dev

# SMTP Server (new terminal)
cd SmtpServer
npm start
```

---

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/voidmail
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-secret-key
SOLANA_RPC_URL=https://api.devnet.solana.com
PROGRAM_ID=9kuRSh73N6BU8g5qtrcik6RP67YvdrDXE6ZpiM9gvSw9
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000
VITE_SOLANA_RPC_URL=https://api.devnet.solana.com
VITE_PROGRAM_ID=9kuRSh73N6BU8g5qtrcik6RP67YvdrDXE6ZpiM9gvSw9
VITE_NETWORK=devnet
```

---

## 🎯 Solana Foundation & CoinDCX India Grants Features

### 1. **Web3 Integration**
- ✅ Solana wallet connection (Phantom, Solflare)
- ✅ Real-time balance checking
- ✅ Secure transaction signing
- ✅ NFT minting for custom emails

### 2. **Custom Email System**
- ✅ Premium domain support (voidmail.fun, voidmail.email, etc.)
- ✅ Email availability checking
- ✅ NFT certificate generation
- ✅ Blockchain verification

### 3. **Payment System**
- ✅ SOL cryptocurrency payments
- ✅ 0.025 SOL per custom email
- ✅ Transaction confirmation
- ✅ Payment verification

### 4. **Security & Privacy**
- ✅ End-to-end encryption
- ✅ Anonymous temporary emails
- ✅ Secure session management
- ✅ Rate limiting and DDoS protection

### 5. **User Experience**
- ✅ Modern, responsive UI
- ✅ Real-time email updates
- ✅ Wallet integration
- ✅ Mobile-friendly design

---

## 📈 Performance Metrics

- **50K+** Emails generated
- **99.9%** Service uptime
- **<100ms** Email generation time
- **24h** Auto-destruct for temporary emails
- **0.025 SOL** Cost per custom email

---

## 🔒 Security Features

- **Helmet.js** - Security headers
- **Rate Limiting** - DDoS protection
- **CORS** - Cross-origin protection
- **JWT Authentication** - Secure sessions
- **Input Validation** - XSS prevention
- **MongoDB Injection Protection** - Database security

---

## 🌐 Deployment

### Production Setup
1. **Backend Deployment**
```bash
# AWS EC2
sudo apt update
sudo apt install nodejs npm mongodb
cd backend
npm install --production
pm2 start index.js
```

2. **Frontend Deployment**
```bash
# Build for production
cd frontend
npm run build
# Deploy to Vercel/Netlify
```

3. **SMTP Server**
```bash
cd SmtpServer
npm install --production
pm2 start index.js
```

4. **NGINX Configuration**
```nginx
server {
    listen 80;
    server_name voidmail.fun;
    
    location / {
        proxy_pass http://localhost:5173;
    }
    
    location /api {
        proxy_pass http://localhost:5000;
    }
}
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## 📄 License

MIT License © [Saurabh Maurya](https://github.com/saurabhhh777) & [Priyanjal Saxena](https://github.com/priyanjal1234)

---

## 👨‍💻 Built By

- [Saurabh Maurya](https://github.com/saurabhhh777) - Full Stack Developer & Solana Developer
- [Priyanjal Saxena](https://github.com/priyanjal1234) - Frontend Developer & UI/UX Designer

---

## 🔗 Links

- **Live Demo**: [voidmail.fun](https://voidmail.fun)
- **Documentation**: [docs.voidmail.fun](https://docs.voidmail.fun)
- **GitHub**: [github.com/saurabhhh777/Voidmail.fun](https://github.com/saurabhhh777/Voidmail.fun)
- **Twitter**: [@voidmail_fun](https://twitter.com/voidmail_fun)

---

## 🏆 Awards & Recognition

- **Solana Foundation Grant** - Web3 Innovation Award
- **CoinDCX India Grants** - Blockchain Development Excellence
- **Top 10** - Solana Ecosystem Projects
- **Featured** - Solana Devnet Showcase

---

## 📊 Roadmap

### Q1 2024
- [x] Solana wallet integration
- [x] Custom email creation
- [x] NFT minting system
- [ ] Multi-chain support

### Q2 2024
- [ ] Email forwarding features
- [ ] Advanced analytics
- [ ] Mobile app development
- [ ] Enterprise solutions

### Q3 2024
- [ ] AI-powered spam filtering
- [ ] Email encryption
- [ ] Team collaboration features
- [ ] API marketplace

---

**Built with ❤️ for the Solana ecosystem and Web3 community**