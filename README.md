# InterviewIQ 🧠

**AI-Powered Personalized Interview Preparation Assistant**

InterviewIQ helps job seekers prepare for interviews by generating a personalized interview plan based on their resume, the job description, and a self-description — powered by AI.

---

## ✨ Features

- 🔐 **Secure Authentication** — JWT-based auth with `httpOnly` cookies (register, login, logout, session persistence)
- 📄 **Resume Upload** — Upload your resume (PDF) for AI analysis
- 💼 **Job-Specific Matching** — Paste a job description to tailor the interview plan
- 🙋 **Self Description Input** — Add context about yourself for a more personalized report
- 🤖 **AI-Generated Interview Reports** — Get a custom interview preparation plan with a match score
- 📚 **Interview History** — View and revisit previously generated interview plans

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Axios
- React Router
- Lucide Icons

**Backend**
- Node.js + Express
- MongoDB (Mongoose)
- JWT (JSON Web Tokens) for authentication
- bcryptjs for password hashing
- Cookie-based sessions (`httpOnly`, `secure`, `sameSite`)

**AI Integration**
- AI service for resume/job description/self-description analysis and interview report generation

---

## 📁 Project Structure

```
InterviewIQ/
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── services/
│   │   └── db/
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── auth/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/interview-iq.git
cd interview-iq
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` folder:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Run the backend server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder (if using an API base URL):

```env
VITE_API_BASE_URL=http://localhost:3000
```

Run the frontend dev server:

```bash
npm run dev
```

The app should now be running at `http://localhost:5173` (frontend) and `http://localhost:3000` (backend API).

---

## 🔑 Environment Variables

| Variable | Description | Location |
|---|---|---|
| `PORT` | Backend server port | Backend |
| `MONGO_URI` | MongoDB connection string | Backend |
| `JWT_SECRET` | Secret key for signing JWTs | Backend |
| `VITE_API_BASE_URL` | Backend API URL used by frontend | Frontend |

---

## 📡 API Endpoints

### Auth Routes (`/api/auth`)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Log in an existing user |
| POST | `/logout` | Log out the current user |
| GET | `/get-me` | Get current logged-in user details |

### Interview Routes (`/api/interview`)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/generate` | Generate an AI interview report (resume + job description + self description) |
| GET | `/:id` | Fetch a specific interview report |

> Update this section with your actual route names/params as your API evolves.

---

## 🚀 Deployment

Both the frontend and backend are deployed on [Render](https://render.com).

- **Frontend** — Deployed as a Static Site on Render
  - Root Directory: `frontend`
  - Build Command: `npm install && npm run build`
  - Publish Directory: `dist`
  - Rewrite Rule: `/*` → `/index.html` (required for React Router)

- **Backend** — Deployed as a Web Service on Render
  - Root Directory: `Backend`
  - Build Command: `npm install`
  - Start Command: `npm start`

Make sure to:
- Set `CORS` origin on the backend to your deployed frontend's Render URL
- Set cookie options to `secure: true` and `sameSite: "none"` in production for cross-domain cookies
- Add all environment variables (`MONGO_URI`, `JWT_SECRET`, etc.) to the backend service's Environment settings on Render
- Update the frontend's API base URL to point to the deployed backend's Render URL

---

## 🧑‍💻 Author

Built with ❤️ by [Ujjwal Tayal]

---

## 📄 License

This project is licensed under the MIT License.
