import { Box, Avatar, Heading, Flex, Text, Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '../../stores';
import Describe from './Describe';

const Profile = ({id, name, avatar, followerNumber}) => {
    const user = useContext(UserContext)[0];
    return (
        <Box m={'0 24px'} maxW={['100%', '100%', '150px', '180px']}>
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
                <Avatar
                    mb="16px"
                    size="xl"
                    name={name}
                    src={avatar}
                />
                <Heading class="user-name" fontSize="xl" mb="16px">
                    {name}
                </Heading>
                <Text mb="16px">{followerNumber} Followers</Text>
                <Flex flexDirection="column">
                    {user.id !== id && <Button bg="#fff" textColor="#000" borderRadius="20px" margin="8px 0">
                        Following
                    </Button>}
                    {/* <Button
                        colorScheme="whiteAlpha"
                        variant="outline"
                        textColor="#fff"
                        borderRadius="20px"
                        margin="8px 0"
                        padding="4px 48px"
                    >
                        Message
                    </Button> */}
                </Flex>
            </Flex>
            {/* <Box>
                <Describe />
            </Box> */}
        </Box>
    );
};

export default Profile;
