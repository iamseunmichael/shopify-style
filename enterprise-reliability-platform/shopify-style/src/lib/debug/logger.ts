type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG"

export function log(
  level: LogLevel,
  message: string,
  meta?: Record<string, unknown>
) {
  const timestamp = new Date().toISOString()

  console.log(`[${timestamp}] [${level}] ${message}`, meta)
}