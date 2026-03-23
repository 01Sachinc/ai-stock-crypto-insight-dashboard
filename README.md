# 🚀 AI Stock & Crypto Insight Dashboard

[![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-00000f?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**A premium, enterprise-ready SaaS-style financial dashboard** offering real-time stock and crypto tracking, powered by AI sentiment analysis and industrial-grade monitoring.

---

## 🌟 Core Features

- **📊 Intelligent Market Tracking**: Real-time integration with **CoinGecko** and **Yahoo Finance** for seamless asset monitoring.
- **🤖 AI Sentiment Engine**: Powered by **Mistral-7B via HuggingFace**, providing automated "Bullish/Bearish" trends and risk assessments based on live metadata.
- **💎 Glassmorphic UI**: High-fidelity dark theme with glass-morphism, fluid animations (Framer Motion), and responsive Recharts for data visualization.
- **🔐 Robust Security**: Spring Security combined with **stateless JWT authentication** and secure password hashing via BCrypt.
- **📈 Watchlist Management**: User-specific watchlists persisted in a relational RDBMS.
- **🛡️ Enterprise Monitoring**: Exposed **Spring Boot Actuator** and **Prometheus** endpoints for real-time system health and performance metrics.

---

## 🏗️ System Architecture

The project follows a decoupled, cloud-native architecture:

- **Frontend**: A high-performance React SPA built with Vite for sub-second hot-reloads and optimized production bundles.
- **Backend**: A modular Spring Boot REST API strictly following MVC patterns, designed for high throughput and scalability.
- **Database**: Relational MySQL storage with **JPA/Hibernate** for transaction integrity and efficient querying.
- **AI Layer**: Server-less inference calls to HuggingFace, ensuring no heavy on-premise LLM overhead.

---

## 🚀 Deployment & Scaling

- **Frontend**: Optimally deployed to **Vercel** with automatic CIDR and global edge caching.
- **Backend**: Containerized via **Dockerfile** and ready for deployment on **Railway** or **Render**.
- **Observability**: Ready for **Grafana** dashboards using the pre-configured Prometheus registry.

---

## ⚙️ Quick Start

### 1. Project Configuration
Ensure you have your **HuggingFace API Key** and your **MySQL Connection String** (Public Proxy) ready in the root `.env` file.

### 2. Backend Launch
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 3. Frontend Launch
```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Repository Structure

- `/backend`: Core Spring Boot API, Security, and JPA Logic.
- `/frontend`: Modern React application with Tailwind CSS.
- `/screenshots`: Visual documentation of the platform.
- `Dockerfile`: Production-ready containerization for the microservice.

---

## 📄 License

## 📄 License
Project under MIT License. Implemented with excellence by **Sachin**.
