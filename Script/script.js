// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  AOS.init();
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,

    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev",
    // },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // freeMode: true,
    breakpoints: {
      // when window width is >= 576px
      768: {
        slidesPerView: 2,
        // spaceBetween: 30,
      },
      992: {
        slidesPerView: 3,
        // spaceBetween: 30,
      },
      // when window width is >= 992px
      1200: {
        slidesPerView: 4,
      },
    },
  });
  // For cursor
  const cursor = document.querySelector(".cursor");
  let mouseX = 0;
  let mouseY = 0;
  let clientX = 0;
  let clientY = 0;
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  function MouseMove() {
    clientX += (mouseX - clientX) * 0.05;
    clientY += (mouseY - clientY) * 0.05;

    cursor.style.top = clientY + "px";
    cursor.style.left = clientX + "px";

    requestAnimationFrame(MouseMove);
  }
  MouseMove();

  const filterBtns = document.querySelectorAll(".fltr-btn");
  const slides = document.querySelectorAll(".swiper-slide");

  function removeActiveClass(btn) {
    btn.classList.remove("active");
  }

  function handleFilterClick() {
    // Remove active class from all filter buttons
    filterBtns.forEach(removeActiveClass);
    this.classList.add("active");

    // Get selected filter value
    const filterValue = this.textContent.trim().toLowerCase();

    // Loop through all slides
    slides.forEach((slide) => {
      const projectCategory = slide
        .querySelector(".title4")
        .textContent.trim()
        .toLowerCase();

      // Show or hide slide
      if (filterValue === "all" || projectCategory === filterValue) {
        slide.style.display = "block"; // show
      } else {
        slide.style.display = "none"; // hide
      }
    });

    // Refresh Swiper layout after filtering
    swiper.update();
  }

  // Add event listeners to buttons
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", handleFilterClick);
  });

  // Get all filter buttons and project items

  // Refresh AOS to remove animation delays

  // Filter for blog page
  const buttons = document.querySelectorAll(".blog-btn");
  const blogCards = document.querySelectorAll(".blog-card");

  function removeActiveClass(button) {
    button.classList.remove("active");
  }

  function blogFilterClick() {
    // Remove active class from all buttons
    buttons.forEach(removeActiveClass);

    // Add active class to the clicked button
    this.classList.add("active");

    // Get clicked button text
    const blogFilterValue = this.textContent.trim().toLowerCase();

    // Loop through all cards
    blogCards.forEach((card) => {
      const blogCategory = card
        .querySelector(".badge")
        .textContent.trim()
        .toLowerCase();

      // Show or hide cards based on the selected filter
      if (
        blogFilterValue === "all posts" ||
        blogFilterValue === "all" ||
        blogCategory.includes(blogFilterValue)
      ) {
        card.parentElement.style.display = "block";
      } else {
        card.parentElement.style.display = "none";
      }
    });

    // Refresh AOS animations after filtering
    AOS.refresh();
  }

  // Add event listeners
  buttons.forEach((btn) => {
    btn.addEventListener("click", blogFilterClick);
  });

  const formInput = document.querySelector(".input-form");
  const emailInput = document.getElementById("email-input");
  const re =
    /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]{0,62}[a-zA-Z0-9])?@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.com$/;

  const error = document.createElement("p");

  error.style.color = "Red";
  function submitForm(e) {
    e.preventDefault();
    console.log(re.test(emailInput.value));
    if (!re.test(emailInput.value)) {
      // error.innerText = "Not a valid email address";
      // emailInput.insertAdjacentElement("beforebegin", error);
      alert("Not a valid email");
    }

    console.log(emailInput.value);
  }
  formInput.addEventListener("submit", submitForm);
  const backToTopBtn = document.getElementById("backToTop");

  // Show button when user scrolls down 300px
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  // Smooth scroll to top when button is clicked
  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
function initTilt() {
  const tiltElements = document.querySelectorAll("[data-tilt]");

  if (window.innerWidth > 768) {
    tiltElements.forEach((el) => {
      if (!el.vanillaTilt) {
        VanillaTilt.init(el, {
          max: 15,
          speed: 400,
          glare: true,
          "max-glare": 0.3,
          gyroscope: false, // prevents phone motion effect
        });
      }
    });
  } else {
    tiltElements.forEach((el) => {
      if (el.vanillaTilt) {
        el.vanillaTilt.destroy();
      }
    });
  }
}

initTilt();
window.addEventListener("resize", initTilt);

document
  .querySelector(".input-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const firstName = document.getElementById("fname-input").value;
    const lastName = document.getElementById("lname-input").value;
    const email = document.getElementById("email-input").value;
    const message = document.getElementById("text-input").value;

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("message", message);

    try {
      // Using Formspree - Replace YOUR_FORM_ID with your actual Formspree form ID
      const response = await fetch("https://formspree.io/f/xgvnlogv", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        alert("Thank you! Your message has been sent successfully.");
        this.reset();
      } else {
        alert("Oops! There was a problem sending your message.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  });
