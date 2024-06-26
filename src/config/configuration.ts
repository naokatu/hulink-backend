/**
 * 環境変数の取得を行う
 * @param key
 */
function getEnv(key: string): string {
  const value = process.env[key]

  if (!value) {
    throw new Error(`environment variable ${key} is not defined`)
  }

  return value
}

// 文字列を boolean に変換する
function parseBoolean(value: string): boolean {
  if (value === 'true') {
    return true
  }

  if (value === 'false') {
    return false
  }

  throw new Error(`environment variable is not boolean: ${value}`)
}

// 文字列を number に変換する
function parseNumber(value: string): number {
  const parsed = Number(value)
  if (isNaN(parsed)) {
    throw new Error(`environment variable is not number: ${value}`)
  }
  return parsed
}

export type Config = {
  APP_ENV: string
  APP_PORT: number
  LOG_PRETTY_PRINT: boolean
  LOG_LEVEL: string
  AUTH_ENABLED: boolean
}

export default (): Config => {
  return {
    APP_ENV: getEnv('APP_ENV'),
    APP_PORT: parseNumber(getEnv('APP_PORT')),
    LOG_PRETTY_PRINT: parseBoolean(getEnv('LOG_PRETTY_PRINT')),
    LOG_LEVEL: getEnv('LOG_LEVEL'),
    AUTH_ENABLED: parseBoolean(getEnv('AUTH_ENABLED')),
  }
}
