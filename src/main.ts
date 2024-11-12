const whereSection = document.querySelector(".where_section");
const checkInSection = document.querySelector(".checkin_section");
const checkOutSection = document.querySelector(".checkout_section");
const whoSection = document.querySelector(".who_section");
const dateSection = document.querySelector(".date_section");

const innerSearchBox = document.querySelector(".inner_search_box");
const activeBox = document.querySelectorAll(".active_box");

const regionWrapper = document.querySelector(".region_wrapper");

const regionItems = document.querySelectorAll<HTMLElement>(".item");
const destination = document.querySelector<HTMLInputElement>(".destination");

regionItems.forEach((item) => {
  item.addEventListener("click", function () {
    const regionNameElement = item.querySelector<HTMLElement>(".region_name");
    const regionName = regionNameElement?.innerText; // regionName is now explicitly a string | undefined
    if (destination && regionName) {
      destination.value = regionName; // This should be valid as regionName is now explicitly checked as a string
    }
  });
});

const activeChanges = (section: any) => {
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
activeChanges(whoSection);
activeChanges(dateSection);

//
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
