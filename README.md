# solana-account-loader
Simple package for loading solana accounts via `getMultipleAccounts` in a more fancy way

Usage:
```typescript
const batchSize = 100; // number of accounts to pass in a single getMultipleAccounts request
const pollInterval = 10; // time in ms to store keys in queue before requests
let loader = new AccountLoader(conn, batchSize, pollInterval);

let infos = await Promise.all(
  keys.map(async key => loader.load(key))
);
```
