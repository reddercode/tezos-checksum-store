const { Tezos } = require('@taquito/taquito')

const fs = require("fs");

Tezos.setProvider({ rpc: "https://api.tez.ie/rpc/babylonnet" })

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
].join(" "), "7d4c8c3796fdbf4869edb5703758f0e5831f5081").then(() => {
    return Tezos.contract.originate({
        code: JSON.parse(fs.readFileSync("./build/Audit.json").toString()),
        init: {
            "prim": "Pair",
            "args":
                [[],
                { "string": "tz1bwsEWCwSEXdRvnJxvegQZKeX5dj6oKEys" }]
        },
    })
}).then((op) => {
    return op.contract()
}).then((contract) => {
    console.log('Deployed at:', contract.address)
})
