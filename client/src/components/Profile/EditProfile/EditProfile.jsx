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
    Text,
    Box,
} from '@chakra-ui/react';
import { useEffect } from 'react';
// import { EditProfileContext } from '../../stores';

const EditProfile = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isEditProfile, setIsEditProfile } = props;
    useEffect(() => {
        isEditProfile ? onOpen() : onClose();
    }, [isEditProfile]);

    useEffect(() => {
        !isOpen && setIsEditProfile(false);
    }, [isOpen]);

    console.log('render edit profile');

    return (
        <Box boxSize={'100%'} bg="blue">
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{/* <Lorem count={2} /> */}fdsoolfjsdlfjsldfk;ldskf</ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default EditProfile;
