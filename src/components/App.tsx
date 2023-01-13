import { ConnectButton, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ethers } from 'ethers'
import { useProvider, WagmiConfig } from 'wagmi'
import { chains, wagmiClient } from 'wallet/config'

// async function useBlockNumber(provider: ethers.providers.Provider) {
//   const x = await provider.getBlockNumber()

//   return x
// }

const App = () => {
  // const block = useBlockNumber(provider)

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className="relative overflow-hidden bg-white">
          <div className="h-screen p-32">
            <ConnectButton />
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
