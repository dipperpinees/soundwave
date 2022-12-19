import { Box, Flex, Skeleton } from '@chakra-ui/react';

const ProfileSongSkeleton = () => {
    return (
        <Box borderBottom="1px solid rgba(255, 255, 255, 0.2)" p="12px 0">
            <Flex h="42px" overflow="hidden">
                <Skeleton pos={'relative'} boxSize="42px" overflow={'hidden'}></Skeleton>
                <Box flex={1} m={'4px 0 4px 8px'}>
                    <Skeleton h={'1rem'} w={'70%'} mb={'8px'} borderRadius={'20px'} />
                    <Skeleton h={'0.7rem'} w={'60%'} borderRadius={'20px'} />
                </Box>
            </Flex>
        </Box>
    );
};

export default ProfileSongSkeleton;
