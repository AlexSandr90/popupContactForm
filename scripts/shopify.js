const formMain = document.getElementById('form-main');
const modalOut = document.getElementById('button-blue');
const toggle = document.getElementById('popup-toggle');
const name = document.getElementById('name');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const faidText = document.getElementById('popup-text-container');


const nameValidate = name => {
    const nameFormat = /^[a-zA-Zа-яА-Я ]{2,30}$/;

    if (name.value.match(nameFormat)) {
        document.contactForm.name.focus();
        console.log(`true name`);
        return true
    }

    document.contactForm.name.focus();
    name.placeholder = 'Невірний формат даних';
    name.classList.add('error-box-form');
    console.log('false name');
    return false;
};
const phoneValidate = phone => {
    // const phoneFormat = /^\+?([3-8]{2})\)?([0-9]{3})?([0-9]{3})?([0-9]{2})?([0-9]{2})$/;
    const phoneFormat = /^\+?([3-8]{2})\)?([0-9]{10})$/;

    if (phone.value.match(phoneFormat)) {
        document.contactForm.phone.focus();
        console.log(`true phone`);
        return true
    }

    document.contactForm.phone.focus();
    phone.placeholder = 'Невірний формат номеру';
    phone.classList.add('error-box-form');
    console.log(`false phone`);
    return false;
};

const emailValidate = email => {
    const mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.value.match(mailFormat)) {
        document.contactForm.email.focus();
        console.log(`true email`);
        return true;
    }

    document.contactForm.email.focus();
    email.placeholder = 'Невірний формат пошти';
    email.classList.add('error-box-form');
    console.log(`false email`);
    return false;
};

const toggleModal = () => {
    setTimeout(() => formMain.classList.toggle('show-modal'), 1000);
};

const windowOnClick = event => {
    if (event.target === formMain) {
        toggleModal();
        name.classList.remove('error-box-form');
        phone.classList.remove('error-box-form');
        email.classList.remove('error-box-form');
        name.placeholder = '*Ваше ім\'я';
        phone.placeholder = '*Телефон (+380 хххх хх хх)';
        email.placeholder = '*Поштова скринька';
    }
};

const mirageText = () => {
    setTimeout(() => faidText.classList.add('popup-up'), 200);
    setTimeout(() => faidText.classList.remove('popup-up'), 3000);
};

toggle.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);

modalOut.addEventListener('click', event => {
        event.preventDefault();
        const nameChecked = nameValidate(document.contactForm.name);
        const phoneChecked = phoneValidate(document.contactForm.phone);
        const emailChecked = emailValidate(document.contactForm.email);

        if (nameChecked && phoneChecked && emailChecked) {
            mirageText();
            toggleModal();
            name.value = '';
            phone.value = '';
            email.value = '';
            // name.placeholder = '*Имя';
            // phone.placeholder = '*Номер телефона';
            // email.placeholder = '*Почта';
        }

        // alert('У вас неправильно заполнено одно из полей')
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