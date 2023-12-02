import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Avatar,
    Center,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
    ModalContent,
    ModalOverlay,
    Modal,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import useAuthStore from '../../store/authStore.js'
import usePreviewProfileImage from '../../hooks/usePreviewProfileImage.js';
import useEditProfile from '../../hooks/useEditProfile.js';
import useShowToast from '../../hooks/useShowToast.js';

const EditProfile = ({ isOpen, onClose }) => {
    const fileRef = useRef(null);
    const authUser = useAuthStore((state) => state.user);
    const [updateInputs, setUpdateInputs] = useState({
        fullName: "",
        username: "",
        bio: "",
    })
    const showToast = useShowToast();
    const { selectedFile, setSelectedFile, handleImageChange } = usePreviewProfileImage();
    const { isUpdating, editProfile } = useEditProfile();

    const handleEditProfile = async () => {
        try {
            await editProfile(updateInputs, selectedFile);
            setSelectedFile(null);
            onClose();
        } catch (error) {
            showToast("Error", error.message ,"error")
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={"black"} boxShadow={"xl"} border={"1px solid gray"} mx={3}>
                <ModalHeader />
                <ModalCloseButton />
                <ModalBody>
                    <Flex bg={"black"} >
                        <Stack
                            spacing={4}
                            w={'full'}
                            maxW={'md'}
                            bg={"black"}
                            p={6}
                            my={0}>
                            <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                                Edit Profile
                            </Heading>
                            <FormControl>
                                <Stack direction={['column', 'row']} spacing={6}>
                                    <Center>
                                        <Avatar cursor={"pointer"} size="xl" src={ selectedFile || authUser.profilePicURL } border={"2px solid white"} onClick={() => fileRef.current.click()} />
                                    </Center>
                                    <Center w="full">
                                        <Button w="full" onClick={() => fileRef.current.click()}>Edit Profile Picture</Button>
                                    </Center>
                                    <Input type='file' ref={fileRef} hidden onChange={handleImageChange} />
                                </Stack>
                            </FormControl>

                            <FormControl>
                                <FormLabel fontSize={"sm"}>Full name</FormLabel>
                                <Input
                                    placeholder="Fullname"
                                    _placeholder={{ color: 'gray.500' }}
                                    size={"sm"}
                                    type="text"
                                    onChange={(e) => setUpdateInputs({ ...updateInputs, fullName: e.target.value})}
                                    value={updateInputs.fullName || authUser.fullName}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontSize={"sm"}>User name</FormLabel>
                                <Input
                                    placeholder="Username"
                                    _placeholder={{ color: 'gray.500' }}
                                    size={"sm"}
                                    type="text"
                                    onChange={(e) => setUpdateInputs({ ...updateInputs, username: e.target.value})}
                                    value={updateInputs.username || authUser.username}
                                />
                            </FormControl>
                            {/* <FormControl>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    placeholder="your-email@example.com"
                                    _placeholder={{ color: 'gray.500' }}
                                    type="email"
                                    size={"sm"}
                                />
                            </FormControl> */}
                            <FormControl>
                                <FormLabel fontSize={"sm"}>Bio</FormLabel>
                                <Input
                                    placeholder="Bio"
                                    _placeholder={{ color: 'gray.500' }}
                                    size={"sm"}
                                    type="text"
                                    onChange={(e) => setUpdateInputs({ ...updateInputs, bio: e.target.value})}
                                    value={updateInputs.bio || authUser.bio}
                                />
                            </FormControl>
                            {/* <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    placeholder="password"
                                    _placeholder={{ color: 'gray.500' }}
                                    type="password"
                                    size={"sm"}
                                />
                            </FormControl> */}
                            <Stack spacing={6} direction={['column', 'row']}>
                                <Button
                                    bg={'red.400'}
                                    color={'white'}
                                    w="full"
                                    _hover={{
                                        bg: 'red.500',
                                    }}
                                    onClick={onClose}
                                    >
                                    Cancel
                                </Button>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    w="full"
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    onClick={handleEditProfile}
                                    isLoading={isUpdating}
                                    >
                                    Submit
                                </Button>
                            </Stack>
                        </Stack>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>

    )
}

export default EditProfile