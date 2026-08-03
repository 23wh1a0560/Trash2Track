# ♻️ Trash2Track (T2T)

**Trash2Track (T2T)** is an end-to-end digital waste management platform that simplifies waste collection, segregation, tracking, and recycling. The platform connects **citizens, waste collection workers, recyclers, and administrators** through a unified technology-driven ecosystem, promoting efficient and sustainable waste management.

---

## 🌍 Problem Statement

Traditional waste management systems suffer from:

- Lack of transparency in waste collection
- Inefficient communication between citizens and authorities
- Poor waste segregation tracking
- Limited monitoring of collection workers
- Minimal data-driven decision making

Trash2Track addresses these challenges by providing a centralized platform for all stakeholders.

---

## ✨ Features

### 👤 Citizen Portal
- Register and log in
- Raise waste collection requests
- Track request status
- View collection history
- Receive notifications and updates

### 🚛 Worker Portal
- View assigned collection requests
- Update collection status
- Manage daily tasks
- Mark requests as completed

### 🛠 Admin Dashboard
- Monitor overall waste collection
- Manage citizens and workers
- Assign collection tasks
- View analytics and reports
- Track system activities

### ♻️ Sustainability
- Promotes proper waste segregation
- Encourages recycling
- Improves operational efficiency
- Supports smart city initiatives

---

## 🏗️ System Architecture

```
Citizen App
      │
      ▼
Spring Boot REST API
      │
      ▼
MySQL Database
      ▲
      │
Worker App ───── Admin Dashboard
```

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- Lucide React
- Framer Motion (Admin)

### Backend
- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- Maven

### Database
- MySQL

---

## 📁 Project Structure

```
Trash2Track/
│
├── citizen/          # Citizen React Application
├── worker/           # Worker React Application
├── admin/            # Admin Dashboard
└── backend/          # Spring Boot REST API
```

---

## 🚀 Getting Started

### Prerequisites

- Java 17
- Maven
- Node.js (v18+ recommended)
- npm
- MySQL

---

## Backend Setup

```bash
cd backend

mvn clean install

mvn spring-boot:run
```

Backend will start on:

```
http://localhost:8080
```

---

## Citizen App

```bash
cd citizen

npm install

npm start
```

Runs on:

```
http://localhost:3000
```

---

## Worker App

```bash
cd worker

npm install

npm start
```

---

## Admin Dashboard

```bash
cd admin

npm install

npm start
```

---

## 📊 Workflow

1. Citizen raises a waste collection request.
2. Admin reviews and assigns the request.
3. Worker receives assigned task.
4. Worker collects waste and updates status.
5. Citizen can track request completion.
6. Admin monitors all activities through the dashboard.

---

## Future Enhancements

- AI-based waste classification
- Smart route optimization
- GPS-enabled collection tracking
- QR code-based waste identification
- IoT smart bin integration
- Real-time notifications
- Analytics dashboard with predictive insights
- Carbon footprint monitoring

---

## SDGs Supported

- 🌍 SDG 11 – Sustainable Cities and Communities
- ♻️ SDG 12 – Responsible Consumption and Production
- 🌱 SDG 13 – Climate Action

---

## Contributors

Developed as part of the **Trash2Track (T2T)** project by the project team.

---

## License

This project is developed for educational and research purposes.
