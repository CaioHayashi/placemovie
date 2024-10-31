import supabase from "../../db/supabase.js";
import pkg from "bcryptjs";

const { hashSync } = pkg;

export const createUser = async (request, response) => {
	const { name, email, password } = request.body;

	const passwordHashed = hashSync(password)

	const { data, error } = await supabase
		.from("users")
		.insert([{ name, email, password: passwordHashed }])
		.select("*");
	if (error) {
		console.log(error);
		return response.status(500).json(error);
	}
	return response
		.status(200)
		.json({ msg: "Usuário criado com sucesso", user: data[0] });
};

export const getUser = async (request, response) => {
	const { data, error } = await supabase
		.from("users")
		.select()
		.ilike("name", "%João%");

	return response.send(data);
};
