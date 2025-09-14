    # VoidMail.fun 💌 - Complete Web3 Email Platform

**VoidMail.fun** is a revolutionary Web3-native email service that combines privacy-first disposable emails with blockchain-powered custom email addresses and NFT ownership. Built for the Solana ecosystem, it offers instant temporary emails and premium custom domains with NFT certificates.

---

## 🌟 Features

### 🆓 Free Features
- ⚡ **Instant Email Generation**: Get temporary email addresses in seconds
- 🔁 **Real-time Inbox**: Auto-refresh every 10 seconds with live email updates
- 🔄 **Unlimited Generation**: Create new email addresses anytime
- 🧠 **Session Persistence**: Emails persist across browser sessions
- 🔒 **Complete Anonymity**: No registration required, fully anonymous
- 📱 **Mobile Responsive**: Works perfectly on all devices

### 💎 Premium Web3 Features
- 🎨 **Custom Email Creation**: Create personalized emails like `yourname@voidmail.fun`
- 🏆 **NFT Ownership**: Each custom email mints a unique NFT certificate
- 💰 **Cryptocurrency Payments**: Pay with SOL cryptocurrency (0.025 SOL per email)
- 🔗 **Multi-Wallet Support**: Connect Phantom, Solflare, and other Solana wallets
- 🌐 **Premium Domains**: Access to voidmail.fun, voidmail.email, bigtimer.site, asksaurabh.xyz
- ⛓️ **Blockchain Verification**: All custom emails verified on Solana blockchain
- 📊 **Real-time Balance**: Live SOL balance display and transaction tracking

---

## 🎯 Use Cases

### For Developers
- **API Testing**: Test email integrations without spam
- **Web Scraping**: Avoid email verification requirements
- **Account Creation**: Sign up for services without revealing real email

### For Privacy Enthusiasts
- **Anonymous Communication**: Receive emails without identity exposure
- **Temporary Verification**: One-time email verification needs
- **Privacy Protection**: Shield your real email from data breaches

### For Web3 Users
- **NFT Email Ownership**: Own your email address on the blockchain
- **Crypto Integration**: Pay with cryptocurrency for premium features
- **Decentralized Identity**: Build Web3-native communication patterns

---

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TailwindCSS** - Utility-first styling framework
- **Shadcn/UI** - Modern component library
- **Solana Web3.js** - Blockchain integration
- **Wallet Adapter** - Multi-wallet support (Phantom, Solflare)
- **Zustand** - State management
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Server runtime environment
- **Express.js** - Web application framework
- **MongoDB** - Document database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Blockchain
- **Solana** - High-performance blockchain network
- **Anchor Framework** - Smart contract development
- **SPL Token** - NFT token standards
- **Metaplex** - NFT metadata standards

### Email Infrastructure
- **Custom SMTP Server** - Node.js email handling
- **MailParser** - Email parsing and processing
- **Multiple Domain Support** - Handle various email domains

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **MongoDB** (local or cloud instance)
- **Solana Wallet** (Phantom or Solflare)

### One-Command Setup
```bash
git clone https://github.com/saurabhhh777/Voidmail.fun.git
cd Voidmail.fun
chmod +x deploy.sh
./deploy.sh dev
```

This will:
- ✅ Check all requirements
- ✅ Set up environment files
- ✅ Install all dependencies
- ✅ Start all services (Frontend, Backend, SMTP)

### Manual Setup

1. **Clone the repository**
```bash
git clone https://github.com/saurabhhh777/Voidmail.fun.git
cd Voidmail.fun
```

2. **Environment Configuration**
```bash
# Backend (.env)
cp backend/.env.example backend/.env
# Edit backend/.env with your MongoDB URI and settings

# Frontend (.env.local)
cp frontend/.env.example frontend/.env.local
# Update with your API URLs and Solana configuration
```

3. **Install dependencies**
```bash
# Install all dependencies
npm run install:all

# Or install individually
cd frontend && npm install
cd ../backend && npm install
cd ../SmtpServer && npm install
```

4. **Start services**
```bash
# Development mode
npm run dev

# Or start individually
cd backend && npm run dev      # Port 5000
cd frontend && npm run dev     # Port 3000
cd SmtpServer && node index.js # Port 2525
```

---

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/voidmail
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-secret-key
SOLANA_RPC_URL=https://api.devnet.solana.com
PROGRAM_ID=9kuRSh73N6BU8g5qtrcik6RP67YvdrDXE6ZpiM9gvSw9
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_PROGRAM_ID=9kuRSh73N6BU8g5qtrcik6RP67YvdrDXE6ZpiM9gvSw9
NEXT_PUBLIC_NETWORK=devnet
NEXT_PUBLIC_SMTP_DOMAINS=voidmail.fun,voidmail.email,bigtimer.site,asksaurabh.xyz
```

---

## 📊 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Blockchain    │
│   (Next.js)     │◄──►│   (Express)     │◄──►│   (Solana)      │
│                 │    │                 │    │                 │
│ • Wallet Connect│    │ • User Sessions │    │ • NFT Minting   │
│ • Email UI      │    │ • Email Storage │    │ • Payment Flow  │
│ • Premium UI    │    │ • API Routes    │    │ • Verification  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   SMTP Server   │    │   MongoDB       │    │   Wallet        │
│   (Node.js)     │    │   Database      │    │   (Phantom)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🎮 Usage Guide

### Free Temporary Email
1. Visit the application
2. A temporary email is auto-generated
3. Copy and use the email address
4. Check inbox for incoming messages
5. Generate new emails as needed

### Premium NFT Email
1. Connect your Solana wallet
2. Click "Premium" tab
3. Choose email prefix and domain
4. Pay 0.025 SOL
5. Receive NFT certificate
6. Use your permanent custom email

### Managing Emails
- **Inbox**: Real-time email updates
- **Auto-refresh**: 10-second polling
- **Email details**: Full HTML/text content
- **Attachments**: Download and view files

---

## 🔒 Security Features

- **Helmet.js** - Security headers and protection
- **Rate Limiting** - DDoS protection (100 requests/15min)
- **CORS Protection** - Cross-origin request security
- **JWT Authentication** - Secure session management
- **Input Validation** - XSS and injection prevention
- **MongoDB Security** - Database injection protection
- **Wallet Verification** - Cryptographic signature validation

---

## 🌐 Deployment

### Development
```bash
./deploy.sh dev       # Start all development servers
./deploy.sh stop      # Stop all servers
```

### Production
```bash
./deploy.sh build     # Build for production
./deploy.sh prod      # Start production servers
./deploy.sh stop      # Stop production servers
```

### Docker (Coming Soon)
```bash
docker-compose up -d  # Start all services
```

### Cloud Deployment
- **Frontend**: Vercel/Netlify deployment ready
- **Backend**: Docker container for AWS/GCP/Azure
- **Database**: MongoDB Atlas integration
- **SMTP**: Dedicated server or cloud email service

---

## 📈 Performance Metrics

| Metric | Value | Description |
|--------|-------|-------------|
| Email Generation | <100ms | Instant temporary email creation |
| Service Uptime | 99.9% | High availability infrastructure |
| Custom Email Cost | 0.025 SOL | Affordable premium feature |
| NFT Minting | ~2-3s | Fast blockchain transactions |
| Inbox Refresh | 10s | Real-time email updates |
| Supported Domains | 4+ | Multiple premium domains |

---

## 🗺️ Roadmap

### ✅ Phase 1: Foundation (Completed)
- [x] Solana wallet integration
- [x] Custom email creation
- [x] NFT minting system
- [x] Premium domain support
- [x] Real-time inbox functionality
- [x] Mobile responsive design

### 🔄 Phase 2: Enhancement (In Progress)
- [ ] Email forwarding to real inboxes
- [ ] Advanced spam filtering
- [ ] Email analytics dashboard
- [ ] Mobile application
- [ ] API marketplace

### 🔮 Phase 3: Expansion (Planned)
- [ ] Multi-chain support (Ethereum, Polygon)
- [ ] End-to-end email encryption
- [ ] Team collaboration features
- [ ] Enterprise solutions
- [ ] DAO governance

### 🚀 Phase 4: Scale (Future)
- [ ] Decentralized email storage
- [ ] Token economics
- [ ] Global CDN deployment
- [ ] AI-powered features

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Set up development environment
4. Make your changes
5. Add tests if applicable
6. Submit a pull request

### Contribution Guidelines
- Follow existing code style
- Write descriptive commit messages
- Update documentation for new features
- Ensure all tests pass
- Keep PRs focused and small

### Areas for Contribution
- 🐛 Bug fixes and improvements
- ✨ New features and enhancements
- 📚 Documentation improvements
- 🧪 Test coverage expansion
- 🎨 UI/UX improvements

---

## 🆘 Support & FAQ

### Common Issues

**Q: Wallet won't connect**
A: Ensure you have Phantom or Solflare wallet installed and unlocked

**Q: Emails not appearing**
A: Check if the SMTP server is running and backend is connected to database

**Q: Transaction failed**
A: Verify sufficient SOL balance and network connectivity

### Getting Help
- 📧 Email: support@voidmail.fun
- 💬 Discord: [VoidMail Community](https://discord.gg/voidmail)
- 🐛 Issues: [GitHub Issues](https://github.com/saurabhhh777/Voidmail.fun/issues)
- 📖 Docs: [Documentation Site](https://docs.voidmail.fun)

---

## 📄 License

MIT License © [Saurabh Maurya](https://github.com/saurabhhh777) & [Team VoidMail](https://github.com/voidmail-team)

---

## 👨‍💻 Built By

- **[Saurabh Maurya](https://github.com/saurabhhh777)** - Full Stack Developer & Blockchain Engineer
- **[Priyanjal Saxena](https://github.com/priyanjal1234)** - Frontend Developer & UI/UX Designer

---

## 🔗 Links

- **🌐 Live Demo**: [voidmail.fun](https://voidmail.fun)
- **📚 Documentation**: [docs.voidmail.fun](https://docs.voidmail.fun)
- **💻 GitHub**: [github.com/saurabhhh777/Voidmail.fun](https://github.com/saurabhhh777/Voidmail.fun)
- **🐦 Twitter**: [@voidmail_fun](https://twitter.com/voidmail_fun)
- **💼 LinkedIn**: [VoidMail Company](https://linkedin.com/company/voidmail)

---

## 🏆 Awards & Recognition

- 🥇 **Solana Foundation Grant** - Web3 Innovation Award
- 🥇 **CoinDCX India Grants** - Blockchain Development Excellence
- 🏅 **Top 10** - Solana Ecosystem Projects
- 🌟 **Featured** - Solana Devnet Showcase
- 🎖️ **Community Choice** - Best Web3 Tool 2024

---

## 🙏 Acknowledgments

Special thanks to:
- **Solana Foundation** for blockchain infrastructure
- **Vercel** for frontend hosting
- **MongoDB** for database solutions
- **Open Source Community** for amazing tools
- **Beta Testers** for valuable feedback

---

**Built with ❤️ for the Solana ecosystem and Web3 community**

*Making email communication decentralized, private, and owned by users.*