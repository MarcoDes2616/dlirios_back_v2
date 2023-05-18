const { initializeApp } = require("firebase/app")
const { getStorage} = require("firebase/storage")
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_CONFIG_APIKEY,
  authDomain: process.env.FIREBASE_CONFIG_AUTHDOMAIN,
  projectId: process.env.FIREBASE_CONFIG_PROJECTID,
  storageBucket: process.env.FIREBASE_CONFIG_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_CONFIG_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_CONFIG_APPID
};


const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

module.exports = storage