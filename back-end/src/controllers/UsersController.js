import supabase from "../../db/supabase.js";
import pkg from "bcryptjs";

const { hashSync } = pkg;

export const createUser = async (request, response) => {
	const { name, email, password } = request.body;

	if(!name || !email || !password) {
		return response.status(400).json({ msg: "preencha todos os campos" });
	}

	const passwordHashed = hashSync(password);

	const { data: user, error } = await supabase
		.from("users")
		.insert([{ name, email, password: passwordHashed }])
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
