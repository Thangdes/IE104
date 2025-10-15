# IE104 MusicSite 🎵

A music streaming web application built for the IE104 course.  

## Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Installation & Setup](#installation--setup)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Overview

MusicSite is a full-stack web application for uploading, browsing, and streaming music tracks.  
Users can register, login, upload audio files, manage playlists, search tracks, and listen to them online.

---

## Technologies

Below is a list of the main technologies, libraries, and tools used in this project.

| Layer / Component | Technology / Framework |
|-------------------|-------------------------|
| Backend / API      | Node.js,  |
| Database           | PostgreSQL |
| Storage / File Upload | Cloudinary |
| Frontend            | React / HTML + CSS + JS |

---

## Installation & Setup

Follow these steps to run the project locally.

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- Database (PostgreSQL)
- Storage service for file uploads (Cloudinary)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/tanvo-0574/IE104-MusicSite.git
   cd SoundBites
   ```

2. **Backend setup**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file inside `/backend`:

   ```
   DATABASE_URL=<your_database_urL>
   CLOUDINARY_CLOUD_NAME=<your_clodinary_cloud_name>
   CLOUDINARY_API_KEY=<your_clodinary_api_key>
   CLOUDINARY_API_SECRET=<your_clodinary_api_secret>
   CLOUDINARY_URL=<your_clodinary_url>
   PORT=4000
   JWT_SECRET=<your_jwt_secret_value>
   ```

3. **Frontend setup**

   ```bash
   cd ../frontend
   npm install
   ```

   Create a `.env` file inside `/frontend`:

   ```
   VITE_API_BASE=http://localhost:4000/api
   ```

4. **Start the application**

   In one terminal, start the backend:

   ```bash
   cd backend
   node src/index.js
   ```

   In another terminal, start the frontend:

   ```bash
   cd frontend
   npm run dev
   ```

5. **Open the web app**

   Visit [http://localhost:3000](http://localhost:5173).

---

## License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for more information.

---

## Acknowledgements

- Built as part of the **IE104** course  
- Thanks to the instructors and teammates for their guidance  
- Inspired by popular music platforms such as Spotify and SoundCloud
