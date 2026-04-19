import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyChcuAxQjaMIxO4Eb6g7oPXixWAS26p3Y0",
  authDomain: "aqua-water-ac9a8.firebaseapp.com",
  projectId: "aqua-water-ac9a8",
  storageBucket: "aqua-water-ac9a8.firebasestorage.app",
  messagingSenderId: "766237509240",
  appId: "1:766237509240:web:b28c119750cb0bf7f9cf8d",
  measurementId: "G-0520753J9X",
};

export const firebaseApp = initializeApp(firebaseConfig);

export let analytics: Analytics | null = null;

if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(firebaseApp);
      }
    })
    .catch(() => {
      // Analytics not supported in this environment
    });
}
