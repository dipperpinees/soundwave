import {
    Modal,
    ModalOverlay,
    useDisclosure,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    Button,
    Box,
    Center,
    Avatar,
    Icon,
    Input,
    Spinner,
    Textarea,
    useToast,
    Flex,
} from '@chakra-ui/react';
import { MdPhotoCamera } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import fetchAPI from '../../../utils/fetchAPI';
// import { EditProfileContext } from '../../stores';

const EditProfile = ({ data, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const { isEditProfile, setIsEditProfile } = props;
    const [imageURL, setImageURL] = useState(data?.avatar);
    const [inputAvatar, setInputAvatar] = useState();
    const [inputUserName, setInputUserName] = useState(data?.name);
    const [inputDescription, setInputDescription] = useState(data?.description);
    const [showSpinner, setShowSpinner] = useState(false);

    const inputImage = useRef();

    useEffect(() => {
        isEditProfile ? onOpen() : onClose();
    }, [isEditProfile]);

    useEffect(() => {
        if (!isOpen) {
            setIsEditProfile(false);
        }
    }, [isOpen]);

    const loadImage = (e) => {
        setInputAvatar(e.target.files[0]);
        e && setImageURL(URL.createObjectURL(e.target.files[0]));
    };

    const handleSaveProfile = () => {
        const updateProfile = async () => {
            setShowSpinner(true);
            const formData = new FormData();
            formData.append('avatar', inputAvatar);
            formData.append('name', inputUserName);
            formData.append('description', inputDescription);
            try {
                const response = await fetchAPI('/user/', {
                    method: 'PUT',
                    body: formData,
                });

                toast({
                    position: 'top',
                    margin: '20px',
                    title: 'Update profile successfully.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                // update props
                response.avatar && (data.avatar = response.avatar);
                data.name = response.name;
                data.description = response.description;
                setShowSpinner(false);
                onClose();
            } catch (error) {
                toast({
                    position: 'top',
                    title: error.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        };
        updateProfile();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

            <ModalContent pos={'relative'} bgColor={'#2d3748'} color={'white'} m={['80px 12px 0', '80px 24px 0']}>
                <ModalHeader>Edit Profile</ModalHeader>
                <ModalCloseButton />
                {showSpinner && (
                    <Flex pos={'absolute'} boxSize={'100%'} justify="center" align={'center'}>
                        <Spinner thickness="4px" size={'xl'} speed={'0.6s'} />
                    </Flex>
                )}
                <ModalBody>
                    <Center mb={['12px', '24px']}>
                        <Avatar
                            src={imageURL}
                            pos={'relative'}
                            size={'xl'}
                            name={data?.name}
                            onClick={() => inputImage.current.click()}
                            cursor={'pointer'}
                        >
                            <Center borderRadius={'full'} right={0} bottom={0} pos={'absolute'} bg={'#3e494e'}>
                                <Icon
                                    color={'white'}
                                    m={'3px'}
                                    as={MdPhotoCamera}
                                    fontSize={'20px'}
                                    fontWeight={'bold'}
                                />
                            </Center>
                        </Avatar>
                    </Center>
                    <Input
                        display={'none'}
                        ref={inputImage}
                        type={'file'}
                        name={'profileImage'}
                        onChange={(e) => loadImage(e)}
                    />
                    <Box m={'0 0 8px'}>Name</Box>
                    <Input
                        type={'text'}
                        value={inputUserName}
                        onChange={(e) => {
                            setInputUserName(e.target.value);
                        }}
                    />
                    <Box m={'16px 0 8px'}>Description</Box>
                    <Textarea
                        value={inputDescription}
                        onChange={(e) => {
                            setInputDescription(e.target.value);
                        }}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button w={['100%', 'initial']} colorScheme={'blue'} mr={6} onClick={handleSaveProfile}>
                        Save
                    </Button>
                    <Button w={['100%', 'initial']} onClick={onClose} colorScheme="red">
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditProfile;
