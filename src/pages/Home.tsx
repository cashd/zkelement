import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Signer } from 'ethers';
import { createAztecAccount } from 'hooks/useAztecAccount';
import { ReactElement } from 'react';
import { useAccount, useProvider, useSigner } from 'wagmi';
export { GrumpkinAddress } from '@aztec/sdk';

export function Home(): ReactElement {
    const { data: signer } = useSigner();
    const provider = useProvider();
    const { address } = useAccount();

    console.log(GrumpkinAddress);

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
                                signer as Signer,
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
