import { Box, Image } from "@chakra-ui/react"
import PostFooter from "./PostFooter.jsx"
import PostHeader from "./PostHeader.jsx"
import useGetUserProfileByUserId from '../../hooks/useGetUserProfileByUserId.js'

const FeedPost = ({ post }) => {

  const { userProfile } = useGetUserProfileByUserId(post.createdBy);

  return (
    <>
        <PostHeader post={post} creatorProfile={userProfile} />
        <Box my={4} borderRadius={6} overflow={"hidden"}>
            <Image src={post.imageRef} alt={`feed post image`} />
        </Box>
        <PostFooter post={post} creatorProfile={userProfile} />
    </>
  )
}

export default FeedPost