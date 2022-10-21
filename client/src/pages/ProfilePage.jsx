import { Fragment } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Song from '../components/Song';

const ProfilePage = () => (
    <Flex>
        <Box flex={2}></Box>
        <Flex flex={5}>
            <Box flex={3}>
                <Song />
            </Box>
            <Box flex={2}></Box>
        </Flex>
    </Flex>
);

export default ProfilePage;
