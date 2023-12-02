import { Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, } from "@chakra-ui/react"
import Comment from "../Comments/Comment.jsx"
import usePostComments from "../../hooks/usePostComments.js"
import { useRef } from "react";
import { useEffect } from "react";
import useShowToast from "../../hooks/useShowToast.js";


const CommentsModal = ({ isOpen, onClose, post }) => {

    const { isCommenting, handleAddComment } = usePostComments();
    const commentRef = useRef(null);
    const commentsContainerRef = useRef(null);
    const showToast = useShowToast();
    const handlePostComment = async (e) => {
        e.preventDefault();
        if(!commentRef.current.value) return showToast("Error", "Comment field is required","error");
        await handleAddComment(post.id, commentRef.current.value);
        commentRef.current.value = "";
    }

    useEffect(() => {
        const scrollToTop = () => {
            commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
        }

        if(isOpen){
            setTimeout(() => {
                scrollToTop();
            }, 100);
        }
    },[isOpen, post.comments.length])

    return (
        <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
            <ModalOverlay />
            <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
                <ModalHeader>Comments</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex
                        mb={4}
                        gap={4}
                        flexDir={"column"}
                        maxH={"250px"}
                        overflowY={"auto"}
                        ref={commentsContainerRef}
                    >
                        {post.comments.map((comment, index) => (
                            <Comment key={index} comment={comment} />
                        ))}
                    </Flex>
                    <form onSubmit={handlePostComment} style={{ marginTop: "2rem" }}>
                        <Input placeholder='Comment' size={"sm"} ref={commentRef}/>
                        <Flex w={"full"} justifyContent={"flex-end"}>
                            <Button type='submit' ml={"auto"} size={"sm"} my={4} isLoading={isCommenting}>
                                Post
                            </Button>
                        </Flex>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default CommentsModal