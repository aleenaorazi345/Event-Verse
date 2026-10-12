# 🎉 EventVerse

A MERN-stack platform for discovering, organizing, and managing university events.

> **Stack:** MongoDB · Express · React (Vite) · Node.js · Tailwind CSS v4

---

## 👥 Team

| Member | Role |
|--------|------|
| Aleena Orazi | Full-Stack Developer |
| Aleena Qayyum | Full-Stack Developer |

---

## 🎯 Project Overview

EventVerse centralizes university events — workshops, competitions, seminars, sports, and society activities — into one platform.

**Three user roles:**
- 🎓 **Student** — browse, search, and register for events
- 🎤 **Organizer** — create and manage events, view registrations
- 🛡️ **Admin** — manage users and moderate content

---

## 🗂️ Project Structure

```
EventVerse/
├── backend/                    # Express API + MongoDB
│   ├── config/                 # DB connection, cloudinary
│   ├── controllers/            # Route handlers (business logic)
│   ├── middleware/             # Auth, roles, error handling
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # API route definitions
│   ├── seed/                   # DB seed scripts
│   ├── utils/                  # Helpers (JWT, email, etc.)
│   ├── validators/             # Input validation
│   ├── .env                    # Environment vars (NOT committed)
│   ├── package.json
│   └── server.js               # Entry point
│
├── frontend/                   # React + Vite + Tailwind
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Images, icons
│   │   ├── components/         # Reusable UI
│   │   ├── context/            # AuthContext, NotificationContext
│   │   ├── hooks/              # Custom hooks
│   │   ├── pages/              # Route pages (student/organizer/admin)
│   │   ├── routes/             # Routing + ProtectedRoute
│   │   ├── services/           # Axios API calls
│   │   ├── styles/             # Global CSS
│   │   ├── utils/              # Helpers (formatDate, validators)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## ⚙️ Prerequisites

Install these on your machine:

| Tool | Version | Check |
|------|---------|-------|
| Node.js | v18+ | `node -v` |
| npm | v9+ | `npm -v` |
| Git | latest | `git --version` |

Download Node.js: https://nodejs.org

---

## 🚀 Getting Started (For Teammates Cloning the Repo)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/aleenaorazi345/Event-Verse.git
cd Event-Verse
```

### 2️⃣ Install backend dependencies

```bash
cd backend
npm install
cd ..
```

### 3️⃣ Install frontend dependencies

```bash
cd frontend
npm install
cd ..
```

### 4️⃣ Set up environment variables (backend)

Ask a teammate for the `.env` file, **OR** create `backend/.env` yourself:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

> ⚠️ **Never commit `.env`** — it's already gitignored.

**Where to get `MONGO_URI`:** See the [MongoDB Atlas Setup](#-mongodb-atlas-setup) section below.

### 5️⃣ Run both servers (use TWO terminals)

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```
→ Runs on **http://localhost:5000**

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
→ Runs on **http://localhost:5173**

### 6️⃣ Open in browser

- Frontend: http://localhost:5173
- Backend health check: http://localhost:5000/api/health

---

## 🍃 MongoDB Atlas Setup

Free tier is enough for development.

1. Sign up at https://www.mongodb.com/cloud/atlas/register
2. Create a **Free (M0)** cluster
3. **Database Access** → Add a user (username + password) → note them down
4. **Network Access** → Add IP `0.0.0.0/0` (allow from anywhere — dev only)
5. Click **Connect** → **Drivers** → copy the connection string:
   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Paste it into `backend/.env` as `MONGO_URI`, replacing `<user>` and `<password>`, and add `/eventverse` before the `?`:
   ```
   mongodb+srv://myuser:mypass@cluster0.xxxxx.mongodb.net/eventverse?retryWrites=true&w=majority
   ```

---

## 🧰 Available Scripts

### Backend (`backend/`)

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start with nodemon (auto-restart on save) |
| `npm start` | Start in production mode |

### Frontend (`frontend/`)

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start Vite dev server (HMR) |
| `npm run build` | Build for production → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## 🔐 Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `NODE_ENV` | Environment mode | `development` / `production` |
| `PORT` | Backend port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Sign JWT tokens (keep secret) | random 32-char string |
| `JWT_EXPIRE` | Token lifetime | `7d` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |

---

## 🛠️ Tech Stack

**Frontend**
- React 19 + Vite
- React Router DOM
- Tailwind CSS v4
- Axios
- React Hook Form + Zod

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken) + bcryptjs
- express-validator
- Multer + Cloudinary (uploads, later)
- Nodemailer (email, later)

**Deployment**
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## 🐛 Troubleshooting

| Problem | Fix |
|---------|-----|
| `EADDRINUSE: port 5000` | Change `PORT` in `.env` (e.g. 5001) |
| `Cannot find module 'express'` | Run `cd backend && npm install` |
| Blank white page | Check `main.jsx` imports `./index.css` |
| Tailwind classes do nothing | Verify `@tailwindcss/vite` plugin in `vite.config.js` |
| CORS error in browser | Ensure `CLIENT_URL` in `.env` matches frontend URL |
| `git push` rejected | Run `git pull --rebase`, then push again |
| MongoDB connection timeout | Check Atlas IP allowlist (`0.0.0.0/0`) |

---

## 📅 Roadmap

- [x] Project scaffolding
- [ ] User auth (register / login / roles)
- [ ] Event CRUD (organizer)
- [ ] Event discovery + search + filters
- [ ] Event registration (student)
- [ ] Notifications
- [ ] Admin dashboard
- [ ] UI polish + responsive design
- [ ] Deployment

---

## 📝 License

Academic project — University of [Your University].
