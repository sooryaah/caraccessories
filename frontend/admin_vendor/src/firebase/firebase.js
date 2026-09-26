import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDlJ0o0I8l6NagvTMjyEPR8yxRmsF5PhvI",
  authDomain: "carooa-e981b.firebaseapp.com",
  projectId: "carooa-e981b",
  storageBucket: "carooa-e981b.appspot.com",
  messagingSenderId: "802370708206",
  appId: "1:802370708206:web:dae5d568f8274b724609ff"
};

const app = initializeApp(firebaseConfig);

export const getFirebaseMessaging = async () => {
  try {
    const supported = await isSupported();

    if (!supported) {
      console.log("Firebase Messaging is not supported");
      return null;
    }

    return getMessaging(app);
  } catch (error) {
    console.error("Firebase Messaging error:", error);
    return null;
  }
};

export const generateToken = async () => {
  try {
    const messaging = await getFirebaseMessaging();
    if (!messaging) return;

    const permission = await Notification.requestPermission();
    console.log(permission);
    if (permission === "granted") {
      const currentToken = await getToken(messaging, {
        vapidKey: "BN1sPtue3aOoBs0-DaVE2OZ_vFqn_YRCjBtJea1E82j9e7cOdpH3sOmYWUxMxjAykfBBMyVzX2dBWrwFPn61f2U",
      });
      console.log("current token for client: ", currentToken);
    }
  } catch (error) {
    console.warn("Notification request failed:", error);
  }
};

export const onMessageListener = async (callback) => {
  try {
    const messaging = await getFirebaseMessaging();
    if (!messaging) return;

    onMessage(messaging, (payload) => {
      if (typeof callback === 'function') {
        callback(payload);
      }
    });
  } catch (error) {
    console.warn("Foreground message listener failed:", error);
  }
};
