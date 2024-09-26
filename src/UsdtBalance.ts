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
