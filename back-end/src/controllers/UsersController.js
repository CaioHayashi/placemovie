import supabase from "../../db/supabase.js";
import pkg from "bcryptjs";

const { hashSync, compare } = pkg;

export const createUser = async (request, response) => {
	const { username, email, password } = request.body;

	if (!username || !email || !password) {
		return response.status(400).json({ msg: "preencha todos os campos" });
	}

	const passwordHashed = hashSync(password, 10);

	const { data: user, error } = await supabase
		.from("users")
		.insert([{ username, email, password: passwordHashed }])
		.select("*");
	if (error) {
		console.log(error);
		return response.status(500).json(error);
	}
	return response
		.status(200)
		.json({ msg: "Usuário criado com sucesso", user: user });
};

export const getUser = async (request, response) => {
	const { data, error } = await supabase.from("users").select();

	if (error) {
		console.log(error);
		return response.status(500).json(error);
	}

	return response.send(data);
};

//atualizar usuário
export const updateUser = async (request, response) => {
	const { username, email, oldPassword, newPassword } = request.body;

	console.log(username, email, oldPassword, newPassword);

	//buscar pelo usuario
	try {
		const { data: user, error: notFound } = await supabase
			.from("users")
			.select("*")
			.eq("email", email)
			.single(); // Use .single() para garantir que você receba um único usuário

		if (notFound || !user) {
			return response.status(401).json({ msg: "Usuário não encontrado" });
		}

		const passwordMatched = compare(oldPassword, user.password);

		if (!passwordMatched) {
			return response
				.status(400)
				.json({ msg: "Senhas não correspondem" });
		}

		if (!passwordMatched) {
			return response
				.status(400)
				.json({ msg: "senhas não comparam", user });
		}

		const passwordHashed = await hashSync(newPassword, 10);

		// Atualize o usuário com o novo nome de usuário e nova senha
		const { data: updatedUser, error: updateError } = await supabase
			.from("users")
			.update({
				username: username ?? user.username, // Use 'user.username' se o novo username for undefined
				password: passwordHashed ?? user.password // Use 'user.password' se a senha não for fornecida
			})
			.eq("id", user.id);

		if (updateError) {
			return response.status(500).json({ msg: updateError.message });
		}

		return response
			.status(200)
			.json({ msg: "Usuário atualizado com sucesso", updatedUser });
	} catch (error) {
		return response.status(401).json({ msg: error.message });
	}
};
