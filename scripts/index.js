const formMain = document.getElementById('form-main');
const modalOut = document.getElementById('button-blue');
const faidText = document.getElementById('popup-text-container');
const toggle = document.getElementById('popup-toggle');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const close = document.getElementById('close');
const name = document.getElementById('name');

const nameFormat = /^[a-zA-Zа-яА-Я ]{2,30}$/;
const phoneFormat = /^\+?([3-8]{2})\)?([0-9]{10})$/;
const mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const nameCheck = [document.contactForm.name, nameFormat, 'Невірний формат даних', 'error-box-form'];
const phoneCheck = [document.contactForm.phone, phoneFormat, 'Невірний формат номеру', 'error-box-form'];
const emailCheck = [document.contactForm.email, mailFormat, 'Невірний формат пошти', 'error-box-form']

const itemValidate = (item, itemFormat, placeholderValue, className) => {

    if (item.value.match(itemFormat)) {
        document.contactForm.name.focus();
        return true
    }

    document.contactForm.name.focus();
    item.placeholder = placeholderValue;
    item.classList.add(className);
    return false;
};

const nameValidate = name => {
    const nameFormat = /^[a-zA-Zа-яА-Я ]{2,30}$/;

    if (name.value.match(nameFormat)) {
        document.contactForm.name.focus();
        return true
    }

    document.contactForm.name.focus();
    name.placeholder = 'Невірний формат даних';
    name.classList.add('error-box-form');
    return false;
};
const phoneValidate = phone => {
    const phoneFormat = /^\+?([3-8]{2})\)?([0-9]{10})$/;

    if (phone.value.match(phoneFormat)) {
        document.contactForm.phone.focus();
        return true
    }

    document.contactForm.phone.focus();
    phone.placeholder = 'Невірний формат номеру';
    phone.classList.add('error-box-form');
    return false;
};
const emailValidate = email => {
    const mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.value.match(mailFormat)) {
        document.contactForm.email.focus();
        return true;
    }

    document.contactForm.email.focus();
    email.placeholder = 'Невірний формат пошти';
    email.classList.add('error-box-form');
    return false;
};

const toggleClass = (el, className) => el.classList.toggle(className);
const removeClass = (el, className) => el.classList.remove(className);
const addClass = (el, className) => el.classList.add(className);

const toggleModal = () => {
    setTimeout(() => toggleClass(formMain,'show-modal'), 500);
};

const removeClasses = () => {
    removeClass(name, 'error-box-form');
    removeClass(phone, 'error-box-form');
    removeClass(email, 'error-box-form');
    name.placeholder = '*Ваше ім\'я';
    phone.placeholder = '*Телефон (+380 хххх хх хх)';
    email.placeholder = '*Поштова скринька';
};

const windowOnClick = event => {
    if (event.target === formMain) {
        setTimeout(() => removeClass(formMain, 'show-modal'), 300);
        removeClasses();
    }
};

const mirageText = () => {
    setTimeout(() => addClass(faidText, 'popup-up'), 500);
    setTimeout(() => removeClass(faidText, 'popup-up'), 1500);
};


toggle.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);
close.addEventListener('click', () => {
    setTimeout(() => removeClass(formMain, 'show-modal'), 500);
    removeClasses();
});



modalOut.addEventListener('click', event => {
        event.preventDefault();

        const nameChecked = itemValidate(nameCheck);
        const phoneChecked = itemValidate(phoneCheck);
        const emailChecked = itemValidate(emailCheck);

        if (nameChecked && phoneChecked && emailChecked) {
            mirageText();
            setTimeout(() => toggleClass(formMain, 'show-modal'), 500);
            name.value = '';
            phone.value = '';
            email.value = '';
        }
    }
);



class ValidateForm {
    constructor({ elem }) {
        this.elem = elem;

        this.elem.addEventListener('click', this);
    }

    handleEvent(event) {
        this.validate(event.target.form);
    }

    showError(container, errorMessage) {
        container.classList.add('error-box-form');
        let msgElem = document.createElement('span');
        msgElem.classList.add('error-message');
        msgElem.innerHTML = errorMessage;
        container.append(msgElem);
    }

    resetError(container) {
        container.classList.remove('error');
        if (container.lastElementChild.classList.contains('error-message')) {
            container.lastChild.remove();
        }
    }

    validate(form) {
        let elems = form.elements;

        this.resetError(elems.from.parentNode);
        if (!elems.from.value) {
            this.showError(elems.from.parentNode, ' Укажите от кого.');
        }

        this.resetError(elems.password.parentNode);
        if (!elems.password.value) {
            this.showError(elems.password.parentNode, ' Укажите пароль.');
        } else if (elems.password.value !== elems.password2.value) {
            this.showError(elems.password.parentNode, ' Пароли не совпадают.');
        }

        this.resetError(elems.to.parentNode);
        if (!elems.to.value) {
            this.showError(elems.to.parentNode, ' Укажите, куда.');
        }

        this.resetError(elems.message.parentNode);
        if (!elems.message.value) {
            this.showError(elems.message.parentNode, ' Отсутствует текст.');
        }
    }
};