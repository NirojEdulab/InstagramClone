import { useState } from "react"
import useShowToast from "./useShowToast.js";
import useAuthStore from "../store/authStore.js";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase.js";

const useLikePost = ( post ) => {
  const [isLiking, setIsLiking] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid));
 
  const handleLikePost = async () => {
  
    if(isLiking) return;
    if(!authUser) return showToast("Error", "You must be logged in to like", "error");

    setIsLiking(true);
    
    try {
        
        const postRef = doc(firestore, "posts", post.id);
        await updateDoc(postRef, {
            likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
        })

        setIsLiked(!isLiked);
        isLiked ? setLikes(likes - 1) : setLikes(likes + 1);

    } catch (error) {
        showToast("Error", error.message, "error")
    } finally {
        setIsLiking(false);
    }
  }

  return { isLiking, isLiked, handleLikePost, likes }

}

export default useLikePost