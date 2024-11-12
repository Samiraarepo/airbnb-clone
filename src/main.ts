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
/*---------------Humbrger menu Drop Down-----------------------*/
const Dropbtn = document.getElementById("Drop-btn") as HTMLButtonElement;
const dropcontent = document.getElementById("drop-content") as HTMLDivElement;

Dropbtn?.addEventListener("click", () => {
  dropcontent.classList.toggle;
});
