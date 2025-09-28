# MarsRecruit - Mission to Mars Recruitment Platform

Welcome to MarsRecruit, a web application for aspiring astronauts to apply for the mission of a lifetime. This project is built entirely on the Manifest platform, showcasing a full-stack React application with a powerful, auto-generated backend.

## Features

- **User Authentication**: Secure sign-up and login for applicants.
- **Application Submission**: A dedicated dashboard for applicants to fill out and submit their mission application.
- **Application Status Tracking**: Applicants can view the current status of their application (Submitted, Under Review, Accepted, Rejected).
- **Admin Panel**: A built-in admin interface (at `/admin`) for mission control to review and manage all applications.
- **Role-Based Access**: Applicants can only view their own application, while admins have full access to all data.

## Tech Stack

- **Backend**: Manifest (YAML-based schema, auto-generated API and database)
- **Frontend**: React (Vite)
- **Backend SDK**: `@mnfst/sdk` for all backend communication.
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18+)
- A Manifest account and project.

### Setup Guide

1.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd <repo-name>
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root of the project and add your Manifest project's Backend URL and App ID:
    ```
    VITE_BACKEND_URL=https://<your-backend-url>.up.manifest.build
    VITE_APP_ID=<your-app-id>
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Admin Access

- **URL**: Navigate to your backend URL and append `/admin`.
- **Default Credentials**:
  - **Email**: `admin@manifest.build`
  - **Password**: `admin`

From the admin panel, you can manage users, view all applications, and change application statuses.