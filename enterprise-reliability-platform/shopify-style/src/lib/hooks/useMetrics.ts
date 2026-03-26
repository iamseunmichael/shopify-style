import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json());

export function useMetrics() {
  const { data, error, isLoading } = useSWR(
    "/api/dashboard/metrics",
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  return {
    metrics: data,
    isLoading,
    error,
  };
}