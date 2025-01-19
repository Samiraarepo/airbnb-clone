async function fetchRooms(categoryId) {
  try {
    const response = await fetch(`/categories/${categoryId}/rooms`);
    const data = await response.json();
    console.log("Rooms fetched from API:", data);

    if (!data.success) {
      console.error("Error fetching rooms:", data.error);
      return;
    }
    const rooms = data.data;
    const roomContainer = document.getElementById("room_container");
    roomContainer.innerHTML = "";
    // Add room images to the container
    rooms.forEach((room) => {
      const roomDiv = document.createElement("div");
      roomDiv.className = "room";
      const roomImage = document.createElement("img");
      roomImage.src = room.image;
      roomImage.alt = room.name || "Room Image"; // Use the room name or fallback to "Room Image"
      roomImage.className = "room-image";
      roomDiv.appendChild(roomImage);
      roomContainer.appendChild(roomDiv);
      console.log("Rooms loaded into the container:", rooms);
    });
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
}

async function fetchAndRenderCategories() {
  try {
    const response = await fetch("/categories");
    const { success, data } = await response.json();

    // console.log("Categories fetched from API:", data);

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    if (success && Array.isArray(data)) {
      renderCategories(data);
      addCarouselNavigation();
    } else {
      console.error("Unexpected data format", data);
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

function renderCategories(categories) {
  const container = document.querySelector(
    "#categories-container .carousel_wrapper"
  );
  if (!container) {
    console.error("Carousel container not found");
    return;
  }

  // Clear existing content
  container.innerHTML = "";

  // Populate categories dynamically
  categories.forEach(({ id, name, icon_url }) => {
    const figure = document.createElement("figure");

    figure.innerHTML = `
 
          <img src="${icon_url}" alt="${name}">
          <figcaption>${name}</figcaption>
         
        `;
    figure.dataset.categoryId = id;
    container.appendChild(figure);

    figure.addEventListener("click", (event) => {
      const categoryId = event.currentTarget.dataset.categoryId;
      fetchRooms(categoryId);
    });
  });
}
function addCarouselNavigation() {
  const wrapper = document.querySelector(".carousel_wrapper");

  const prevBtn = document.createElement("button");
  prevBtn.className = "prev";
  prevBtn.innerHTML = `<img src="./icons/chevron-left.svg">`;

  const nextBtn = document.createElement("button");
  nextBtn.className = "next";
  nextBtn.innerHTML = `<img src="./icons/chevron-right.svg">`;

  wrapper.appendChild(prevBtn);
  wrapper.appendChild(nextBtn);

  // Add event listeners to buttons
  prevBtn.addEventListener("click", () => {
    wrapper.scrollBy({ left: -400, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    wrapper.scrollBy({ left: 400, behavior: "smooth" });
  });
}
fetchAndRenderCategories();
