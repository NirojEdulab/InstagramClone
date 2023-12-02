import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast.js"
import { auth, firestore } from "../firebase/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore.js";

const useLogin = () => {
  
    const showToast = useShowToast();
    const [ signInWithEmailAndPassword, , loading, error ] = useSignInWithEmailAndPassword(auth);
    const loginUser = useAuthStore((state) => state.login);
    
    const handleLogin = async (inputs) => {
        console.log("login clicked",inputs);
        if(!inputs.email || !inputs.password){
            showToast("Error", "Please fill your credentials", "error");
            return;
        }
        try {
            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

            if(userCred){
                const docRef = doc(firestore, "users", userCred.user.uid);
                const docSnap = await getDoc(docRef);
                localStorage.setItem("userData", JSON.stringify(docSnap.data()));
                loginUser(docSnap.data());
            }

        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }

    return { loading, error, handleLogin };
};

export default useLogin