import program from 'commander';
import { ContractService } from './contract-service';
program.version('0.0.1');

program.command("add-log <entity_id> <hash>")
    .option("-c, --contract <contract>", "Log smart contract address")
    .option("-r, --remote-signer <url>", "Remote signer url")
    .option("-n, --rpc-url <url>", "Rpc url")
    .action(async (entity_id, logHash, command) => {
        try {
            const contractService = new ContractService(command.contract, process.env['SECRET_KEY'])
            const { includedInBlock, hash } = await contractService.addLog(entity_id, logHash)
            console.log(`Log entry added for entity: ${entity_id}`, { includedInBlock, hash, contract: command.contract })
        } catch (ex) {
            console.error(ex)
        }
    })

program.command("deploy")
    .option("-o, --owner <owner>", "Initial owner of the contract")
    .option("-r, --remote-signer <url>", "Remote signer url")
    .option("-n, --rpc-url <url>", "Rpc url")
    .action(async (command) => {
        try {
            const contractService = new ContractService(command.owner, process.env['SECRET_KEY'])
            const { includedInBlock, hash, contractAddress } = await contractService.deploy(command.owner)
            console.log(`Contract deployed: ${contractAddress}`, { includedInBlock, hash, contract: contractAddress })
        } catch (ex) {
            console.error(ex)
        }
    })

program.command("delete-entity <entity_id>")
    .option("-c, --contract <contract>", "Log smart contract address", process.env['SECRET_KEY'])
    .option("-r, --remote-signer <url>", "Remote signer url")
    .option("-n, --rpc-url <url>", "Rpc url")
    .action(async (entity_id, command) => {
        try {
            const contractService = new ContractService(command.contract)
            const { includedInBlock, hash } = await contractService.deleteEntity(entity_id)
            console.log(`Entity deleted: ${entity_id}`, { includedInBlock, hash, contract: command.contract })
        } catch (ex) {
            console.error(ex)
        }
    })

program.command("set-owner <new_owner>")
    .option("-c, --contract <contract>", "Smart contract address", process.env['SECRET_KEY'])
    .option("-r, --remote-signer <url>", "Remote signer url")
    .option("-n, --rpc-url <url>", "Rpc url")
    .action(async (new_owner, command) => {
        try {
            const contractService = new ContractService(command.contract)
            const { includedInBlock, hash } = await contractService.setNewOwner(new_owner)
            console.log(`Owner changed: ${new_owner}`, { includedInBlock, hash, contract: command.contract })
        } catch (ex) {
            console.error(ex)
        }
    })

program.parse(process.argv);