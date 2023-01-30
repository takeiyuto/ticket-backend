import express from "express";
import Web3 from "web3";
import { Tickets } from "./types/Tickets";
import ticketsJson from "../blockchain/build/contracts/Tickets.json";
import fs from "fs";

const address = "0x...CONTRACT_ADDRESS...";
const frontendPath = "../frontend/dist";
const responseTemplate = fs.readFileSync("response.html").toString();
const portNumber = 8080;
const providerUrl = "http://127.0.0.1:8545/";

const app = express();
app.use(express.static(frontendPath));

app.get("/login", async (request, response) => {
    const message = request.query["msg"];
    const signature = request.query["sig"];

    const web3 = new Web3(providerUrl);
    // @ts-ignore 型定義と厳密には一致しない
    const tickets : Tickets = new web3.eth.Contract(ticketsJson.abi, address);

    try {
        const signer = web3.eth.accounts.recover(`${message}`, `${signature}`);
        const balanceString = await tickets.methods.balanceOf(signer).call();
        const balance = web3.utils.toNumber(balanceString);

        if (balance == 0) {
            const body = responseTemplate.replace(/MESSAGE/, `
                <div class="alert alert-danger h2 m-4 text-center">
                    チケット トークンを確認できませんでした
                </div>`);
            response.status(401).send(body);
        } else {
            const body = responseTemplate.replace(/MESSAGE/, `
                <div class="alert alert-success h2 m-4 text-center">
                    <code class="h3">${signer}</code> さん、ようこそ！
                </div>`);
            response.status(200).send(body);
        }
    } catch (e) {
        const body = responseTemplate.replace(/MESSAGE/, `
            <div class="alert alert-danger h2 m-4 text-center">
                エラーが発生しました。<br>
                (${e})
            </div>`);
        response.status(500).send(body);
    }
});

app.listen(`${portNumber}`, () => {
    console.log(`http://localhost:${portNumber}/ で開始しました。`);
});
