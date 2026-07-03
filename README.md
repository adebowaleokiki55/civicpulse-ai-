# 🚀 CivicPulse AI — Government Civic Issue Management System

CivicPulse AI is an **AI-powered civic issue reporting and management system** designed to help citizens report community problems and enable government agencies to classify, route, and resolve them efficiently.

The system uses **FastAPI + PostgreSQL (backend)** and **React (frontend)** with AI classification powered by **Google Gemini**.

---

# ✨ Features

## 👨‍👩‍👧 Citizen Portal
- Report civic issues (road, electricity, flood, waste, etc.)
- Upload images of issues
- Auto-location detection (GPS)
- AI-generated:
  - Category classification
  - Severity detection
  - Department routing
- Track submitted issues
- View personal report history

---

## 🏛 Government Portal

### 📊 Dashboard
- Total issues overview
- Pending issues
- Assigned issues
- In-progress issues
- Resolved issues
- Rejected issues

### 🏢 Department System
- Automatic issue routing to departments
- Department-based workload tracking
- Department drill-down view (issues per department)

### 🔄 Issue Workflow
- Assign issues to officers
- Start work on issues
- Resolve issues with notes
- Reject issues with reasons

---

## 🤖 AI System
Powered by Google Gemini AI:
- Smart issue classification
- Severity detection (Low / Medium / High)
- Keyword + rule-based fallback system
- Automatic routing to government departments

---

# 🏗 Tech Stack

## Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Lucide / React Icons
- Axios

## Backend
- FastAPI
- SQLAlchemy
- PostgreSQL / SQLite
- Google Generative AI (Gemini)

---

# 🧠 AI Classification Logic

The system uses a hybrid AI engine:

### 1. Rule-Based System
- Keyword matching for:
  - Electricity
  - Road
  - Flood
  - Waste
  - Water
  - Security
  - Health

### 2. Gemini AI Model
- Context understanding
- Category prediction
- Severity estimation
- Confidence scoring

### 3. Routing System
Automatically routes issues to departments:

- Road → Works Department
- Electricity → Power Distribution
- Water → Water Board
- Waste → Sanitation
- Security → Security Agency
- Health → Health Department

---

# 📁 Project Structure
