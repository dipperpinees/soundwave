import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { GOOGLE_CLIENT_ID } from './config';
import Admin from './pages/Admin';
import FavoriteSongs from './pages/FavoriteSong';
import HomePage from './pages/HomePage';
import Library from './pages/Library';
import MusicPage from './pages/MusicPage';
import PlaylistPage from './pages/PlaylistPage';
import ProfilePage from './pages/ProfilePage';
import ResetPassword from './pages/ResetPassword';
import Search from './pages/Search';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Upload from './pages/Upload';
import { Store } from './stores';
import ScrollToTop from './utils/ScrollToTop';
import theme from './utils/theme';

function App() {
    const queryClient = new QueryClient();

    return (
        <BrowserRouter>
            <ScrollToTop>
                <ChakraProvider theme={theme}>
                    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                        <QueryClientProvider client={queryClient}>
                            <div className="App">
                                <Store>
                                    <Layout>
                                        <Routes>
                                            <Route path="/" element={<HomePage />} />
                                            <Route path="/profile/:id" element={<ProfilePage />} />
                                            <Route path="/music/:id" element={<MusicPage />} />
                                            <Route path="/playlist/:id" element={<PlaylistPage />} />
                                            <Route path="/signin" element={<SignIn />} />
                                            <Route path="/signup" element={<SignUp />} />
                                            <Route path="/upload" element={<Upload />} />
                                            <Route path="/search" element={<Search type="tracks" />} />
                                            <Route path="/search/people" element={<Search type="people" />} />
                                            <Route path="/library" element={<Library />} />
                                            <Route path="/favorite" element={<FavoriteSongs />} />
                                            <Route path="/admin" element={<Admin />} />
                                            <Route path="/forgot" element={<ResetPassword />} />
                                        </Routes>
                                    </Layout>
                                </Store>
                            </div>
                        </QueryClientProvider>
                    </GoogleOAuthProvider>
                </ChakraProvider>
            </ScrollToTop>
        </BrowserRouter>
    );
}

export default App;
