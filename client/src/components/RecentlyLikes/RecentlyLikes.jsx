import Song from '../Song';
import { Box, Heading, List, Text, Flex } from '@chakra-ui/react';
import { AiOutlineRight } from 'react-icons/ai';
import { data } from '../FeaturedTracks/dataTest';

const iconStyle = { fontSize: '12px', display: 'inline', marginLeft: '4px' };

const RecentlyLikes = () => {
    return (
        <Box>
            <Flex>
                <Heading fontSize="xl">Recently Likes</Heading>
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

export default RecentlyLikes;
