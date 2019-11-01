const { Tezos } = require('@taquito/taquito')

Tezos.setProvider({ rpc: "https://api.tez.ie/rpc/babylonnet" })

// Tezos.importKey("cfqlvwse.tfbjtsqp@tezos.example.org", "GEWtP9Q8RE", [
//     "artefact",
//     "dolphin",
//     "people",
//     "attend",
//     "laptop",
//     "raise",
//     "dawn",
//     "grocery",
//     "quick",
//     "execute",
//     "step",
//     "capable",
//     "camera",
//     "indoor",
//     "end"
// ].join(" "), "ae595863b08df37815b788ea6056ac62b8a3398f")
Tezos.importKey("peqjckge.qkrrajzs@tezos.example.org", "y4BX7qS1UE", [
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
    .then(async () => {
        const contract = await Tezos.contract.at("KT1PXBHhZwqcQnoqNxTdnjN2H2VKRfnfVxnC")
        // const op = await contract.methods.addLog(1, "test").send({ gasLimit: 100000, fee: 1, storageLimit: 2000 })
        // await op.confirmation()
        // console.log('Confirmed')
        const storage = await contract.storage()
        try {
            console.log(await storage.entries.get("2"))
        } catch (ex) {
            console.log(ex)
        }
    })
