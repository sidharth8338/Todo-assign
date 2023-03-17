import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRegister from "./pages/Login&Register";
import TodoList from "./pages/todo.component";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginRegister />} />
        <Route exact path="/todo" element={<TodoList />} />
      </Routes>
    </Router>
  );
}

export default App;
