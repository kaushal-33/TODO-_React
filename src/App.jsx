import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./pages/ProtectedRoute"
import Todo from "./pages/Todo"
import { Toaster } from "react-hot-toast"
import Error from "./pages/Error"

const App = () => {
    return (
        <BrowserRouter>
            <Toaster position="top-left" />
            <Routes>
                <Route path="/" element={<ProtectedRoute Component={Todo} />} />
                <Route path="/:id" element={<ProtectedRoute Component={Todo} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App