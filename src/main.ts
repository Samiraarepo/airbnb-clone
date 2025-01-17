/*
-----------------------------------------
DOM Manipulation
-----------------------------------------
*/
const whereSection = document.querySelector<HTMLElement>(".where_section")!;
const checkInSection = document.querySelector<HTMLElement>(".checkin_section")!;
const checkOutSection =
  document.querySelector<HTMLElement>(".checkout_section")!;
const whoSection = document.querySelector<HTMLElement>(".who_section")!;
const dateSection = document.querySelector<HTMLElement>(".date_section")!;

const innerSearchBox = document.querySelector<HTMLElement>(".inner_search_box");
const activeBox = document.querySelectorAll<HTMLElement>(".active_box");

const regionWrapper =
  document.querySelector<HTMLInputElement>(".region_wrapper");
const closeBtn = document.querySelector<HTMLInputElement>(".close_btn");
const regionItems = document.querySelectorAll<HTMLElement>(".item");
const destination = document.querySelector<HTMLInputElement>(".destination");

const carousel = document.querySelector<HTMLElement>(".carousel_wrapper");
const nextBtn = document.querySelector<HTMLElement>(".next");
const prevBtn = document.querySelector<HTMLElement>(".prev");

/*
------------------------------------
 Navbar
------------------------------------
*/
const stays = document.getElementById("stay");
const experience = document.getElementById("exper");

stays?.addEventListener("click", () => {
  stays.classList.add("Active");
  experience?.classList.remove("Active");
});

experience?.addEventListener("click", () => {
  experience.classList.add("Active");
  stays?.classList.remove("Active");
});

/*
--------------------------------------
Humbrger menu Drop Down
--------------------------------------
*/
const Dropbtn = document.getElementById("drop-btn") as HTMLButtonElement;
const dropcontent = document.getElementById("drop-content") as HTMLDivElement;

Dropbtn?.addEventListener("click", () => {
  console.log(`Dropbtn hitted`);
  dropcontent.classList.toggle("show");
});

window.onclick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.matches(".drop-show")) {
    dropcontent.classList.remove("show");
  }
};

/*
------------------------------------
Search-box 
------------------------------------
*/
const closeBtnVisibility = () => {
  if (
    destination?.value !== "" &&
    whereSection?.classList.contains("active_section")
  ) {
    closeBtn?.classList.remove("hide");
  } else {
    closeBtn?.classList.add("hide");
  }
};

destination?.addEventListener("input", closeBtnVisibility);

const activeChanges = (section: HTMLElement) => {
  section?.addEventListener("click", function () {
    activeBox?.forEach((item) => item.classList.remove("active_section"));
    section.classList.toggle("active_section");
    innerSearchBox?.classList.add("bg-active");
    closeBtnVisibility();
  });
};

document.addEventListener("click", function (e) {
  if (!innerSearchBox?.contains(e.target as Node)) {
    activeBox.forEach((item) => item.classList.remove("active_section"));
    innerSearchBox?.classList.remove("bg-active");
    regionWrapper?.classList.add("hide");
    closeBtnVisibility();
  }
});

/*
------------------------------------
Where dropdown
------------------------------------
*/
whereSection?.addEventListener("click", () => {
  regionWrapper?.classList.remove("hide");
  destination?.select();
});

regionItems.forEach((item) => {
  item.addEventListener("click", function (event) {
    const regionNameElement = item.querySelector<HTMLElement>(".region_name");
    const regionName = regionNameElement?.innerText; // regionName is now explicitly a string | undefined

    if (destination && regionName) {
      destination.value = regionName;
      destination.style.fontWeight =
        regionName === "I'm flexible" ? "normal" : "bold";

      if (regionName === "I'm flexible") {
        destination.value = "";
      }
    }
    // Switch sections
    whereSection.classList.remove("active_section");
    regionWrapper?.classList.add("hide");
    checkInSection.classList.add("active_section");
    closeBtnVisibility();
    event.stopPropagation();
  });
});

closeBtn?.addEventListener("click", () => {
  destination && destination.value ? (destination.value = "") : "";
});
/*
---------------------------------------
Carousel Items
---------------------------------------
*/
let scrollAmount = 400;

nextBtn?.addEventListener("click", () => {
  carousel?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  console.log("Next button clicked");
});

prevBtn?.addEventListener("click", () => {
  carousel?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  console.log("Prev button clicked");
});

/*
-----------------------------------
Function Calls
-----------------------------------
*/
activeChanges(whereSection);
activeChanges(checkInSection);
activeChanges(checkOutSection);
activeChanges(whoSection);
activeChanges(dateSection);
//----------------------------------
//carousel logic for fetch api
interface Category {
  id: number;
  name: string;
  icon_url: string;
}

interface Room {
  id: number;
  name: string;
  location: string;
  price_per_night: number;
  images: string;
  categoryId: number;
}
//category
async function getCategories() {
  const url = "/api/categories";
  const data = await fetch(url);
  const categories = await data.json();
  return categories;
}
const iterateCategories = document.getElementById("carousel") as HTMLElement;
iterateCategories.innerHTML = "";
const categories = await getCategories();

categories.forEach((category: Category) => {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = category.icon_url;
  img.alt = category.name;
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = category.name;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  figure.addEventListener("click", async () => {
    const rooms = await getRooms(category.id);
    displayRooms(rooms);
  });
  iterateCategories.appendChild(figure);
});

function displayRooms(rooms: Room[]) {
  const roomContainer = document.getElementById(
    "room_container"
  ) as HTMLDivElement;
  roomContainer.innerHTML = "";
  roomContainer.classList.add("room_grid");
  rooms.forEach((room) => {
    const roomDiv = document.createElement("div");
    roomDiv.classList.add("room");
    const imgcontainer = document.createElement("div");
    imgcontainer.classList.add("image_container");
    const img = document.createElement("img");
    img.src = JSON.parse(room.images)[0];
    img.alt = room.name;
    roomDiv.appendChild(img);

    const infoDiv = document.createElement("div");
    infoDiv.innerHTML = `<h3>${room.name}</h3>
                         <p>${room.location}</p>
                         <p>${room.price_per_night}</p>`;
    roomDiv.appendChild(infoDiv);

    roomContainer.appendChild(roomDiv);
    console.log(roomContainer);
  });
}
//fetch room information
async function getRooms(categoryId: number) {
  const url = `/api/rooms/${categoryId}`;
  const data = await fetch(url);
  const rooms = await data.json();
  console.log(rooms);

  return rooms;
}
