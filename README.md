# Coconut -  CocoCode

Coconut is an online coding platform that allows users to practice programming, submit coding problems, and enhance their skills

---

## 📁 Project Structure

### **Backend**
- **Config**
  - `db.js`: Database configuration and connection.
- **Controllers**
  - `user.js`: Handles user-related logic and operations.
- **Email_Templates**
  - Contains templates for sending email notifications.
- **Middlewares**
  - Common middleware functions for the application.
- **Models**
  - `Problem.js`: Schema for problem-related data.
  - `User.js`: Schema for user-related data.
- **Routes**
  - `forgotpass.js`: Routes for handling password recovery.
  - `Login.js`: Routes for user login.
  - `Logout.js`: Routes for user logout.
  - `problemRoutes.js`: Routes for handling problems.
  - `Register.js`: Routes for user registration.
  - `resetpass.js`: Routes for password reset.
  - `submissionRoutes.js`: Routes for handling submissions.
  - `submit.js`: Handles submission processes.
  - `user.js`: Routes for user operations.
  - `VerifyEmail.js`: Routes for email verification.
- **Utils**
  - `addSubmission.js`: Handles logic for adding submissions.
  - `generateToken.js`: Utility for generating tokens.
  - `sendEmail.js`: Handles sending emails.
- **Environment Variables**
  - `.env`: Stores environment variables.

---

### **Frontend**
- **Components**
  - `CodeSubmission.jsx`: Component for submitting code.
  - `DashBoard.jsx`: User dashboard.
  - `Footer.jsx`: Footer component.
  - `HomePage.jsx`: Home page of the application.
  - `Login.jsx`: Login form.
  - `Navbar.jsx`: Navigation bar.
  - `Otp.jsx`: OTP verification.
  - `Overall.jsx`: Overview component.
  - `ProblemForm.jsx`: Form for creating problems.
  - `Profile.jsx`: User profile page.
  - `ResetPass.jsx`: Password reset form.
  - `Signup.jsx`: Signup form.
- **Context**
  - State and context management for the app.
- **Lib**
  - Utility functions and external integrations.
- **Assets**
  - Static assets like images and icons.

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/Yadubir/Coconut.git
   cd Coconut
2. **Install dependencies**
   ```bash
   npm install
3. **Set up the .env file with the following variables**
   ```bash
   DB_URI=your_database_uri
   JWT_SECRET=your_jwt_secret
   EMAIL_SERVICE=your_email_service
   EMAIL_USER=your_email_user
   EMAIL_PASS=your_email_password
   JUDGE0_API_URL=your_judge0_API_url
   JUDGE0_API_KEY=your_judge0_API_key
4. **Start the backend server**
   ```bash
   npm start

## 💻 Frontend Setup
1. **Navigate to the Frontend folder:**
   ```bash
   cd Frontend
2. **Install dependencies:**
   ```bash
   npm install
3. **Start the frontend development server:**
   ```bash
   npm start
## 🔑 Features
- **User Authentication**:
    - Login and Signup
    - Email Verification
    - Password Recovery and Reset
- **Problem Management**:
    - Submission of problems
    - Management of problem-related data
- **User Dashboard**:
    - Profile management
    - Overview of submissions and activities
- **Notifications**:
    - Email notifications for verification and updates




## remaining work
1. home page ✔️ -(make features div same size as the above one)
2. Problem page layout ✔️ -(add bg color olive)
3. Dropdown for code editor (c++/ java)
4. Profile Dashboard - make it same colors as the website, sync problems, calendar 
5. routes nav check ✔️
6. screenshots for readme 
7. Code Editor alignment 
8. About Page (heheh)