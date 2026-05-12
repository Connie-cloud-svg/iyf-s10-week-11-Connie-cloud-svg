# Week 11: Database Integration & Authentication

## Author
- **Name:** Concepter Bosibori
- **GitHub:** [@Connie-cloud-svg](https://github.com/Connie-cloud-svg)
- **Date:** May 12, 2025

---

## Project Description

This week I connected the CommunityHub API to a real MongoDB database and implemented user authentication using JWT. The app now supports persistent data storage, user registration and login, protected routes, and role-based authorization — meaning only post authors can edit or delete their own content.

---

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcryptjs
- JSON Web Tokens (JWT)
- dotenv

---

## Features

- MongoDB Atlas cloud database integration via Mongoose
- Mongoose schemas with validation for Posts, Comments, and Users
- Full CRUD operations on posts with pagination, filtering, and sorting
- Post–Comment relationships using ObjectId references
- User registration with password hashing (bcryptjs)
- User login with JWT token generation
- Auth middleware (`protect`, `optionalAuth`, `restrictTo`) for securing routes
- Users linked to their posts — only the author can edit or delete
- Admin role with elevated permissions

---

## How to Run

1. Clone this repository:
   ```bash
   git clone https://github.com/Connie-cloud-svg/iyf-s10-week-11-Connie-cloud-svg.git
   cd iyf-s10-week-11-Connie-cloud-svg
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/community-hub?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-key
   JWT_EXPIRES_IN=7d
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Test endpoints using Postman or Thunder Client at `http://localhost:3000`

---

## Daily Challenges

- [x] **Day 1** — Connected to MongoDB Atlas and created a test route that writes and reads from the database
- [x] **Day 2** — Implemented user registration with email validation, password hashing, duplicate user check, and JWT token response
- [x] **Day 3** — Created `protect` middleware that verifies JWT, attaches the user to the request, and returns 401 for invalid or missing tokens
- [x] **Day 4** — Built user profile routes: `GET /api/users/me`, `PUT /api/users/me`, and `GET /api/users/:id/posts`
- [x] **Day 5** — Implemented authorization so users can only edit their own posts, admin users can edit any post, and proper error messages are returned for unauthorized actions

---

## Lessons Learned

- How to connect an Express app to MongoDB Atlas using Mongoose and environment variables
- How to define Mongoose schemas with built-in validation, instance methods, and static methods
- How to hash passwords securely with bcryptjs using a `pre('save')` hook
- How JWT authentication works — signing tokens on login and verifying them on protected routes
- How to use `populate()` to resolve ObjectId references between related models (e.g. post author)
- How middleware chains work in Express and how to pass user data across the request lifecycle

---

## Challenges Faced

**1. `app.js` not found — wrong folder location**
When starting the server, Node threw a `Cannot find module` error because `app.js` was placed in the root directory instead of inside `src/`. The fix was straightforward: moving `app.js` into `src/` and updating the `require` path in `server.js` to `./src/app`. This reinforced the importance of consistent project structure.

**2. MongoDB Atlas IP whitelisting**
After setting up the Atlas cluster, the connection was being refused. The issue turned out to be that my current IP address had not been added to the Atlas Network Access whitelist. I resolved it by adding my IP in the Atlas dashboard under Network Access → Add IP Address. For development convenience, I also noted the option to allow all IPs (`0.0.0.0/0`), though this is not recommended for production.

**3. Understanding the User schema and password handling**
The User schema took some time to fully understand — particularly the `select: false` option on the password field, which hides it from query results by default, and the `pre('save')` hook that hashes the password only when it has been modified. It was also initially confusing why `.select('+password')` was needed explicitly in the login controller. Once I traced the full flow from registration → hashing → login → comparison, the design made much more sense.

---

## Live Demo (if deployed)

_Not yet deployed_