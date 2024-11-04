import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/backend";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [data, setData] = useState(() => {
		const token = localStorage.getItem("@placemovie:token");
		const user = localStorage.getItem("@placemovie:user");

		// Carregar token e user no estado inicial se disponíveis
		if (token && user) {
			api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			return { token, user: JSON.parse(user) };
		}
		return {};
	});

	const signIn = async ({ email, password }) => {
		try {
			const response = await api.post("/sessions", { email, password });
			const { user, token } = response.data;

			if (user && token) {
				localStorage.setItem("@placemovie:user", JSON.stringify(user));
				localStorage.setItem("@placemovie:token", token);

				api.defaults.headers.common[
					"Authorization"
				] = `Bearer ${token}`;
				setData({ user, token });

				return true
			} 
		} catch (error) {
			const errorMessage =
				error.response?.data?.msg || "Não foi possível entrar.";
			alert(errorMessage); // Exibe a mensagem de erro

			return false;
		}
	};

	const signOut = () => {
		localStorage.removeItem("@placemovie:user");
		localStorage.removeItem("@placemovie:token");

		setData({});
	};

	useEffect(() => {
		const token = localStorage.getItem("@placemovie:token");
		const user = localStorage.getItem("@placemovie:user");

		if (token && user) {
			api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			setData({ token, user: JSON.parse(user) });
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				signIn,
				signOut,
				user: data.user
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth deve ser usado dentro de um AuthProvider");
	}
	return context;
};

export { AuthProvider, useAuth };
