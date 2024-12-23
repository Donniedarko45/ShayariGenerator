import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Categories } from "./pages/Categories";
import { MyShayaris } from "./pages/MyShayaris";
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/my-shayaris" element={<MyShayaris />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
