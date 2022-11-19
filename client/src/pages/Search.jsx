import { Button, Flex, Grid, Icon, Select, Text } from '@chakra-ui/react';
import queryString from 'query-string';
import { useContext, useEffect, useState } from 'react';
import { BsFillPeopleFill, BsSoundwave } from 'react-icons/bs';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import LgArtist from '../components/Artist/LgArtist';
import SongPreview from '../components/SongPreview';
import SongSkeleton from '../components/SquareSkeleton';
import { API_ENDPOINT } from '../config';
import { GenreContext } from '../stores';

export default function Search({ type }) {
    const [searchParams] = useSearchParams();
    const [searchTracksData, setSearchTracksData] = useState(null);
    const [searchPeopleData, setSearchPeopleData] = useState(null);
    const [pagination, setPagination] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const genre = useContext(GenreContext)[0];

    const searchSongs = async (search, orderBy, genreID) => {
        setSearchTracksData(null);
        const response = await fetch(
            API_ENDPOINT +
                '/song/?' +
                queryString.stringify({
                    limit: 12,
                    ...(search && { search }),
                    ...(orderBy && { orderBy }),
                    ...(genreID && { genreID }),
                })
        );
        if (response.ok) {
            const { data, pagination } = await response.json();
            setPagination(pagination);
            setSearchTracksData(data);
        }
    };

    const searchUsers = async (search, orderBy) => {
        const response = await fetch(
            API_ENDPOINT +
                '/user/?' +
                queryString.stringify({
                    limit: 12,
                    ...(search && { search }),
                    ...(orderBy && { orderBy }),
                })
        );
        if (response.ok) {
            const { data, pagination } = await response.json();
            setPagination(pagination);
            setSearchPeopleData(data);
        }
    };

    useEffect(() => {
        setPagination(null);
        const search = searchParams.get('q');
        const orderBy = searchParams.get('order');
        const genreID = searchParams.get('genre');

        if (type === 'tracks') searchSongs(search, orderBy, genreID);
        if (type === 'people') searchUsers(search, orderBy);
    }, [type, searchParams]);

    const handleChangeSearch = (newSearchParams) => {
        const queryParams = {
            ...queryString.parse(location.search),
            ...newSearchParams,
        };
        navigate({
            pathname: location.pathname,
            search: queryString.stringify(queryParams),
        });
    };

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
            <Flex flexWrap={{ base: 'wrap', md: 'inherit' }} gap={{ base: 2, md: 0 }}>
                <Link to="/search">
                    <Button
                        variant="ghost"
                        color="white"
                        _hover={{}}
                        colorScheme="primary"
                        bgColor={type === 'tracks' && 'var(--primary-color)'}
                    >
                        <Icon as={BsSoundwave} marginRight={1} />
                        Tracks
                    </Button>
                </Link>
                <Link to="/search/people">
                    <Button
                        variant="ghost"
                        color="white"
                        _hover={{}}
                        colorScheme="primary"
                        bgColor={type === 'people' && 'var(--primary-color)'}
                    >
                        <Icon as={BsFillPeopleFill} marginRight={1} />
                        People
                    </Button>
                </Link>
                {type === 'tracks' && (
                    <>
                        <Select
                            marginLeft={{ base: 0, sm: 'auto' }}
                            marginRight={{ base: 0, md: 4 }}
                            width={{ base: 'auto', md: 40 }}
                            defaultValue={searchParams.get('genre')}
                            focusBorderColor="primary.500"
                            onChange={(e) => handleChangeSearch({ genre: e.target.value })}
                        >
                            <option value="lastest">All</option>
                            {genre.map(({ id, name }) => (
                                <option value={id}>{name}</option>
                            ))}
                        </Select>
                        <Select
                            width={{ base: 'auto', md: 40 }}
                            defaultValue={searchParams.get('order')}
                            focusBorderColor="primary.500"
                            onChange={(e) => handleChangeSearch({ order: e.target.value })}
                        >
                            <option value="lastest">Lastest</option>
                            <option value="like">Most likes</option>
                            <option value="listen">Most listens</option>
                        </Select>
                    </>
                )}
                {type === 'people' && (
                    <Select
                        marginLeft={{ base: 0, sm: 'auto' }}
                        width={40}
                        defaultValue={searchParams.get('order')}
                        focusBorderColor="primary.500"
                        onChange={(e) => handleChangeSearch({ order: e.target.value })}
                    >
                        <option value="lastest">Lastest</option>
                        <option value="follow">Most followers</option>
                        <option value="track">Most tracks</option>
                    </Select>
                )}
            </Flex>
            <Text marginTop={4} marginBottom={4}>
                {pagination &&
                    `Found ${pagination.totalDocs} results ${
                        searchParams.get('q') ? `for "${searchParams.get('q')}"` : ''
                    }`}
            </Text>
            {type === 'tracks' && (
                <Grid
                    templateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)', lg: 'repeat(6, 1fr)' }}
                    gap={{ base: 4, md: 12 }}
                >
                    {searchTracksData
                        ? searchTracksData.map((song, id) => <SongPreview key={id} song={song} />)
                        : [...Array(12).keys()].map((id) => <SongSkeleton key={id} />)}
                </Grid>
            )}
            {type === 'people' && (
                <Flex direction="column" width="100%">
                    {searchPeopleData && searchPeopleData.map((user) => <LgArtist key={user.id} {...user} />)}
                </Flex>
            )}
        </Flex>
    );
}
