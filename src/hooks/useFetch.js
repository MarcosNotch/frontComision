import { useState, useEffect } from "react";


export const useFetch = (url, actualizar, otroActualizar) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalRows, setTotalRows] = useState(0)
 

  useEffect(() => {
    const abortCont = new AbortController();
    const signal = abortCont.signal;

    async function fetchData() {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("token");
        const response = await fetch(url, 
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token
            }
            });
        if (!response.ok) {
          throw Error("could not fetch the data for that resource");
        }
        const dataJson = await response.json();
        if (!signal.aborted) {
          setData(dataJson.vecinos ? dataJson.vecinos : dataJson);
          setTotalRows(parseInt(dataJson?.totalVecinos));
          setError(null);
        }
      } catch (e) {

        if (!signal.aborted) {
          setError(e.message);
          setData([]);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchData();
    return () => abortCont.abort();

  }, [url, actualizar, otroActualizar]);

  return { data, loading, error, totalRows };
};
