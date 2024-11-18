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
const closeBtn = document.querySelector<HTMLInputElement>(".close_btn");

/*
------------------------------------
Search-box 
------------------------------------
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

/*
------------------------------------
Where dropdown
------------------------------------
*/
const regionItems = document.querySelectorAll<HTMLElement>(".item");
const destination = document.querySelector<HTMLInputElement>(".destination");

regionItems.forEach((item) => {
  item.addEventListener("click", function (event) {
    const regionNameElement = item.querySelector<HTMLElement>(".region_name");
    const regionName = regionNameElement?.innerText; // regionName is now explicitly a string | undefined
    if (destination && regionName) {
      destination.value = regionName; // This should be valid as regionName is now explicitly checked as a string
      destination.style.fontWeight =
        regionName === "I'm flexible" ? "normal" : "bold";
      // Show the close button after clicking a region item
      if (regionName === "I'm flexible") {
        destination.value = "search destinations";
      }
    }
    // Switch sections
    whereSection.classList.remove("active_section");
    regionWrapper?.classList.add("hide");
    checkInSection.classList.add("active_section");

    event.stopPropagation();
  });
});

// Handle click on "where section" to re-show the close button
whereSection?.addEventListener("click", () => {
  regionWrapper?.classList.remove("hide");
  whereSection.classList.add("active_section");

  if (
    destination?.value !== "" &&
    whereSection.classList.contains("active_section")
  ) {
    closeBtn?.classList.remove("hide");
  } else {
    closeBtn?.classList.add("hide");
  }
  console.log("Close button classes:", closeBtn?.classList);
  console.log("Destination value:", destination?.value);
  console.log("Where sections classes:", whereSection.classList);
});

/*
----------------------------------
Function Calls
----------------------------------
*/
activeChanges(whereSection);
activeChanges(checkInSection);
activeChanges(checkOutSection);
activeChanges(whoSection);
activeChanges(dateSection);
/*
------------------------------------
 Navbar
------------------------------------
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
