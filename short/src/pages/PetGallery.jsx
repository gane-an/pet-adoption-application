import { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import { getAllPets } from ".../services/petService";

const PetGallery = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    getAllPets().then((res) => setPets(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Available Pets</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default PetGallery;
