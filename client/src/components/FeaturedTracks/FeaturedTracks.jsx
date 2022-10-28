import Song from '../Song';
import { Box, Heading, List, Flex, Text, Link } from '@chakra-ui/react';
import { data } from './dataTest';
import { useState } from 'react';
import { LineRightIcon, LineDownIcon, LineUpIcon } from '../Icon';

const FeaturedTracks = () => {
    const [isDownIcon, setDownIcon] = useState(true);

    // xử lý sắp xếp
    const handleSortSongList = () => {
        setDownIcon(!isDownIcon);
        console.log('anc');
    };

    return (
        <Box>
            <Flex justifyContent="space-between">
                <Heading fontSize="xl">Featured Tracks</Heading>
                <Box>
                    <Text
                        onClick={() => handleSortSongList()}
                        mr="4px"
                        fontSize="xs"
                        display="inline-flex"
                        alignItems="center"
                        cursor="default"
                    >
                        Sort by
                        {isDownIcon ? <LineDownIcon /> : <LineUpIcon />}
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
                <Flex justifyContent="end" mt="4px">
                    <Link href="#">
                        <Text mr="4px" fontSize="xs" display="inline-flex" alignItems="center" cursor="pointer">
                            See more
                            <LineRightIcon />
                        </Text>
                    </Link>
                </Flex>
            )}
        </Box>
    );
};

export default FeaturedTracks;
