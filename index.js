// nav links border buttom on hover=====================
const navLink = $(".nav-link");

navLink.on("mouseenter", function () {
  $(this).addClass("border-bottom border-altprimary border-1");
});

navLink.on("mouseleave", function () {
  $(this).removeClass("border-bottom border-altprimary border-1");
});

// dynamic date========================================
const now = new Date();
const currentYear = now.getFullYear();
const span = $(".dynamicDate");
span.text(currentYear);

// Firebase-----------------------------------------------------------------------------------------

// ---
const accordion = document.querySelector(".accordion");

// ---
const addQuestionsAndAnswers = (data, id) => {
  let html = `
    <div data-id="${id}" class="accordion-item">
      <h2 class="accordion-header" id="flush-heading${id}">
        <button
          class="accordion-button collapsed fw-bolder text-muted"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapse${id}"
          aria-expanded="false"
          aria-controls="flush-collapse${id}"
        >
          ${data.questions}
        </button>
      </h2>
      <div
        id="flush-collapse${id}"
        class="accordion-collapse collapse"
        aria-labelledby="flush-heading${id}"
        data-bs-parent="#accordionFlushExample"
      >
        <div class="accordion-body">
          <p class="lead">${data.answers}</p>
        </div>
      </div>
    </div>
  `;
  accordion.innerHTML += html;
};

// =======================================================================
// ---
// real time listener

// delete in real time from ui
const deleteQuestionsAndAnswers = (id) => {
  const accordionItems = document.querySelectorAll(".accordion-item");
  accordionItems.forEach((accordionItem) => {
    if (accordionItem.getAttribute("data-id") === id) {
      accordionItem.remove();
    }
  });
};

// ================================================
// // edit ui
const editQuestion = (data, id) => {
  const accordionItems = document.querySelectorAll(".accordion-item");
  const accordionButton = document.querySelector(".accordion-button");
  const accordionBody = document.querySelector(".accordion-body");

  accordionItems.forEach((accordionItem) => {
    if (accordionItem.getAttribute("data-id") === id) {
      console.log(data);
      console.log(accordionButton.textContent);
      accordionButton.textContent = data.questions;
      console.log(accordionBody.textContent);
      accordionBody.textContent = data.answers;
    }
  });
};

// ===================================================================
// retrieve data in real time
const unsub = db
  .collection("Q&A")
  .orderBy("created_at", "desc")
  .onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const doc = change.doc;
      if (change.type === "added") {
        addQuestionsAndAnswers(doc.data(), doc.id);
      } else if (change.type === "removed") {
        deleteQuestionsAndAnswers(doc.id);
      } else if (change.type === "modified") {
        editQuestion(doc.data(), doc.id);
      }
    });
  });
