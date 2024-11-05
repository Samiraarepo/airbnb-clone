// document.querySelector<HTMLDivElement>("#app")!.innerHTML = `

// `;

const whereSection = document.querySelector(".where_section");
const checkInSection = document.querySelector(".checkin_section");
const checkOutSection = document.querySelector(".checkout_section");
const whoSection = document.querySelector(".who_section");

const innerSearchBox = document.querySelector(".inner_search_box");
const activeBox = document.querySelectorAll(".active_box");
// whereSection?.addEventListener("click", function () {
//   whereSection.classList.add("active_section");
//   innerSearchBox?.classList.add("bg-active");
// });

// checkInSection?.addEventListener("click", function () {
//   checkInSection.classList.add("active_section");
//   innerSearchBox?.classList.add("bg-active");
// });

// checkOutSection?.addEventListener("click", function () {
//   checkOutSection.classList.add("active_section");
//   innerSearchBox?.classList.add("bg-active");
// });

// whoSection?.addEventListener("click", function () {
//   whoSection.classList.add("active_section");
//   innerSearchBox?.classList.add("bg-active");
// });

const activeChanges = (section: any) => {
  section?.addEventListener("click", function () {
    activeBox?.forEach((item) => item.classList.remove("active_section"));
    section.classList.toggle("active_section");
    innerSearchBox?.classList.add("bg-active");
  });
};

activeChanges(whereSection);
activeChanges(checkInSection);
activeChanges(checkOutSection);
activeChanges(whoSection);
