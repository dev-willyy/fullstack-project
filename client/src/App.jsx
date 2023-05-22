import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/home";
import Auth from "./pages/auth";
import CreateRecipe from "./pages/CreateRecipe";
import SavedRecipes from "./pages/SavedRecipes";

function App() {
    return (
        <div className="App">
            <Router>
                <NavBar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/auth" element={<Auth />} />
                    <Route exact path="/create-recipe" element={<CreateRecipe />} />
                    <Route exact path="/saved-recipes" element={<SavedRecipes />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
