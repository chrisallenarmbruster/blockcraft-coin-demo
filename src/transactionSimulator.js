/**
 * This file is part of the Blockcraft Coin Demo blockchain project.
 *
 * It is responsible for seeding and simulating entries or transactions.
 *
 * Initially, it seeds the blockchain with 1000 entries through the api. After this initial seeding,
 * it remains running and simulates intermittent transactions.
 *
 * This script is run as part of a Docker Compose stack included in the project.
 *
 *
 */

import crypto from "crypto";
import elliptic from "elliptic";
const EC = elliptic.ec;
const ec = new EC("secp256k1");
import axios from "axios";
import { faker } from "@faker-js/faker";

let docker = true;

if (process.argv.includes("no-docker")) {
  docker = false;
}

const accounts = [
  {
    privateKey:
      "eb25c7091e6d1085596924e0c45dca79492c754ced32fe156ef3cf8241ab36fc",
    publicKeyCompressed:
      "03b5f4f8ea6eb0d146a3e9a2a0dd89c0124acd5a980a230d097bf6794a85d0d879",
    label: "DemoPersonal",
  },
  {
    privateKey:
      "ef4f978f9dfe98b3da6c195f10ef08a40d230f4278cb5d7eff0a68154c049213",
    publicKeyCompressed:
      "03a010ab53e15ec2f56c1f83dcb7fddbc80334fb5aeda42346580208be6be0c8d6",
    label: "DemoWork",
  },
  {
    privateKey:
      "bf57ea21283cf44ed224c0e737356ed39b49312089348d6bc8cd4eaee717de4f",
    publicKeyCompressed:
      "0305fbfef5295b9e13a6a1c6208b93bbedbc9d259e8b5e5956b64acf21ab5600c4",
    label: "Max",
  },
  {
    privateKey:
      "eee366f4e97ec8d5cad68948ab3b668924c92b4193c53439c206a542bc2f1f73",
    publicKeyCompressed:
      "02572dff346ccd699e043839e98fe4414512080ec6821afd9ceb4edf47c7953ed7",
    label: "Isabelle",
  },
  {
    privateKey:
      "b960bd23fc35aedc01f4a4211549c82cb507d3630e40cd363a91d5bdeef0cd16",
    publicKeyCompressed:
      "021829f5f2d714bcec448f8019ffd43e267088ba42408483d7d2d1257f8d5a639b",
    label: "Melinda",
  },
  {
    privateKey:
      "30c34382d8fca736bf3459a21a3f1e2e2e01813a6d1934b1e398eba56a17a3d4",
    publicKeyCompressed:
      "027097754984f873f435d6acc434affd0e36c3530d685be10d3b9d068be0666866",
    label: "Chris",
  },
  {
    privateKey:
      "0e3fbd351b598100b7cbb1cfb616160c7e9b78f1a87eeacff8addc921768b430",
    publicKeyCompressed:
      "03797f816e17fd9ef1c0f521d7a9b608d83e1fffb64e3157b8ce186f3b58b4189e",
  },
  {
    privateKey:
      "e828647aefb983ae104d670579dd20463429bbd408b8cd4bc98b36d3b0706015",
    publicKeyCompressed:
      "032cf276cc6ec175a7fa7dfae8c8e652a0cb161bf8ffdaffc4a66f46071e51090b",
  },
  {
    privateKey:
      "30ea59802cd036c618fc334ce8ee4d9630cf177326817b1535babad4d161b39f",
    publicKeyCompressed:
      "02e31edc5c89d85ea2984afcc04603caf3b5f40a94b295fa780a74be872d208c4d",
  },
  {
    privateKey:
      "4d065cdb79226487e28e6b0a16673ad9fd3bbe7f690abfc4e8e380863f3d164e",
    publicKeyCompressed:
      "03845f109f65359905763171ed9afd3ebc0f0accbda25d2a268099dd8ccfd90d9b",
  },
  {
    privateKey:
      "912c8935a7a7ffd19282378280639b3eeca6e3563afb8d885f42789f4f9fce52",
    publicKeyCompressed:
      "03634224fdea90df3713157c3ccd4afc25ea6134114077f3647522cd6f64bd7377",
  },
  {
    privateKey:
      "edce99cf50261f5197863d3d5d770dc94c81f974501471127908e80b43a41901",
    publicKeyCompressed:
      "02d6a3f73c7fe086434ff5de4ec9a7c8a900fdf90ee23020778029e95443aa6eb9",
  },
  {
    privateKey:
      "efaca2f4a4325f41804475b4a1a2e1753e4356316733447c846cfa0e7ed79f98",
    publicKeyCompressed:
      "03d3cedcf7ac12c3f18de4b0b9e38ab26ccb024131e6f39a694ea23f2bc2614902",
  },
  {
    privateKey:
      "6b5f0008d511ab40b0b5bc04b182e41dbad8a08c3a1880abc1383003cfd846f4",
    publicKeyCompressed:
      "029194c4460e4d6b2b960c6068b5f2d29671f715639a818cd10d912ca8106628a5",
  },
  {
    privateKey:
      "838094492baa7a29cb122e16ee058cd07bd0051fd03b8cb1197205da8e21a68f",
    publicKeyCompressed:
      "03b32540fb13b9c1c84424a9a10c310b19b2bfe59ad8625f0ba41390a278d7117c",
  },
  {
    privateKey:
      "1d1ceb3245ba40f2d1c1562f949048e1c35cffe0bddc949737a5b681a4543f5a",
    publicKeyCompressed:
      "0317da79e88db33814ab4ebe50a5a9a51a87ba5438c5eb4d9fe109ee31cf1a776b",
  },
  {
    privateKey:
      "4fa5f7cb55733c921390e677326239482f28896c3a17d4a120550033519e54bc",
    publicKeyCompressed:
      "02a5c45eb46bb74fd7653883daf6a3c5f50a9aed2b199fea7615476d1605620c60",
  },
  {
    privateKey:
      "d8a0eb2734501ba372d50381694683cd8983d829034af2552e27c82498cc92d1",
    publicKeyCompressed:
      "038d8ed8cc34601a02d832f837d3bf9ec78043caefdcb7ed88b37710e6cd125b69",
  },
  {
    privateKey:
      "a9423c86bad422127445015b04ef9a7d5ae9b6bf947b5ca3c6e062e7e7ba6a36",
    publicKeyCompressed:
      "039e3520d9d25fb109b424b233cb5ad9370f811e29cbfbb449546fa1af85c2bcaf",
  },
  {
    privateKey:
      "0eb197501df0fcbef4c6279b404a5b05a08c27ebcf4129dc28128f92f0b8a964",
    publicKeyCompressed:
      "0261b36e9db1d37d6602f469a22930f60aef0a8ea88f745c728a361d9c96c4a98d",
  },
  {
    privateKey:
      "027ffe3ebccf1b1f13b50aa8ba8e216568c1ca5c7ea37d02be1a65639bd2a7b5",
    publicKeyCompressed:
      "03588dc34ab5bb7132e37b363904c5c36c613e2fee6eb134727306da1d4b47ce5b",
  },
  {
    privateKey:
      "a8a5a106032903d91d61cc6d393500a80d67d803cf0d0e384b2509abed252d45",
    publicKeyCompressed:
      "029ffacf872b2e6e4247f17b3e1baec122902d75f1fcb51a00d418bf4214cea36b",
  },
  {
    privateKey:
      "7486af7373bbb1055fdc6022517fdd9f66845add7ca7b0fd26eecc212d6b2bb1",
    publicKeyCompressed:
      "02ac768606d7438da41c3cf65bc668934f68448a2b40afd279098d3efb2819a024",
  },
  {
    privateKey:
      "286891604fddfd94d26aa663bda1c4933a9dd12766af520bedebac2fcfb0d286",
    publicKeyCompressed:
      "029341d2f284900f3c4ae81a1187b577b76e301840f060a5968fbf650b9d107f32",
  },
  {
    privateKey:
      "fcd8dc638423d4f04c3ba43f11c32c0194db1d73869629c75b2987e1169dae6f",
    publicKeyCompressed:
      "02788be6cb877b85a95995450099ffa93c0af5facd074f850dc21b19bd80a2d98b",
  },
  {
    privateKey:
      "edb441c98cf38278b15cdae8fd262f2d7567f81fbbf0067762f0eba099b8028f",
    publicKeyCompressed:
      "03f72eb4b8a0391484bc7d41fe9ed2fcb87e8ae9b7efc76953fe90df784189e9f7",
  },
  {
    privateKey:
      "5f2f9ec1de79f3607e966410273e5587274fe7ee9d487d40e562e9cdab4c0189",
    publicKeyCompressed:
      "02d3c93d7813d12c0293f791d8ce79f6fcbaff7621534a72a3e52faf82351d7878",
  },
  {
    privateKey:
      "b449060f6bbb3edfc327c34d7ebf407eebb6e4b919a0a58c3b28ab89b92f968d",
    publicKeyCompressed:
      "036332f2b0ba71874b6d8cac862054314774f3ef0692bb3a11682f3fba822cfcc5",
  },
  {
    privateKey:
      "27aa1946001952e8e07ba2b02a598e190c6a254365018c3e5927ce2cd64c08a7",
    publicKeyCompressed:
      "03b5b5f15e96f6fa96668aeb271d5c30567c1a801cdd1ceef2c111571149546642",
  },
  {
    privateKey:
      "d3420716fa708c481ead3780587f6cc1ea35f7a5e3c684e941330300ee300e84",
    publicKeyCompressed:
      "02b11fdae2dae431963858118c985fe61a2718b27c340f99d0a07d8574a92130ec",
  },
  {
    privateKey:
      "d27abb2801f1a35707bd4717e780eae8399c391855a588b7cf2262e37ffd75d7",
    publicKeyCompressed:
      "0287f8744812f0016e638c5f398e8e9ac2a24e18bc6c137a4dca036caf9b4af77d",
  },
  {
    privateKey:
      "878b5a356fb7fa0dbb39f2db5d491c9f3e6730bfe3b2efd27ebfa06c99ce2e24",
    publicKeyCompressed:
      "03dea62f6ca8a80422c4ce6ed47c64f04b50e6c9dcb00e1c1f7c4ddc9f6ae4eaad",
  },
  {
    privateKey:
      "921a540243c24906bb18852be471d5e2ae13dbf956f351ae735d2dcf70f3de14",
    publicKeyCompressed:
      "038b94ee9fcb755980f383f5e6cd9a4da59e9bb17cc55075456f51ff079edb522f",
  },
  {
    privateKey:
      "3ea3515f471a7d939fce868dd81cb80a87636908e6cdfaa45778815bd3eb3947",
    publicKeyCompressed:
      "034c1cc75d50b7807c03ad89eb13617db902d53faa0dfde5438c1c63800bf38738",
  },
  {
    privateKey:
      "311c4f40efbe6b7f8c7325299808fa8dd4ced70feb88fdbef8c3214a324153b1",
    publicKeyCompressed:
      "039b87a9525b1e9dc35e191d1d62f08bb7a73db647ee009a7b8fe633bbee2399b7",
  },
  {
    privateKey:
      "10d50cb3a1a2b374b41700252b5efc9f8163e41a3d625aeeac63ed172b9cd81e",
    publicKeyCompressed:
      "02db43e8354c51953012714ccae96e5b019df348358fdba9df7e215ae7b2290bd7",
  },
  {
    privateKey:
      "067e3dfea345f01d44e06ff18a1fb47aa8b440b8870821a36b63556af49265c4",
    publicKeyCompressed:
      "023290bb993e421886c670f283513038a8daa2ab44d5c2b7878fe92ab9fcc6cd04",
  },
  {
    privateKey:
      "8f3720107fb47defa21f77d1ee71ba407522a6f2e7bef09175beddf85e080241",
    publicKeyCompressed:
      "02206bdf804cb3727f2d05d57581d93a6154eb5c1779760f9225d3ce227ba6a305",
  },
  {
    privateKey:
      "047f94309e3cf880ee95db0a81f63ff5fd2e86c38d928b86a5895023921bd102",
    publicKeyCompressed:
      "024dc613d8bed26874c3b684fff7dcf9d3c457421a1261e0e55113c982bd2b670c",
  },
  {
    privateKey:
      "eee42f96f4ab05655b55c29a1ef53aa353f495ee168c373b3fbf806be834e1f3",
    publicKeyCompressed:
      "03315c89b3cd3a2bd935dfb3232046963903bd0124b200f3b11739ec8c710288fe",
  },
  {
    privateKey:
      "0561a56b935a1e471d011456e7b5b062ce4c869c41698c3cdc47129e4e9c97e6",
    publicKeyCompressed:
      "039f18b2898edee1c16e7d5afe61ac1a98aeb841eaa02f50ca38eb76ff68b38888",
  },
  {
    privateKey:
      "6d1e6b718a11b8b81e45b4b6c77ebc9cd2a311e011ccb73db2aa3e51061e22f7",
    publicKeyCompressed:
      "03980f3596a929c7b1255c494a42db584fb297bf17070012194c415873b85c4cbb",
  },
  {
    privateKey:
      "2dc58fe2cc3ae2c54086ca3b656491f0e13ce58aed5ab7822b494687399ccf4e",
    publicKeyCompressed:
      "03265cf0c44685b734ca374d5fa4fb12be549e140887c5699d1d5d58562ef2101b",
  },
  {
    privateKey:
      "f066c34e2f4db45c2c249295d02f24da9522e084188a441a0f2a9c110ca9f18a",
    publicKeyCompressed:
      "03f7e5503fe116f6178204dd92a1e20fd0b445a1732411179c6cee20c64f1390a5",
  },
  {
    privateKey:
      "47d2b22a260727ecaa76688b4861d4d8acddc4d570bce61b8f1a478027427a1a",
    publicKeyCompressed:
      "0234164c778c433648ed067fbcdad54ad901f55b05331b26388c155bf7db524374",
  },
  {
    privateKey:
      "083040709c219c5ad7f3f06ebff1c321df6b52834ba253d02e85102ba48aa6f7",
    publicKeyCompressed:
      "03170187dee939649d59ea7d28e1a231be34029bc1e0435a979d6c202c1891e3b3",
  },
  {
    privateKey:
      "4a52b44837b207623f05b5345ba4068b46c445fcecc167c86ba7cd92e6c75bf1",
    publicKeyCompressed:
      "023462ebfb638c1f2bfc5b0c792904c23c28bfdd589d95fa14977ff4d2e1fa3243",
  },
  {
    privateKey:
      "0eedc3d8e5b37ce6b7dd95e78efbd1ed65fc43909cc4148805601f53807ce4ba",
    publicKeyCompressed:
      "039dbb7af20fdf02dc6d1f55768a3b905a07fafcd4d7b8e6638761aca75504bcea",
  },
  {
    privateKey:
      "d4d75d58b28017e8f5774fa0d6b43de7244e3a0b9efe481683635f4e3b104883",
    publicKeyCompressed:
      "02fef0bf0d8b530522652ca87803402e387d41fafdf8874b71aa864f5531678a68",
  },
  {
    privateKey:
      "c6335415c3bade12e2f2b58b182b09eea75a8da508a414fcfb240c2e5354b046",
    publicKeyCompressed:
      "03f7a4f46d9206f87032f7cc4f9fc3fd5afa2e93b8b300719cc5e976f5ca223864",
  },
];

const networkNodeAccounts = [
  {
    privateKey:
      "67a522d73b9e9a0bf50d356ab68f0b79a095e283371aaf9dbca7159a54af69b0",
    publicKeyCompressed:
      "03b629b92d58fd5abe58e2322a681e8c76e363a5691f27845ca6b9d5e7dee696cc",
    url: docker ? "node1" : "localhost",
    webServicePort: docker ? process.env.WEB_SERVICE_PORT || 443 : 3000,
    label: "Node 1",
  },
  {
    privateKey:
      "74529a9708b281c8451e885cc5dfee01f8af6e09a2ab15a63b48bc566cd21779",
    publicKeyCompressed:
      "024821805babaf7ccd225fc7e4854be0bfa1efc923bd9dfa974f8ab3047dc5f89a",
    url: docker ? "node2" : "localhost",
    webServicePort: docker ? process.env.WEB_SERVICE_PORT || 443 : 3001,
    label: "Node 2",
  },
  {
    privateKey:
      "aa8f4402585881e319c649dc716b6b6459d695074de749aa6a5fd7b103f99e40",
    publicKeyCompressed:
      "02d903494ac25f4d84f912274d1b39c1c9c4d20a85c3c0aeab53ad7a8c4cd3ebdb",
    url: docker ? "node3" : "localhost",
    webServicePort: docker ? process.env.WEB_SERVICE_PORT || 443 : 3002,
    label: "Node 3",
  },
  {
    privateKey:
      "25794138f901158a61f630b08e81fd1e5aa4d338534d2e538c7bfcb4c161838d",
    publicKeyCompressed:
      "02d445a9280410ccfc5c5479323b09d74603cda341f51f5542368ac89b17fc446a",
    url: docker ? "node4" : "localhost",
    webServicePort: docker ? process.env.WEB_SERVICE_PORT || 443 : 3003,
    label: "Node 4",
  },
];

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

async function simulateTransactions() {
  let entryCount = await getEntryCount();
  const numberEntriesToAdd = 1000;
  const millisecondsBetweenEntries = 4567;

  function signEntry(entry, privateKeyHex) {
    const sign = crypto.createSign("SHA256");
    sign.update(JSON.stringify(entry));
    sign.end();
    const ecKeyPair = ec.keyFromPrivate(privateKeyHex);
    const signature = ecKeyPair.sign(JSON.stringify(entry)).toDER("hex");
    return signature;
  }

  async function getEntryCount() {
    //https not necessary since we are using the internal network set up by docker compose
    const response = await axios.get(
      `http://${networkNodeAccounts[0].url}:${networkNodeAccounts[0].webServicePort}/api/entries`
    );
    const data = response.data;
    return data.meta && data.meta.total ? parseInt(data.meta.total) : 0;
  }

  function hashEntry(entry) {
    const hash = crypto.createHash("SHA256");
    hash.update(JSON.stringify(entry));
    return hash.digest("hex");
  }

  async function computeAccountBalance(account, nodeUrl) {
    try {
      const response = await axios.get(
        `${nodeUrl}/api/entries?publicKey=${account}`
      );
      return response.data.meta.netAmount;
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  async function createAndAddEntry(networkNodeAccounts, accounts) {
    const node = networkNodeAccounts.random();
    const senderKeyPair = accounts.random();
    //https not necessary since we are using the internal network set up by docker compose
    const accountBalance = await computeAccountBalance(
      senderKeyPair.publicKeyCompressed,
      `http://${node.url}:${node.webServicePort}`
    );

    if (accountBalance > 0) {
      let amount = Math.floor(Math.random() * accountBalance);
      amount = amount === 0 ? accountBalance : amount;
      const unsignedEntry = {
        from: senderKeyPair.publicKeyCompressed,
        to: accounts.random().publicKeyCompressed,
        amount: amount,
        type: "crypto",
        initiationTimestamp: Date.now(),
        data: `${node.label} @ ${new Date()
          .toLocaleString("en-US", {
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })
          .replace(", ", "-")} - ${faker.finance.bic()}`,
      };

      const entryHash = hashEntry(unsignedEntry);

      const entryToSign = {
        ...unsignedEntry,
        hash: entryHash,
      };

      const signature = signEntry(entryToSign, senderKeyPair.privateKey);

      const signedEntry = {
        ...unsignedEntry,
        hash: entryHash,
        signature: signature,
      };

      console.log(`Adding entry: ${unsignedEntry.data}`);
      //https not necessary since we are using the internal network set up by docker compose
      await addEntry(signedEntry, `http://${node.url}:${node.webServicePort}`);

      return 1;
    }

    return 0;
  }

  async function addEntry(signedEntry, nodeUrl) {
    try {
      const response = await axios.post(`${nodeUrl}/api/entries`, signedEntry);
      return response.data;
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  function scheduleNextEntry() {
    const delay = Math.random() * (20 * 60 * 1000 - 60 * 1000) + 60 * 1000;

    setTimeout(async () => {
      entryCount += await createAndAddEntry(networkNodeAccounts, accounts);
      scheduleNextEntry();
    }, delay);
  }

  const intervalId = setInterval(async () => {
    if (entryCount >= numberEntriesToAdd) {
      clearInterval(intervalId);
      scheduleNextEntry();
    } else {
      entryCount += await createAndAddEntry(networkNodeAccounts, accounts);
    }
  }, millisecondsBetweenEntries);

  setInterval(() => {}, 3600000);
}

console.clear();
console.log("Starting Simulator...");

setTimeout(simulateTransactions, 10000);
