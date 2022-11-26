import { Avatar, Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useState, useContext } from 'react';
import { EditProfileContext } from '../../stores';
import Describe from './Describe';

const Profile = (props) => {
    const { id, name, avatar, followerNumber } = props;
    const { setIsEditProfile } = props;
    const { userId } = props;
    return (
        <Box m={'0 24px'} maxW={['100%', '100%', '150px', '180px']}>
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
                <Avatar mb="16px" size="xl" name={name} src={avatar} />
                <Heading class="user-name" fontSize="xl" mb="16px">
                    {name}
                </Heading>
                <Text mb="16px">{followerNumber} Followers</Text>
                <Flex flexDirection="column">
                    {userId !== id ? (
                        <Button textColor="#000" borderRadius="20px" margin="8px 0">
                            Following
                        </Button>
                    ) : (
                        <Button
                            textColor="#000"
                            borderRadius="20px"
                            margin="8px 0"
                            onClick={() => setIsEditProfile(true)}
                        >
                            Edit Profile
                        </Button>
                    )}
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
            <Box>
                <Describe {...props} />
            </Box>
        </Box>
    );
};

export default Profile;
