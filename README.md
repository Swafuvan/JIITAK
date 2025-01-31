# Admin User Management System

This is an **Admin User Management System** built using **Next.js**, **MongoDB**, **JWT Authentication**, and **NPM**. The application allows an admin to log in, view a dashboard, manage a list of users, and reset the password through email. 

## Project Overview

The project provides an admin interface where the admin can:

- Log in using predefined credentials.
- View a dashboard displaying essential information.
- Manage a list of users.
- Reset the admin password via an email link.
- Test login functionality with sample user data.

## Features

### 1. **Admin Login**

Admins can log in using the following credentials:

- **Email**: `jabbar123@gmail.com`
- **Password**: `jabbar123`

OR

- **Email**: `Antony@gmail.com`
- **Password**: `123456`

### 2. **Dashboard**

After a successful login, the admin is directed to the **dashboard**, which provides an overview and a way to manage users.

### 3. **User List**

- A list of users is shown in the admin dashboard, displaying their information (name, email, role, etc.).
- The list is populated with **dummy data** for testing purposes.
- Admins can add, edit, or delete users through the dashboard.

### 4. **Password Reset**

If the admin forgets their password, they can request a **password reset**. An email containing a link to reset the password is sent to the admin's registered email address.

## Installation

Follow the steps below to set up and run the project locally:

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (installed via NPM)
- [MongoDB](https://www.mongodb.com/try/download/community) (either running locally or through MongoDB Atlas)

### Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url> 

2. **Navigate to the project folder:**
    ```bash
    cd <project-directory>

3. **Install dependencies:**
    ```bash
    npm install

4. **Set up environment variables:**
    ```bash
    MONGO_URI=<your-mongo-db-connection-string>
    JWT_SECRET=<your-jwt-secret-key>

5. **Start the development server:**
    ```bash
    npm run dev



