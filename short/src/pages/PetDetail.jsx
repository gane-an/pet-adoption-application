import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPetById } from ".../services/petService";
import { applyForPet } from ".../services/applicationService";

const PetDetail = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    getPetById(id).then((res) => setPet(res.data));
  }, [id]);

  const handleApply = async () => {
    const applicant = localStorage.getItem("username") || "guest";
    await applyForPet(pet.id, applicant);
    alert("Applied successfully!");
  };

  if (!pet) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{pet.name}</h2>
      <p>Type: {pet.type}</p>
      <p>Breed: {pet.breed}</p>
      <p>Age: {pet.age}</p>
      <button
        onClick={handleApply}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Apply for Adoption
      </button>
    </div>
  );
};

export default PetDetail;
