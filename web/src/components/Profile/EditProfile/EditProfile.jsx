import {
    Avatar, Box, Button, Center, Flex, Icon,
    Input, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner,
    Textarea, useDisclosure, useToast
} from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { MdPhotoCamera } from 'react-icons/md';
import { useQueryClient } from 'react-query';
import { UserContext } from '../../../stores';
import fetchAPI from '../../../utils/fetchAPI';
// import { EditProfileContext } from '../../stores';

const EditProfile = ({ data, isEditProfile, setIsEditProfile }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const userDispatch = useContext(UserContext)[1];

    const [imageURL, setImageURL] = useState('');
    const [inputAvatar, setInputAvatar] = useState();
    const [inputUserName, setInputUserName] = useState('');
    const [inputDescription, setInputDescription] = useState('');
    const [showSpinner, setShowSpinner] = useState(false);
    const queryClient = useQueryClient();
    const inputImage = useRef();

    useEffect(() => {
        isEditProfile ? onOpen() : onClose();
        setImageURL(data?.avatar);
        setInputUserName(data?.name);
        setInputDescription(data?.description);
    }, [isEditProfile, data, onOpen, onClose]);

    useEffect(() => {
        if (!isOpen) {
            setIsEditProfile(false);
        }
    }, [isOpen, setIsEditProfile]);

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
                    duration: 2000,
                    isClosable: true,
                });
                // update props
                response.avatar &&
                    (data.avatar = response.avatar) &&
                    userDispatch({ type: 'Update', payload: { avatar: data.avatar } });
                data.name = response.name;
                data.description = response.description;
                setShowSpinner(false);
                onClose();
                queryClient.removeQueries(['profile', Number(data.id)]);
            } catch (error) {
                toast({
                    position: 'top',
                    title: error.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            }
        };
        updateProfile();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

            <ModalContent pos={'relative'} bgColor={'#2d3748'} color={'white'} m={['80px 24px 0', '80px 24px 0']}>
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
                        accept="image/*"
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
