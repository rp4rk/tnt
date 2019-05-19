import { useEffect, useState } from 'react';

/**
 * Fetches from the endpoint and returns data
 * @param {String} endpoint The endpoint to fetch from
 * @param {Object} params The parameters for fetch
 */
export const useFetch = (endpoint, params) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const res = await fetch(endpoint, params);

        if (!res.ok) {
          throw new Error('Error in response');
        }

        const json = await res.json();

        setData(json);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    })();
  }, [endpoint, params]);

  return { loading, data, error };
};
