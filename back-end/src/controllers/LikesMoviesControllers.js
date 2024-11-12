import supabase from "../../db/supabase.js";

export const toggleLikeMovie = async (request, response) => {
	const { movieId: id_movie_ref, userId: id_user } = request.body;

	console.log(id_movie_ref, id_user);

	try {
		// Verifica se o like já existe sem usar .single()
		const { data: existingLikes, error: fetchError } = await supabase
			.from("likes")
			.select("*")
			.eq("id_movie_ref", id_movie_ref)
			.eq("id_user", id_user);

		if (fetchError) {
			throw fetchError;
		}

		console.log(existingLikes);

		// Verifica se o like já existe
		if (existingLikes && existingLikes.length > 0) {
			// Se o like já existe, remove-o (descurtir)
			const { error: deleteError } = await supabase
				.from("likes") // Corrigido para a tabela correta
				.delete()
				.eq("id_movie_ref", id_movie_ref)
				.eq("id_user", id_user);

			if (deleteError) {
				return response.status(400).json({ msg: deleteError });
			}

			return response
				.status(200)
				.json({ msg: "Like removido", liked: false });
		} else {
			// Se o like não existe, adiciona-o (curtir)
			const { error: insertError } = await supabase
				.from("likes")
				.insert([{ id_movie_ref, id_user }]);

			if (insertError) {
				console.log(insertError);
				throw insertError;
			}

			return response
				.status(200)
				.json({ msg: "Like adicionado", liked: true });
		}
	} catch (error) {
		return response.status(400).json({ msg: error.message });
	}
};

export const getLikeMovieStart = async (request, response) => {
	const { movieId, userId } = request.query;

	try {
		const { data: existingLikes, error: fetchError } = await supabase
			.from("likes")
			.select("*")
			.eq("id_movie_ref", movieId)
			.eq("id_user", userId);

		if (fetchError) {
			return response
				.status(400)
				.json({ msg: "Erro ao buscar like", error: fetchError });
		}

		// Se o like existir, retorna true; caso contrário, false
		const liked = existingLikes.length > 0;
		return response.status(200).json({ liked });
	} catch (error) {
		return response
			.status(500)
			.json({ msg: "Erro interno do servidor", error: error.message });
	}
};

export const getLikesMovieList = async (request, response) => {
	const { id_user } = request.query; // Use request.query para acessar parâmetros de query

	if (!id_user) {
		return response.status(400).json({ msg: "id_user é necessário!" });
	}

	console.log(id_user);
	try {
		const { data: list, error } = await supabase
			.from("likes")
			.select("id_movie_ref")
			.eq("id_user", id_user)
			.order("created_at", { ascending: false }); // Corrigir a condição para comparar com id_user
		if (error) {
			console.log(error);
			return response.status(500).json({ msg: error.message });
		}
		return response.status(200).json(list); // Retorne a lista de likes
	} catch (error) {
		console.error(error);
		return response.status(500).json({ msg: error.message });
	}
};

