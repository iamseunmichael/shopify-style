import { SWRConfiguration } from "swr";

export const swrConfig: SWRConfiguration = {
    revalidateOnFocus: true,
    shouldRetryOnError: false,
    dedupingInterval: 5000,
    errorRetryCount: 2,
}