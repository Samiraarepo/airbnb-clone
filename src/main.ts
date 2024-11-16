//DOM Manipulation
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

/*
*********************************
Search-box 
**********************************
*/
const activeChanges = (section: HTMLElement) => {
  section?.addEventListener("click", function () {
    activeBox?.forEach((item) => item.classList.remove("active_section"));
    section.classList.toggle("active_section");
    innerSearchBox?.classList.add("bg-active");
  });
};

document.addEventListener("click", function (e) {
  if (!innerSearchBox?.contains(e.target as Node)) {
    activeBox.forEach((item) => item.classList.remove("active_section"));
    innerSearchBox?.classList.remove("bg-active");
    regionWrapper?.classList.add("hide");
  }
});

whereSection?.addEventListener("click", function () {
  regionWrapper?.classList.toggle("hide");
});

activeChanges(whereSection);
activeChanges(checkInSection);
activeChanges(checkOutSection);
activeChanges(whoSection);
activeChanges(dateSection);
/*
*********************************** 
Where dropdown
***********************************
*/
const regionItems = document.querySelectorAll<HTMLElement>(".item");
const destination = document.querySelector<HTMLInputElement>(".destination");

regionItems.forEach((item) => {
  item.addEventListener("click", function () {
    const regionNameElement = item.querySelector<HTMLElement>(".region_name");
    const regionName = regionNameElement?.innerText; // regionName is now explicitly a string | undefined
    if (destination && regionName) {
      destination.value = regionName; // This should be valid as regionName is now explicitly checked as a string
      destination.style.fontWeight = "bold";
      if (regionName === "I'm flexible") {
        destination.value = "search destinations";
        destination.style.fontWeight = "normal";
      }
    }
    // for (let i = 0; i < activeBox.length; i++) {
    //   activeBox[i].classList.remove("active_section");
    // }
    let activeBoxIndex = 0;
    activeBox[activeBoxIndex].classList.remove("active_section");
    activeBoxIndex =
      activeBoxIndex + 1 < activeBox.length ? activeBoxIndex + 1 : 0;
    activeBox[activeBoxIndex].classList.add("active_section");
  });
});
/*
********************************
=> Navbar
********************************
*/
const stays = document.getElementById("stay");
const experience = document.getElementById("exper");

stays?.addEventListener("click", () => {
  stays.classList.add("Active");
  stays.classList.remove("inactive");
  experience?.classList.remove("Active");
  experience?.classList.add("inactive");
});

experience?.addEventListener("click", () => {
  experience.classList.add("Active");
  experience.classList.remove("inactive");
  stays?.classList.remove("Active");
  stays?.classList.add("inactive");
});
