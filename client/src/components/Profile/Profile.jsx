import { Box, Avatar, Heading, Flex, Text, Button } from '@chakra-ui/react';
import Describe from './Describe';

const Profile = () => {
    return (
        <Box m={'0 24px'} maxW={['100%', '100%', '150px', '180px']}>
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
                <Avatar
                    mb="16px"
                    size="xl"
                    name="user avatar"
                    src="https://photo-cms-plo.epicdn.me/w850/Uploaded/2022/nkxrxqeiox/2020_12_04/1_fppt.jpeg"
                />
                <Heading class="user-name" fontSize="xl" mb="16px">
                    User Name
                </Heading>
                <Text mb="16px">900 Followers</Text>
                <Flex flexDirection="column">
                    <Button bg="#fff" textColor="#000" borderRadius="20px" margin="8px 0">
                        Following
                    </Button>
                    <Button
                        colorScheme="whiteAlpha"
                        variant="outline"
                        textColor="#fff"
                        borderRadius="20px"
                        margin="8px 0"
                        padding="4px 48px"
                    >
                        Message
                    </Button>
                </Flex>
            </Flex>
            <Box>
                <Describe />
            </Box>
        </Box>
    );
};

export default Profile;
