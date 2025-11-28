# ExportSarathi: AI-Powered Global Trade Companion 🌍

> **"Know everything about export."**

**ExportSarathi** (formerly ExportPilot.AI) is an advanced AI-driven platform designed to empower Indian MSMEs to conquer global markets. It acts as a 24/7 expert consultant, guiding users through the complexities of international trade, compliance, and market analysis.

![ExportSarathi Banner](https://via.placeholder.com/1200x600?text=ExportSarathi+Dashboard)

## 🌐 Live Demo

- **Frontend (App)**: [https://export-sarathi.vercel.app](https://export-sarathi.vercel.app)
- **Backend (API)**: [https://exportsarathi-backend.onrender.com](https://exportsarathi-backend.onrender.com)

## 🚀 Key Features

### 1. 🤖 AI Export Advisor (Voice-Enabled)
- **Persona**: "ExportSarathi" - An elite Global Trade Expert.
- **Voice Interaction**: Hands-free conversation mode with a professional female voice.
- **Intelligence**: Powered by Google Gemini 2.5 Pro for precise, source-backed answers.
- **Capabilities**: Answers queries on DGFT regulations, HS codes, logistics, and more.

### 2. 📊 Export Feasibility Checker
- **Real-Time Analysis**: Evaluates product potential in target markets.
- **Comprehensive Report**:
  - Feasibility Score (0-100)
  - Viability Status (High/Medium/Low)
  - Top Suggested Markets
  - Risk Factors & Required Certifications
  - **Top Indian Exporters (Competitors)** Directory
- **Search History**: Automatically saves your feasibility checks for quick reference.
- **Direct Advisor Access**: Instantly chat with the AI Advisor about your results.

### 3. 🛣️ Compliance Roadmap
- **Step-by-Step Guide**: Visual timeline for becoming export-ready.
- **Document Checklist**: Lists required documents for each stage (IEC, RCMC, etc.).
- **Progress Tracking**: Visual indicators for completed and pending steps.

### 4. 📄 Document Generator
- **Auto-Generation**: Creates compliant export documents (Commercial Invoice, Packing List).
- **Templates**: Standardized formats accepted globally.
- **Draft Saving**: Save and edit document drafts.

### 5. 📱 Mobile-First Experience (PWA)
- **Progressive Web App**: Installable on mobile devices (Android/iOS).
- **Responsive Design**: Optimized for all screen sizes.
- **Mobile Sidebar**: Smooth navigation with gesture support.

### 6. 🔐 Secure Authentication
- **User Accounts**: Registration and Login functionality.
- **Personalized Dashboard**: Tracks your specific progress and history.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, Lucide React, Shadcn/UI.
- **Backend**: FastAPI (Python), Google Generative AI (Gemini).
- **State Management**: React Hooks & LocalStorage.
- **Deployment**: Vercel (Frontend), Render (Backend).
- **AI Engine**: Google Gemini 2.5 Pro with RAG capabilities.

## 🔮 Future Updates (Roadmap)

### Phase 2: Enhanced Intelligence & Data
- **Live Market Data**: Integration with real-time global trade data APIs (e.g., UN Comtrade).
- **Buyer Connect**: AI matchmaking to connect exporters with verified international buyers.
- **Logistics Optimization**: AI-driven route planning and shipping cost estimation.

### Phase 3: Mobile & Vernacular
- **Native Mobile Apps**: Dedicated iOS and Android apps.
- **Multilingual Support**: Support for major Indian languages (Hindi, Tamil, Gujarati, etc.) to reach more MSMEs.

### Phase 4: FinTech Integration
- **Trade Finance**: Integrated application for export credit and insurance.
- **Payment Gateway**: Seamless international payment processing.

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ajairaajvinayak/ExportSarathi.git
   cd ExportSarathi
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   pip install -r requirements.txt
   # Set up .env with GOOGLE_API_KEY
   python main_simple.py
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access**: Open `http://localhost:3000` in your browser.

## 📄 License

This project is licensed under the MIT License.

---
*Proudly made by Creovyn Solutions for Impact AI Summit 2026*
