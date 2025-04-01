import { ccc } from '@ckb-ccc/shell'
import { env } from '~/env'

const client = new ccc.ClientPublicTestnet()
const signer = new ccc.SignerCkbPrivateKey(client, env.APP_PRIVATE_KEY)

export const transfer = async (
  xudt: Record<'code_hash' | 'hash_type' | 'args' | 'tx_hash' | 'index', string>,
  receives: Array<{ address: string; value: bigint }>, // value is the raw value of xudt, not the human readable value
) => {
  const xudt_script = await client.getKnownScript(ccc.KnownScript.XUdt)

  if (!xudt_script) {
    throw new Error('XUDT script not found')
  }

  const dep = xudt_script.cellDeps[0]

  if (!dep) {
    throw new Error('XUDT cell deps not found')
  }

  const udt = new ccc.udt.Udt(
    {
      txHash: xudt.tx_hash,
      index: xudt.index,
    },
    {
      codeHash: xudt.code_hash,
      hashType: xudt.hash_type,
      args: xudt.args,
    },
  )

  const _receives = await Promise.all(
    receives.map(async (receive) => {
      const { script } = await ccc.Address.fromString(receive.address, signer.client)
      return {
        to: script,
        amount: receive.value,
      }
    }),
  )

  const { res: tx } = await udt.transfer(signer, _receives)

  console.log('before complete tx')
  const completed_tx = await udt.completeBy(tx, signer)
  console.log('before complete inputs')
  await completed_tx.completeInputsByCapacity(signer)
  console.log('before complete fee')
  await completed_tx.completeFeeBy(signer)
  console.log('end')

  return completed_tx
}

