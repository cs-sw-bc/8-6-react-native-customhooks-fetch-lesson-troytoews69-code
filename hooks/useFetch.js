import { useState, useEffect } from 'react';

// ============================================================
// TODO 1
// This hook accepts a url string.
// Declare three state variables: data, loading, error.
// Use useEffect to fetch the url when the hook mounts.
// Use async/await with try/catch/finally.
// Return { data, loading, error }.
// ============================================================

function useFetch(url) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);

			try {
				const response = await fetch(url);

				if (!response.ok) {
					throw new Error(`Request failed with status ${response.status}`);
				}

				const json = await response.json();
				setData(json);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		if (url) {
			fetchData();
		} else {
			setLoading(false);
		}
	}, [url]);

	return { data, loading, error };
}

export default useFetch;
