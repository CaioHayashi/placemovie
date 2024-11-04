import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./hooks/useAuth";
import { AnimateRoutes } from "./pages/AnimateRoutes";

function App() {


	return (
		<AuthProvider>
			<BrowserRouter>
				<AnimateRoutes></AnimateRoutes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
