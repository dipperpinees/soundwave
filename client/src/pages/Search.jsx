import { Button, Flex, Grid, Icon, Select, Text } from '@chakra-ui/react';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { BsFillPeopleFill, BsSoundwave } from 'react-icons/bs';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import LgArtist from '../components/Artist/LgArtist';
import SongPreview from '../components/SongPreview';
import SongSkeleton from '../components/SquareSkeleton';
import { API_ENDPOINT } from '../config';

export default function Search({ type }) {
    const [searchParams] = useSearchParams();
    const [searchTracksData, setSearchTracksData] = useState(null);
    const [searchPeopleData, setSearchPeopleData] = useState(null);
    const [pagination, setPagination] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const searchSongs = async (search, orderBy) => {
        setSearchTracksData(null);
        const response = await fetch(
            API_ENDPOINT +
                '/song/?' +
                queryString.stringify({
                    limit: 12,
                    ...(search && { search }),
                    ...(orderBy && { orderBy }),
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

        if (type === 'tracks') searchSongs(search, orderBy);
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
            paddingRight={12}
            minHeight={'calc(100vh - var(--header-height))'}
        >
            <Flex>
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
                    <Select
                        marginLeft="auto"
                        width={40}
                        defaultValue={searchParams.get('order')}
                        focusBorderColor="primary.500"
                        onChange={(e) => handleChangeSearch({ order: e.target.value })}
                    >
                        <option value="lastest">Lastest</option>
                        <option value="like">Most likes</option>
                        <option value="listen">Most listens</option>
                    </Select>
                )}
                {type === 'people' && (
                    <Select
                        marginLeft="auto"
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
                <Grid templateColumns="repeat(4, 1fr)" gap={12}>
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
