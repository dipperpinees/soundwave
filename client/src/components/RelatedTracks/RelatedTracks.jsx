import Song from '../Song';
import { Box, Heading, List, Flex, Text, Link } from '@chakra-ui/react';
import { data } from '../FeaturedTracks/dataTest';
import { useState } from 'react';
import { LineRightIcon } from '../Icon';

const RelatedTracks = () => {
    return (
        <Box>
            <Flex justifyContent="space-between" align={'center'}>
                <Heading lineHeight={'100%'} fontSize="lg">
                    Related Tracks
                </Heading>
                {data.length > 5 && (
                    <Flex align={'center'} justifyContent="end" mt="4px">
                        <Link href="#">
                            <Text mr="4px" fontSize="xs" display="inline-flex" alignItems="center" cursor="pointer">
                                See more
                                <LineRightIcon />
                            </Text>
                        </Link>
                    </Flex>
                )}
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
        </Box>
    );
};

export default RelatedTracks;
