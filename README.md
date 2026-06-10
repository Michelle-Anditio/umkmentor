<div align="center">
  <img src="https://raw.githubusercontent.com/Michelle-Anditio/umkmentor/master/public/icon-512.png" alt="UMKMentor Logo" width="100" height="100">

  # UMKMentor

  > AI-powered business consultation platform that helps beginner online sellers make data-driven decisions through Machine Learning.
</div>

[View Demo](https://umkmentor.netlify.app) • [Machine Learning Repo](https://github.com/adinnn30/UMKMentor-ML) • [Report Bug](https://github.com/Michelle-Anditio/umkmentor/issues/new?labels=bug) • [Request Feature](https://github.com/Michelle-Anditio/umkmentor/issues/new?labels=enhancement)

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)
- [Machine Learning](#-machine-learning)
- [License](#license)
- [Contact](#contact)

---

## 📌 About The Project

**UMKMentor** is an AI-powered business consultation platform designed to help aspiring online sellers make data-driven business decisions. By combining Machine Learning, product potential prediction, and marketplace review sentiment analysis, UMKMentor provides practical recommendations that help users better understand market opportunities before starting their online business.

---

## 🛠️ Built With

- [![React][React.js]][React-url]
- [![Vite][Vite.dev]][Vite-url]
- [![Firebase][Firebase.com]][Firebase-url]
- [![FastAPI][FastAPI]][FastAPI-url]
- [![Scikit-Learn][Sklearn]][Sklearn-url]
- [![Lucide React][Lucide.dev]][Lucide-url]

---

## 🚀 Getting Started

### Prerequisites

* Node.js >= 18
* Python >= 3.11
* npm or yarn
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone repository
   ```sh
   git clone https://github.com/Michelle-Anditio/umkmentor.git
   ```
2. Enter the project directory
   ```sh
   cd umkmentor
   ```
3. Install frontend dependencies
   ```sh
   npm install
   ```
4. Create a `.env` file and add your Firebase credentials
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
5. Install backend dependencies
   ```sh
   cd backend
   pip install -r requirements.txt
   ```
6. Run the backend server
   ```sh
   uvicorn main:app --reload --port 8000
   ```
   Swagger API:
   ```
   http://127.0.0.1:8000/docs
   ```
7. Run the frontend
   ```sh
   npm run dev
   ```

---

## ✨ Features

### 1. **Product Potential Analysis**
Predict whether a product has a high chance of selling using a Gradient Boosting Machine Learning model based on product category, selling price, discounted price, stock availability, average rating, Official Store status, and Gold Merchant status.

### 2. **Platform Recommendation + Commission Simulation**
Compare Shopee, Tokopedia, and TikTok Shop to find the most suitable marketplace with estimated commission calculations.

### 3. **Competitor Insights**
Analyze competitor pricing and marketplace trends to help users position their products more effectively.

### 4. **Review Sentiment Analysis**
Analyze Indonesian marketplace reviews using a TF-IDF + Linear SVM model to better understand customer perception.

### 5. **Expert Consultation**
Continue your business journey with guidance from experienced business mentors.

---

## ✦ Machine Learning

### Product Prediction

- Model: **Gradient Boosting Tuned**
- Test AUC: **0.7446**
- Output:
  - Product Potential (Laku / Tidak Laku)
  - Success Probability Score
  - Risk Level
  - Business Recommendations

### Review Sentiment Analysis

- Model: **TF-IDF + Linear SVM**
- Output:
  - Positive Sentiment
  - Neutral Sentiment
  - Negative Sentiment

Machine Learning Repository:

https://github.com/adinnn30/UMKMentor-ML
---

## 📄 License

This project was developed as part of the Dicoding Capstone Project and is intended for educational and academic purposes.

---

## 📮 Contact

Project Link: https://github.com/Michelle-Anditio/umkmentor

Demo: https://umkmentor.netlify.app

Machine Learning Repository:
https://github.com/adinnn30/UMKMentor-ML

---

<!-- MARKDOWN LINKS & IMAGES -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vite.dev]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev
[Firebase.com]: https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white
[Firebase-url]: https://firebase.google.com
[FastAPI]: https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white
[FastAPI-url]: https://fastapi.tiangolo.com
[Sklearn]: https://img.shields.io/badge/Scikit--Learn-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white
[Sklearn-url]: https://scikit-learn.org
[Lucide.dev]: https://img.shields.io/badge/Lucide-F56565?style=for-the-badge&logo=lucide&logoColor=white
[Lucide-url]: https://lucide.dev
