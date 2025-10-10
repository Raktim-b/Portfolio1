// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  AOS.init();

  // Get all filter buttons and project items
  const filterBtns = document.querySelectorAll(".fltr-btn");
  const projects = document.querySelectorAll(".prjct-cntn");

  // Function to handle filter button click
  function handleFilterClick() {
    // Remove active class from all buttons
    filterBtns.forEach(removeActiveClass);

    // Add active class to clicked button
    this.classList.add("active");

    // Get the filter category
    const filterValue = this.textContent.trim();
    console.log("Filter clicked:", filterValue);

    // Filter projects
    projects.forEach(function (project) {
      const category = project.querySelector(".title4").textContent.trim();

      if (filterValue === "All") {
        // Show all projects
        project.parentElement.style.display = "block";
      } else if (category === filterValue) {
        // Show matching projects
        project.parentElement.style.display = "block";
      } else {
        // Hide non-matching projects
        project.parentElement.style.display = "none";
      }
    });

    // Refresh AOS to remove animation delays
    AOS.refresh();
  }
  const buttons = document.querySelectorAll(".blog-btn");
  const blogCards = document.querySelectorAll(".blog-card");

  function removeActiveClass(button) {
    button.classList.remove("active");
  }

  function blogFilterClick() {
    // Remove active class from all buttons
    for (var i = 0; i < buttons.length; i++) {
      removeActiveClass(buttons[i]);
    }

    // Add active class to clicked button
    this.classList.add("active");

    var blogFilterValue = this.textContent.trim().toLowerCase();

    for (var j = 0; j < blogCards.length; j++) {
      var card = blogCards[j];
      var blogCategory = card
        .querySelector(".badge")
        .textContent.trim()
        .toLowerCase();

      if (blogFilterValue === "all posts") {
        card.parentElement.style.display = "block";
      } else if (blogCategory === blogFilterValue) {
        card.parentElement.style.display = "block";
      } else {
        card.parentElement.style.display = "none";
      }
    }

    AOS.refresh(); // Refresh animations
  }

  for (var k = 0; k < buttons.length; k++) {
    buttons[k].addEventListener("click", blogFilterClick);
  }

  console.log("Event listeners attached successfully!");
  // Function to remove active class
  function removeActiveClass(button) {
    button.classList.remove("active");
  }

  // Add click event to each filter button
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", handleFilterClick);
  });

  console.log("Event listeners attached successfully!");
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
  const swiper = new Swiper(".swiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    slidesPerView: 1,

    loop: true,
    // freeMode: true,
    breakpoints: {
      // when window width is >= 576px
      768: {
        slidesPerView: 2,
        // spaceBetween: 30,
      },
      // when window width is >= 992px
      1200: {
        slidesPerView: 3,
      },
    },
  });
});
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
