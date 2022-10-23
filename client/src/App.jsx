import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { Store } from './stores';
import { ChakraProvider } from '@chakra-ui/react';
import Player from './components/Player';
import theme from './utils/theme';
import Upload from './pages/Upload';

function App() {
    return (
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <div className="App">
                    <Store>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/signin" element={<SignIn />} />
                                <Route path="/signup" element={<SignUp />} />
                                <Route path="/upload" element={<Upload />} />
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
