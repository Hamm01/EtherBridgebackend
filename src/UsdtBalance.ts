// write a process that polls through the complete blockchain to see what USDT balance of some specific address 0x3f9639A92904F9921A34ddF3fef019Edff646D71

import { id, JsonRpcProvider, Contract, toBigInt, formatUnits } from 'ethers'
import { usdtabi } from './usdtABI'

const provider = new JsonRpcProvider(
  'https://eth-mainnet.g.alchemy.com/v2/api-key'
)

const USDT_CONTRACT = '0xdac17f958d2ee523a2206206994597c13d831ec7'

const ADDRESS_TO_TRACK = '0x3f9639A92904F9921A34ddF3fef019Edff646D71'

const usdtContract = new Contract(USDT_CONTRACT, usdtabi, provider)
async function getUSDTBalance() {
  try {
    // Fetch current balance
    const balance = await usdtContract.balanceOf(ADDRESS_TO_TRACK)
    console.log(`Current USDT Balance: ${formatUnits(balance, 6)} USDT`)
  } catch (error) {
    console.error('Error fetching balance:', error)
  }
}

async function pollUSDTTransfers(fromBlock: number, toBlock: number) {
  try {
    const logs = await provider.getLogs({
      address: USDT_CONTRACT,
      fromBlock,
      toBlock,
      topics: [id('Transfer(address,address,uint256)')]
    })

    let balanceChange = toBigInt(0)

    logs.forEach(log => {
      const parsedLog = usdtContract.interface.parseLog(log)
      const from = parsedLog?.args[0]
      const to = parsedLog?.args[1]
      const value = parsedLog?.args[2]

      if (from.toLowerCase() === ADDRESS_TO_TRACK.toLowerCase()) {
        balanceChange -= BigInt(value)
      }
      if (to.toLowerCase() === ADDRESS_TO_TRACK.toLowerCase()) {
        balanceChange += BigInt(value)
      }
    })
    console.log(
      `Balance Change from block ${fromBlock} to ${toBlock}: ${formatUnits(
        balanceChange,
        6
      )} USDT`
    )
  } catch (error) {
    console.error('Error polling transfers:', error)
  }
}
