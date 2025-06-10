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

    // Switch subtitle based on type
    const modalSubtitle = document.getElementById("modal-tech-or-highlights");
    if (card.classList.contains("award-item")) {
      modalSubtitle.textContent = "Highlights";
    } else {
      modalSubtitle.textContent = "Tech Stack";
    }

    updateGallery();

    modalTags.innerHTML = "";
    // Only show tags/highlights in modal for projects and awards
    if (!card.classList.contains("award-item") || (card.classList.contains("award-item") && tags.length > 0)) {
      tags.forEach((tag) => {
        const span = document.createElement("span");
        let iconClass = "";
        switch(tag.toLowerCase()) {
          case "react":
            iconClass = "devicon-react-original colored";
            break;
          case "vite":
            iconClass = "devicon-vitejs-plain colored";
            break;
          case "firebase":
            iconClass = "devicon-firebase-plain colored";
            break;
          case "html":
            iconClass = "devicon-html5-plain colored";
            break;
          case "css":
            iconClass = "devicon-css3-plain colored";
            break;
          case "javascript":
            iconClass = "devicon-javascript-plain colored";
            break;
          case "php":
            iconClass = "devicon-php-plain colored";
            break;
          case "mysql":
            iconClass = "devicon-mysql-plain colored";
            break;
          case "webpack":
            iconClass = "devicon-webpack-plain colored";
            break;
        }
        if (iconClass && !card.classList.contains("award-item")) {
          const icon = document.createElement("i");
          icon.className = iconClass;
          span.appendChild(icon);
        }
        span.appendChild(document.createTextNode(" "));
        span.appendChild(document.createTextNode(tag));
        modalTags.appendChild(span);
      });
    }

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
    } else if (!card.classList.contains("award-item") && status === "private") {
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

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          alert("Message sent successfully!");
          contactForm.reset();
        } else {
          alert("Failed to send message. Please try again later.");
        }
      })
      .catch(() => {
        alert("Failed to send message. Please try again later.");
      });
    });
  }

  // Smooth scroll for 'Hire Me' button with header offset
  const hireMeBtn = document.querySelector('.btn.blue-btn[href="#contact"]');
  if (hireMeBtn) {
    hireMeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector('#contact');
      const header = document.getElementById('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  }
});
