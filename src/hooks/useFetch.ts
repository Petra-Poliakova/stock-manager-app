import { useState, useEffect, useCallback, useRef } from 'react';

type TFetchResponse<T> = {
    status: number | null;
    statusText: string | null;
    data?: T | null;
    error: Error | null;
    isLoading: boolean;
}

type TFetchOptions = RequestInit;

  export const useFetch = <T>(url: string, options?: TFetchOptions): TFetchResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<number | null>(null);
  const [statusText, setStatusText] = useState<string | null>(null);

  const optionsRef = useRef<TFetchOptions | undefined>(options);
  const abortControllerRef = useRef<AbortController >();

   const fetchData = useCallback(async (): Promise<void> => {
      setIsLoading(true);

       abortControllerRef.current = new AbortController();
       const { signal } = abortControllerRef.current;

      try {
        const { method = 'GET', ...restOptions } = optionsRef.current || {};
        const response = await fetch(url, {
          method,
          ...restOptions,
          //...options,
          //method: options?.method || 'GET',
          signal,
        });
          const json = await response.json();
          setStatus(response.status);
          setStatusText(response.statusText);

          //console.log(json); 
          setData(json);
        
      } catch (error: any) {
        if(error.name !== 'AbortError') {
          setError(error instanceof Error ? error : new Error('Unknown error'));
        } 

      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    },[url]);
  
  useEffect(() => {
    if (JSON.stringify(optionsRef.current) !== JSON.stringify(options)) {
      optionsRef.current = options;
    }
    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };

  }, [fetchData, options]);

  return { data, error, isLoading, status, statusText };
};


//https://github.com/cosdensolutions/code/blob/master/videos/long/data-fetching-complete-tutorial/index.tsx
//https://dev.to/sebastienlorber/handling-api-request-race-conditions-in-react-4j5b