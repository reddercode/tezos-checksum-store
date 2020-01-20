import { Tezos } from '@taquito/taquito'
import { Contract } from '@taquito/taquito/dist/types/contract/contract'
import axios, { AxiosResponse } from 'axios';

const fs = require('fs')
const { email, password, mnemonic, secret } = JSON.parse(fs.readFileSync('./faucet.json').toString())

export interface BigMapKeyResponse {
    key_type: string;
    key_encoding: string;
    key_hash: string;
    key: string;
    time: string;
    height: number;
}
export interface BigMapValueResponse {
    key: BigMapKeyResponse;
    value: any;
}


export interface BigMapKeyUpdatesResponse {
    big_map: string;
    action: string;
    key: {
        string?: string;
        int?: string;
        bytes?: string;
    };
    key_hash: string;
    value: any;
}

export class ContractService {

    private async setup() {
        if (this.secretKey) {
            return Tezos.importKey(this.secretKey)
        } else {
            return Tezos.importKey(email, password, mnemonic.join(" "), secret)
        }
    }

    private _contractInstance: Promise<Contract> | null = null;

    private get contractInstance(): Promise<Contract> {
        if (!this._contractInstance) {
            this._contractInstance = Tezos.contract.at(this.contractAddress)
            return this._contractInstance;
        } else {
            return this._contractInstance;
        }
    }

    constructor(private contractAddress: string, url?: string, private secretKey?: string, private tzstatsUrl: string = 'https://api.babylonnet.tzstats.com') {
        Tezos.setProvider({ rpc: url || "https://api.tez.ie/rpc/babylonnet" })
    }

    public async addLog(entity_id: string, hash: string) {
        await this.setup();
        const contract = await this.contractInstance
        try {
            const op = await contract.methods.addLog(entity_id, hash).send()
            await op.confirmation()
            if (op.status !== 'applied') {
                throw new Error("Operation was not applied")
            }

            return op
        } catch (ex) {
            const { owner } = await contract.storage()
            const currentSigner = await Tezos.signer.publicKeyHash()
            throw Object.assign(ex, { owner, currentSigner })
        }
    }

    public async deploy(owner?: string) {
        await this.setup();
        const op = await Tezos.contract.originate({
            code: JSON.parse(fs.readFileSync("./Audit.json").toString()),
            init: {
                "prim": "Pair",
                "args":
                    [[],
                    { "string": owner || await Tezos.signer.publicKeyHash() }]
            },
        })
        await op.confirmation()
        return op;
    }

    public async deleteEntity(entity_id: string) {
        await this.setup();
        const contract = await this.contractInstance
        try {
            const op = await contract.methods.deleteEntity(entity_id).send()
            await op.confirmation()
            if (op.status !== 'applied') {
                throw new Error("Operation was not applied")
            }

            return op
        } catch (ex) {
            const { owner } = await contract.storage()
            const currentSigner = await Tezos.signer.publicKeyHash()
            throw Object.assign(ex, { owner, currentSigner })
        }
    }

    public async setNewOwner(newOwner: string) {
        await this.setup();
        const contract = await this.contractInstance
        try {
            const op = await contract.methods.setOwner(newOwner).send()
            await op.confirmation()
            if (op.status !== 'applied') {
                throw new Error("Operation was not applied")
            }

            return op
        } catch (ex) {
            const { owner } = await contract.storage()
            const currentSigner = await Tezos.signer.publicKeyHash()
            throw Object.assign(ex, { owner, currentSigner })
        }
    }

    public async readLastLogs(key: string) {
        const contract = await this.contractInstance;
        const storage = await contract.storage<any>()
        const id = storage.entries.id.toString()
        return storage.entries.get(key);
    }

    public async getAllEntries() {
        const contract = await this.contractInstance;
        const storage = await contract.storage<any>()
        const id = storage.entries.id.toString()
        const { data } = await axios.get<BigMapKeyResponse[]>(`${this.tzstatsUrl}/explorer/bigmap/${id}/keys`)
        return data.map((x) => x.key);
    }
}