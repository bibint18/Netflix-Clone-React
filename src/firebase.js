
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut ,GoogleAuthProvider} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDtBv64GG8_niCF-xgOUUGnh48YcdLl858",
  authDomain: "netflix-clone-73f7c.firebaseapp.com",
  projectId: "netflix-clone-73f7c",
  storageBucket: "netflix-clone-73f7c.firebasestorage.app",
  messagingSenderId: "776839029748",
  appId: "1:776839029748:web:a689e9a0fdd90693d18fa1",
  measurementId: "G-JTQLVWBW7K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name,email,password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth,email,password)
    const user= response.user
    await addDoc(collection(db,"user"),{uid:user.uid,
      name,
      EmailAuthProvider:'local',
      email
    })
  } catch (error) {
    console.log(alert);
    toast.error(error.code.split('/')[1].split('-').join(' '))
  }
}


const login =async (email,password) => {
try {
  await signInWithEmailAndPassword(auth,email,password)
} catch (error) {
  console.log(error);
  toast.error(error.code.split('/')[1].split('-').join(' '))
}
}


const logout = () => {
  signOut(auth)
}

export const googleProvider = new GoogleAuthProvider()
export {auth,db,login,signup,logout}