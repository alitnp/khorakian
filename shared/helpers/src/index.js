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

export const replaceNumbersWithPersian = (input) => {
	if (input === undefined || input === null) return "";
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

export const englishNumberOnly = (
	input,
	allowCammaAndDot,
	allowDot
) => {
	if (input === null || input === undefined) return "";
	input = input.toString();
	if (!allowCammaAndDot && !allowDot)
		input = input.replace(/[^۰۱۲۳۴۵۶۷۸۹0123456789]/g, "");
	if (allowCammaAndDot)
		input = input.replace(/[^۰۱۲۳۴۵۶۷۸۹0123456789,.]/g, "");
	if (!allowCammaAndDot && allowDot)
		input = input.replace(/[^۰۱۲۳۴۵۶۷۸۹0123456789.]/g, "");

	input = input.replace(/ /g, "");
	input = input.replace(/۰/g, "0");
	input = input.replace(/۱/g, "1");
	input = input.replace(/۲/g, "2");
	input = input.replace(/۳/g, "3");
	input = input.replace(/۴/g, "4");
	input = input.replace(/۵/g, "5");
	input = input.replace(/۶/g, "6");
	input = input.replace(/۷/g, "7");
	input = input.replace(/۸/g, "8");
	input = input.replace(/۹/g, "9");

	return input;
};
