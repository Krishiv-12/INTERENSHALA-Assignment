import { useEffect, useState } from "react";
import { fetchInternships } from "../api/internshipsApi";
import { normalizeInternships } from "../utils/internshipHelpers";

export function useInternships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchInternships();
        if (!ignore) {
          setInternships(normalizeInternships(data));
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError.message || "Unable to fetch internships right now.");
          setInternships([]);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [reloadToken]);

  const retry = () => setReloadToken((previous) => previous + 1);

  return { internships, loading, error, retry };
}
