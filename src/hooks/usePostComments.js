import { useState } from "react"
import useShowToast from "./useShowToast.js";
import useAuthStore from "../store/authStore.js";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase.js";
import usePostStore from "../store/postStore.js";

const usePostComments = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();
  const authUuser = useAuthStore((state) => state.user);
  const addComment = usePostStore((state) => state.addComment);

  const handleAddComment = async (postId, comment) => {
    if(isCommenting) return;
    if(!authUuser) return showToast("Error", "You must be logged in to add a comment", "error");

    setIsCommenting(true);

    const newComment = {
        comment,
        createdBy: authUuser.uid,
        createdAt: Date.now(),
        postId
    }

    try {
        
        await updateDoc(doc(firestore, "posts", postId),{
            comments: arrayUnion(newComment)
        });

        addComment(postId, newComment);

    } catch (error) {
        showToast("Error", error.message, "error");
    } finally {
        setIsCommenting(false);
    }
  }

  return { isCommenting, handleAddComment };

}

export default usePostComments