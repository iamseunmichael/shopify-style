export const fetcher = async (url: string) => {
    const res = await fetch(url, {credentials: "include"})

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || "Failed to fetch")
    }

    return res.json()
}
