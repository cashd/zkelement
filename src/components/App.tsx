import { QueryClientProvider } from '@tanstack/react-query';
import { reactQueryClient } from 'clients/reactQueryClient.js';
import { client } from 'clients/wagmiClient.js';
import { Home } from 'pages/Home.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';

function App() {
    return (
        <QueryClientProvider client={reactQueryClient}>
            <WagmiConfig client={client}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </WagmiConfig>
        </QueryClientProvider>
    );
}

export default App;
