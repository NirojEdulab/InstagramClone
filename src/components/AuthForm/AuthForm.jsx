import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import GoogleAuth from "./GoogleAuth.jsx";

const AuthForm = () => {
    const [isLogIn, setIsLogIn] = useState(true);

  return (
    <>
        <Box border={"1px solid gray"} borderRadius={4} padding={5}>
            <VStack spacing={4}>
                
                {/* INPUT FIELS */}
                <Image src="/logo.png" h={24} alt="Instagram Logo" cursor={"pointer"} />

                { isLogIn ? <Login/> : <Signup/> }

                {/* OR TEXT */}
                <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
                    <Box flex={2} h={"1px"} bg={"gray.400"} />
                    <Text mx={1} color={"white"}>OR</Text>
                    <Box flex={2} h={"1px"} bg={"gray.400"} />
                </Flex>

                <GoogleAuth prefix={isLogIn ? "Login" : "Signup" } />

            </VStack>
        </Box>

        {/* Sign Up Button */}
        <Box border={"1px solid gray"} borderRadius={4} padding={5}>
            <Flex alignItems={"center"} justifyContent={"center"}>
                <Box mx={2} fontSize={14}>
                    {isLogIn ? "Don't have and account?" : "Already have and account?"}
                </Box>
                <Box onClick={() => setIsLogIn(!isLogIn)} color={"blue.500"} fontSize={14} cursor={"pointer"}>
                    {isLogIn ? "Sign Up" : "Login"}
                </Box>
            </Flex>
        </Box>
    </>
  )
}

export default AuthForm