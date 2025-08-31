import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PetGallery from "./pages/PetGallery";
import PetDetail from "./pages/PetDetail";
import MyPets from "./pages/MyPets";
import MyApplications from "./pages/MyApplications";

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-blue-600 p-4 text-white flex justify-between rounded-b-2xl shadow">
        <h1 className="text-xl font-bold">🐾 Pet Adoption</h1>
        <div className="flex gap-4">
          <Link to="/">Gallery</Link>
          <Link to="/mypets">My Pets</Link>
          <Link to="/applications">My Applications</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<PetGallery />} />
        <Route path="/pets/:id" element={<PetDetail />} />
        <Route path="/mypets" element={<MyPets />} />
        <Route path="/applications" element={<MyApplications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
