import { Box, Flex, AspectRatio, Skeleton } from '@chakra-ui/react';
export { default as ProfileSongSkeleton } from './ProfileSongSkeleton';

const ProfileSongSkeleton = () => {
    return (
        <Flex h="42px" overflow="hidden">
            <Flex flex={1} maxW={['70%', '64%', '64%']}>
                <Box
                    className="image-song"
                    pos={'relative'}
                    boxSize="42px"
                    overflow={'hidden'}
                    borderRadius={2}
                    cursor={'pointer'}
                >
                    <AspectRatio maxW={'100%'} ratio={1}>
                        <Skeleton boxSize={'100%'} />
                    </AspectRatio>
                </Box>
                <Box ml={2} flex="1" maxW={['75%', '75%']}></Box>
            </Flex>
        </Flex>
    );
};

export default ProfileSongSkeleton;
