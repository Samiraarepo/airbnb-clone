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

/* who Drop Down and close button logic */
const whodropdown = document.getElementById("who-dropdown") as HTMLElement;
const who_section = document.getElementById("who") as HTMLElement;
const closeButtonWho = document.getElementById(
  "closebutton_who"
) as HTMLElement;
const guestCountDisplay = document.getElementById("guest-count") as HTMLElement;

// Toggle dropdown visibility when "Who" is clicked
who_section.addEventListener("click", (e) => {
  e.stopPropagation();
  whodropdown.classList.toggle("show-dropdown");
  if (totalLimit() === 0) {
    guestCountDisplay.textContent = "add guests";
  } else {
    updateGuestSummary(); //update summary if guests are resent
  }
});

// Hide dropdown and reset guest count when clicking outside
document.addEventListener("click", (event) => {
  const whotarget = event.target as HTMLElement;
  if (
    !whotarget.matches(".drop_who_dropdwon") &&
    !who_section.contains(whotarget)
  ) {
    closeDropdownAndReset(); // Call the new function to handle this
  }
});

// Function to handle dropdown hiding and UI reset
function closeDropdownAndReset() {
  whodropdown.classList.remove("show-dropdown"); // Hide dropdown
  resetGuestDisplay(); // Reset the guest display
}

// Hide dropdown and reset guest count when "Close" button is clicked
closeButtonWho.addEventListener("click", (event) => {
  event.stopPropagation();
  closeDropdownAndReset(); // Reuse the function
});

// Function to reset guest display
function resetGuestDisplay() {
  guestCountDisplay.textContent = "Add guests"; // Reset to "Add guests"
  closeButtonWho.style.display = "none"; // Hide the close button

  // //Reset each part display to 0
  // initializeButtonStates();
}

// Function to get numeric value from display elements
function getClass(selector: string): number {
  return parseInt(
    (document.querySelector(selector) as HTMLElement)?.textContent || "0",
    10
  );
}

// Function to enable/disable buttons
function setButtonDisabled(button: HTMLElement | null, isDisabled: boolean) {
  if (isDisabled) {
    button?.setAttribute("disabled", "disabled");
  } else {
    button?.removeAttribute("disabled");
  }
}

// Function to calculate total limits
function totalLimit() {
  const adultsCount = getClass(".Adult-part .display");
  const childrenCount = getClass(".children_part .display");
  return adultsCount + childrenCount;
}

// Function to update increment button states
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

// Function to update adult count
function updateAdultCount(increment: number) {
  const adultDisplay = document.querySelector(
    ".Adult-part .display"
  ) as HTMLElement;
  const adultCount = getClass(".Adult-part .display");
  adultDisplay.textContent = (adultCount + increment).toString();
}

// Function to handle increment/decrement button logic
function calcButton(initialvalue: number, part: HTMLElement) {
  const increment = part.querySelector(".increment") as HTMLButtonElement;
  const display = part.querySelector(".display") as HTMLElement;
  const decrement = part.querySelector(".decrement") as HTMLButtonElement;
  display.textContent = initialvalue.toString();

  increment.addEventListener("click", (event) => {
    event.stopPropagation();
    initialvalue++;
    display.innerText = initialvalue.toString();

    if (
      part.classList.contains("children_part") ||
      part.classList.contains("infants_part") ||
      part.classList.contains("pets_part")
    ) {
      updateAdultCount(1);
    }
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

// Function to format guest text
function formatGuestText(count: number, singular: string): string {
  return count > 0 ? `${count} ${singular} ${count > 1 ? "s" : ""}` : "";
}

// Function to update guest summary
function updateGuestSummary() {
  const infantsCount = getClass(".infants_part .display");
  const petsCount = getClass(".pets_part .display");

  const totalCount = totalLimit();
  const guestText = [];
  if (totalCount > 0) {
    guestText.push(formatGuestText(totalCount, "guest"));
  }
  guestText.push(formatGuestText(infantsCount, "infant"));
  guestText.push(formatGuestText(petsCount, "pet"));

  guestCountDisplay.textContent = guestText.filter(Boolean).join(", ");
  closeButtonWho.style.display = guestText.length > 0 ? "inline" : "none"; // Show or hide the close button based on the guest count
}

// Initialize button states on page load
function initializeButtonStates() {
  resetGuestDisplay(); // Reset display
  const buttonParts = [
    ".Adult-part",
    ".children_part",
    ".infants_part",
    ".pets_part",
  ];
  buttonParts.forEach((part) => {
    const count = getClass(`${part} .display`);
    setButtonDisabled(document.querySelector(`${part} .decrement`), count <= 0);
  });
  updateIncrementButtonDisable(16, 0, 5, 5);
}

// Initialize buttons for different categories
calcButton(0, document.querySelector(".Adult-part") as HTMLElement);
calcButton(0, document.querySelector(".children_part") as HTMLElement);
calcButton(0, document.querySelector(".infants_part") as HTMLElement);
calcButton(0, document.querySelector(".pets_part") as HTMLElement);
initializeButtonStates();
