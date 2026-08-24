import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCwKzDLzmmeAkfh2N4BgX6m11eDIGYKe0I",
  authDomain: "store-managment-system-d0019.firebaseapp.com",
  projectId: "store-managment-system-d0019",
  storageBucket: "store-managment-system-d0019.firebasestorage.app",
  messagingSenderId: "304010652482",
  appId: "1:304010652482:web:c78cc27fa1de88f164b6db",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
