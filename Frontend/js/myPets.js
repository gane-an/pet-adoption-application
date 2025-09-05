document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("pet-form");
  const list = document.getElementById("my-pet-list");

  // Load Pets
  async function loadPets() {
    try {
      list.innerHTML = "";
      const pets = await apiRequest("/pets");

      if (!pets.length) {
        list.innerHTML = `<p>No pets added yet.</p>`;
        return;
      }

      pets.forEach((pet) => {
        const card = document.createElement("div");
        card.className = "pet-card";
        card.innerHTML = `
          <h3>${pet.name}</h3>
          <p>${pet.type} - ${pet.breed}</p>
          <p>City: ${pet.city}</p>
          <p>Status: <span class="${pet.status}">${pet.status} </span></p>
          <button class="btn delete" onclick="deletePet(${pet.id}, '${pet.owner}')">Delete</button>
        `;
        list.appendChild(card);
      });
    } catch (err) {
      list.innerHTML = `<p>Failed to load pets. Try again later.</p>`;
      console.error(err);
    }
  }

  // Add Pet
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const pet = {
      name: document.getElementById("name").value,
      type: document.getElementById("type").value,
      breed: document.getElementById("breed").value,
      age: document.getElementById("age").value,
      city: document.getElementById("city").value,
      status: "AVAILABLE",
      owner: document.getElementById("owner").value,
    };

    try {
      await apiRequest("/pets", { method: "POST", body: JSON.stringify(pet) });
      form.reset();
      document.getElementById("name").focus();
      loadPets();
    } catch (err) {
      alert("Failed to add pet. Try again.");
      console.error(err);
    }
  });

  // Delete Pet
  window.deletePet = async (id, owner) => {
    if (confirm("Are you sure you want to delete this pet?")) {
      try {
        await apiRequest(`/pets/${id}?owner=${owner}`, { method: "DELETE" });
        loadPets();
      } catch (err) {
        alert("Failed to delete pet.");
        console.error(err);
      }
    }
  };

  loadPets();
});
