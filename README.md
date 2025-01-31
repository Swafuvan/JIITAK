Admin User Management System
This is an Admin User Management System built using Next.js, MongoDB, JWT Authentication, and NPM. The application allows an admin to log in, view a dashboard, manage a list of users, and reset the password through email.

Project Overview
The project consists of the following features:

Admin Login: Admins can log in using predefined credentials.
Dashboard: A secure dashboard for the admin to view and manage users.
User List: Displays a list of users with their information.
Password Reset: Allows the admin to reset their password through an email link.
Dummy Users: Includes sample user data for testing the login functionality.
Features
1. Login
Admin can log in with the following credentials:

Email: jabbar123@gmail.com
Password: jabbar123
OR

Email: Antony@gmail.com
Password: 123456
2. Dashboard
After a successful login, the admin is directed to the dashboard where they can view essential information.
3. User List
A list of users is displayed in the admin dashboard. This list includes sample user data, and more can be added via the backend.
4. Password Reset
If the admin forgets their password, they can request a password reset link, which will be sent to their email address.
Installation
Follow the steps below to get the project up and running on your local machine:

Prerequisites
Node.js (installed via NPM)
MongoDB (running locally or using a cloud instance like MongoDB Atlas)
Steps
Clone the repository:

bash
Copy
Edit
git clone <repository-url>
Install the dependencies:

bash
Copy
Edit
cd <project-folder>
npm install
Configure MongoDB:

Set up your MongoDB instance (either locally or on MongoDB Atlas).
Create a .env file in the root directory and add the following environment variables:
bash
Copy
Edit
MONGO_URI=<your-mongo-db-connection-string>
JWT_SECRET=<your-jwt-secret-key>
Run the project:

bash
Copy
Edit
npm run dev
Open your browser and navigate to http://localhost:3000.

Database
MongoDB is used to store user data.
The users are stored with basic details like email, password (hashed), and role information (admin/user).
JWT is used for validating authentication and managing login sessions.
Dummy Users
To test the login functionality, use the following credentials:

User 1:

Email: jabbar123@gmail.com
Password: jabbar123
User 2:

Email: Antony@gmail.com
Password: 123456
Technologies Used
Next.js: React framework for building server-side rendered applications.
MongoDB: NoSQL database to store user information.
JWT: JSON Web Tokens for secure authentication.
NPM: Node.js package manager for managing dependencies.
NodeMailer: Used for sending email reset links (if implemented).
Routes
/login: Admin login page.
/dashboard: Admin dashboard displaying the user list.
/users: List of users managed by the admin.
/reset-password: Admin can request a password reset via email.
Additional Notes
This project uses JWT for user authentication, ensuring secure and stateless authentication.
Make sure MongoDB is running before starting the application.
Ensure to use the correct MongoDB URI and JWT secret key in your .env file.