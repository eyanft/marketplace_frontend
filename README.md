# Marketplace Frontend

This repository contains the frontend application for the Marketplace platform.

The application relies on multiple external services:
- Marketplace Backend API
- Recommendation Engine
- Visual Search Service
- Admin Dashboard

To run the complete system locally, all required repositories must be cloned and started.

---

## 📌 Project Architecture

The project is composed of the following components:

| Component | Repository | Description |
|-----------|------------|-------------|
| Frontend | Current repository | Main marketplace user interface |
| Backend API | [backend_app_marketplace](https://github.com/eyanft/backend_app_marketplace) | Core REST API, authentication, products, orders, users |
| Recommendation Service | [recommendation](https://github.com/eyanft/recommendation) | AI-based product recommendation engine |
| Visual Search Service | [visual-search](https://github.com/eyanft/visual-search) | Image-based product search |
| Admin Dashboard | [admin-dashboard-marketplace](https://github.com/eyanft/admin-dashboard-marketplace) | Marketplace administration interface |

---

# 🚀 Installation & Setup

## 1. Clone all required repositories

Create a workspace directory:

```bash
mkdir marketplace-project
cd marketplace-project
```

Clone the repositories:

```bash
git clone https://github.com/eyanft/marketplace_frontend
git clone https://github.com/eyanft/backend_app_marketplace
git clone https://github.com/eyanft/recommendation
git clone https://github.com/eyanft/visual-search
git clone https://github.com/eyanft/admin-dashboard-marketplace
```

Your workspace should look like:

```text
marketplace-project/
├── frontend/
├── backend_app_marketplace/
├── recommendation/
├── visual-search/
└── admin-dashboard-marketplace/
```

## ⚙️ Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create the environment configuration file:

```bash
cp .env.example .env
```

Update the environment variables according to your local setup:

```env
VITE_API_URL=http://localhost:8080
VITE_RECOMMENDATION_URL=http://localhost:5001
VITE_VISUAL_SEARCH_URL=http://localhost:5002
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at: `http://localhost:5173`

## 🖥️ Backend Setup

Go to the backend repository:

```bash
cd ../backend_app_marketplace
```

Follow the backend README instructions. The backend must be running before using the frontend application.

* Backend API: `http://localhost:8080`

## 🤖 Recommendation Service Setup

Navigate to:

```bash
cd ../recommendation
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the service:

```bash
python app.py
```

* Recommendation API: `http://localhost:5001`

## 🔎 Visual Search Service Setup

Navigate to:

```bash
cd ../visual-search
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the service:

```bash
python app.py
```

* Visual Search API: `http://localhost:5002`

## 🛠️ Admin Dashboard Setup

Navigate to:

```bash
cd ../admin-dashboard-marketplace
```

Install dependencies:

```bash
npm install
```

Start the dashboard:

```bash
npm run dev
```

The admin dashboard will be available at: `http://localhost:5174`

---

## 🔄 Running Order

For a complete working environment, start services in this order:

1.  ✅ Backend API
2.  ✅ Recommendation Service
3.  ✅ Visual Search Service
4.  ✅ Admin Dashboard
5.  ✅ Frontend Application

## 🧰 Requirements

Make sure you have installed:

* Node.js >= 18
* npm >= 9
* Python >= 3.10
* Git
* Database dependencies required by the backend

Check each repository README for additional configuration.

## 📂 Development Workflow

Each component is maintained independently. To update a repository:

```bash
git pull origin main
```

Install new dependencies after pulling changes (run `npm install` or `pip install -r requirements.txt` as appropriate).

## 🐛 Troubleshooting

### Frontend cannot connect to backend
* Verify backend server is running.
* Check if environment variables are correctly configured.
* Ensure CORS settings allow frontend requests.

### Recommendation / Visual Search unavailable
* Verify Python services are running.
* Verify correct ports are configured.
* Ensure required ML models are downloaded.

### Port conflicts
* If a port is already used, modify the corresponding `.env` configuration.

## 👥 Contributors

Marketplace Development Team

## 📄 License

This project is for educational and development purposes.
