export const formatDate = (utcDateString) => {
	const utcDate = new Date(utcDateString);
	utcDate.setHours(utcDate.getHours() - 3);
    
	const options = {
		timeZone: "America/Sao_Paulo",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	};

	return utcDate.toLocaleTimeString("pt-BR", options);
};
