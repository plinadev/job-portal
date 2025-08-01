# Job Portal 

A full-featured job portal web application built with React and Firebase. It allows users to browse, post, and manage job listings. Includes authentication, form handling, filtering, and state management with Redux Toolkit.

## Tech Stack

- **React 19**
- **Firebase 12** (Firestore, Auth, Hosting)
- **Redux Toolkit**
- **React Router DOM v7**
- **Ant Design (antd)**
- **React Hot Toast** – Notifications
- **Crypto-JS** – Data encryption
- **Moment.js** – Date handling
- **React Icons**

## Functionality

- User authentication via Firebase
- Register as a recruiter or job seeker
- Post, edit, and delete job listings
- Filter jobs by industry and location
- Apply to jobs as a candidate
- Admin interface for managing listings and users (optional)
- Client-side form validation and feedback

## Environment Variables

To run the app, create a `.env` file in the root directory and add:

```env
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- Firebase project with Firestore and Auth enabled

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/plinadev/job-portal.git
   cd job-portal
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Add the `.env` file with your Firebase credentials

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
/job-portal
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable components
│   ├── pages/        # Page components (routes)
│   ├── redux/        # Redux slices and store config
│   ├── firebase/     # Firebase setup
│   ├── styles/       # Global and module CSS
│   └── App.js
├── .env              # Environment configuration
├── package.json
└── README.md
```
