import { Box, Flex, Text, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import ItemDescribe from './ItemDescribe';

const Describe = ({ data }) => {
    const [showFullDescription, setShowFullDescription] = useState(() =>
        data.description.length > 150 ? false : true
    );

    return (
        <Box margin="12px 0">
            <Heading fontSize={['1.5rem', '1.5rem', '1.2rem']} mb={['8px', '12px']}>
                Introduction
            </Heading>
            <Flex fontWeight={'600'} color={'whiteAlpha.600'} width={'100%'} flexWrap={'wrap'}>
                <ItemDescribe name={'Followers'} amount={data.followerNumber} />
                <ItemDescribe name={'Following'} amount={data.followingNumber} />
                <ItemDescribe name={'Songs'} amount={data.trackNumber} />
            </Flex>
            {data.description !== '' && (
                <Box mt={'16px'}>
                    <Heading fontSize={['1.5rem', '1.5rem', '1.2rem']} mb={['8px', '12px']}>
                        Description
                    </Heading>
                    <Box
                        mb={['0', '0', '60px']}
                        fontWeight={'600'}
                        color={'whiteAlpha.600'}
                        fontSize={['initial', '0.875rem', '0.875rem']}
                    >
                        {showFullDescription ? (
                            <>
                                {data.description}
                                <Text
                                    color={'text'}
                                    ml={'4px'}
                                    display={'inline-block'}
                                    cursor={'pointer'}
                                    fontSize={'0.8rem'}
                                    onClick={() => setShowFullDescription(false)}
                                >
                                    hidden
                                </Text>
                            </>
                        ) : (
                            <>
                                {data.description.substring(0, 150)}
                                <Text
                                    color={'#a0aea3'}
                                    ml={'4px'}
                                    display={'inline-block'}
                                    cursor={'pointer'}
                                    fontSize={'0.8rem'}
                                    onClick={() => setShowFullDescription(true)}
                                >
                                    ...more
                                </Text>
                            </>
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default Describe;
