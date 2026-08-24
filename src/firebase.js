// // salsabilfoubdtion@gmail.com
// shadekur.rahman60@gmail.com pass: 111111
// salsabilfoubdtion@gmail.com pass: 111111
// databaseURL: "https://as-salsabil-foundation-default-rtdb.firebaseio.com",
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  //https://console.firebase.google.com/u/4/project/store-managment-system-d0019/overview
  apiKey: "AIzaSyCwKzDLzmmeAkfh2N4BgX6m11eDIGYKe0I",
  authDomain: "store-managment-system-d0019.firebaseapp.com",
  projectId: "store-managment-system-d0019",
  storageBucket: "store-managment-system-d0019.firebasestorage.app",
  messagingSenderId: "304010652482",
  appId: "1:304010652482:web:c78cc27fa1de88f164b6db",
  // measurementId: "G-9M0S35D9MV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
