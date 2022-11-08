import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Player from './components/Player';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Search from './pages/Search';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import TrackLibrary from './pages/TrackLibrary';
import Upload from './pages/Upload';
import { Store } from './stores';
import theme from './utils/theme';
import MusicPage from './pages/MusicPage';

function App() {
    return (
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <div className="App">
                    <Store>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/profile/:id" element={<ProfilePage />} />
                                <Route path="/music" element={<MusicPage />} />
                                <Route path="/signin" element={<SignIn />} />
                                <Route path="/signup" element={<SignUp />} />
                                <Route path="/upload" element={<Upload />} />
                                <Route path="/search" element={<Search type="tracks" />} />
                                <Route path="/search/people" element={<Search type="people" />} />
                            </Routes>
                            <Player />
                        </Layout>
                    </Store>
                </div>
            </ChakraProvider>
        </BrowserRouter>
    );
}

export default App;
