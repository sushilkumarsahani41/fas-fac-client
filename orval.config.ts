import { defineConfig } from 'orval'

export default defineConfig({
  authApi: {
    output: {
      target: './src/api/auth.ts',
      client: 'react-query',
      prettier: true,
      mock: false,
      headers: false,
      override: {
        mutator: {
          path: './src/api/auth.axios.ts',
          name: 'useCustomInstance',
        },
      },
    },
    input: {
      target: 'http://127.0.0.1:3300/v1-yaml',
    },
  },
  surveyApi: {
    output: {
      target: './src/api/survey.ts',
      client: 'react-query',
      prettier: true,
      mock: false,
      headers: false,
      override: {
        mutator: {
          path: './src/api/survey.axios.ts',
          name: 'useCustomInstance',
        },
      },
    },
    input: {
      target: 'http://127.0.0.1:3200/v1-yaml',
    },
  },
})
