import { useEffect, useState } from 'react';

export function useContracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchContracts() {
      try {
        const res = await fetch('/api/contract');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setContracts(data);
      } catch (err) {
        if (err instanceof Error) {
          console.error("실패:", err.message);
        }
        else {
          setError(new Error("알 수 없는 오류 발생"));
        }
      } finally {
        setLoading(false);
      }
    }
    fetchContracts();
  }, []);

  return { contracts, loading, error };
}