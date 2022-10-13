import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { Store } from './stores';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
    return (
        <BrowserRouter>
            <Store>
                <ChakraProvider>
                    <div className="App">
                        <Layout>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/signin" element={<SignIn />} />
                                <Route path="/signup" element={<SignUp />} />
                            </Routes>
                        </Layout>
                    </div>
                </ChakraProvider>
            </Store>
        </BrowserRouter>
    );
}

export default App;
