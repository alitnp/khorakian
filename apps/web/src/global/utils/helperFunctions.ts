export const englishNumberOnly = (
	input: string,
	allowCammaAndDot?: boolean,
	allowDot?: boolean
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
