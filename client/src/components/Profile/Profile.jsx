import { Box, Avatar, Heading, Flex, Text, Button } from '@chakra-ui/react';

const Profile = ({name}) => {
    return (
        <Box>
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
                <Avatar
                    mb="16px"
                    size="xl"
                    name="user avatar"
                    src="https://photo-cms-plo.epicdn.me/w850/Uploaded/2022/nkxrxqeiox/2020_12_04/1_fppt.jpeg"
                />
                <Heading class="user-name" fontSize="xl" mb="16px">
                    {name}
                </Heading>
                <Text mb="16px">900 Followers</Text>
                <Flex flexDirection="column">
                    <Button bg="#fff" textColor="#000" borderRadius="20px" margin="8px 16px">
                        Following
                    </Button>
                    <Button
                        colorScheme="whiteAlpha"
                        variant="outline"
                        textColor="#fff"
                        borderRadius="20px"
                        margin="8px 16px"
                        padding="4px 64px"
                    >
                        Message
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Profile;
