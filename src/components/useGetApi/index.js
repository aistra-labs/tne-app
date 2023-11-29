import { useState, useEffect } from 'react';

const useGetApi = (url) => {
  const [getResponse, setGetResponse] = useState(null);
  const [getError, setGetError] = useState(null);
  const [getIsLoading, setGetIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const result = await res.json();
        setGetResponse(result.data);
      } catch (error) {
        setGetError(getError);
      } finally {
        setGetIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { getResponse, getError, getIsLoading };
};

export default useGetApi;
