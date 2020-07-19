const selectSingle = document.querySelector('.select');
const selectSingle_title = selectSingle.querySelector('.select__title');
const selectSingle_labels = selectSingle.querySelectorAll('.select__label');

// Toggle menu
selectSingle_title.addEventListener('click', () => {
  if ('active' === selectSingle.getAttribute('data-state')) {
    selectSingle.setAttribute('data-state', '');
  } else {
    selectSingle.setAttribute('data-state', 'active');
  }
});

// Close when click to option
for (let i = 0; i < selectSingle_labels.length; i++) {
  selectSingle_labels[i].addEventListener('click', (evt) => {
    selectSingle_title.textContent = evt.target.textContent;
    selectSingle.setAttribute('data-state', '');
  });
}

class Popup {
    constructor(
        closeBtns = [...document.querySelectorAll('.cross-button')],
        openBtns = [...document.querySelectorAll('.open-form')]
    ) {
        this.overlay = document.querySelector('.overlay');
        this.closeBtns = closeBtns;
        this.openBtns = openBtns;
        this.popups = [...document.querySelectorAll('.popup')];
        this.addHandlerForOpenBtns();
        this.addHandlersForCloseBtns();
    }

    addHandlerForOpenBtns() {
        document.body.addEventListener('click', e => {
            let target = e.target;
            let currentTarget = e.currentTarget;
            let isOpenBtn = false;
            let btnName = null;

            while(target !== currentTarget) {
                if(this.openBtns.includes(target)) {                    
                    e.stopImmediatePropagation();
                    isOpenBtn = true;
                    btnName = target.dataset.name;
                    const popup = document.getElementById(btnName);
                    if(popup) {
                        return this.openPopup(popup);
                    }else {
                        return;
                    }
                }
                target = target.parentElement;
            }
        })
    }

    openPopup(popup) {
        popup.classList.add('active');
        popup.hidden = false;
        if(popup.getAttribute('id') === 'open-form') {
            this.overlay.classList.add('active');
            this.overlay.hidden = false;
        }
    }

    addHandlersForCloseBtns() {
        document.body.addEventListener('click', e => {
            let target = e.target;
            let currentTarget = e.currentTarget;
            let isCloseBtn = false;
            let isPopup = false;
            while(target !== currentTarget) {
                if(this.closeBtns.includes(target)) {
                    isCloseBtn = true;
                }
                if(target.classList.contains('popup')) {
                    isPopup = true;
                }
                if(isCloseBtn && isPopup) {
                    return this.closePopup(target);
                }
                target = target.parentElement;
            }
            if(!isPopup) {
                this.popups.forEach(el => this.closePopup(el));
            }
        })
    }

    closePopup(popup) {
        popup.classList.remove('active');
        this.overlay.classList.remove('active');
        setTimeout(() => {
            popup.hidden = true;
            this.overlay.hidden = true;
        }, 500)
    }
}

class Form {
    constructor(
        form = document.querySelector('.form'),
        formSuccess = document.querySelector('.form-success')
    ) {
        this.form = form;
        this.loader = form.querySelector('.loader');
        this.formSuccess = formSuccess;

        this.addHandlersForForm();
    }

    addHandlersForForm() {
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            document.querySelector('.form__decor').style.display = "none";
            this.loader.classList.add('onload');
            setTimeout(() => {
                this.openSuccessForm();
            }, 1000)
        })
    }

    openSuccessForm() {
        this.form.hidden = true;
        this.loader.classList.remove('onload');
        this.formSuccess.hidden = false;
    }
}

class Header {
    constructor() {
        this.header = document.querySelector('.main-header');
        this.headerMenu = this.header.querySelector('.main-nav');
        this.headerContent = this.header.querySelector('.main-header__info-container');
        this.menuBtn = this.header.querySelector('.menu-button');
        this.menuIcon = this.menuBtn.querySelector('.menu-button__icon--menu');
        this.crossIcon = this.menuBtn.querySelector('.menu-button__icon--cross');

        this.addHandlerForMenuBtn();
    }

    addHandlerForMenuBtn() {
        this.menuBtn.onclick = () => {            
            this.headerContent.classList.toggle('open');
            this.headerMenu.classList.toggle('open');
            if(this.headerMenu.classList.contains('open')) {
                this.menuIcon.style.display = "none";
                this.crossIcon.style.display = "block";
            }else {
                this.crossIcon.style.display = "none";
                this.menuIcon.style.display = "block";
            }
        }
    }
};

class Map {
    constructor() {
        this.mapBtn = document.querySelector('.main-header__location .link');
        this.mapField = document.querySelector('.main-header__map-field');

        this.addHandlersFormapBtn();
        this.closePopup();
    }

    addHandlersFormapBtn() {
        this.mapBtn.addEventListener('click', () => {
            this.mapField.removeAttribute('hidden');
        })
    }

    closePopup() {
        document.body.addEventListener('click', e => {
            let target = e.target;
            let currentTarget = e.currentTarget;
            let isMap = false;
            let isOpenBtn = false;
            while(target !== currentTarget) {
                if(target.classList.contains('.map-field')) {
                    isMap = true;
                }
                if(target == this.mapBtn) {
                    isOpenBtn = true;
                }
                target = target.parentElement;
            }
            if(!isMap && !isOpenBtn) {
                this.mapField.setAttribute('hidden', 'true');
            }
        })
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const form = new Form();
    const popup = new Popup([
        ...document.querySelectorAll('.cross-button')
    ],[
        ...document.querySelectorAll('.open-form'),
        ...document.querySelectorAll('.info-button')
    ]);

    const map = new Map();
    const header = new Header();

    var scene = document.getElementById('scene');
    var parallaxInstance = new Parallax(scene);

    const telInputs = document.getElementsByClassName('input--tel');
    for (var i = 0; i < telInputs.length; i++) {
        new IMask(telInputs[i], {
            mask: '{+7}(000)000-00-00',
            min: 15,
        });
    };
});
