import { useEffect, useState } from "react"
import useShowToast from "./useShowToast.js";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase.js";

const useGetUserProfileByUserId = (userId) => {

    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(()=> {
        const getUserProfile = async() => {
            setIsLoading(true);
            setUserProfile(null);
            try {

                const userRef = await getDoc(doc(firestore, "users", userId ))
                if(userRef.exists()){
                    setUserProfile(userRef.data());
                }

            } catch (error) {
                showToast("Error", error.message,"error");
            } finally {
                setIsLoading(false);
            }
        }

        getUserProfile();
    },[setUserProfile, userId, showToast]);

    return { isLoading, userProfile }

}

export default useGetUserProfileByUserId;