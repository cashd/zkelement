import { ConnectButton } from '@rainbow-me/rainbowkit';
import { createAztecAccount } from 'hooks/useAztecAccount';
import { ReactElement } from 'react';
import { useAccount, useProvider, useSigner } from 'wagmi';

const AZTEC_PROOF_SERVER_URL = 'http://localhost:8081';

export function Home(): ReactElement {
    const { data: signer } = useSigner();
    const provider = useProvider();
    const { address } = useAccount();

    // const sdk = useAztecSDK();
    // const sdkAccount = useAztecAccount(address);

    // console.log(sdkAccount);
    return (
        <div className="relative overflow-hidden bg-white">
            <div className="h-screen p-32">
                <ConnectButton />
                <button
                    onClick={async () => {
                        if (!!address && !!provider) {
                            const r = await createAztecAccount(
                                provider,
                                signer,
                                address
                            );

                            console.log(r);
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
