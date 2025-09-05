document.addEventListener("DOMContentLoaded", async () => {
  const petList = document.getElementById("pet-list");

  try {
    const pets = await apiRequest("/pets");

    if (pets.length === 0) {
      petList.innerHTML = "<p>No pets available</p>";
      return;
    }

    pets.forEach((pet) => {
      const card = document.createElement("div");
      card.className = "pet-card";

      card.innerHTML = `
        <h3>${pet.name}</h3>
        <p><strong>Type:</strong> ${pet.type}</p>
        <p><strong>Breed:</strong> ${pet.breed}</p>
        <p><strong>City:</strong> ${pet.city}</p>
        <p>Status: <span class="${pet.status}">${pet.status} </span></p>

        <a href="pet.html?id=${pet.id}" class="btn">View Details</a>
      `;

      petList.appendChild(card);
    });
  } catch (err) {
    petList.innerHTML = `<p style="color:red;">Failed to load pets</p>`;
  }
});
