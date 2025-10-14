import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import ProtectedRoute from "./pages/ProtectedRoute"
import Todo from "./pages/Todo"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute Component={Todo} />} />
                <Route path="/:id" element={<ProtectedRoute Component={Todo} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App