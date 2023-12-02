import { Box, Button, Flex, Input, InputGroup, InputRightElement,  Text, useDisclosure } from "@chakra-ui/react"
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/contants.jsx"
import { useRef, useState } from "react"
import usePostComments from "../../hooks/usePostComments.js";
import useShowToast from "../../hooks/useShowToast.js";
import useAuthStore from "../../store/authStore.js";
import useLikePost from "../../hooks/useLikePost.js";
import { formatDistanceToNow } from "date-fns";
import CommentsModal from "../Modals/CommentsModal.jsx";

const PostFooter = ({ post, creatorProfile, inProfilePage }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [comment, setComment] = useState('');
    const { isCommenting, handleAddComment } = usePostComments();
    const authUser = useAuthStore((state) => state.user);
    const commentRef = useRef(null);
    const showToast = useShowToast();
    const { likes, isLiked, handleLikePost } = useLikePost(post);

    const handleSubmitPostComment = async () => {
        if (isCommenting) return;
        if(!comment) return showToast("Error","Comment field is required", "error");
        try {
            await handleAddComment(post.id, comment);
            setComment("");
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }

    return (
        <Box mb={10} mt={"auto"}>
            <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} my={2}>
                <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18} >
                    {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
                </Box>
                <Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()}>
                    <CommentLogo />
                </Box>
            </Flex>

            <Text fontWeight={600} fontSize={"sm"} mb={2}>
                {likes} likes
            </Text>

            {inProfilePage && (
                <>
                    <Text fontSize={12} color={"white"} mb={1}>
                        {post.caption}
                    </Text>
                    <Text fontSize={12} color={"gray"}>
                        Posted {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                    </Text>
                </>
            )}

            {!inProfilePage && (
                <>
                    <Text fontWeight={700} fontSize={"sm"}>
                        {creatorProfile?.username} {" "}
                        <Text as='span' fontWeight={400}>
                            {post.caption}
                        </Text>
                    </Text>
                    {post.comments.length > 0 && (
                        <Text fontSize={"sm"} color={"gray"} mt={1} cursor={"pointer"} onClick={onOpen}>
                            view all {post.comments.length} comments
                        </Text>
                    )}

                    {/* Comments modal only in the homepage */}
                    { isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post} /> : null }

                </>
            )}

            {authUser && (
                <Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"} mt={1}>
                    <InputGroup>
                        <Input variant={"flushed"} placeholder="Add a comment..." fontSize={14}
                            onChange={(e) => setComment(e.target.value)} value={comment} ref={commentRef}
                        />
                        <InputRightElement>
                            <Button fontSize={14} color={"blue.500"} fontWeight={600} cursor={"pointer"}
                                _hover={{ color: "white" }} bg={"transparent"} onClick={handleSubmitPostComment} isLoading={isCommenting}>
                                Post
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Flex>
            )}

            


        </Box>
    )
}

export default PostFooter