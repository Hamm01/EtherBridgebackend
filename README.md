# Bridge Backend for ETH

## Task completed for indexing the logs on ether blockchain

### we are polling a specific block in etherscan that have lot of transaxtions like 150-200 txns , so we are filtering transactions that based on transfer event happened for usdt transfers not eth. so in code we used the usdt contract and filtered the logs on basis of transfer event happened on transaction.

### we are getting the transactions that have usdt transfer from one address to another that can be seen in hash of transaction that we get in logs.

### we created the UsdtBalance.ts file that will track the balance for the usdt transfer by polling the transactions from latest block to previous 1000 blocks, we will track the usdt comes in and out for the address and the change, and we will fetch lates balance of usdt for that address
