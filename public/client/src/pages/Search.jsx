import { Button, Flex, Grid, Icon, Select, Text, useMediaQuery } from '@chakra-ui/react';
import queryString from 'query-string';
import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BsFillPeopleFill, BsSoundwave } from 'react-icons/bs';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Artist from '../components/Artist/index';
import Pagination from '../components/Pagination';
import SearchInput from '../components/SearchInput';
import SongPreview from '../components/SongPreview';
import SongSkeleton from '../components/SquareSkeleton';
import useSongs from '../hooks/useSongs';
import useUsers from '../hooks/useUsers';
import { GenreContext } from '../stores';
import { APP_NAME } from '../utils/constant';

export default function Search({ type }) {
    const location = useLocation();
    const navigate = useNavigate();
    const genre = useContext(GenreContext)[0];
    const [searchParams] = useSearchParams();
    const [isMobile] = useMediaQuery('(max-width: 48em)');

    const handleChangeSearchQuery = (newSearchParams) => {
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
            gap={4}
        >
            <Helmet>
                [<title>{APP_NAME} - Search</title>
            </Helmet>
            {isMobile && <SearchInput />}
            <Flex flexWrap={{ base: 'wrap', md: 'inherit' }} gap={{ base: 2, md: 0 }}>
                <Link to={`/search?q=${searchParams.get('q')}`}>
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
                <Link to={`/search/people?q=${searchParams.get('q') || ''}`}>
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
                            onChange={(e) => handleChangeSearchQuery({ genre: e.target.value, page: 1 })}
                        >
                            <option value="lastest">All</option>
                            {genre.map(({ id, name }) => (
                                <option key={id} value={id}>
                                    {name}
                                </option>
                            ))}
                        </Select>
                        <Select
                            width={{ base: 'auto', md: 40 }}
                            defaultValue={searchParams.get('order')}
                            focusBorderColor="primary.500"
                            onChange={(e) => handleChangeSearchQuery({ order: e.target.value, page: 1 })}
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
                        onChange={(e) => handleChangeSearchQuery({ order: e.target.value, page: 1 })}
                    >
                        <option value="lastest">Lastest</option>
                        <option value="follow">Most followers</option>
                        <option value="track">Most tracks</option>
                    </Select>
                )}
            </Flex>
            {type === 'tracks' && <SearchSongs {...{ handleChangeSearchQuery }} />}
            {type === 'people' && <SearchPeople {...{ handleChangeSearchQuery }} />}
        </Flex>
    );
}

const SearchSongs = ({ handleChangeSearchQuery }) => {
    const [searchParams] = useSearchParams();
    const [userSearchParams, setUserSearchParams] = useState();
    const { data: searchTracksData } = useSongs(queryString.stringify(userSearchParams), {
        enabled: !!userSearchParams,
    });

    useEffect(() => {
        setUserSearchParams({
            search: searchParams.get('q'),
            orderBy: searchParams.get('order'),
            genreID: searchParams.get('genre'),
            page: Number(searchParams.get('page')),
            limit: 12,
        });
    }, [searchParams]);

    return (
        <>
            <Text>
                {searchTracksData &&
                    `Found ${searchTracksData.pagination.totalDocs} results ${
                        searchParams.get('q') ? `for "${searchParams.get('q')}"` : ''
                    }`}
            </Text>
            <Grid
                templateColumns={{
                    base: 'repeat(2, minmax(0, 1fr))',
                    sm: 'repeat(4, minmax(0, 1fr))',
                    lg: 'repeat(6, minmax(0, 1fr))',
                }}
                gap={{ base: 4, md: 5 }}
            >
                {!!searchTracksData
                    ? searchTracksData.data.map((song) => <SongPreview key={song.id} song={song} />)
                    : [...Array(12).keys()].map((id) => <SongSkeleton key={id} />)}
            </Grid>
            {searchTracksData && searchTracksData.pagination.totalPages > 1 && (
                <Pagination
                    onChangePage={(page) => handleChangeSearchQuery({ page })}
                    paginator={{
                        totalPages: searchTracksData.pagination.totalPages,
                        page: Number(searchParams.get('page')),
                    }}
                />
            )}
        </>
    );
};

const SearchPeople = ({ handleChangeSearchQuery }) => {
    const [searchParams] = useSearchParams();
    const [peopleSearchParams, setPeopleSearchParams] = useState();
    const { data: searchPeopleData } = useUsers(queryString.stringify(peopleSearchParams), {
        enabled: !!peopleSearchParams,
    });

    useEffect(() => {
        setPeopleSearchParams({
            search: searchParams.get('q'),
            orderBy: searchParams.get('order'),
            page: Number(searchParams.get('page')),
        });
    }, [searchParams]);

    return (
        <>
            <Helmet>
                <title>Search</title>
            </Helmet>
            <Text>
                {searchPeopleData &&
                    `Found ${searchPeopleData.pagination.totalDocs} results ${
                        searchParams.get('q') ? `for "${searchParams.get('q')}"` : ''
                    }`}
            </Text>
            <Flex direction="column" width="100%">
                {searchPeopleData && searchPeopleData.data.map((user) => <Artist key={user.id} {...user} size="lg" />)}
            </Flex>
            {searchPeopleData && searchPeopleData.pagination.totalPages > 1 && (
                <Pagination
                    onChangePage={(page) => handleChangeSearchQuery({ page })}
                    paginator={{
                        totalPages: searchPeopleData.pagination.totalPages,
                        page: Number(searchParams.get('page')),
                    }}
                />
            )}
        </>
    );
};
