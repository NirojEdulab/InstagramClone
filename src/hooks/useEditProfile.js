import { useState } from "react"
import useAuthStore from "../store/authStore.js";
import useShowToast from "./useShowToast.js";
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'
import { firestore, storage } from '../firebase/firebase.js'
import useUserProfileStore from "../store/userProfileStore.js";

 
const useEditProfile = () => {
    const [ isUpdating, setIsUpdating ] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();
    const setAuthUser = useAuthStore((state) => state.setUser);
    const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

    const editProfile = async (updateInputs, selectedFile) => {
        if(isUpdating || !authUser) return;
        setIsUpdating(true);

        const storageRef = ref(storage, `profilePics/${authUser.uid}`);
        const userDocRef = doc(firestore, "users", authUser.uid);
        let imageURL = "";

        try {
            if(selectedFile){
                await uploadString(storageRef, selectedFile, "data_url");
                imageURL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
            }

            const updatedUser = {
                ...authUser,
                fullName: updateInputs.fullName || authUser.fullName,
                username: updateInputs.username || authUser.username,
                bio: updateInputs.bio || authUser.bio,
                profilePicURL: imageURL || authUser.profilePicURL,
            }

            await updateDoc(userDocRef, updatedUser);
            localStorage.setItem("userData", JSON.stringify(updatedUser));
            setAuthUser(updatedUser);
            setUserProfile(updatedUser);
            showToast("Success", "Profile updated successfully", "success");

        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsUpdating(false);
        }
    }

    return { editProfile, isUpdating };

};

export default useEditProfile