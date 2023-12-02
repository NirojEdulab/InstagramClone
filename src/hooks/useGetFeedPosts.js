import { useEffect, useState } from "react"
import useAuthStore from "../store/authStore.js"
import usePostStore from "../store/postStore.js"
import useUserProfileStore from "../store/userProfileStore.js"
import useShowToast from "../hooks/useShowToast.js"
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase.js";

const useGetFeedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const authUser = useAuthStore((state) => state.user);
  const {posts, setPosts} = usePostStore();
  const showToast = useShowToast();
  const {setUserProfile} = useUserProfileStore();

  useEffect(() => {
    const getFeedPosts = async () => {
        setIsLoading(true);
        if(authUser.followings.length === 0){
            setIsLoading(false);
            setPosts([]);
            return;
        }

        const q = query(collection(firestore, "posts"), where("createdBy","in",authUser.followings));

        try {
            
          const querySnapshot = await getDocs(q);
          const feedPosts = [];

          querySnapshot.forEach((feed) => {
            feedPosts.push({ id: feed.id, ...feed.data() });
          })

          feedPosts.sort((a, b) => b.createdAt - a.createdAt );

          setPosts(feedPosts);

        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    }

    if(authUser) getFeedPosts();

  },[authUser, setUserProfile, setPosts, showToast])

  return { isLoading, posts }

}

export default useGetFeedPosts