import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    APP_PRIVATE_KEY: z.string(),
  },
  client: {},
  runtimeEnv: {
    APP_PRIVATE_KEY: process.env.APP_PRIVATE_KEY,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
})
