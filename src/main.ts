// document.querySelector<HTMLDivElement>("#app")!.innerHTML = `

// `;

const whereSection = document.querySelector(".where_section");
const checkInSection = document.querySelector(".checkin_section");
const checkOutSection = document.querySelector(".checkout_section");
const whoSection = document.querySelector(".who_section");
const dateSection = document.querySelector(".date_section");

const innerSearchBox = document.querySelector(".inner_search_box");
const activeBox = document.querySelectorAll(".active_box");
// const searchBtn = document.querySelector(".search_btn button");
const dropdownWrapper = document.querySelector(".dropdown_wrapper");

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
    // dropdownWrapper?.classList.remove("hide");
  }
});

whereSection?.addEventListener("click", function () {
  dropdownWrapper?.classList.toggle("hide");
});

activeChanges(whereSection);
activeChanges(checkInSection);
activeChanges(checkOutSection);
activeChanges(whoSection);
activeChanges(whoSection);
activeChanges(dateSection);
