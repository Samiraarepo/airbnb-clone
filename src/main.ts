/*
********************************
=> Navbar
********************************
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
/*---------------Humbrger menu Drop Down-----------------------*/
const Dropbtn = document.getElementById("drop-btn") as HTMLButtonElement;
const dropcontent = document.getElementById("drop-content") as HTMLDivElement;

Dropbtn?.addEventListener("click", () => {
  dropcontent.classList.toggle("show");
});

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  if (!target.matches(".drop-show")) {
    dropcontent.classList.remove("show");
  }
});

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

/* who Drop Down logic */
const whodropdown = document.getElementById("who-dropdown") as HTMLElement;
whoSection?.addEventListener("click", () => {
  whodropdown.classList.toggle("show-dropdown");
});
document.addEventListener("click", (event) => {
  const whotarget = event.target as HTMLElement;
  if (!whotarget.matches(".drop_who_dropdwon")) {
    whodropdown.classList.remove("show-dropdown");
  }
});
/* FUNCTION UPDATE BUTTON STATE */
function updateButtonDisable(
  value: number,
  buttonSelector: HTMLElement | null
) {
  if (value <= 0) {
    buttonSelector?.setAttribute("disabled", "disabled");
  } else {
    buttonSelector?.removeAttribute("disabled");
  }
}

/* add increment and decrement logic to button */
function calcButton(initialvalue: number, part: HTMLElement) {
  const increment = part.querySelector(".increment") as HTMLButtonElement;
  const display = part.querySelector(".display") as HTMLElement;
  const decrement = part.querySelector(".decrement") as HTMLButtonElement;
  display.textContent = initialvalue.toString();
  updateButtonDisable(initialvalue, decrement);

  increment.addEventListener("click", (event) => {
    event.stopPropagation();
    initialvalue++;
    display.innerText = initialvalue.toString();
    updateButtonDisable(initialvalue, decrement);
  });
  decrement.addEventListener("click", (event) => {
    event.stopPropagation();
    if (initialvalue > 0) {
      initialvalue--;
      display.innerText = initialvalue.toString();
      updateButtonDisable(initialvalue, decrement);
    }
  });
}
calcButton(2, document.querySelector(".Adult-part") as HTMLElement);
calcButton(0, document.querySelector(".children_part") as HTMLElement);
calcButton(0, document.querySelector(".infants_part") as HTMLElement);
calcButton(0, document.querySelector(".pets_part") as HTMLElement);
