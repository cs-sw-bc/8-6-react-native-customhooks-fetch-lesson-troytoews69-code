import { useState } from 'react';

// ============================================================
// TODO 2
// This hook accepts an initialValue.
// Declare one state variable: value.
// Return an object with value and onChangeText.
// ============================================================

function useInput(initialValue) {
	const [value, setValue] = useState(initialValue);

	return {
		value,
		onChangeText: (text) => setValue(text),
	};
}

export default useInput;
