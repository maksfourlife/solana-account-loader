import { AccountInfo, Connection, PublicKey } from "@solana/web3.js";

export class AccountLoader {
  private queue: {
    key: PublicKey;
    resolve: (accountInfo: AccountInfo<Buffer> | null) => void;
    reject: (reason: any) => void;
  }[] = [];
  constructor(conn: Connection, batchSize = 100, pollInterval = 10) {
    setInterval(async () => {
      let queue = this.queue;
      this.queue = [];
      let futures: Promise<(AccountInfo<Buffer> | null)[]>[] = [];
      for (let i = 0; i < queue.length; i += batchSize) {
        futures.push(conn.getMultipleAccountsInfo(queue.map(({ key }) => key)));
      }
      Promise.all(futures)
        .then((batches) =>
          batches.flat().forEach((info, i) => queue[i].resolve(info))
        )
        .catch((reason) => queue.forEach(({ reject }) => reject(reason)));
    }, pollInterval);
  }

  async load(key: PublicKey): Promise<AccountInfo<Buffer> | null> {
    return new Promise((resolve, reject) =>
      this.queue.push({ key, resolve, reject })
    );
  }
}
