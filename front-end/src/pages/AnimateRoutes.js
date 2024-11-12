import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Login";
import { Register } from "./Register";
import { Home } from "./Home";
import Movies from "./Movies";
import MoviesDetails from "./MoviesDetails";
import { Profile } from "./Profile";
import Series from "./Series";
import SeriesDetails from "./SeriesDetails";

export const AnimateRoutes = () => {
	const location = useLocation();
	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/" element={<Home />} />
				<Route path="/movies" element={<Movies />} />
				<Route path="/series" element={<Series />} />
				<Route path="/movies/:id" element={<MoviesDetails />} />
				<Route path="/series/:id" element={<SeriesDetails />} />
				<Route path="/profile/*" element={<Profile />} />
			</Routes>
		</AnimatePresence>
	);
};
