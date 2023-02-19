import { Box, Flex, AspectRatio, Skeleton } from '@chakra-ui/react';

const PageHeaderSkeleton = () => {
    return (
        <Flex>
            <Box flex={['30%', '25%']} maxW={['30%', '25%']} pos={'relative'}>
                <AspectRatio maxW={'100%'} ratio={1} overflow={'hidden'}>
                    <Skeleton boxSize={'100%'} borderRadius={'10px'} />
                </AspectRatio>
            </Box>
            <Box flex={['70%', '75%']} maxW={['70%', '75%']} pl={['12px', '24px', '48px']}>
                <Skeleton width={['45%', '30%']} height={['1.2rem', '1.5rem', '2rem']} borderRadius={'10px'} />
                <Skeleton
                    m={['10px 0', '12px 0', '24px 0']}
                    width={['80%', '60%']}
                    height={['1.5rem', '2rem', '3rem']}
                    borderRadius={'10px'}
                />
                <Skeleton width={['50%']} height={['1.2rem', '1.5rem', '2rem']} borderRadius={'10px'} />
            </Box>
        </Flex>
    );
};

export default PageHeaderSkeleton;
