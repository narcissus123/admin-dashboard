import React from "react";

export const useFetch = (request, ...rest) => {
  /* Rendering spinner while we are waiting for backend response. */
  const [isLoading, setIsLoading] = React.useState(true);

  /* Saving news information sent from backend. */
  const [data, setData] = React.useState([]);

  const getAllData = async (ignore) => {
    try {
      const response = await request(rest);

      if (response.success && !ignore) {
        setData(response.result);
        setIsLoading(false);
      } else if (response.status === 200 && !ignore) {
        setData(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      // Log the error to the error reporting service.
      console.error(error);
    }
  };

  /* Call API to get all data.*/
  React.useEffect(() => {
    let ignore = false;
    getAllData(ignore);

    return () => {
      ignore = true;
    };
  }, []);

  return { isLoading, data };
};
