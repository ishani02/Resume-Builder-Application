# Resume Builder

Build a polished resume in minutes with a live preview, multiple templates, and one-click PDF export. Your data is securely saved in Firebase so you can pick up right where you left off.

## Highlights
- Live preview while you edit
- Multiple resume templates with modern styling
- PDF download with correct A4 sizing
- Firebase Auth for login
- Firestore persistence for user and resume data

## Tech Stack
- React (Create React App)
- Redux
- Firebase Authentication
- Firestore
- html2canvas + jsPDF

## Getting Started

### 1) Install dependencies
```
npm install
```

### 2) Configure Firebase
Create a `.env` file in the project root:
```
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_DATABASE_URL=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
```

### 3) Run the app
```
npm start
```
Open `http://localhost:3000`

## Firestore Rules (recommended)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /resumes/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Build
```
npm run build
```

## Deploy (Vercel)
1. Push this repo to GitHub
2. Import it in Vercel
3. Build command: `npm run build`
4. Output directory: `build`
5. Add the same env vars in Vercel settings

## Project Structure
```
src/
  components/       UI pages and resume templates
  firebase/         Firebase config + helpers
  reducers/         Redux reducers
```
