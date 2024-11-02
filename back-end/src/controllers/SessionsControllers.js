import supabase from "../../db/supabase.js";
import pkg from "bcryptjs";
import jwt from "jsonwebtoken"

const { compareSync } = pkg;

export const createSession = async (request, response) => {
	const { email, password } = request.body;

	//procura no banco algum usuário com esse email
	const { data: user, error } = await supabase
		.from("users")
		.select("*")
		.eq("email", email)
		.single();

	if (error) {
		return response.json({ msg: "email incorreto" });
	}

	//compara a senha criptografada com a passada
	const passwordMathed = compareSync(password, user.password);

	if (!passwordMathed) {
		return response.json({ msg: "senha incorreta" });
	}
	//gera um token de autenticação
	const token = jwt.sign({}, process.env.SECRET_JWT, {
		subject: String(user.id),
		expiresIn: "1d"
	});

	return response.status(200).json({ user, token });
};
