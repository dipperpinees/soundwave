import { Button, Flex, Icon } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BsFillPeopleFill, BsSoundwave } from 'react-icons/bs';
import { Link, useSearchParams } from 'react-router-dom';
import { PlaylistLibrary, SongsLibrary } from '../components/Library';
import { APP_NAME } from '../utils/constant';

export default function Library() {
    const [searchParams] = useSearchParams();
    const [type, setType] = useState('songs');

    useEffect(() => {
        if (searchParams.get('q') === 'playlists') setType('playlists');
        else setType('songs');
    }, [searchParams]);

    return (
        <Flex
            marginTop="var(--header-height)"
            marginLeft="var(--navbar-width)"
            color="white"
            direction="column"
            paddingBottom={40}
            paddingRight={{ base: 4, md: 12 }}
            paddingLeft={{ base: 4, md: 0 }}
            minHeight={'calc(100vh - var(--header-height))'}
        >
            <Helmet>
                <title>{APP_NAME} - Library</title>
            </Helmet>
            <Flex gap={2} mb={4} mt={4}>
                <Link to="/library?q=songs">
                    <Button
                        variant="ghost"
                        color="white"
                        _hover={{}}
                        colorScheme="primary"
                        bgColor={type === 'songs' && 'var(--primary-color)'}
                    >
                        <Icon as={BsSoundwave} marginRight={1} />
                        Songs
                    </Button>
                </Link>
                <Link to="/library?q=playlists">
                    <Button
                        variant="ghost"
                        color="white"
                        _hover={{}}
                        colorScheme="primary"
                        bgColor={type === 'playlists' && 'var(--primary-color)'}
                    >
                        <Icon as={BsFillPeopleFill} marginRight={1} />
                        Playlists
                    </Button>
                </Link>
            </Flex>
            {type === 'songs' && <SongsLibrary />}
            {type === 'playlists' && <PlaylistLibrary />}
        </Flex>
    );
}
