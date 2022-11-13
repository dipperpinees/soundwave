import Song from '../Song';
import { Box, Heading, List, Flex, Text, Link } from '@chakra-ui/react';
import { LineRightIcon } from '../Icon';
import { useEffect, useState } from 'react';
import fetchAPI from '../../utils/fetchAPI';

const RelatedTracks = ({ id }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchAPI(`/user/${id}/songs`);
                setData(data);
            } catch (e) {}
        })();
    }, [id]);
    return (
        <Box>
            <Flex justifyContent="space-between" align={'center'}>
                <Heading lineHeight={'100%'} fontSize="lg">
                    Related Tracks
                </Heading>
                {data && data.length > 5 && (
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
                {data &&
                    data.map((song, index) => {
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
