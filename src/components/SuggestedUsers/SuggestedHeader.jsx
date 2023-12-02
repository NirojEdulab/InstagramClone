import { Avatar, Button, Flex, Text } from "@chakra-ui/react"
import useLogout from "../../hooks/useLogout.js"
import useAuthStore from "../../store/authStore.js";
import { Link } from "react-router-dom";

const SuggestedHeader = () => {
  const { handleLogout, isLoggingOut } = useLogout();
  const authUser = useAuthStore(state => state.user);

  if(!authUser) return null;
  
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Flex alignItems={"center"} gap={2}>
            <Link to={`${authUser.username}`}>
              <Avatar src={authUser.profilePicURL} size={"lg"} />
            </Link>
            <Link to={`${authUser.username}`}>
              <Text fontSize={12} fontWeight={"bold"}>
                  {authUser.username}
              </Text>
            </Link>
        </Flex>
        <Button fontSize={14} color={"blue.500"} style={{textDecoration: "none"}} cursor={"pointer"} bg={"transparent"} size={"xs"} _hover={{bg: "transparent"}} isLoading={isLoggingOut} onClick={handleLogout} >
            Logout
        </Button>
    </Flex>
  )
}

export default SuggestedHeader