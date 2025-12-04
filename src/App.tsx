import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Journal from "./Journal";
function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |<Link to="/journal">Journal</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journal/*" element={<Journal />} />
      </Routes>
    </div>
  );
}

export default App;
