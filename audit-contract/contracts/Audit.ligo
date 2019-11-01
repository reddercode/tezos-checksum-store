// variant defining pseudo multi-entrypoint actions
type log_entry is record
    hash : string;
    date_updated: timestamp;
end

type contract_storage is record
    owner: address;
    entries: big_map(nat, log_entry)
end

type action is
| AddLog of (nat * string)
| SetOwner of address

function add_logs (const entity: nat ; const log_hash: string ; var contract_storage : contract_storage) : contract_storage is
  begin
    const entry : log_entry = record
      hash = log_hash;
      date_updated = now;
    end;
    if contract_storage.owner =/= sender then
      failwith ("You must be the owner of the contract to add log entry.");
    else contract_storage.entries[entity] := entry;
  end with contract_storage

function set_owner (const owner: address ; var contract_storage : contract_storage) : contract_storage is
  begin
    if contract_storage.owner =/= sender then
      failwith ("You must be the owner of the contract to set owner.");
    else contract_storage.owner := owner;
  end with contract_storage

function main (const p : action ; const s : contract_storage) : 
  (list(operation) * contract_storage) is
 block { skip } with ((nil : list(operation)),
  case p of
  | AddLog(n) -> add_logs(n.0, n.1, s)
  | SetOwner(n) -> set_owner(n, s)
 end)