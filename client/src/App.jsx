import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Player from './components/Player';
import { GOOGLE_CLIENT_ID } from './config';
import HomePage from './pages/HomePage';
import MusicPage from './pages/MusicPage';
import ProfilePage from './pages/ProfilePage';
import Search from './pages/Search';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Upload from './pages/Upload';
import TrackLibrary from './pages/TrackLibrary';
import { Store } from './stores';
import theme from './utils/theme';

function App() {
    return (
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                    <div className="App">
                        <Store>
                            <Layout>
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/profile/:id" element={<ProfilePage />} />
                                    <Route path="/music/:id" element={<MusicPage />} />
                                    <Route path="/signin" element={<SignIn />} />
                                    <Route path="/signup" element={<SignUp />} />
                                    <Route path="/upload" element={<Upload />} />
                                    <Route path="/search" element={<Search type="tracks" />} />
                                    <Route path="/search/people" element={<Search type="people" />} />
                                    <Route path="/library" element={<TrackLibrary />} />
                                </Routes>
                                <Player />
                            </Layout>
                        </Store>
                    </div>
                </GoogleOAuthProvider>
            </ChakraProvider>
        </BrowserRouter>
    );
}

export default App;
