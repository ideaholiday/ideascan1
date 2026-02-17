import { initializeApp } from 'firebase/app';
// Ideally, you would import analytics or firestore if needed
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBarTdlC7umy_eT6H3TGX2YUmiQrc0-T-g",
  authDomain: "ideascan-329bd.firebaseapp.com",
  projectId: "ideascan-329bd",
  storageBucket: "ideascan-329bd.firebasestorage.app",
  messagingSenderId: "138616597381",
  appId: "1:138616597381:web:7d7fe6f24e84d407c972ec",
  measurementId: "G-1070KF0C8S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exporting app for future use (e.g., Auth, Firestore)
export default app;
