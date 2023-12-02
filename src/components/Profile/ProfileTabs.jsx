import { Flex, Text } from "@chakra-ui/react"
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

const ProfileTabs = () => {
  return (
    <Flex w={"full"} textTransform={"uppercase"} gap={{base: 4, sm: 10}} justifyContent={"center"} fontWeight={"bold"}>
        <Flex borderTop={"1px solid white"} alignItems={"center"} p={3} gap={1} cursor={"pointer"}>
            <BsGrid3X3GapFill />
            <Text fontSize={12} display={{base: "none", sm: "block"}}>
                Posts
            </Text>
        </Flex>
        <Flex alignItems={"center"} p={3} gap={1} cursor={"pointer"}>
            <FaRegBookmark />
            <Text fontSize={12} display={{base: "none", sm: "block"}}>
                Saved
            </Text>
        </Flex>
        <Flex alignItems={"center"} p={3} gap={1} cursor={"pointer"}>
            <FaRegHeart />
            <Text fontSize={12} display={{base: "none", sm: "block"}}>
                Likes
            </Text>
        </Flex>
    </Flex>
  )
}

export default ProfileTabs