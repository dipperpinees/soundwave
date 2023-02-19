import { Box, Flex, Skeleton, SkeletonText, SkeletonCircle } from '@chakra-ui/react';

const ProfileSkeleton = () => {
    return (
        <Box w={['100%', '100%', '180px']}>
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
                <SkeletonCircle mt={[0, '24px']} mb={['8px', '16px']} boxSize={['128px', '128px', '96px']} />
                <Skeleton w={'180px'} height={'1.2rem'} mb={'4px'} borderRadius={'20px'} />
                <Skeleton w={'180px'} height={'2rem'} m={['8px 0', '8px 0']} borderRadius={'20px'} />
            </Flex>
            <SkeletonText mt={['24px']} />
        </Box>
    );
};

export default ProfileSkeleton;
