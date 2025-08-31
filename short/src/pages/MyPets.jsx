import { useEffect, useState } from "react";
import { getAllPets } from ".../services/petService";
import ApplicationList from ".../components/ApplicationList";
import { getApplicationsByPet } from ".../services/applicationService";

const MyPets = () => {
  const [pets, setPets] = useState([]);
  const [applications, setApplications] = useState({});
  const owner = localStorage.getItem("username") || "alice";

  useEffect(() => {
    getAllPets().then((res) => {
      const ownedPets = res.data.filter((p) => p.owner === owner);
      setPets(ownedPets);

      // fetch applications for each pet
      ownedPets.forEach((pet) => {
        getApplicationsByPet(pet.id).then((res) => {
          setApplications((prev) => ({ ...prev, [pet.id]: res.data }));
        });
      });
    });
  }, [owner]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Pets</h2>
      {pets.length === 0 && <p>No pets added.</p>}
      {pets.map((pet) => (
        <div key={pet.id} className="bg-gray-100 p-4 mb-6 rounded-xl shadow">
          <h3 className="text-lg font-bold">{pet.name}</h3>
          <p>{pet.type} - {pet.breed}</p>
          <h4 className="mt-2 font-semibold">Applications:</h4>
          <ApplicationList applications={applications[pet.id]} />
        </div>
      ))}
    </div>
  );
};

export default MyPets;
