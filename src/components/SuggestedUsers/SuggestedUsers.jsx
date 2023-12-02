import { Flex, Text, VStack } from "@chakra-ui/react"
import SuggestedHeader from "./SuggestedHeader.jsx"
import SuggestedUser from "./SuggestedUser.jsx"
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers.js"

const SuggestedUsers = () => {

  const { isLoading, suggestedUsers } = useGetSuggestedUsers();

  if (isLoading) return null;

  return (
    <>
      <VStack py={8} px={6} gap={4}>
        <SuggestedHeader />
        
        { suggestedUsers.length !== 0 && (
          <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
              Suggested for you
            </Text>
            <Text fontSize={12} fontWeight={"bold"} color={"white"} cursor={"pointer"}>
              See all
            </Text>

          </Flex>
        )}
        
        { suggestedUsers.map((user) => (
          <SuggestedUser user={user} key={user.id} />
        ))}

      </VStack>

    </>
  )
}

export default SuggestedUsers