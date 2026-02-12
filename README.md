# Secure AI Hospital E-Report System

Production-style full-stack healthcare SaaS platform with secure patient/doctor workflows, AI report summarization, and cloud-ready deployment architecture.

## Architecture

- **Backend**: Node.js, Express, MongoDB Atlas, Mongoose, JWT auth (access + refresh), bcrypt, Multer upload, RBAC, OpenAI service, Dockerized.
- **Frontend**: React (Vite), Tailwind CSS, React Router, Axios API client, Context-based auth state, responsive SaaS dashboard.

## Monorepo Structure

```bash
backend/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    utils/
    uploads/
  tests/
frontend/
  src/
    pages/
    components/
    layouts/
    services/api/
    context/
    hooks/
```

---

## 1) Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Required backend env variables

- `MONGO_URI`: MongoDB Atlas connection string
- `JWT_ACCESS_SECRET`: strong random secret
- `JWT_REFRESH_SECRET`: strong random secret
- `OPENAI_API_KEY`: OpenAI API key

### API Endpoints

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `GET /api/patients/me` (PATIENT)
- `GET /api/patients` (DOCTOR)
- `POST /api/patients` (DOCTOR)
- `PUT /api/patients/:patientId` (DOCTOR)
- `GET /api/reports`
- `GET /api/reports/patient/:patientId`
- `POST /api/reports` (multipart upload)
- `POST /api/ai/analyze`

### AI Response shape

```json
{
  "clinical_summary": "...",
  "patient_friendly_summary": "...",
  "risk_flags": [],
  "recommended_followup": "..."
}
```

---

## 2) Frontend Setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173`.

---

## 3) Production Build Commands

Backend:
```bash
cd backend
npm ci --omit=dev
npm start
```

Frontend:
```bash
cd frontend
npm ci
npm run build
npm run preview
```

---

## 4) Deployment Guide

### Backend on Render / Railway
1. Create a new Web Service from `backend/`.
2. Build command: `npm ci --omit=dev`
3. Start command: `npm start`
4. Add all env vars from `backend/.env.example`.
5. Ensure MongoDB Atlas network access allows your host.

### Frontend on Vercel
1. Import repo and set root directory to `frontend/`.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set `VITE_API_URL` to your deployed backend URL + `/api`.

### MongoDB Atlas
1. Create cluster and DB user.
2. Use TLS-enabled SRV URI.
3. Configure IP allowlist for deployment providers.
4. Store URI in `MONGO_URI` secret only.

---

## 5) Security / HIPAA-style awareness

- Role-based access control (PATIENT read-focused, DOCTOR CRUD).
- Passwords hashed with bcrypt.
- JWT auth with short-lived access token and refresh flow.
- Upload type and size restrictions.
- Environment-based secret management.
- Structured AI fallback and timeout handling to prevent service crashes.

