import { JsonRpcProvider, id } from 'ethers'

const provider = new JsonRpcProvider(
  'https://eth-mainnet.g.alchemy.com/v2/OIoR91FXtiqdHtEnysgoYQGXlv'
)

async function pollBlock(blockNumber: number) {
  const logs = await provider.getLogs({
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7', //this is usdt contract
    fromBlock: blockNumber,
    toBlock: blockNumber,
    topics: [id('Transfer(address,address,uint256)')]
  })
}
