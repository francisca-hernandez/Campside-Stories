// Nav Bar - Making it so the bar shows up on the left 
document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });


  // API for Campsites 

  let url = "https://ridb.recreation.gov/api/v1/facilities?limit=5&offset=0&state=WA&radius=10&activity=CAMPING&lastupdated=10-01-2018&apikey=ad1485d4-8c3a-403d-8244-10d0d8498353";
  let $campsiteContainer = document.getElementById("campsite-container");
  let $usStatesContainer = document.querySelector("#us-states-container");
  let $modalContainer = document.querySelector(".modal-container");

  // event listener for when options are changed
  $usStatesContainer.addEventListener('change', function (event) {

    let $selectedState = $usStatesContainer.value;

    let url = "https://ridb.recreation.gov/api/v1/facilities?limit=5&offset=0&state=" + $selectedState + "&radius=10&activity=CAMPING&lastupdated=10-01-2018&apikey=ad1485d4-8c3a-403d-8244-10d0d8498353";




    console.log(event.target)
    console.log($usStatesContainer.value);

    fetch(url).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data.RECDATA);

          for (i = 0; i < data.RECDATA.length; i++) {
            let $campsiteCard = document.createElement("div");

            // create modal div within modal container
            $campsiteCard.id = ("modal" + [i]);
            $campsiteCard.classList = ("modal");
            
            $modalContainer.appendChild($campsiteCard);

            let $modalBackground = document.createElement("div");
            $modalBackground.classList = ("modal-background");
            $campsiteCard.appendChild($modalBackground);

            let $modalCard = document.createElement("div");
            $modalCard.classList = ("modal-card");
            $campsiteCard.appendChild($modalCard);

            let $modalContentContainer = document.createElement("div");
            $modalContentContainer.classList = ("modal-card");

            let $modalCardHeader = document.createElement("header");
            $modalCardHeader.classList = ("modal-card-head")

            let $modalCardTitle = document.createElement("p");
            $modalCardTitle.classList = ("modal-card-title");
            $modalCardTitle.textContent = data.RECDATA[i].FacilityName;

            let $modalDescriptionContainer = document.createElement("section");
            $modalDescriptionContainer.classList = ("modal-card-body");
            
            let $modalDescriptionText = document.createElement("p");
            $modalDescriptionText.innerHTML = data.RECDATA[i].FacilityDescription;
            $modalDescriptionContainer.appendChild($modalDescriptionText);

            $modalCardHeader.appendChild($modalCardTitle);
            $modalCard.appendChild($modalCardHeader);
            $modalCard.appendChild($modalDescriptionContainer);

            let $modalTargetButton = document.createElement("button");
            $modalTargetButton.classList = ("js-modal-trigger button is-primary");
            $modalTargetButton.setAttribute("data-target", $campsiteCard.id)
            $modalTargetButton.textContent = data.RECDATA[i].FacilityName;

            $campsiteContainer.appendChild($modalTargetButton);



            // Functions to open and close a modal
            function openModal($el) {
              $el.classList.add('is-active');
            }

            function closeModal($el) {
              $el.classList.remove('is-active');
            }

            function closeAllModals() {
              (document.querySelectorAll('.modal') || []).forEach(($modal) => {
                closeModal($modal);
              });
            }

            // Add a click event on buttons to open a specific modal
            (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
              const modal = $trigger.dataset.target;
              const $target = document.getElementById(modal);

              $trigger.addEventListener('click', () => {
                openModal($target);
              });
            });

            // Add a click event on various child elements to close the parent modal
            (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
              const $target = $close.closest('.modal');

              $close.addEventListener('click', () => {
                closeModal($target);
              });
            });

            // Add a keyboard event to close all modals
            document.addEventListener('keydown', (event) => {
              const e = event || window.event;

              if (e.keyCode === 27) { // Escape key
                closeAllModals();
              }
            });




          };
        });
      };
    });
  })


});


