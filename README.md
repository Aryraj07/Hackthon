# BharatSkill Connect

**Hyperlocal P2P Skill Exchange**

BharatSkill Connect is a platform that helps local **Gurus** and **Shishyas** connect for skill exchange and livelihood.  
Built with **React** (frontend) and **Supabase** (backend + database) for a fully managed, scalable solution.

---

## 🚀 Problem Statement

Local skilled individuals often struggle to reach nearby learners or clients due to lack of discoverability.  
On the other hand, learners looking for specific skills within their locality find it difficult to connect with reliable mentors.

**Solution → BharatSkill Connect**  
A digital platform enabling hyperlocal discovery of skills, direct communication, and trust-building via reviews.

---

## 🎯 Must-Have Features

- **User Authentication** – Secure login/registration powered by Supabase Auth.  
- **Skill Listing** – Gurus can create and manage skill listings.  
- **Geolocation Search** – Shishyas can find Gurus nearby using location-based queries.  
- **Messaging** – Real-time messaging with Supabase Realtime subscriptions.  
- **Reviews & Ratings** – Shishyas can leave reviews and ratings for Gurus.  

> ⚠️ Note: This project **not include addtional feature**  Govt Portal Integration.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite or CRA)  
- **Backend & Auth:** Supabase  
- **Database:** Supabase PostgreSQL  
- **Realtime:** Supabase Realtime (WebSocket)  
- **Deployment:** Vercel / Netlify (frontend), Supabase (backend + DB)  

---

## 🔑 User Flows

1. **Guru Flow**  
   - Sign up via Supabase Auth → Create Skill Listing → Chat with Shishyas → Receive Reviews  

2. **Shishya Flow**  
   - Sign up via Supabase Auth → Search Nearby Skills → Message Gurus → Leave Reviews  

---

## 📌 Database Schema (Supabase)

- **users**  
  `id, name, email, role (guru/shishya), lat, lng, created_at`  

- **skills**  
  `id, user_id, title, description, category, location_lat, location_lng, created_at`  

- **messages**  
  `id, sender_id, receiver_id, content, created_at, is_read`  

- **reviews**  
  `id, reviewer_id, reviewee_id, rating, comment, created_at`  

---

## 🎨 UI/UX Highlights

- Simple React interface with authentication & protected routes.  
- Map or list-based view for geolocation-based search.  
- In-app chat panel (Supabase Realtime).  
- Reviews section on Guru profile page.  

---



