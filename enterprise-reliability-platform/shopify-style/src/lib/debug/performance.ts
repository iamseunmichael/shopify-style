export async function measurePerformance<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {

  const start = performance.now()

  const result = await fn()

  const end = performance.now()

  console.log(`[PERFORMANCE] ${name} took ${end - start}ms`)

  return result
}