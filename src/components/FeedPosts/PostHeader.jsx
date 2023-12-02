import { Avatar, Box, Button, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import useFollowUnfollowUser from "../../hooks/useFollowUnfollowUser.js"
import { formatDistanceToNow } from "date-fns";

const PostHeader = ({ post, creatorProfile }) => {

    const { isUpdating, isFollowing, handleFollowUnfollowUser } = useFollowUnfollowUser(post.createdBy);

    return (
        <Flex justifyContent={"space-between"} gap={5} alignItems={"center"} w={"full"} my={2}>
            <Flex gap={2} alignItems={"center"} >

                {creatorProfile ? (
                    <Link to={`/${creatorProfile?.username}`}>
                        <Avatar src={creatorProfile.profilePicURL} size={"sm"} alt="user profile pic" cursor={"pointer"} />
                    </Link>
                ) : (
                    <SkeletonCircle size={10} />
                )}

                <Flex fontSize={13} fontWeight={"bold"} gap={2}>

                    {creatorProfile ? (
                        <Link to={`/${creatorProfile?.username}`}>
                            <Text cursor={"pointer"} textDecoration={"none"}>{creatorProfile.username}</Text>
                        </Link>
                    ) : (
                        <Skeleton w={"100px"} h={"10px"} />
                    )}

                    <Box color={"gray.500"}>• {formatDistanceToNow(post.createdAt, { addSuffix: true })}</Box>
                </Flex>
            </Flex>
            <Box cursor={"pointer"}>
                <Button size={"xs"} bg={"transparent"} color={"blue.500"} fontWeight={"bold"} _hover={{
                    color: "white" }} transition={"0.2s ease-in-out"} onClick={handleFollowUnfollowUser} isLoading={isUpdating}>
                    { isFollowing ? "Unfollow" : "Follow" }
                </Button>
            </Box>
        </Flex>
    )
}

export default PostHeader