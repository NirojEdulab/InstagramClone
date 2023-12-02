import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.js";
import useShowToast from "./useShowToast.js";
import useAuthStore from "../store/authStore.js";

const useLogout = () => {
    const [signOut, isLoggingOut] = useSignOut(auth);
    const showToast = useShowToast();
    const logout = useAuthStore((state) => state.logout);
    const handleLogout = async () => {
        try {
            await signOut();
            localStorage.removeItem("userData");
            logout();
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }

  return { handleLogout, isLoggingOut };
}

export default useLogout