export const moveItemInArray = (
	arr,
	oldIndex,
	newIndex
) => {
	// Remove item from old index and store in a variable called item
	const item = arr.splice(oldIndex, 1)[0];

	// Insert the stored `item` at the new index
	arr.splice(newIndex, 0, item);

	// Return the updated array
	return arr;
};

const persianNumbers = {
	0: "۰",
	1: "۱",
	2: "۲",
	3: "۳",
	4: "۴",
	5: "۵",
	6: "۶",
	7: "۷",
	8: "۸",
	9: "۹",
};

/**
 * Replaces Arabic numerals with Persian numerals in a string or a number
 * @param {string | number} input - The input to be processed
 * @returns {string} The output with replaced numerals
 */
export const replaceNumbersWithPersian = (input) => {
	// Convert the input to a string if it is a number
	let str =
		typeof input === "number" ? input.toString() : input;
	// Split the string into an array of characters
	let chars = str.split("");
	// Loop through the array and replace each number with its Persian equivalent using the mapping object
	for (let i = 0; i < chars.length; i++) {
		// Check if the character is a number
		if (chars[i] >= "0" && chars[i] <= "9") {
			// Replace the character with its Persian equivalent using the mapping object
			chars[i] = persianNumbers[chars[i]];
		}
	}
	// Join the array back into a string and return it
	return chars.join("");
};
