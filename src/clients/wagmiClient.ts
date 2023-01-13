import { createClient } from 'wagmi';
import { connectors, provider } from 'wallet/config';

export const wagmiClient = createClient({
    autoConnect: false,
    connectors,
    provider,
});
