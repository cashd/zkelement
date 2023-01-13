import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClientProvider } from '@tanstack/react-query';
import { reactQueryClient } from 'clients/reactQueryClient';
import { wagmiClient } from 'clients/wagmiClient';
import { Home } from 'pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';
import { chains } from 'wallet/config';

function App() {
    return (
        <QueryClientProvider client={reactQueryClient}>
            <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider chains={chains}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </BrowserRouter>
                </RainbowKitProvider>
            </WagmiConfig>
        </QueryClientProvider>
    );
}

export default App;
