import { useState, useEffect } from 'react';

type TFetchResponse<T> = {
    status: number | null;
    statusText: string | null;
    data?: T | null;
    error: Error | null;
    isLoading: boolean;
}
// type TFetchOptions = Omit<RequestInit, 'method'> & {
//     method?: RequestInit['method'];
//   };

type TFetchOptions = RequestInit & {
  method?: RequestInit['method'];
  headers?: { "Content-Type": "application/json" },
  
};

  export const useFetch = <T>(url: string, options?: TFetchOptions): TFetchResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<number | null>(null);
  const [statusText, setStatusText] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          ...options || {},
          method: (options && options.method) || 'GET',
        });
        const json = await response.json();
        setStatus(response.status);
        setStatusText(response.statusText);
        
        console.log(json); // <-- Pridajte tento riadok
        setData(json);
      } catch (error) {
        setError(error instanceof Error ? error : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, isLoading, status, statusText };
};
