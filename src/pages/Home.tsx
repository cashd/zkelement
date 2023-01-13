import { createAztecSdk, EthersAdapter, SdkFlavour } from '@aztec/sdk';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ReactElement } from 'react';
import { useProvider, useSigner } from 'wagmi';

const AZTEC_PROOF_SERVER_URL = 'http://localhost:8081';

export function Home(): ReactElement {
    // const sdk = useAztecSDK();
    const { data: signer } = useSigner();
    const provider = useProvider();

    // console.log(sdk);
    return (
        <div className="relative overflow-hidden bg-white">
            <div className="h-screen p-32">
                <ConnectButton />
                <button
                    onClick={async () => {
                        if (!!signer && !!provider) {
                            // Convert the ethers provider into an Aztec compatible provider class
                            const ethProvider = new EthersAdapter(provider);

                            const sdk = await createAztecSdk(ethProvider, {
                                serverUrl: 'http://localhost:8081',
                                pollInterval: 1000,
                                memoryDb: true,
                                debug: 'bb:*',
                                flavour: SdkFlavour.PLAIN,
                                minConfirmation: 1, // ETH block confirmations
                            });

                            await sdk.run();

                            console.log(sdk);
                        } else {
                            console.log('no parms');
                        }
                    }}
                >
                    create sdk
                </button>
            </div>
        </div>
    );
}
