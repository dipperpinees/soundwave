import { Box, Avatar, Heading, Flex, Text, Button } from '@chakra-ui/react';
import Describe from './Describe';
import { useEffect, useState } from 'react';
import fetchAPI from '../../utils/fetchAPI';

const Profile = (props) => {
    const { name, avatar } = props;

    return (
        <Box m={'0 24px'} maxW={['100%', '100%', '150px', '180px']}>
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
                <Avatar mb="16px" size="xl" name="user avatar" src={avatar} />
                <Heading class="user-name" fontSize="xl" mb="16px">
                    {name}
                </Heading>
                <Text mb="16px">900 Followers</Text>
                <Flex flexDirection="column">
                    <Button textColor="#000" borderRadius="20px" margin="8px 0">
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
                <Describe {...props} />
            </Box>
        </Box>
    );
};

export default Profile;
