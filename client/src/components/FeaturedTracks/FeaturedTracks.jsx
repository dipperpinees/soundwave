import Song from '../Song';
import { Box, Heading, List, Flex, Text, Center } from '@chakra-ui/react';
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai';
import { data } from './dataTest';

const iconStyle = { fontSize: '12px', display: 'inline', marginLeft: '4px' };

const FeaturedTracks = () => {
    return (
        <Box>
            <Flex justifyContent="space-between">
                <Heading fontSize="xl">Featured Tracks</Heading>
                <Box>
                    <Text mr="4px" fontSize="xs" display="inline-flex" alignItems="center" cursor="default">
                        Sort by
                        <AiOutlineDown style={iconStyle} />
                    </Text>
                </Box>
            </Flex>
            <List>
                {data.map((song, index) => {
                    if (index >= 5) {
                        return null;
                    }
                    return (
                        <Song
                            key={song.id}
                            {...song}
                            userName={'user name'}
                            isLikeIcon={true}
                            borderBottom="1px solid rgba(255, 255, 255, 0.2)"
                        />
                    );
                })}
            </List>
            {data.length > 5 && (
                <Flex justifyContent="end" mt="12px">
                    <Text mr="4px" fontSize="xs" display="inline-flex" alignItems="center" cursor="pointer">
                        See more
                        <AiOutlineRight style={iconStyle} />
                    </Text>
                </Flex>
            )}
        </Box>
    );
};

export default FeaturedTracks;
