import { promises } from 'fs';
import React, { useEffect } from 'react';
import { sendTransactions } from '@elrondnetwork/dapp-core';
import { DappProvider } from '@elrondnetwork/dapp-core';
import {
  Address,
  AddressValue,
  ContractFunction,
  ProxyProvider,
  Query,
  AbiRegistry,
  SmartContractAbi,
  SmartContract,
  Interaction,
  GasLimit,
  BooleanValue,
  Nonce,
  NetworkConfig
} from '@elrondnetwork/erdjs';
import { ProxyNetworkProvider } from '@elrondnetwork/erdjs-network-providers';
import axios, { AxiosResponse } from 'axios';
import { contractAddress } from 'config';

export default function TxTest() {
  const networkProvider = new ProxyProvider(
    'https://devnet-gateway.elrond.com'
  );

  const sendTx = async () => {
    const abi = await SmartContractAbi.fromAbiUrl(
      'http://localhost:3000/assets/json/random_item_shop.abi.json'
    );
    await NetworkConfig.getDefault().sync(networkProvider);

    const contract = new SmartContract({
      address: new Address(contractAddress),
      abi: abi
    });

    const setActiveInteraction: Interaction = contract.methods.setActive([
      new BooleanValue(true)
    ]);
    const transaction = setActiveInteraction.buildTransaction();
    transaction.setGasLimit(new GasLimit(500000000));
    console.trace(transaction);

    const txResponse = await sendTransactions(transaction);
    console.log(txResponse);
  };

  return (
    <>
      <button onClick={sendTx}>Claim</button> <br />
    </>
  );
}
