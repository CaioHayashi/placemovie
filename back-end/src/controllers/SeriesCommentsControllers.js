import supabase from "../../db/supabase.js";

export const createComment = async (request, response) => {
	const { content, id_user, id_serie_ref } = request.body;

	if (!content || !id_user || !id_serie_ref) {
		return response.status(401).json({ msg: "preencha todos os campos" });
	}

	const { data, error } = await supabase
		.from("series_comments")
		.insert([{ content, id_user, id_serie_ref }])
		.select("*");

	if (error) {
		return response.status(401).send(error);
	}

	return response.status(200).send({  data: data[0] });
};

export const getComments = async (request, response) => {
	try {
		const { id_serie_ref: movieId } = request.query; // Acessa o query param

		const { data: comments, error } = await supabase
			.from("series_comments")
			.select("*, users(username)")
			.eq("id_serie_ref", movieId)
			.order("created_at", { ascending: false });

		if (error) {
			return response.status(400).json({ msg: error });
		}

		return response.status(200).json({ msg: "dados recebido", comments });
	} catch (error) {
		return response.status(400).json({ msg: error });
	}
};
