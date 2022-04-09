# solana-account-loader
Simple package for loading solana accounts via `getMultipleAccounts` i a more fancy way

Usage:
`
const batchSize = 100;
const pollInterval = 10;
let loader = new AccountLoader(conn, batchSize, pollInterval);

let infos = await Promise.all(keys.map(async key => loader.load(key)))
`