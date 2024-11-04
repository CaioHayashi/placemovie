import supabase from "../../db/supabase.js";
import jwt from "jsonwebtoken";
import pkg from "bcryptjs";
const { compareSync } = pkg;

export const createSession = async (request, response) => {
	const { email, password } = request.body;

	console.log("Dados de login:", { email, password });

	if (!password || !email)
		return response.status(401).send({ msg: "campos vazios" });

	// Procura no banco algum usuário com esse email
	const { data: users, error } = await supabase
		.from("users")
		.select("*")
		.eq("email", email);

	if (error) {
		// Caso ocorra um erro na consulta
		console.log("Erro ao buscar o usuário:", error);
		return response.status(500).json({ msg: "Erro ao buscar usuário" });
	}

	if (!users || users.length === 0) {
		return response.status(401).json({ msg: "email incorreto" });
	}

	const user = users[0];

	// Compara a senha criptografada com a passada
	const passwordMatched = compareSync(password, user.password);

	if (!passwordMatched) {
		return response.status(401).json({ msg: "senha incorreta" });
	}

	// Gera um token de autenticação
	const token = jwt.sign({}, process.env.SECRET_JWT, {
		subject: String(user.id),
		expiresIn: "1d"
	});

	return response.status(200).json({ user, token });
};
