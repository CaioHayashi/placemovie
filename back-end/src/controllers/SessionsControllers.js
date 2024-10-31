import supabase from "../../db/supabase.js";
import pkg from "bcryptjs";
// import { sign } from "jsonwebtoken";

const { compareSync } = pkg;

export const createSession = async (request, response) => {
	const { email, password } = request.body;

	const { data: user, error } = await supabase
		.from("users")
		.select("*")
		.eq("email", email)
		.single();

	if (error) {
		return response.json({ msg: "email incorreto" });
	}

	const passwordMathed = compareSync(password, user.password);

	if (!passwordMathed) {
		return response.json({ msg: "senha incorreta" });
	}

    // const token = sign()

	return response.status(200).json({ msg: "senha e email bate", user: user });
};
