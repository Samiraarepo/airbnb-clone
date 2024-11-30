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
const whenWrapper = document.querySelector<HTMLElement>(".when_wrapper");
/*
------------------------------------------------
 Navbar
------------------------------------------------
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
-------------------------------------------
Humbrger menu Drop Down
-------------------------------------------
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
-----------------------------------------------
Search-box 
-----------------------------------------------
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
--------------------------------------------
Where dropdown
--------------------------------------------
*/
whereSection?.addEventListener("click", () => {
  regionWrapper?.classList.remove("hide");
  whenWrapper?.classList.add("hide");
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
--------------------------------------------
Function Calls
--------------------------------------------
*/
activeChanges(whereSection);
activeChanges(checkInSection);
activeChanges(checkOutSection);
activeChanges(whoSection);
activeChanges(dateSection);

/*
---------------------------------
when dropdown
---------------------------------
*/

const activeLink = document.querySelector(".active_link");

checkInSection?.addEventListener("click", () => {
  activeLink?.classList.add("active_section");
  regionWrapper?.classList.add("hide");
  whenWrapper?.classList.remove("hide");
});
