# ✉️ Email Transformer: Elite AI Communications Agent

Email Transformer is a production-grade, full-stack AI application designed to transform incoming emails into perfectly architected replies. Built with a focus on high-end aesthetics, modular architecture, and resilient AI integration.

---

## 🚀 Key Features

### 🧠 Intelligent Generation
- **Elite Architect Persona**: Advanced prompt engineering ensures human-like, context-aware, and high-status email responses.
- **Tone Orchestration**: Switch between **Professional, Formal, Friendly, and Casual** tones instantly via a smart UI selector.
- **Model Fallback System**: Automatic resilience logic that rotates between `gemini-2.5-flash`, `gemini-2.0-flash`, and `gemini-1.5-flash` to handle high-demand "503" spikes seamlessly.

### 🎨 Premium UI/UX
- **ChatGPT-Inspired Chat Interface**: Sleek dark mode with glassmorphism, shimmering logos, and fluid animations using **Framer Motion**.
- **Fluid Typography**: Responsive font scaling using CSS `clamp()`—ensuring perfect readability from mobile to ultra-wide monitors.
- **Smart Input Bar**: A floating, auto-expanding writing environment with character counting and instant-clear mechanics.
- **Interactive Toasts**: Professional feedback loop using `react-hot-toast` for generation states, saving, and background sync.
- **Responsive Geometry**: Sidebar auto-collapses on mobile, and suggestion capsules adapt their size and radius for every screen.

### 🗄️ Persistence & History
- **MongoDB Core**: Persistent storage for every generated transformation.
- **Sidebar Archive**: Quick-access history list with:
  - **Individual Delete**: Target specific records for removal.
  - **Bulk Wipe**: "Clear All History" capability for total workspace resets.
  - **Live Sync**: Post-deletion API polling ensures the UI is always a 100% accurate mirror of the database.

### 🛠️ Technical Architecture
- **Service-Oriented Backend**: AI logic is decoupled into a dedicated `Service Layer`, making the system scalable and provider-agnostic.
- **Modern ES6 Module System**: Fully migrated to ES6 `import/export` syntax across Node.js and React.
- **Unified SDK**: Powered by the latest official `@google/genai` unified SDK.
- **Centralized API Client**: Custom Axios instance with **Interceptors** for global error handling and request management.
- **Modular Frontend**: Clean component separation (`Sidebar`, `Navbar`, `ChatArea`, `InputBar`).

---

## 🛠️ Technology Stack

**Frontend:**
- React 18+ (Vite)
- Tailwind CSS v4 (Alpha/Experimental)
- Framer Motion (Animations)
- Lucide React (Iconography)
- React Hot Toast (Notifications)
- Axios (Communication)

**Backend:**
- Node.js (Express)
- MongoDB / Mongoose (Persistence)
- Google Gemini API (@google/genai)
- Helmet & Morgan (Security & Logging)

---

## ⚙️ Installation & Setup

### 1. Environment Config
Create a `.env` file in the `server/` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GOOGLE_API_KEY=your_gemini_api_key
```

### 2. Backend Setup
```bash
cd server
npm install
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

---

## 🧪 Stable v1.5 Highlights
- [x] Full ES6 Module Migration
- [x] Model Resilience Logic (Fallback loops)
- [x] Click-Outside Dropdown Behavior
- [x] Individual History Deletion
- [x] Fluid "Prestige" Typography System
