import { Tezos } from '@taquito/taquito'
import { Contract } from '@taquito/taquito/dist/types/contract/contract'

Tezos.setProvider({ rpc: "https://api.tez.ie/rpc/babylonnet" })

export class ContractService {

    private async setup() {
        return Tezos.importKey("cfqlvwse.tfbjtsqp@tezos.example.org", "GEWtP9Q8RE", [
            "artefact",
            "dolphin",
            "people",
            "attend",
            "laptop",
            "raise",
            "dawn",
            "grocery",
            "quick",
            "execute",
            "step",
            "capable",
            "camera",
            "indoor",
            "end"
        ].join(" "), "ae595863b08df37815b788ea6056ac62b8a3398f")
        return Tezos.importKey("peqjckge.qkrrajzs@tezos.example.org", "y4BX7qS1UE", [
            "skate",
            "damp",
            "faculty",
            "morning",
            "bring",
            "ridge",
            "traffic",
            "initial",
            "piece",
            "annual",
            "give",
            "say",
            "wrestle",
            "rare",
            "ability"
        ].join(" "), "7d4c8c3796fdbf4869edb5703758f0e5831f5081")
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

    constructor(private contractAddress: string) { }

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
}