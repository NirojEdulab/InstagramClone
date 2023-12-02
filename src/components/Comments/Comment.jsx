import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react"
import useGetUserProfileByUserId from "../../hooks/useGetUserProfileByUserId.js"
import { Link } from "react-router-dom";
import {formatDistanceToNow} from "date-fns"

const Comment = ({ comment }) => {

    const { isLoading, userProfile } = useGetUserProfileByUserId(comment.createdBy);
    if(isLoading) return <CommentSkeleon />

  return (
    <Flex gap={4}>
        <Link to={`/${userProfile.username}`}>
            <Avatar src={userProfile.profilePicURL} size={"sm"} />
        </Link>
        <Flex direction={"column"}>
            <Flex gap={2} alignItems={"center"}>
                <Link to={`/${userProfile.username}`}>
                    <Text fontWeight={"bold"} fontSize={12}>
                        {userProfile.username}
                    </Text>
                </Link>
                <Text fontSize={14}>{comment.comment}</Text>
            </Flex>
            <Text color={"gray"} fontSize={12}>
                {formatDistanceToNow(comment.createdAt, {addSuffix: true})}
            </Text>
        </Flex>
    </Flex>
  )
}

export default Comment

const CommentSkeleon = () => {
    return (
        <Flex gap={4} w={"full"} alignItems={"center"}>
            <SkeletonCircle h={10} w={10} />
            <Flex gap={1} flexDir={"column"}>
                <Skeleton height={2} w={100} />
                <Skeleton height={2} w={50} />
            </Flex>
        </Flex>
    )
};