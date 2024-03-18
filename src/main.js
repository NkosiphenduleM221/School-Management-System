import { createApp } from 'vue'
import App from './App.vue'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDr5VbDvbEOKn-xwrJVn_S9gqKKDsXAY20",
  authDomain: "school-management-database.firebaseapp.com",
  projectId: "school-management-database",
  storageBucket: "school-management-database.appspot.com",
  messagingSenderId: "576148867817",
  appId: "1:576148867817:web:688cd3e395dec168807e78",
  measurementId: "G-4S3NGMRE8H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* eslint-disable */
const analytics = getAnalytics(app);

createApp(App).mount('#app')
