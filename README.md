# 🎵 Melofy

Melofy is a modern, microservices-based music application that allows users to browse albums and songs, manage their own playlists, and provides admins with full control over song and album management. Built using scalable services, Melofy separates core concerns across user, song, admin, and API gateway layers.

---

## 🧱 Architecture Overview

Melofy is structured into distinct services:

- **api-gateway** – Central gateway that routes API requests to the appropriate backend services.
- **user-services** – Handles user registration, authentication, profile, and playlist management.
- **song-services** – Retrieves albums, songs, and individual song data.
- **admin-services** – Admin panel APIs for managing songs, albums, and song thumbnails.
- **frontend** – A React + Tailwind CSS UI that consumes API Gateway routes.

---

## 🚀 Features

- User registration, login, and secure authentication
- Playlist management for authenticated users
- Album and song browsing by all users
- Admin APIs for:
  - Adding new songs and albums
  - Deleting songs and albums
  - Adding thumbnails to songs
- PostgreSQL with Neon DB for songs/albums, MongoDB for user data
- Robust input validation using Joi
- Centralized logging using Winston

---

## 💻 Tech Stack

### Backend
- **Node.js** + **Express**
- **TypeScript**
- **Winston** (Logging)
- **Joi** (Schema Validation)

### Frontend
- **React**
- **Tailwind CSS**

### Databases
- **MongoDB** – User data
- **PostgreSQL (via Neon DB)** – Albums and songs

---

## 📁 Project Structure

Melofy/
├── api-gateway/ # Central API router
├── user-services/ # Auth, profile, playlist
├── song-services/ # Albums and songs
├── admin-services/ # Add/delete songs, albums, thumbnails
└── frontend/ # React + Tailwind client UI


---

## 🧪 API Endpoints

### 🧑‍💼 User Service (`/api/user`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/register` | Register new user |
| POST   | `/login` | Login existing user |
| POST   | `/logout` | Logout user |
| GET    | `/my-profile` | Get user profile (auth required) |
| POST   | `/add-to-playlist/:id` | Add a song to user playlist (auth required) |

### 🎵 Song Service (`/api/songs`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/all-albums` | Fetch all albums |
| GET    | `/all-songs` | Fetch all songs |
| GET    | `/songs-from-album/:id` | Get songs from a specific album |
| GET    | `/song/:id` | Get details of a single song |

### 🛠️ Admin Service (`/api/admin`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/add-song` | Add a new song (auth + file upload required) |
| POST   | `/add-thumbnail/:id` | Add a thumbnail to a song (auth + file upload) |
| DELETE | `/delete-album/:id` | Delete an album (auth required) |
| DELETE | `/delete-song/:id` | Delete a song (auth required) |

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Anurag-Khatiwada/Melofy.git
cd Melofy

## Setup Environment Variables
cp <service>/.env.template <service>/.env

## Install Dependencies

cd api-gateway && npm install
cd ../user-services && npm install
cd ../song-services && npm install
cd ../admin-services && npm install
cd ../frontend && npm install


# Running each service
npm run dev

🖼️ Frontend
The frontend is built with React and Tailwind CSS. It consumes all routes from the API gateway and provides features like:

User registration/login UI

Album/song browsing interface

Playlist management for users

Admin panel for managing content

📬 Contributing
Contributions are welcome! If you'd like to contribute:

Fork this repo

Create a new branch (git checkout -b feature-xyz)

Commit your changes

Push to the branch

Open a pull request

![Screenshot 2025-06-25 155544](https://github.com/user-attachments/assets/7d6e6d1b-8c23-4cf9-9af2-3ef5af5b8790)
![Screenshot 2025-06-25 155523](https://github.com/user-attachments/assets/27196136-41b9-4eff-bab8-c3c366ba448f)
![Screenshot 2025-06-25 155452](https://github.com/user-attachments/assets/0a32cbac-9559-4779-b906-0687ee2cafb2)
![Screenshot 2025-06-25 155413](https://github.com/user-attachments/assets/1b35c422-5cdb-48bf-a915-f521ad357e10)
![Screenshot 2025-06-25 155347](https://github.com/user-attachments/assets/87a61f19-0cf3-40a0-9be2-b7f34e46ddd1)
![Screenshot 2025-06-25 155258](https://github.com/user-attachments/assets/4f013539-ead7-42cf-8ea8-d8272a539a8b)
![Screenshot 2025-06-25 154925](https://github.com/user-attachments/assets/c9a3ef5b-8ed7-4383-aab7-ccfa95b89177)
