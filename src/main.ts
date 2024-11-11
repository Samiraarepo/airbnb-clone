let stays = document.getElementById("stay");
let experience = document.getElementById("exper");

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

console.log(stays);
