# React Native Custom Hooks + Cat API Lesson

This project practices:

- Building reusable custom hooks
- Fetching data with GET
- Sending data with POST
- Managing loading and error states

## What I completed

All lesson TODOs are now implemented:

- TODO 1 in hooks/useFetch.js
- TODO 2 in hooks/useInput.js
- TODO 3-5 in screens/CatFetcher.jsx
- TODO 6-11 in screens/CatVoter.jsx

## API key setup (secure)

1. Create a local `.env` file in the project root.
2. Add this line to it:

```bash
EXPO_PUBLIC_CAT_API_KEY=PASTE_YOUR_CAT_API_KEY_HERE
```

1. Save, then restart Expo.

This project reads the key from `process.env.EXPO_PUBLIC_CAT_API_KEY` in `config/catApi.js`.

Use `.env.example` as the template. Your real `.env` is ignored by git.

## Run the app

1. Install dependencies

```bash
npm install
```

1. Start Expo

```bash
npm start
```

1. Open on device/simulator from Expo CLI.

## Screen switching

The app currently renders CatVoter in App.js.
To test CatFetcher instead:

- In App.js, import CatFetcher
- Render CatFetcher in place of CatVoter

## Notes

- Cat image endpoint used: <https://api.thecatapi.com/v1/images/search>
- Vote endpoints used: <https://api.thecatapi.com/v1/votes>
- Votes require an API key in request headers.
