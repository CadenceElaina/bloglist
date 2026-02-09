# Bloglist

## login with username: root password: root or create a new user

Full-stack blog application built with the MERN stack as part of the [Full Stack Open](https://fullstackopen.com/) course.

**Live:** https://bloglist-17lz.onrender.com/ _(free tier — may take ~30s to wake)_

## Features

- User authentication (login/signup) with JWT
- Create, edit, and delete blog posts
- Like blogs and comments
- Comment on posts with like-based ranking
- User profiles with bio and status
- Search and filter across blogs and users
- Responsive MUI-based UI

## Tech Stack

**Frontend:** React, Redux Toolkit, React Router, Material UI, Axios
**Backend:** Node.js, Express, MongoDB/Mongoose, JWT, bcrypt
**Deployment:** Render

## Running Locally

```bash
# Backend
cd server
npm install
# Create .env with MONGODB_URI, PORT, SECRET
npm run dev

# Frontend
cd frontend
npm install
npm start
```

The frontend proxies API requests to `http://localhost:3003` in development.

## Deploying

```bash
cd frontend && npm run build
rm -rf server/build && cp -r frontend/build server/build
git add . && git commit -m "update build" && git push
```

Render auto-deploys from the `main` branch with root directory set to `server`.
