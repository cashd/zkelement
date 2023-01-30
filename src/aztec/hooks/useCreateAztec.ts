import { useMutation } from "@tanstack/react-query";
import { AztecContext } from "aztec/context/AztecContext.js";
import { createAztecAccount } from "aztec/createAztecAccount.js";
import { Signer } from "ethers";
import { useContext } from "react";
import { useProvider } from "wagmi";

interface CreateAztecArgs {
  signer: Signer;
}

export function useCreateAztec() {
  const { setAztecSDK } = useContext(AztecContext);
  const provider = useProvider();

  return useMutation(async ({ signer }: CreateAztecArgs) => {
    const address = await signer.getAddress();
    const { sdk } = await createAztecAccount(provider, signer, address);

    setAztecSDK(sdk);
  });
}

// export function useVote(): UseMutationResult<
//   string,
//   unknown,
//   VoteArguments,
//   unknown
// > {
//   const { coreVoting } = useCouncil();
//   const queryClient = useQueryClient();
//   let toastId: string;
//   return useMutation(
//     async ({ signer, proposalId, ballot }: VoteArguments) => {
//       const proposal = coreVoting.getProposal(proposalId);
//       return proposal.vote(signer, ballot, {
//         onSubmitted: () => (toastId = toast.loading("Voting")),
//       });
//     },
//     {
//       onSuccess: (_, { proposalId, ballot }) => {
//         toast.success(
//           `Successfully voted ${ballot} on Proposal ${proposalId}!`,
//           {
//             id: toastId,
//           },
//         );
//         queryClient.invalidateQueries();
//       },
//       onError: (error, { proposalId, ballot }) => {
//         toast.error(`Failed to vote ${ballot} on Proposal ${proposalId}.`, {
//           id: toastId,
//         });
//         console.error(error);
//       },
//     },
//   );
// }
