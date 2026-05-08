import { useState, useEffect } from 'react';
import {
  View, Text, Image, Button,
  FlatList, ActivityIndicator, StyleSheet
} from 'react-native';
import { CAT_API_KEY, HAS_VALID_CAT_API_KEY } from '../config/catApi';

export default function CatVoter() {
  const [cat, setCat] = useState(null);
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCat();
    fetchVotes();
  }, []);

  // ============================================================
  // TODO 6
  // Write an async function called fetchCat.
  // GET from: https://api.thecatapi.com/v1/images/search
  // Store the first result in cat state.
  // Set loading to false when done.
  // ============================================================
  const fetchCat = async () => {
    setLoading(true);
    setError(null);

    try {
      const headers = new Headers({ 'Content-Type': 'application/json' });

      if (HAS_VALID_CAT_API_KEY) {
        headers.append('x-api-key', CAT_API_KEY);
      }

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
    } catch (error) {
      setError('Unable to fetch cat image.');
      console.error('Failed to fetch cat:', error);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // TODO 7
  // Write an async function called fetchVotes.
  // GET from: https://api.thecatapi.com/v1/votes
  // This endpoint requires the API_KEY in headers: { 'x-api-key': API_KEY }
  // Store the result in votes state.
  // ============================================================
  const fetchVotes = async () => {
    if (!HAS_VALID_CAT_API_KEY) {
      setError('Set EXPO_PUBLIC_CAT_API_KEY in .env, then restart Expo.');
      setVotes([]);
      return;
    }

    try {
      const response = await fetch('https://api.thecatapi.com/v1/votes', {
        headers: { 'x-api-key': CAT_API_KEY },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('401 Unauthorized: API key is missing, invalid, or expired.');
        }
        throw new Error(`Request failed with status ${response.status}`);
      }

      const json = await response.json();
      setVotes(json);
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error('Failed to fetch votes:', error);
    }
  };

  // ============================================================
  // TODO 8
  // Write an async function called submitVote that accepts a value (1 or 0).
  // POST to: https://api.thecatapi.com/v1/votes
  // Headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY }
  // Body: JSON.stringify({ image_id: cat.id, value })
  // After posting, call fetchVotes() to refresh the list.
  // ============================================================
  const submitVote = async (value) => {
    if (!cat?.id) return;
    if (!HAS_VALID_CAT_API_KEY) {
      setError('Set EXPO_PUBLIC_CAT_API_KEY in .env, then restart Expo.');
      return;
    }

    try {
      const response = await fetch('https://api.thecatapi.com/v1/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CAT_API_KEY,
        },
        body: JSON.stringify({ image_id: cat.id, value }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('401 Unauthorized: API key is missing, invalid, or expired.');
        }
        throw new Error(`Request failed with status ${response.status}`);
      }

      await fetchVotes();
    } catch (error) {
      setError(error.message);
      console.error('Failed to submit vote:', error);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cat Voter 🐱</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      {cat?.url && <Image source={{ uri: cat.url }} style={styles.image} resizeMode="cover" />}

      {/* TODO 10: Add two buttons — Upvote (value 1) and Downvote (value 0) */}
      <View style={styles.buttons}>
        <Button title="Upvote 👍" onPress={() => submitVote(1)} />
        <Button title="Downvote 👎" onPress={() => submitVote(0)} />
      </View>

      <Button title="New Cat 🔄" onPress={fetchCat} />

      {/* TODO 11: Render the votes array in a FlatList */}
      {/* Each row: show 👍 or 👎 based on item.value, and item.image_id */}
      {/* ListEmptyComponent: show "No votes yet" */}
      <Text style={styles.historyHeading}>Vote History ({votes.length})</Text>
      <FlatList
        data={votes}
        keyExtractor={(item, index) => String(item.id ?? index)}
        renderItem={({ item }) => (
          <Text style={styles.voteItem}>
            {item.value === 1 ? '👍' : '👎'} {item.image_id}
          </Text>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No votes yet</Text>}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  image: { width: '100%', height: 280, borderRadius: 12, marginBottom: 16 },
  buttons: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  historyHeading: { fontSize: 18, fontWeight: '600', marginTop: 24, marginBottom: 8 },
  voteItem: { fontSize: 14, paddingVertical: 4, borderBottomWidth: 1, borderColor: '#eee' },
  empty: { color: '#999', fontStyle: 'italic' },
  error: { color: 'red', marginBottom: 12, textAlign: 'center' },
});
