/*================SKILLS TABS=================*/
const tabs = document.querySelectorAll('[data-target]'),
    tabContent = document.querySelectorAll('[data-content]')

    tabs.forEach(tab => {
        tab.addEventListener("click" , () =>  {
            const target = document.querySelector(tab.dataset.target)

            tabContent.forEach(tabContents => {
                tabContents.classList.remove("skills__active")
            })

            target.classList.add('skills__active') 
            

            tabs.forEach(tab => {
                tab.classList.remove("skills__active")
            })

            tab.classList.add('skills__active')
        })
     })

/*==============MIXITUP FILTER PORTFOLIO================*/
let mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});

// Add the toggler movement script
document.addEventListener('DOMContentLoaded', function() {
    const workItems = document.querySelectorAll('.work__item');
    const togglers = document.querySelectorAll('.red-toggler');

    // Function to update the selected state of togglers
    function updateSelectedState(selectedToggler) {
        togglers.forEach(toggler => {
            if (toggler === selectedToggler) {
                toggler.classList.add('selected');
                toggler.style.zIndex = '10'; // Example: Bring to front
            } else {
                toggler.classList.remove('selected');
                toggler.style.zIndex = ''; // Example: Reset z-index
            }
        });
    }

    // Load the persisted state from localStorage for togglers
    const persistedTogglerId = localStorage.getItem('selectedTogglerId');
    if (persistedTogglerId) {
        const persistedToggler = document.querySelector(`#${persistedTogglerId}`);
        if (persistedToggler) {
            updateSelectedState(persistedToggler);
        }
    }

    // Add click event listeners to all togglers
    togglers.forEach(toggler => {
        toggler.addEventListener('click', function() {
            updateSelectedState(this);
            localStorage.setItem('selectedTogglerId', this.id);
        });
    });

    // Add click event listeners to work items
    workItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove the active class from all items
            workItems.forEach(i => i.classList.remove('active-work'));

            // Add the active class to the clicked item
            this.classList.add('active-work');
        });
    });
});

/*=====================SERVICES MODAL=================*/



    const modalViews = document.querySelectorAll('.services__modal'),
          modelBtns = document.querySelectorAll('.services__button'),
          modalCloses = document.querySelectorAll('.services__modal-close');

    let modal = function(modalClick) {
        modalViews[modalClick].classList.add('active-modal');
    }

    modelBtns.forEach((modelBtn, i) => {
        modelBtn.addEventListener('click', () => {
            modal(i);
        });
    });

    modalCloses.forEach((modalClose, i) => {
        modalClose.addEventListener('click', () => {
            modalViews.forEach((modalView) =>  {
                modalViews.classList.remove('active-modal')
            })
        });
    });

/*=================SWIPER TESTIMONIAL===================*/
document.addEventListener('DOMContentLoaded', function () {
let swiper = new swiper(".testimonials__container", {
    spaceBetween: 24,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});




