/*
 * This script demonstrates a blockchain implementation using my Blockcraft library.
 * It creates a blockchain with a Proof of Work consensus mechanism, a standard mining reward,
 * and a data and storage handler. It also sets up a network node with P2P and web services.
 *
 * The script reads a configuration file passed as a command line argument. It then creates
 * a number of accounts and network node accounts.
 *
 * The main function, `blockchain`, creates the blockchain and network node, and sets up
 * several event listeners to log the progress of the blockchain. It also defines several
 * helper functions for signing and hashing entries, and computing account balances.
 *
 * To run this script, use the command `node index.js <config-file>`, where `<config-file>`
 * is the path to a JSON configuration file. To run multiple "connected" nodes, run the
 * command in separate terminals with different configuration files.
 * From within this directory run this file with the following command:
 *
 *   node index.js demoConfig1.json
 *
 * To run multiple "connected" nodes, do the following in separate terminals:
 *
 *   node index.js  demoConfig1.json
 *   node index.js  demoConfig2.json
 *   node index.js  demoConfig3.json
 *   node index.js  demoConfig4.json
 *
 *   This will spin up a blockchain and create a genesis block that is seeded with values from the config file.
 *
 *   You can explore it at http://localhost:3000
 *
 * Alternatively you can run the docker compose file to spin up a network of nodes and a transaction simulator
 * with the following command:  docker compose up
 *
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import {
  NetworkNode,
  Blockchain,
  ProofOfWorkConsensus,
  StandardMiningReward,
  DataHandler,
  StorageHandler,
  P2PService,
  WebService,
} from "blockcraft";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configFilePath = process.argv[2];
let config;

if (configFilePath && fs.existsSync(configFilePath)) {
  config = JSON.parse(fs.readFileSync(configFilePath, "utf8"));
} else {
  const defaultConfigPath = path.join(__dirname, "commonConfig.json");
  config = JSON.parse(fs.readFileSync(defaultConfigPath, "utf8"));
}

if (process.env.NETWORK_NODE_ID) {
  config.networkNode.id = process.env.NETWORK_NODE_ID;
}

if (process.env.NETWORK_NODE_LABEL) {
  config.networkNode.label = process.env.NETWORK_NODE_LABEL;
}

if (process.env.NETWORK_NODE_URL) {
  config.networkNode.url = process.env.NETWORK_NODE_URL;
}

if (process.env.NETWORK_NODE_OWNER_ADDRESS) {
  config.networkNode.ownerAddress = process.env.NETWORK_NODE_OWNER_ADDRESS;
}

if (process.env.P2P_SERVICE_SEED_PEERS) {
  config.p2pService.seedPeers = JSON.parse(process.env.P2P_SERVICE_SEED_PEERS);
}

if (process.env.P2P_SERVICE_PORT) {
  config.p2pService.port = process.env.P2P_SERVICE_PORT;
}

if (process.env.WEB_SERVICE_PORT) {
  config.webService.port = process.env.WEB_SERVICE_PORT;
}

if (process.env.STORAGE_HANDLER_STORAGE_PATH) {
  config.storageHandler.storagePath = process.env.STORAGE_HANDLER_STORAGE_PATH;
}

async function blockchain(config) {
  let entryCount = 0;
  const numberEntriesToAdd = 1000;
  const millisecondsBetweenEntries = 3000;

  let blockchain = new Blockchain(
    new ProofOfWorkConsensus(config.consensusMechanism),
    new StandardMiningReward(config.incentiveModel),
    new DataHandler(config.dataHandler),
    new StorageHandler(config.storageHandler),
    config.blockchain
  );

  let node = new NetworkNode(
    blockchain,
    new P2PService(config.p2pService),
    new WebService(config.webService),
    config.networkNode
  );

  console.log("Configuration: ", config);

  node.blockchain.on("blockchainLoaded", (chain) => {
    console.log(
      `\nBlockchain with ${chain.length} block(s) found in storage and loaded.\n`
    );
  });

  node.blockchain.on("genesisBlockCreated", (block) => {
    console.log(
      "\nNo blockchain found in storage.  New chain initialized with Genesis Block:\n",
      block,
      "\n"
    );
  });

  node.blockchain.on("blockCreationStarted", (data) => {
    console.log(
      `\nNew block creation started for block #${node.blockchain.chain.length} with data:\n`,
      data,
      "\nMining in progress, please stand by...\n"
    );
  });

  node.blockchain.on("blockCreated", (block) => {
    console.log(
      `\nBlock #${block.index} mined in ${
        (Date.now() - block.timestamp) / 1000
      } seconds and appended to chain:\n`,
      block.toSerializableObject()
    );
  });

  node.blockchain.on("incentiveProcessed", (incentiveResult) => {
    console.log(
      `\nIncentive of ${incentiveResult.incentiveDetails.incentiveAmount} distributed to ${incentiveResult.incentiveDetails.blockCreator} for block #${incentiveResult.blockIndex}:\n`
    );
  });

  setInterval(() => {}, 3600000);
}

console.clear();
console.log("Starting Blockchain...");
console.log("Configuration: ", config);

blockchain(config);
