async function fetchAndRenderCategories() {
  try {
    const response = await fetch("/categories");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const { success, data } = await response.json();
    console.log("Categories fetched:", data);

    if (success && Array.isArray(data)) {
      renderCategories(data);
      addCarouselNavigation();
    } else {
      console.error("Unexpected data format", data);
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

function renderCategories(categories) {
  const container = document.querySelector(
    "#categories-container .carousel_wrapper"
  );
  if (!container) {
    console.error("Carousel container not found");
    return;
  }

  // Clear existing content
  container.innerHTML = "";

  // Populate categories dynamically
  categories.forEach(({ id, name, icon_url }) => {
    const figure = document.createElement("figure");

    figure.innerHTML = `
    <a href="${icon_url}">
          <img src="${icon_url}" alt="${name}">
          <figcaption>${name}</figcaption>
          </a>
        `;
    figure.dataset.categoryId = id;
    container.appendChild(figure);
  });
}
function addCarouselNavigation() {
  const wrapper = document.querySelector(".carousel_wrapper");

  const prevBtn = document.createElement("button");
  prevBtn.className = "prev";
  prevBtn.innerHTML = `<img src="./icons/chevron-left.svg">`;

  const nextBtn = document.createElement("button");
  nextBtn.className = "next";
  nextBtn.innerHTML = `<img src="./icons/chevron-right.svg">`;

  wrapper.appendChild(prevBtn);
  wrapper.appendChild(nextBtn);

  // Add event listeners to buttons
  prevBtn.addEventListener("click", () => {
    wrapper.scrollBy({ left: -400, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    wrapper.scrollBy({ left: 400, behavior: "smooth" });
  });
}
fetchAndRenderCategories();
