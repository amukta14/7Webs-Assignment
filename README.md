# LitLoom – Book Review Platform

A vibrant, full-stack web app for discovering, reviewing, and rating books. Built with React, Node.js, Express, and MongoDB.

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended; v24+ may have compatibility issues)
- MongoDB Atlas account (or local MongoDB)

### Backend
1. cd backend
2. Create a .env file with:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
3. npm install
4. node server.js (or npx nodemon server.js)
   - The backend runs on port 5001 by default.

### Frontend
1. cd frontend
2. npm install
3. npm start
   - The frontend runs on port 3000 (or the next available port).

### Usage
- Visit http://localhost:3000 for the frontend
- API runs on http://localhost:5001

## Architecture Decisions

- MongoDB: Chosen for flexible document storage and easy relationships.
- JWT: For stateless, secure authentication.
- MUI (Material UI): For rapid, beautiful UI with a custom vibrant theme.
- Framer Motion: For animated page transitions and delightful UX.
- RESTful API: For clear separation of frontend and backend.
- Global Snackbar Context: For consistent feedback and error handling.
- Responsive Design: Mobile-first, works on all screen sizes.

## Known Limitations

- No social login (email/password only)
- No admin/moderation features
- No image upload for books
- Basic error handling/UI polish (can be improved further)
- Some warnings may appear if using Node.js v24+ (use v18 or v20 for best compatibility)
- No email verification or password reset

## Loom Walkthrough

(https://drive.google.com/drive/folders/14g4tZBRDGQupkHKhjK_egnRZr9W2xWrp)

## License

MIT 
