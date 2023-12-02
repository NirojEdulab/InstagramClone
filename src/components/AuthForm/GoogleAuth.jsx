import { Flex, Image, Text } from "@chakra-ui/react"
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase.js";
import useShowToast from "../../hooks/useShowToast.js";
import useAuthStore from "../../store/authStore.js";
import { doc, getDoc, setDoc } from "firebase/firestore";

const GoogleAuth = ({prefix}) => {
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const handleGoogleAuth = async () => {
    try {
      
      const newUser = await signInWithGoogle();

      if(!newUser && error){
        showToast("Error", error.message, "error");
        return;
      }

      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      if(!userSnap.exists()) {
        //Signup
        const userDocument = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          username: newUser.user.email.split("@")[0],
          fullName: newUser.user.displayName,
          bio: "",
          profilePicURL: newUser.user.photoURL,
          followers: [],
          followings: [],
          posts: [],
          createdAt: Date.now()
        }

        await setDoc(doc(firestore, "users", newUser.user.uid), userDocument);
        localStorage.setItem("userData", JSON.stringify(userDocument));
        loginUser(userDocument);
        
      }else{
        const userDoc = userSnap.data();
        localStorage.setItem("userData", JSON.stringify(userDoc));
        loginUser(userDoc);
      }

    } catch (error) {
      showToast("Error", error.message, "error");
    }
  }

  return (
    <>
    {/* LOGIN / SIGNUP WITH GOOGLE */}
    <Flex justifyContent={"center"} alignItems={"center"} gap={2} cursor={"pointer"} onClick={handleGoogleAuth}>
        <Image src="/google.png" w={5} alt="Google Icon" />
        <Text fontSize={12} color="blue.400">{prefix} with Google</Text>
    </Flex>
    </>
  )
}

export default GoogleAuth