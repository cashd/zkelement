import {
    AztecSdk,
    createAztecSdk,
    EthersAdapter,
    SdkFlavour,
} from '@aztec/sdk';
import { useEffect, useState } from 'react';
import { useProvider, useSigner } from 'wagmi';

const AZTEC_PROOF_SERVER_URL = 'http://localhost:8081';

export function useAztecSDK() {
    const { data: signer } = useSigner();
    const provider = useProvider();

    const [SDK, setSDK] = useState<AztecSdk | undefined>();

    useEffect(() => {
        if (!!signer) {
            // Convert the ethers provider into an Aztec compatible provider class
            const ethProvider = new EthersAdapter(provider);

            createAztecSdk(ethProvider, {
                serverUrl: AZTEC_PROOF_SERVER_URL,
                pollInterval: 1000,
                memoryDb: true,
                debug: 'bb:*',
                flavour: SdkFlavour.PLAIN,
                minConfirmation: 1, // ETH block confirmations
            }).then((newSDK) => {
                newSDK.run().then(() => setSDK(newSDK));
            });
        }
    }, [signer]);

    return SDK;
}

//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const ethereumProvider: EthereumProvider = new EthersAdapter(provider);

//   // Get Metamask ethAccount
//   await provider.send("eth_requestAccounts", []);
//   const mmSigner = provider.getSigner();
//   const mmAddress = EthAddress.fromString(await mmSigner.getAddress());
//   setEthAccount(mmAddress);

//   // Initialize SDK
//   const sdk = await createAztecSdk(ethereumProvider, {
//     serverUrl: "http://localhost:8081", // local devnet, run `yarn devnet` to start
//     pollInterval: 1000,
//     memoryDb: true,
//     debug: "bb:*",
//     flavour: SdkFlavour.PLAIN,
//     minConfirmation: 1, // ETH block confirmations
//   });
//   await sdk.run();
//   console.log("Aztec SDK initialized:", sdk);

// }
