# Holidaze – Project Exam 2

**Author:** Ole Kristian Berge  
**Live site:** https://holidaze-project-exam-2-ole-kristian.netlify.app  
**GitHub repository:** https://github.com/olekb2001/Ole-Kristian-Berge-PE2

---

## 📌 About the project

Holidaze is a venue booking application built with React using the Noroff Holidaze API.

The application supports two types of users:

- Customers can browse venues and create bookings
- Venue Managers can create, edit and delete venues and view bookings made on their venues

This project was developed as part of Noroff Front-End Development Project Exam 2.

---

## ✨ Features

### Customer
- Register and login
- Browse all venues
- Search venues
- Pagination of venues
- View venue details
- See unavailable booking dates
- Create bookings
- View upcoming bookings
- Update profile avatar

### Venue Manager
- Create new venues
- Edit venues
- Delete venues
- View bookings on owned venues
- Update profile avatar

---

## 🛠️ Tech Stack

- React (Vite)
- React Router
- CSS
- Noroff Holidaze API
- Netlify (deployment)

---

## 🚀 Getting started locally

### 1. Clone the repository

```bash
git clone https://github.com/olekb2001/Ole-Kristian-Berge-PE2.git
cd Ole-Kristian-Berge-PE2
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variable

Create a `.env` file in the root:

```
VITE_API_KEY=8b715995-ffb8-4b82-9fb9-20a5d580c2d2
```

### 4. Run the project

```bash
npm run dev
```

---

## 🌐 Deployment

The project is deployed on Netlify directly from the GitHub repository.

A `_redirects` file is included to support React Router on refresh.

---

## 📚 API

This project uses the Noroff Holidaze API:  
https://v2.api.noroff.dev/holidaze

---

## 🧠 What I learned

- Structuring a React project for scalability
- Handling authenticated API requests
- Managing user roles (customer vs venue manager)
- Working with environment variables
- Deploying React applications to Netlify
- Improving performance with lazy loading and image optimization