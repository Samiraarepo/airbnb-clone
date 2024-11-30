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
function getClass(selector: string): number {
  return parseInt(
    (document.querySelector(selector) as HTMLElement)?.textContent || "0",
    10
  );
}

function setButtonDisabled(button: HTMLElement | null, isDisabled: boolean) {
  if (isDisabled) {
    button?.setAttribute("disabled", "disabled");
  } else {
    button?.removeAttribute("disabled");
  }
}

function totalLimit() {
  const adultsCount = getClass(".Adult-part .display");
  const childrenCount = getClass(".children_part .display");
  return adultsCount + childrenCount;
}

function updateIncrementButtonDisable(
  maxAdults: number,
  maxChildren: number,
  maxInfants: number,
  maxPets: number
) {
  const incrementAdultButton = document.querySelector(
    ".Adult-part .increment"
  ) as HTMLButtonElement;
  const incrementChildrenButton = document.querySelector(
    ".children_part .increment"
  ) as HTMLButtonElement;
  const incrementInfantsButton = document.querySelector(
    ".infants_part .increment"
  ) as HTMLButtonElement;
  const incrementPetsButton = document.querySelector(
    ".pets_part .increment"
  ) as HTMLButtonElement;

  const currentTotal = totalLimit();
  const infantsCount = getClass(".infants_part .display");
  const petsCount = getClass(".pets_part .display");

  setButtonDisabled(incrementAdultButton, currentTotal >= maxAdults);

  const totalAdults = getClass(".Adult-part .display");
  const totalChildren = getClass(".children_part .display");
  const maxChildrenAllowed = maxAdults + maxChildren - totalAdults;

  setButtonDisabled(
    incrementChildrenButton,
    totalChildren >= maxChildrenAllowed
  );
  setButtonDisabled(incrementInfantsButton, infantsCount >= maxInfants);
  setButtonDisabled(incrementPetsButton, petsCount >= maxPets);
}

function calcButton(initialvalue: number, part: HTMLElement) {
  const increment = part.querySelector(".increment") as HTMLButtonElement;
  const display = part.querySelector(".display") as HTMLElement;
  const decrement = part.querySelector(".decrement") as HTMLButtonElement;
  display.textContent = initialvalue.toString();

  increment.addEventListener("click", (event) => {
    event.stopPropagation();
    initialvalue++;
    display.innerText = initialvalue.toString();
    setButtonDisabled(decrement, initialvalue <= 0);
    updateGuestSummary();
    updateIncrementButtonDisable(16, 0, 5, 5);
  });

  decrement.addEventListener("click", (event) => {
    event.stopPropagation();
    if (initialvalue > 0) {
      initialvalue--;
      display.innerText = initialvalue.toString();
      setButtonDisabled(decrement, initialvalue <= 0);
      updateGuestSummary();
      updateIncrementButtonDisable(16, 0, 5, 5);
    }
  });
}

function updateGuestSummary() {
  const adultsCount = getClass(".Adult-part .display");
  const childrenCount = getClass(".children_part .display");
  const infantsCount = getClass(".infants_part .display");
  const petsCount = getClass(".pets_part .display");

  const totalCount = adultsCount + childrenCount;
  const guestCountDisplay = document.getElementById(
    "guest-count"
  ) as HTMLElement;
  const closeButtonWho = document.getElementById(
    "closebutton_who"
  ) as HTMLButtonElement;
  const geustText = [];

  if (adultsCount > 0) {
    geustText.push(`${totalCount} guest${totalCount > 1 ? "s" : ""}`);
  }
  if (infantsCount > 0) {
    geustText.push(`${infantsCount} infant${infantsCount > 1 ? "s" : ""}`);
  }
  if (petsCount > 0) {
    geustText.push(`${petsCount} pet${petsCount > 1 ? "s" : ""}`);
  }

  guestCountDisplay.textContent = geustText.join(", ");

  closeButtonWho.style.display = geustText.length > 0 ? "inline" : "none";

  closeButtonWho.onclick = function (event) {
    event.stopPropagation();
    guestCountDisplay.textContent = "Add guests";
    closeButtonWho.style.display = "none";
  };
}
function initializeButtonStates() {
  const adultCount = getClass(".Adult-part .display");
  const childrenCount = getClass(".children_part .display");
  const infantsCount = getClass(".infants_part .display");
  const petsCount = getClass(".pets_part .display");

  setButtonDisabled(
    document.querySelector(".Adult-part .decrement"),
    adultCount <= 0
  );
  setButtonDisabled(
    document.querySelector(".children_part .decrement"),
    childrenCount <= 0
  );
  setButtonDisabled(
    document.querySelector(".infants_part .decrement"),
    infantsCount <= 0
  );
  setButtonDisabled(
    document.querySelector(".pets_part .decrement"),
    petsCount <= 0
  );

  updateIncrementButtonDisable(16, 0, 5, 5);
}

calcButton(2, document.querySelector(".Adult-part") as HTMLElement);
calcButton(0, document.querySelector(".children_part") as HTMLElement);
calcButton(0, document.querySelector(".infants_part") as HTMLElement);
calcButton(0, document.querySelector(".pets_part") as HTMLElement);
initializeButtonStates();
