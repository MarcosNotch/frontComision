import { useState } from "react";

export default function usePut() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function put(url, data) {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      const responseData = await response.json();

      return responseData;
    } catch (e) {

      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { put, isLoading, error };
}