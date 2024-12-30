# Kudospot

## 📚 Overview
Kudospot is a platform for team members to send and receive badges of appreciation. It features:
- Sending kudos with badges and messages.
- Viewing analytics and leaderboard.
- Displaying the most liked post.

## 🚀 Getting Started

### 📦 Prerequisites
Make sure you have the following installed:
- Node.js (v14+)
- MongoDB Atlas account
- NPM or Yarn

### 🛠️ Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/kudos-app.git
   cd kudos-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kudos_db?retryWrites=true&w=majority
   PORT=5000
   ```
4. Seed the database:
   Run the seed script to populate the database with default users:
   ```bash
   node config/seed.js
   ```
   Default users include:
   - `alice@example.com`
   - `bob@example.com`

### ▶️ Run Application
Start backend server:
```bash
npm run server
```
Start frontend server:
```bash
npm start
```
Visit `http://localhost:3000` in your browser.

## 🗂️ Folder Structure
```
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config
│   │   ├── seed.js
│   └── server.js
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.js
│   │   └── index.js
├── .env
├── README.md
└── package.json
```

## 🛡️ Database Schema
### Kudos Collection
```json
{
  "_id": "ObjectId",
  "sender": "string",
  "receiver": "string",
  "badge": "string",
  "message": "string",
  "createdAt": "Date"
}
```
### Users Collection
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string"
}
```
### Relationships
- `Kudos.sender` ↔ `Users.email`
- `Kudos.receiver` ↔ `Users.email`

## 📝ER Diagram
![er kudospot](er-kudospot.png)

- [Link to ER diagram of kudospot](https://dbdiagram.io/d/677243e65406798ef7e6b796)

## 📊 Analytics Page
- Badge Distribution Chart
- Kudos Leaderboard
- Most Liked Post

## 📄 Assumptions
- Predefined user emails: `alice@example.com`, `bob@example.com`
- Database is hosted on MongoDB Atlas.

## 📧 Contact
- **Author:** Junaid Ahmed
- **Email:** sjunaid626@gmail.com

---
Made with ❤️ by Junaid Ahmed

