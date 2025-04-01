import { transfer } from './ccc'

const xudt = {
  code_hash: '0xcc9dc33ef234e14bc788c43a4848556a5fb16401a04662fc55db9bb201987037',
  hash_type: 'type',
  args: '0x71fd1985b2971a9903e4d8ed0d59e6710166985217ca0681437883837b86162f',
  tx_hash: '0xaec423c2af7fe844b476333190096b10fc5726e6d9ac58a9b71f71ffac204fee',
  index: '0x0',
}

const receives = new Map([
  ['ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsqvdmum9ttnmq49sq6sfmg8vgavsqcr6haqw2w85w', 100n],
])

export const debug = async () => {

  try {
    const tx = await transfer(
      xudt,
      [...receives.entries()].map(([address, value]) => ({ address, value })),
    )
    if (!tx) {
      throw new Error('Failed to create batch transfer')
    }

    return tx
  } catch (e) {
    console.error(e)
  }
}
