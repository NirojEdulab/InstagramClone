import { Avatar, AvatarGroup, Button, Flex, Text, VStack, useDisclosure } from "@chakra-ui/react"
import useUserProfileStore from "../../store/userProfileStore.js"
import useAuthStore from "../../store/authStore.js"
import EditProfile from "./EditProfile.jsx";
import useFollowUnfollowUser from "../../hooks/useFollowUnfollowUser.js";

const ProfileHeader = () => {
    const { userProfile } = useUserProfileStore();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const authUser = useAuthStore(state => state.user);
    const { isUpdating, isFollowing, handleFollowUnfollowUser } = useFollowUnfollowUser(userProfile?.uid);
    const visitingOwnProfile = authUser && authUser.username === userProfile.username;
    const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;

    return (
        <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }} >
            <AvatarGroup size={{ base: "xl", md: "2xl" }} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"} >
                <Avatar src={userProfile.profilePicURL} alt="profilepic logo" />
            </AvatarGroup>

            <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1} >
                <Flex gap={4} direction={{ base: "column", sm: "row" }} justifyContent={{ base: "center", sm: "flex-start" }} alignItems={"center"} w={"full"}>
                    <Text fontSize={{ base: "sm", md: "lg" }}>{userProfile.fullName}</Text>
                    {visitingOwnProfile && (
                        <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                            <Button bg={"white"} color={"black"} _hover={{ bg: "whiteAlpha.800" }} size={{ base: "xs", md: "sm" }} onClick={onOpen}>Edit Profile</Button>
                        </Flex>
                    )}

                    {visitingAnotherProfileAndAuth && (
                        <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                            <Button bg={"blue.400"} color={"white"} _hover={{ bg: "blue.500" }} size={{ base: "xs", md: "sm" }} 
                                onClick={handleFollowUnfollowUser} isLoading={isUpdating}
                            >
                                {isFollowing ? "Unfollow" : "Follow" }
                            </Button>
                        </Flex>
                    )}

                </Flex>
                <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
                    <Text fontSize={{ base: "xs", md: "sm" }} >
                        <Text as={"span"} fontWeight={"bold"}>{userProfile.posts.length > 1 ? `${userProfile.posts.length} Posts` : `${userProfile.posts.length} Post`}  </Text>
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }} >
                        <Text as={"span"} fontWeight={"bold"}>{userProfile.followers.length} </Text>
                         Followers
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }} >
                        <Text as={"span"} fontWeight={"bold"}>{userProfile.followings.length} </Text>
                         Followings
                    </Text>
                </Flex>

                <Flex alignItems={"center"} gap={4}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>{userProfile.username}</Text>
                </Flex>

                <Flex alignItems={"center"} gap={4}>
                    <Text fontSize={"sm"}>{userProfile.bio}</Text>
                </Flex>
            </VStack>

            { isOpen && < EditProfile isOpen={isOpen} onClose={onClose} /> }

        </Flex>
    )
}

export default ProfileHeader