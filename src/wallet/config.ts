import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createClient } from 'wagmi'
import { arbitrum, mainnet, optimism, polygon } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const RPC_KEY = import.meta.env.VITE_RPC_KEY

if (!RPC_KEY) {
    throw new Error('Provide an RPC_KEY variable in .env')
}

export const { chains, provider } = configureChains(
    [mainnet, polygon, optimism, arbitrum],
    [alchemyProvider({ apiKey: RPC_KEY }), publicProvider()]
)

export const { connectors } = getDefaultWallets({
    appName: 'zkElement Finance',
    chains,
})

export const wagmiClient = createClient({
    autoConnect: false,
    connectors,
    provider,
})
