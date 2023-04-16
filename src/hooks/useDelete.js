import { useState, useEffect } from "react";

export const useDelete = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    async function deleteItem(url) {
      try {
        setLoading(true);
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }});
   
        if (!response.ok) {
          throw Error("could not fetch the data for that resource");
        }
        const responseData = await response.json();
        return responseData;
      } catch (e) {
  
      } finally {
          setLoading(false);
      }
    }

  return { deleteItem, loading, error };
};
