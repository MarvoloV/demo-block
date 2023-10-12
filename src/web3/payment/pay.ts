import { ethers } from "ethers";
import {
  USDC_ABI_CONTRACT_ADDRESS,
  USDC_ABI,
} from "../../utils/contracts/contracts";
export const mintToken = async (account: any) => {
  const { ethereum } = window;
  const chainId = 80001;
  if (ethereum) {
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const usdc20Contract = new ethers.Contract(
      USDC_ABI_CONTRACT_ADDRESS,
      USDC_ABI,
      signer
    );

    // set the domain parameters
    const domain = {
      name: "Mumbai USD Coin",
      version: "2",
      verifyingContract: USDC_ABI_CONTRACT_ADDRESS,
      salt: ethers.AbiCoder.defaultAbiCoder().encode(
        ["uint256"],
        [`${chainId}`]
      )
    };

    // set the Permit type parameters
    const types = {
      Permit: [
        {
          name: "owner",
          type: "address",
        },
        {
          name: "spender",
          type: "address",
        },
        {
          name: "value",
          type: "uint256",
        },
        {
          name: "nonce",
          type: "uint256",
        },
        {
          name: "deadline",
          type: "uint256",
        },
      ],
    };

    const nonce = await usdc20Contract.nonces(
      account
    );

    // set the Permit type values
    const permit = {
      owner: account,
      spender: "0x93EDF78a6bf7D42066fc1d3994F668096CfB1724",
      value: 10000000,
      nonce: Number(nonce),
      deadline: 9999999999,
    };

    const signature = await signer.signTypedData(domain, types, permit);
    const sig = ethers.Signature.from(signature);

    // permit the tokenReceiver address to spend tokens on behalf of the tokenOwner
    let tx = await usdc20Contract.permit(
      account,
      "0x93EDF78a6bf7D42066fc1d3994F668096CfB1724",
      10000000,
      9999999999,
      sig.v,
      sig.r,
      sig.s
    );
    
    await tx.wait(2); 

    // LUEGO DE ESTO LLAMAS A TU SERVICIO CON ACCOUNT E INICIAS EL CRONJOB
  }
};
