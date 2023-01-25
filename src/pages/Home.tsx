import {
    AztecSdk,
    EthAddress,
    GrumpkinAddress,
    TxSettlementTime,
} from '@aztec/sdk';
import { InjectedConnector, Signer } from '@wagmi/core';
import { createAztecAccount } from 'aztec/createAztecAccount.js';
import { depositEthToAztec } from 'aztec/utils.js';
import { ethers } from 'ethers';
import { ReactElement, useEffect, useState } from 'react';
import { useAccount, useConnect, useProvider, useSigner } from 'wagmi';

async function depositEth(
    amount: string,
    accountPublicKey: GrumpkinAddress,
    sdk: AztecSdk,
    signer: Signer
) {
    try {
        const depositTokenQuantity: bigint = ethers.utils
            .parseEther(amount)
            .toBigInt();

        await sdk.awaitUserSynchronised(accountPublicKey);

        let txId = await depositEthToAztec(
            EthAddress.fromString(await signer.getAddress()),
            accountPublicKey,
            depositTokenQuantity,
            TxSettlementTime.INSTANT,
            sdk,
            signer
        );

        console.log('Deposit TXID:', txId.toString());
    } catch (e) {
        console.log(e); // e.g. depositTokenQuantity = 0
    }
}

// import { useConnect } from 'wagmi'

// export function Profile() {
//   const { connect, connectors, error, isLoading, pendingConnector } =
//     useConnect()

//   return (
//     <div>
//       {connectors.map((connector) => (
//         <button
//           disabled={!connector.ready}
//           key={connector.id}
//           onClick={() => connect({ connector })}
//         >
//           {connector.name}
//           {!connector.ready && ' (unsupported)'}
//           {isLoading &&
//             connector.id === pendingConnector?.id &&
//             ' (connecting)'}
//         </button>
//       ))}

//       {error && <div>{error.message}</div>}
//     </div>
//   )
// }

function ConnectWalletButton() {
    const [connected, setConnected] = useState(false);

    const { connect, status, reset } = useConnect({
        connector: new InjectedConnector(),
        onSuccess: () => {},
    });

    const provider = useProvider();
    const { data: signer } = useSigner();

    const { address, isConnected } = useAccount({
        onConnect: async ({ address: _address }) => {
            console.log('connected!');
            setConnected(true);

            // if (signer && _address) {
            //     await createAztecAccount(provider, signer, _address);
            // } else {
            //     console.warn('no signer');
            // }
        },
    });

    useEffect(() => {
        const connectSdk = async () => {
            if (signer && address) {
                //await createAztecAccount(provider, signer, address);
            } else {
                console.warn('no signer or address');
            }
        };

        connectSdk().then(() => {
            console.log('ahhh');
        });
    }, [provider, signer, connected]);

    if (isConnected) {
        return (
            <button
                disabled
                className="p-2 font-bold text-white bg-black rounded btn max-w-fit"
            >
                Wallet connected at: {address}
            </button>
        );
    }

    return (
        <button
            className="p-2 font-bold text-white transition ease-in-out bg-black rounded delay-50 max-w-fit hover:scale-105 hover:shadow-lg"
            onClick={() => connect()}
        >
            Connect Wallet
        </button>
    );
}

export function Home(): ReactElement {
    const { data: signer } = useSigner();
    const provider = useProvider();
    const { address } = useAccount();

    const [GA, setGA] = useState<GrumpkinAddress | null>(null);
    const [SDK, setSDK] = useState<AztecSdk | null>(null);

    return (
        <div className="h-screen">
            <div className="flex flex-col max-w-lg m-auto gap-y-6 pt-36">
                <h1 className="text-4xl font-bold">zkElement</h1>
                <ConnectWalletButton />
            </div>
            <div>
                <button
                    className="p-4 bg-red-200 border border-orange-400 border-solid"
                    onClick={async () => {
                        if (!!address && !!provider) {
                            const r = await createAztecAccount(
                                provider,
                                signer as Signer,
                                address
                            );

                            setGA(r.accPubKey);
                            setSDK(r.sdk);

                            console.log(r);
                        } else {
                            console.log('no parms');
                        }
                    }}
                >
                    create sdk
                </button>

                <button
                    onClick={async () => {
                        if (!!GA && !!SDK && !!signer) {
                            const r = await depositEth('10', GA, SDK, signer);
                            console.log(r);
                        } else {
                            console.log('no parms deposit eth');
                        }
                    }}
                >
                    bridge eth
                </button>
            </div>
        </div>
    );
}
