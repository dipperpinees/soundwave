import { Box, Button, Divider, Flex, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAdminPanelSettings } from 'react-icons/md';
import { UserContext } from '../stores';
import { SongAdmin, UserAdmin } from '../components/Admin';
import fetchAPI from '../utils/fetchAPI';
import { Helmet } from 'react-helmet';

export default function Admin() {
    const [{ isAuth, role }, userDispatch] = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        //not admin, navigate to home page
        if (isAuth && role !== 'admin') navigate('/');
    }, [isAuth, role, navigate]);

    async function logOut() {
        fetchAPI('/logout', { method: 'POST' });
        userDispatch({ type: 'Delete' });
        navigate('/signin');
    }

    return (
        <Box bgColor="white" width="100%" pt="var(--header-height)}">
            <Helmet>
                <title>Admin Dashboard</title>
            </Helmet>
            <Flex
                align="center"
                position="fixed"
                top={0}
                left={0}
                right={0}
                height="var(--header-height)"
                px={8}
                bgColor="gray.100"
                zIndex={1}
            >
                <Text as="b" fontSize="1.25rem">
                    LOGO
                </Text>
                <Divider orientation="vertical" height="50%" m={4} />
                <Icon fontSize="1.25rem" as={MdAdminPanelSettings} />
                <Text>Admin Dashboard</Text>
                <Button variant="ghost" ml="auto" onClick={logOut}>
                    Log out
                </Button>
            </Flex>

            <Tabs variant="unstyled" py={4} px={12}>
                <TabList>
                    <Tab _selected={{ color: 'white', bg: 'blue.500' }}>User</Tab>
                    <Tab _selected={{ color: 'white', bg: 'green.400' }}>Songs</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel px={0}>
                        <UserAdmin />
                    </TabPanel>
                    <TabPanel>
                        <SongAdmin />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
