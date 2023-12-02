import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth, firestore } from "../firebase/firebase.js"
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import useShowToast from './useShowToast.js'
import useAuthStore from '../store/authStore.js';

const useSignupWithEmailAndPassword = () => {
    const [ createUserWithEmailAndPassword, ,loading, error ] = useCreateUserWithEmailAndPassword(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);

    const signup = async (inputs) => {
      if(!inputs.email || !inputs.password || !inputs.username || !inputs.fullName){
        showToast("Error", "Please fill all the details", "error");
        return;
      }

      const usersRef = collection(firestore, 'users');
      const q = query(usersRef, where("username", "==", inputs.username));
      const querySnapshot = await getDocs(q);

      if(!querySnapshot.empty){
        showToast("Error", "Username already exists", "error");
        return;
      }

      try {
        const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
        if(!newUser && error){
          showToast("Error", error.message, "error");
          return;
        }
        if(newUser){
          const userDocument = {
            uid: newUser.user.uid,
            email: inputs.email,
            username: inputs.username,
            fullName: inputs.fullName,
            bio: "",
            profilePicURL: "",
            followers: [],
            followings: [],
            posts: [],
            createdAt: Date.now()
          }

          await setDoc(doc(firestore, "users", newUser.user.uid), userDocument);
          localStorage.setItem("userData", JSON.stringify(userDocument));
          loginUser(userDocument);
          showToast("Success", "Account created successfully", "success");
        }
      } catch (err) {
        showToast("Error", err.message, "error");
      }
    }

  return { loading, error, signup }
}

export default useSignupWithEmailAndPassword