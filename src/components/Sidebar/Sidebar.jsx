import { Box, Button, Flex, Link, Tooltip } from "@chakra-ui/react"
import { Link as RouterLink } from 'react-router-dom'
import { InstagramLogo, InstagramMobileLogo } from "../../assets/contants.jsx"
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout.js";
import SidebarItems from "./SidebarItems.jsx";

const Sidebar = () => {
 
  const { handleLogout, isLoggingOut } = useLogout();

  return (
    <Box
      height={"100vh"}
      borderRight={"1px solid"}
      borderColor={"whiteAlpha.300"}
      py={8}
      position={"sticky"}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >

      <Flex flexDirection={"column"} gap={10} w={"full"} height={"full"}>
        <Link to={"/"} as={RouterLink} pl={2} display={{base: "none", md: "block"}} cursor={"pointer"}>
          <InstagramLogo />
        </Link>
        <Link to={"/"} as={RouterLink} display={{base: "block", md: "none"}}
          w={10}
          p={2}
          borderRadius={6}
          _hover={{
            bg: "whiteAlpha.200"
          }}
        cursor={"pointer"}>
          <InstagramMobileLogo />
        </Link>
        <Flex flexDirection={"column"} gap={5} cursor={"pointer"}>
          <SidebarItems />
        </Flex>

        <Tooltip hasArrow label={"Logout"} placement="right" ml={1} openDelay={500} display={{base: 'block', md: "none"}}>
              <Flex
                onClick={handleLogout}
                alignItems={"center"}
                gap={4}
                mt={"auto"}
                _hover={{bg: "whiteAlpha.400"}}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
              >
                <BiLogOut size={25} />
                <Button display={{base: "none", md: "block"}} variant={"ghost"} isLoading={isLoggingOut} _hover={{bg: "transparent"}}>
                  Logout
                </Button>
              </Flex>
            </Tooltip>
      </Flex>
    </Box>
  )
}

export default Sidebar