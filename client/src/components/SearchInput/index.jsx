import {
    Box, Flex, Input,
    InputGroup,
    InputLeftElement, VStack
} from '@chakra-ui/react';
import queryString from 'query-string';
import { useCallback, useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SearchInput() {
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const [desearchData, setDeSearchData] = useState(JSON.parse(localStorage.getItem("search_temp") || "[]"));
    const [searchData, setSearchData] = useState(JSON.parse(localStorage.getItem("search_temp") || "[]").slice(0, 5));

    const handleSearchRecommend  = (search) => {
        if (!search) return desearchData.slice(0, 5);
        return desearchData.filter((data) => data.includes(search)).slice(0, 5);
    }

    const handleCloseDropdownOutsite = useCallback((e) => {
        if (!e.target.closest("#search")) setShowSearchDropdown(false);     
    }, [])

    useEffect(() => {
        document.addEventListener('click', handleCloseDropdownOutsite);

        return () => {
            document.removeEventListener('click', handleCloseDropdownOutsite)
        }
    }, [handleCloseDropdownOutsite]);

    useEffect(() => {
        localStorage.setItem("search_temp", JSON.stringify(desearchData))
    }, [desearchData])

    const handleSearch = () => {
        if (location.pathname.startsWith('/search')) {
            const queryParams = queryString.parse(location.search);
            queryParams.q = searchInput;
            navigate({
                path: location.pathname,
                search: queryString.stringify(queryParams),
            });
        } else {
            navigate(`/search/?q=${searchInput}`);
        }
        if (!desearchData.includes(searchInput) && searchInput) {
            setDeSearchData([searchInput, ...desearchData])
        }
        setShowSearchDropdown(false);
    };

    const handleChangeSearch = (e) => {
        setShowSearchDropdown(true);
        setSearchData([...handleSearchRecommend(e.target.value)])
        setSearchInput(e.target.value);
    }

    return (
        <Box position={'relative'} width="100%" display={{base: "none", sm: "block"}} ml={{base: 0, sm: 16, md: 0}} id="search">
                <InputGroup width="100%" marginLeft="8px" size="sm">
                    <InputLeftElement pointerEvents="none" children={<BiSearchAlt color="gray.300" />} />
                    <Input
                        type="tel"
                        placeholder="Search for artists, song,..."
                        borderRadius="40px"
                        size="sm"
                        onFocus={() => setShowSearchDropdown(true)}
                        onChange={handleChangeSearch}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </InputGroup>
                {showSearchDropdown && (
                    <VStack
                        align="stretch"
                        position={'absolute'}
                        right={-3}
                        left={1}
                        top={38}
                        bgColor="blackAlpha.800"
                        borderRadius={8}
                    >
                        {searchData.map((data, index) => (
                            <Flex key={index} h="40px" align={'center'} paddingLeft={4} onClick={handleSearch} _hover={{cursor: "pointer"}}>
                                {data}
                            </Flex>
                        ))}
                        {!!searchInput && !searchData.includes(searchInput) && <Flex h="40px" align={'center'} paddingLeft={4} onClick={handleSearch} _hover={{cursor: "pointer"}}>
                            Search for "{searchInput}"
                        </Flex>}
                    </VStack>
                )}
            </Box>
    )
}