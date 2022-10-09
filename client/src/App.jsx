import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { Store } from './stores';

function App() {
    return (
        <BrowserRouter>
            <Store>
                <div className="App">
                    <Layout>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/signup" element={<SignUp />} />
                        </Routes>
                    </Layout>
                </div>
            </Store>
        </BrowserRouter>
    );
}

export default App;
