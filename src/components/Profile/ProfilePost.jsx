import { Avatar, Button, Divider, Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack, useDisclosure } from "@chakra-ui/react"
import { AiFillHeart } from "react-icons/ai"
import { FaComment } from "react-icons/fa6"
import { MdDelete } from "react-icons/md"
import Comment from "../Comments/Comment.jsx"
import PostFooter from "../FeedPosts/PostFooter.jsx"
import useUserProfileStore from "../../store/userProfileStore.js"
import useAuthStore from "../../store/authStore.js"
import useShowToast from "../../hooks/useShowToast.js"
import { useState } from "react"
import { deleteObject, ref } from "firebase/storage"
import { firestore, storage } from "../../firebase/firebase.js"
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore"
import usePostStore from "../../store/postStore.js"
import Caption from "../Comments/Caption.jsx"

const ProfilePost = ({ post }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const userProfile = useUserProfileStore((state) => state.userProfile);
    const authUser = useAuthStore((state) => state.user);
    const [isLoading, setIsLoading] = useState(false);
    const showToast = useShowToast();
    const deletePost = usePostStore((state) => state.deletePost);
    const decrementPostCountFromProfile = useUserProfileStore((state) => state.deletePost);

    const handleDeletePost = async () => {
        if(!window.confirm("Are you sure you want to delete this post")) return;
        if(isLoading) return;
        setIsLoading(true);
        try {
            
            const imageRef = ref(storage, `posts/${post.id}`);
            await deleteObject(imageRef);

            const userRef = doc(firestore, "users", authUser.uid);
            await deleteDoc(doc(firestore, "posts", post.id))

            await updateDoc(userRef, {
                posts: arrayRemove(post.id)
            })

            deletePost(post.id);
            decrementPostCountFromProfile(post.id);
            showToast("Success", "Post deleted successfully", "success");

        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <>
    <GridItem cursor={"pointer"} borderRadius={4} overflow={"hidden"} border={"1px solid"} borderColor={"whiteAlpha.300"} position={"relative"} aspectRatio={1/1} onClick={onOpen}>
        <Flex opacity={0} _hover={{opacity: 1}} position={"absolute"} top={0} left={0} right={0} bottom={0} bg={"blackAlpha.700"} transition={"all 0.3s ease"} zIndex={1} justifyContent={"center"}>
            <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
                <Flex>
                    <AiFillHeart size={20} />
                    <Text fontWeight={"bold"} ml={2}>
                        {post.likes.length}
                    </Text>
                </Flex>

                <Flex>
                    <FaComment size={20} />
                    <Text fontWeight={"bold"} ml={2}>
                        {post.comments.length}
                    </Text>
                </Flex>
            </Flex>
        </Flex>

        <Image src={post.imageRef} alt="profile post pics" w={"100%"} h={"100%"} objectFit={"cover"}/>

    </GridItem>

    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{base: "3xl", md: "5xl"}}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex gap={4} w={{base: "90%", sm: "70%", md: "full" }} mx={"auto"} maxH={"90vh"} minH={"50vh"}>
                <Flex borderRadius={4} overflow={"hidden"} border={"1px solid"} borderColor={"whiteAlpha.300"} flex={1.5} justifyContent={"center"} alignItems={"center"}>
                    <Image src={post.imageRef} alt="post img" />
                </Flex>

                <Flex flex={1} flexDir={"column"} px={10} display={{base: "none", md: "flex"}}>
                    <Flex alignItems={"center"} justifyContent={"space-between"}>
                        <Flex alignItems={"center"} gap={4}>
                            <Avatar src={userProfile.profilePicURL} size={"sm"} />
                            <Text fontSize={12} fontWeight={"bold"}>
                                {userProfile.username}
                            </Text>
                        </Flex>

                        { authUser?.uid === userProfile.uid && (
                            <Button size={"sm"} bg={"transparent"} color={"whiteAlpha.900"} _hover={{bg: "whiteAlpha.300", color: "red.500"}}
                                 borderRadius={4} p={1} onClick={handleDeletePost} isLoading={isLoading}>
                                <MdDelete size={20} cursor={"pointer"}/>
                            </Button>
                        )}
                        
                    </Flex>

                    <Divider my={4} bg={"gray.500"} />

                    <VStack alignItems={"start"} w={"full"} maxH={"650px"} overflow={"auto"}>
                        
                    {/* CAPTION */}
                    {post.captions && (
                        <Caption post={post} />
                    )}

                    {/* COMMENTS */}
                    { post.comments.map((comment, index) => (
                        <Comment key={index} comment={comment} />
                    )) }

                    </VStack>

                    <Divider my={4} bg={"gray.800"} />

                    <PostFooter inProfilePage={true} post={post}/>

                </Flex>

            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
    

    
  )
}

export default ProfilePost