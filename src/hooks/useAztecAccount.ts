// export function useAztecAccount(address?: string) {
//     const { data: signer } = useSigner();
//     const provider = useProvider();
//     const sdk = useAztecSDK();

//     const [accountPrivateKey, setAccountPrivateKey] = useState<
//         string | undefined
//     >();
//     const [accountPublicKey, setAccountPublicKey] = useState<
//         string | undefined
//     >();

//     useEffect(() => {
//         // require chain id to be correct
//         if (!!sdk && !!address) {
//             getPrivateKeyPair(sdk, address).then(({ accPubKey, accPriKey }) => {
//                 setAccountPrivateKey(accPriKey.toString());
//                 setAccountPublicKey(accPubKey.toString());
//             });
//         }
//     }, [sdk, address]);

//     return { accountPrivateKey, accountPublicKey };
// }

// // Initialize SDK
// const sdk = await createAztecSdk(ethereumProvider, {
//     serverUrl: 'http://localhost:8081', // local devnet, run `yarn devnet` to start
//     pollInterval: 1000,
//     memoryDb: true,
//     debug: 'bb:*',
//     flavour: SdkFlavour.PLAIN,
//     minConfirmation: 1, // ETH block confirmations
// });
// await sdk.run();
// console.log('Aztec SDK initialized:', sdk);
// setSdk(sdk);

// // Generate user's privacy keypair
// // The privacy keypair (also known as account keypair) is used for en-/de-crypting values of the user's spendable funds (i.e. balance) on Aztec
// // It can but is not typically used for receiving/spending funds, as the user should be able to share viewing access to his/her Aztec account via sharing his/her privacy private key
// const { publicKey: accPubKey, privateKey: accPriKey } =
//     await sdk.generateAccountKeyPair(mmAddress);
// console.log('Privacy Key:', accPriKey);
// console.log('Public Key:', accPubKey.toString());
// setAccountPrivateKey(accPriKey);
// setAccountPublicKey(accPubKey);
// if (await sdk.isAccountRegistered(accPubKey)) setUserExists(true);

// // Get or generate Aztec SDK local user
// let account0 = (await sdk.userExists(accPubKey))
//     ? await sdk.getUser(accPubKey)
//     : await sdk.addUser(accPriKey);
// setAccount0(account0);

// // Generate user's spending key & signer
// // The spending keypair is used for receiving/spending funds on Aztec
// const { privateKey: spePriKey } = await sdk.generateSpendingKeyPair(mmAddress);
// const schSigner = await sdk?.createSchnorrSigner(spePriKey);
// console.log('Signer:', schSigner);
// setSpendingSigner(schSigner);

// setIniting(false); // End init status
