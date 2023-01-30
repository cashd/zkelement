import { QueryClientProvider } from "@tanstack/react-query";
import { AztecProvider } from "aztec/context/AztecProvider.js";
import { reactQueryClient } from "clients/reactQueryClient.js";
import { client } from "clients/wagmiClient.js";
import { Home } from "pages/Home.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WagmiConfig } from "wagmi";

function App() {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <WagmiConfig client={client}>
        <AztecProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </AztecProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default App;
