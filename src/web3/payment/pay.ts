import { ethers } from "ethers";
import {
  USDC_ABI_CONTRACT_ADDRESS,
  USDC_ABI,
} from "../../utils/contracts/contracts";
export const mintToken = async () => {
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
      name: "USDC",
      version: "2",
      salt: ethers.AbiCoder.defaultAbiCoder().encode(
        ["uint256"],
        [`${chainId}`]
      ),
      chainId,
      verifyingContract: USDC_ABI_CONTRACT_ADDRESS,
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
      "0x0bFE2c0e0a605E15d9706Be8f1D4bBcDB298e94e"
    );

    // set the Permit type values
    const values = {
      owner: "0x0bFE2c0e0a605E15d9706Be8f1D4bBcDB298e94e",
      spender: "0x93EDF78a6bf7D42066fc1d3994F668096CfB1724",
      value: 10000000,
      nonce,
      deadline: 9999999999,
    };

    const signature = await signer.signTypedData(domain, types, values);
    const sig = ethers.Signature.from(signature);

    // const gasPrice = (await provider.getFeeData()).gasPrice;

    // permit the tokenReceiver address to spend tokens on behalf of the tokenOwner
    let tx = await usdc20Contract.permit(
      "0x0bFE2c0e0a605E15d9706Be8f1D4bBcDB298e94e",
      "0x93EDF78a6bf7D42066fc1d3994F668096CfB1724",
      10000000,
      9999999999,
      sig.v,
      sig.r,
      sig.s
      // {
      //   gasPrice: gasPrice,
      //   gasLimit: 80000, //hardcoded gas limit; change if needed
      // }
    );
    await tx.wait(2); //wait 2 blocks after tx is confirmed
    tx = await usdc20Contract.transferFrom(
      "0x0bFE2c0e0a605E15d9706Be8f1D4bBcDB298e94e",
      "0x93EDF78a6bf7D42066fc1d3994F668096CfB1724",
      1000000000
    );

    await tx.wait(2);
    console.log("🚀 ~ file: pay.ts:79 ~ mintToken ~ tx:", tx);
  }
};
