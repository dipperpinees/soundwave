import { Box, Flex, Text, List, Heading } from '@chakra-ui/react';
import ItemDescribe from './ItemDescribe';

const Describe = ({ data }) => {
    return (
        <Box margin="12px 0">
            <Heading fontSize={['1.5rem', '1.5rem', '1.2rem']} mb={['8px', '12px']}>
                Introduction
            </Heading>
            <Flex width={'100%'} flexWrap={'wrap'}>
                <ItemDescribe name={'Followers'} amount={data.followerNumber} />
                <ItemDescribe name={'Following'} amount={data.followingNumber} />
                <ItemDescribe name={'Songs'} amount={data.trackNumber} />
            </Flex>
            {data.description !== '' && (
                <Box mt={'16px'}>
                    <Heading fontSize={['1.5rem', '1.5rem', '1.2rem']} mb={['8px', '12px']}>
                        Description
                    </Heading>
                    <Text fontSize={['initial', '0.875rem', '0.875rem']}>{data.description}</Text>
                </Box>
            )}
        </Box>
    );
};

export default Describe;
