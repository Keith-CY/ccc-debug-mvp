import { type Config } from 'drizzle-kit'

export default {
  schema: './src/server/db/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: ':memory:',
  },
  tablesFilter: ['fiber-saas_*'],
  migrations: {
    prefix: 'timestamp',
  },
} satisfies Config
