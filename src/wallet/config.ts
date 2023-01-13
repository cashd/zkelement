import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

if (!import.meta.env.VITE_RPC_KEY) {
  throw new Error('Provide an RPC_KEY variable in .env')
}

export const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [alchemyProvider({ apiKey: import.meta.env.VITE_RPC_KEY }), publicProvider()]
)

export const { connectors } = getDefaultWallets({
  appName: 'zkElement Finance',
  chains
})

export const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider
})
