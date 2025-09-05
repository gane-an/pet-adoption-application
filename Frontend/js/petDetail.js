document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const petId = urlParams.get("id");

  const petDetail = document.getElementById("pet-detail");
  const applyForm = document.getElementById("apply-form");

  try {
    const pet = await apiRequest(`/pets/${petId}`);

    petDetail.innerHTML = `
      <h2>${pet.name}</h2>
      <p><strong>Type:</strong> ${pet.type}</p>
      <p><strong>Breed:</strong> ${pet.breed}</p>
      <p><strong>Age:</strong> ${pet.age}</p>
      <p><strong>City:</strong> ${pet.city}</p>
      <p><strong>Status:</strong><span class="${pet.status}"> ${pet.status}</span> </p>
    `;

    if (pet.status.toUpperCase() !== "AVAILABLE") {
      applyForm.style.display = "none";
    }

    applyForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const applicant = document.getElementById("applicant").value;

      try {
        await apiRequest("/applications", {
          method: "POST",
          body: JSON.stringify({ pet: { id: petId }, applicant }),
        });

        alert("Application submitted!");
        applyForm.reset();
      } catch (err) {
        alert("Failed to apply: " + err.message);
      }
    });
  } catch (err) {
    petDetail.innerHTML = `<p style="color:red;">Pet not found</p>`;
    applyForm.style.display = "none";
  }
});
