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
    Lorem,
} from '@chakra-ui/react';
import { useEffect } from 'react';

const EditProfile = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => onOpen());

    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontWeight="bold" mb="1rem">
                        You can scroll the content behind the modal
                    </Text>
                    <Lorem count={2} />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditProfile;
