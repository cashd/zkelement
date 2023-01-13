import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { Home } from 'pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';
import { chains, wagmiClient } from 'wallet/config';

function App() {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </RainbowKitProvider>
        </WagmiConfig>
    );
}

export default App;
