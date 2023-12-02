import { Avatar, Flex, Text } from "@chakra-ui/react"
import { formatDistanceToNow } from "date-fns"
import { Link } from "react-router-dom"
import useUserProfileStore from "../../store/userProfileStore.js"

const Caption = ({ post }) => {
    const userProfile = useUserProfileStore((state) => state.userProfile);

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
                <Text fontSize={14}>{post.caption}</Text>
            </Flex>
            <Text color={"gray"} fontSize={12}>
                {formatDistanceToNow(post.createdAt, {addSuffix: true})}
            </Text>
        </Flex>
    </Flex>
  )
}

export default Caption