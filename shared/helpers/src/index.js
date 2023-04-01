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
