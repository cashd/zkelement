import {
  createAztecSdk,
  EthAddress,
  EthersAdapter,
  SdkFlavour,
} from "@aztec/sdk";
import { Provider, Signer } from "@wagmi/core";

const AZTEC_PROOF_SERVER_URL = "http://localhost:8081";

export const createAztecAccount = async (
  provider: Provider,
  signer: Signer,
  address: string
) => {
  const ethProvider = new EthersAdapter(provider);
  const ethAddress = EthAddress.fromString(address);

  const sdk = await createAztecSdk(ethProvider, {
    serverUrl: AZTEC_PROOF_SERVER_URL,
    pollInterval: 1000,
    memoryDb: true,
    debug: "bb:*",
    flavour: SdkFlavour.PLAIN,
    minConfirmation: 1, // ETH block confirmations
  });

  await sdk.run();
  const { publicKey: accPubKey, privateKey: accPriKey } =
    await sdk.generateAccountKeyPair(
      ethAddress,
      new EthersAdapter(signer.provider!)
    );

  // if (await sdk.isAccountRegistered(accPubKey)) {
  //     console.log('Account exists!!!');
  // } else {
  //     console.log('Account does not exist!');
  // }

  const doesUserExist = await sdk.userExists(accPubKey);

  const sdkUser = doesUserExist
    ? await sdk.getUser(accPubKey)
    : await sdk.addUser(accPriKey);

  console.log(sdkUser);
  //   // Generate user's spending key & signer
  //   // The spending keypair is used for receiving/spending funds on Aztec
  //   const { privateKey: spePriKey } = await sdk.generateSpendingKeyPair(
  //     ethAddress,
  //     new EthersAdapter(signer.provider!)
  //   );

  //   console.log("spePriKey ", spePriKey);

  //   const schSigner = await sdk.createSchnorrSigner(spePriKey);
  //   console.log("Signer:", schSigner);

  //   console.log("Privacy Key:", accPriKey);
  //   console.log("Public Key:", accPubKey.toString());

  return { accPubKey, sdk };
};
