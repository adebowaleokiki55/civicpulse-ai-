🌐 Live Demo(Citizen):https://civicpulse-ai-65le.vercel.app/
🌐 Live Demo(Government):https://civicpulse-ai-65le.vercel.app/admin
# 🚀 CivicPulse AI — Government Civic Issue Management System

CivicPulse AI is an AI-powered civic issue reporting and management system designed to help citizens report community problems and enable government agencies to classify, route, and resolve them efficiently.

It uses FastAPI (backend), React (frontend), PostgreSQL/SQLite, and Google Gemini AI for intelligent issue classification.

------------------------------------------------------------
✨ FEATURES
------------------------------------------------------------

👨‍👩‍👧 CITIZEN PORTAL
- Report civic issues (road, electricity, flood, waste, etc.)
- Upload images of issues
- Auto GPS location detection
- AI-powered:
  - Category classification
  - Severity detection
  - Department routing
- Track submitted issues
- View personal report history

------------------------------------------------------------

🏛 GOVERNMENT PORTAL

📊 Dashboard
- Total issues overview
- Pending issues
- Assigned issues
- In-progress issues
- Resolved issues
- Rejected issues

🏢 Department System
- Automatic AI routing to departments
- Department workload tracking
- Department drill-down pages

🔄 Issue Workflow
- Assign issues to officers
- Start work on issues
- Resolve issues with notes
- Reject issues with reasons

------------------------------------------------------------

🤖 AI SYSTEM (GEMINI POWERED)

- Smart issue classification
- Severity detection (Low / Medium / High)
- Keyword + rule-based fallback system
- Confidence scoring
- Automatic routing to departments

------------------------------------------------------------

🏗 TECH STACK

Frontend:
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Lucide / React Icons

Backend:
- FastAPI
- SQLAlchemy
- PostgreSQL / SQLite
- Google Gemini AI

------------------------------------------------------------

🧠 AI LOGIC FLOW

1. Rule-based keyword detection
2. Gemini AI classification
3. Severity estimation
4. Department routing

------------------------------------------------------------

🏢 DEPARTMENT ROUTING

Road → Works Department  
Flood → Water Resources  
Waste → Sanitation  
Electricity → Power Distribution  
Water → Water Board  
Security → Security Agency  
Health → Health Department  

------------------------------------------------------------

📁 PROJECT STRUCTURE

CivicPulse/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── government.py
│   │   │   ├── issues.py
│   │   ├── services/
│   │   │   ├── ai.py
│   │   │   ├── routing.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── db/
│   │   └── main.py
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Departments.jsx
│   │   │   ├── DepartmentDetails.jsx
│   │   │   ├── IssueDetails.jsx
│   │   │   ├── citizen/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── services/
│   │   └── App.jsx

------------------------------------------------------------

⚙️ SETUP

Backend:
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

Frontend:
cd frontend
npm install
npm run dev

------------------------------------------------------------

🔑 ENV FILE (.env)

GEMINI_API_KEY=your_key_here
DATABASE_URL=your_database_url

------------------------------------------------------------

🔥 API ENDPOINTS

Government:
GET    /government/dashboard
GET    /government/pending
GET    /government/assigned
GET    /government/in-progress
GET    /government/resolved
PUT    /government/assign/{id}
PUT    /government/status/{id}
PUT    /government/resolve/{id}
PUT    /government/reject/{id}
GET    /government/department/{name}

Citizen:
POST   /issues/
GET    /issues/

------------------------------------------------------------

🚀 FUTURE IMPROVEMENTS
- Heatmap visualization
- Real-time notifications
- Mobile app version
- SMS reporting system
- Predictive AI issue detection

------------------------------------------------------------

👨‍💻 AUTHOR

Built by: Team UrbanLogic
Project: CivicPulse AI  
Status: Active Development 🚧

