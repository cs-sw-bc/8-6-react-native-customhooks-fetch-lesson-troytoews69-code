import { useState, useEffect } from 'react';
import { View, Text, Image, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { CAT_API_KEY } from '../config/catApi';

export default function CatFetcher() {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCat();
  }, []);

  // ============================================================
  // TODO 3
  // Write an async function called fetchCat.
  // GET from: https://api.thecatapi.com/v1/images/search
  // The response is an array — store the first item in cat state.
  // Set loading to false when done.
  // Catch any errors and store in error state.
  // ============================================================
  const fetchCat = async () => {
    setLoading(true);
    setError(null);

    try {
      const headers = new Headers({
        'Content-Type': 'application/json',
        'x-api-key': CAT_API_KEY,
      });

      const requestOptions = {
        method: 'GET',
        headers,
        redirect: 'follow',
      };

      const response = await fetch(
        'https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1',
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const json = await response.json();
      setCat(json[0] ?? null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // TODO 4
  // Handle the three states below:
  // - If loading, return an ActivityIndicator
  // - If error, return a Text showing the error message
  // - If cat, return the Image using cat.url
  // ============================================================

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Random Cat 🐱</Text>

      {loading && <ActivityIndicator size="large" style={{ marginBottom: 12 }} />}
      {!loading && error && <Text style={styles.error}>Error: {error}</Text>}
      {!loading && !error && cat?.url && (
        <Image source={{ uri: cat.url }} style={styles.image} resizeMode="cover" />
      )}

      <Text style={styles.id}>ID: {cat?.id}</Text>

      <Button title="Load New Cat" onPress={fetchCat} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  image: { width: 300, height: 300, borderRadius: 12, marginBottom: 12 },
  id: { color: '#666', marginBottom: 16 },
  error: { color: 'red' },
});
