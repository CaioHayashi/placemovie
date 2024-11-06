export const FormatCurrency = (value) => {
    const result = value.toLocaleString("en-US", {
		style: "currency",
		currency: "USD"
	});
	return result
};
