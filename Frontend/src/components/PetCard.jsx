import { Link } from "react-router-dom";

const PetCard = ({ pet }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h3 className="text-lg font-bold">{pet.name}</h3>
      <p>{pet.type} - {pet.breed}</p>
      <Link
        to={`/pets/${pet.id}`}
        className="text-blue-600 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
};

export default PetCard;
