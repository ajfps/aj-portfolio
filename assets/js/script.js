document.addEventListener("DOMContentLoaded", () => {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      btn.classList.add("active");

      const tabId = btn.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  const projectCards = document.querySelectorAll(".project-card");
  const awardItems = document.querySelectorAll(".award-item");
  const modalOverlay = document.getElementById("projectModal");
  const modalCloseBtn = document.querySelector(".modal-close-btn");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalTags = document.getElementById("modal-tags");
  const modalDescription = document.getElementById("modal-description");
  const modalLiveDemoLink = document.getElementById("modal-live-demo");
  const modalViewCodeLink = document.getElementById("modal-view-code");
  const galleryPrevBtn = document.getElementById("gallery-prev-btn");
  const galleryNextBtn = document.getElementById("gallery-next-btn");
  const galleryThumbnailsContainer =
    document.getElementById("gallery-thumbnails");
  const modalPrivateMessage = document.getElementById("modal-private-message");

  let currentImageIndex = 0;
  let projectImages = [];

  function openModal(card) {
    console.log("openModal called for:", card);
    const title = card.dataset.title;
    const description = card.dataset.description;
    const images = card.dataset.images;
    const tags = card.dataset.tags ? card.dataset.tags.split(", ") : [];
    const liveDemoLink = card.dataset.liveDemoLink;
    const viewCodeLink = card.dataset.viewCodeLink;
    const status = card.dataset.status;

    projectImages = images ? images.split(",").map((img) => img.trim()) : [];
    currentImageIndex = 0;

    console.log("Modal Data:", {
      title,
      description,
      projectImages,
      tags,
      liveDemoLink,
      viewCodeLink,
      status,
    });

    modalTitle.textContent = title;
    modalDescription.textContent = description;

    updateGallery();

    modalTags.innerHTML = "";
    tags.forEach((tag) => {
      const span = document.createElement("span");
      span.textContent = tag;
      modalTags.appendChild(span);
    });

    modalLiveDemoLink.style.display = "none";
    modalViewCodeLink.style.display = "none";
    modalPrivateMessage.style.display = "none";

    if (status === "public-both") {
      if (liveDemoLink && liveDemoLink !== "#") {
        modalLiveDemoLink.href = liveDemoLink;
        modalLiveDemoLink.style.display = "inline-block";
      }
      if (viewCodeLink && viewCodeLink !== "#") {
        modalViewCodeLink.href = viewCodeLink;
        modalViewCodeLink.style.display = "inline-block";
      }
    } else if (status === "public-link-only") {
      if (liveDemoLink && liveDemoLink !== "#") {
        modalLiveDemoLink.href = liveDemoLink;
        modalLiveDemoLink.style.display = "inline-block";
      }
    } else if (status === "public-code-only") {
      if (viewCodeLink && viewCodeLink !== "#") {
        modalViewCodeLink.href = viewCodeLink;
        modalViewCodeLink.style.display = "inline-block";
      }
    } else if (status === "private") {
      modalPrivateMessage.style.display = "block";
    }

    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
    console.log("Modal active class added.");
  }

  function updateGallery() {
    if (projectImages.length === 0) {
      modalImage.src = "";
      galleryThumbnailsContainer.innerHTML = "";
      galleryPrevBtn.style.display = "none";
      galleryNextBtn.style.display = "none";
      return;
    }

    modalImage.src = projectImages[currentImageIndex];

    galleryThumbnailsContainer.innerHTML = "";
    projectImages.forEach((imgSrc, index) => {
      const thumbnailItem = document.createElement("div");
      thumbnailItem.classList.add("thumbnail-item");
      if (index === currentImageIndex) {
        thumbnailItem.classList.add("active");
      }
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = `Thumbnail ${index + 1}`;
      thumbnailItem.appendChild(img);
      thumbnailItem.addEventListener("click", () => {
        currentImageIndex = index;
        updateGallery();
      });
      galleryThumbnailsContainer.appendChild(thumbnailItem);
    });

    if (projectImages.length > 1) {
      galleryPrevBtn.style.display = "flex";
      galleryNextBtn.style.display = "flex";
    } else {
      galleryPrevBtn.style.display = "none";
      galleryNextBtn.style.display = "none";
    }
  }

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % projectImages.length;
    updateGallery();
  }

  function showPrevImage() {
    currentImageIndex =
      (currentImageIndex - 1 + projectImages.length) % projectImages.length;
    updateGallery();
  }

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  projectCards.forEach((card) => {
    card.addEventListener("click", () => openModal(card));
  });

  awardItems.forEach((card) => {
    card.addEventListener("click", () => openModal(card));
  });

  modalCloseBtn.addEventListener("click", closeModal);
  galleryPrevBtn.addEventListener("click", showPrevImage);
  galleryNextBtn.addEventListener("click", showNextImage);

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
});
