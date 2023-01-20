import {
    AztecSdk,
    EthAddress,
    GrumpkinAddress,
    TxSettlementTime,
} from '@aztec/sdk';
import { Signer } from '@wagmi/core';
import { depositEthToAztec } from 'aztec/utils.js';
import { ethers } from 'ethers';
import { createAztecAccount } from 'hooks/useAztecAccount.js';
import { ReactElement, useState } from 'react';
import { useAccount, useProvider, useSigner } from 'wagmi';

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
        //await sdk.awaitSynchronised();
        // @ RYAN IF YOU GET METAMASK ERROR WHEN TRYING OT BRIDGE CHANGE THIS HARDCODED ADDRESS TO CONNECTED
        let txId = await depositEthToAztec(
            EthAddress.fromString('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'),
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

export function Home(): ReactElement {
    const { data: signer } = useSigner();
    const provider = useProvider();
    const { address } = useAccount();

    const [GA, setGA] = useState<GrumpkinAddress | null>(null);
    const [SDK, setSDK] = useState<AztecSdk | null>(null);

    return (
        <div className=" bg-white">
            <div className="h-screen">
                <button
                    className="border border-orange-400 border-solid bg-red-200 p-4"
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
