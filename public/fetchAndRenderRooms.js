async function fetchRooms(categoryId) {
  try {
    const response = await fetch(`/categories/${categoryId}/rooms`);
    const data = await response.json();

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
      roomImage.src = room.image_url;
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

//
// fetchRooms();
