const instagramHandle = "auradparfum.shop";

const buyButtons = document.querySelectorAll(".buy-button");
const revealItems = document.querySelectorAll(".reveal");
const imageTriggers = document.querySelectorAll(".collection-image-wrap");
const lightbox = document.querySelector(".image-lightbox");
const lightboxImage = document.querySelector(".image-lightbox-img");
const lightboxClose = document.querySelector(".image-lightbox-close");
const lightboxBackdrop = document.querySelector(".image-lightbox-backdrop");

buyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;

    if (targetId) {
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        target.classList.add("is-highlighted");

        window.setTimeout(() => {
          target.classList.remove("is-highlighted");
        }, 1600);
      }

      return;
    }

    const card = button.closest(".product-card, .collection-card");
    const product =
      card?.dataset.product ||
      card?.querySelector(".product-name, .collection-name")?.textContent?.trim() ||
      "este perfume";
    const price =
      card?.dataset.price ||
      card?.querySelector(".product-price, .collection-price")?.textContent?.trim() ||
      "el precio publicado";
    const stock = card?.dataset.stock;
    const message = stock
      ? `Hola, quiero comprar ${product}. Vi que esta a ${price} y figura como: ${stock}.`
      : `Hola, quiero comprar ${product}. Vi que esta a ${price}.`;

    window.open(
      `https://instagram.com/${instagramHandle}?utm_source=ig_web_button_share_sheet`,
      "_blank",
      "noopener,noreferrer"
    );

    navigator.clipboard?.writeText(`Mensaje sugerido para Instagram: ${message}`);
  });
});

const openLightbox = (image) => {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt || "Imagen ampliada del perfume";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  document.body.style.overflow = "";
};

imageTriggers.forEach((trigger) => {
  const image = trigger.querySelector(".collection-image");

  trigger.addEventListener("click", () => {
    if (image) {
      openLightbox(image);
    }
  });
});

lightboxClose?.addEventListener("click", closeLightbox);
lightboxBackdrop?.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox?.classList.contains("is-open")) {
    closeLightbox();
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealItems.forEach((item) => observer.observe(item));
