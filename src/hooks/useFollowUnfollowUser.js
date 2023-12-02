import { useEffect, useState } from "react"
import useAuthStore from "../store/authStore.js";
import useShowToast from "./useShowToast.js";
import useUserProfileStore from "../store/userProfileStore.js";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase.js";

const useFollowUnfollowUser = (userId) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    const { userProfile, setUserProfile } = useUserProfileStore();

    const showToast = useShowToast();

    const handleFollowUnfollowUser = async () => {
        
        setIsUpdating(true);
        try {
            const currentUserRef = doc(firestore, "users", authUser.uid);
            const userToFollowUnfollowRef = doc(firestore, "users", userId);

            await updateDoc(currentUserRef, {
                followings: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
            });

            await updateDoc(userToFollowUnfollowRef, {
                followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            });

            if (isFollowing) {
                //unfollow
                setAuthUser({
                    ...authUser,
                    followings: authUser.followings.filter((uid) => uid !== userId)
                });

                if(userProfile){
                    setUserProfile({
                        ...userProfile,
                        followers: userProfile.followers.filter((uid) => uid !== authUser.uid)
                    });
                }

                localStorage.setItem("userData", JSON.stringify({
                    ...authUser,
                    followings: authUser.followings.filter((uid) => uid !== userId)
                }));

                setIsFollowing(false);

            } else {
                //follow
                setAuthUser({
                    ...authUser,
                    followings: [...authUser.followings, userId]
                });

                if(userProfile){
                    setUserProfile({
                        ...userProfile,
                        followers: [...userProfile.followers, authUser.uid]
                    });
                }

                localStorage.setItem("userData", JSON.stringify({
                    ...authUser,
                    followings: [...authUser.followings, userId]
                }));

                setIsFollowing(true);
            }

        } catch (error) {
            showToast("Error", error.message, "error");
            console.log(error);
        } finally {
            setIsUpdating(false);
        }
    }

    useEffect(() => {
        if (authUser) {
            const isFollowing = authUser.followings.includes(userId);
            setIsFollowing(isFollowing);
        }
    }, [authUser, userId])

    return { isUpdating, isFollowing, handleFollowUnfollowUser }

}

export default useFollowUnfollowUser