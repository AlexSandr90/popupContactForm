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

// const removeClassErrors = (className, ...elements) => {
//     const el = [...elements];
//     console.log(el);
//     elements.forEach(item => removeClass(item, className));
// };

// const removeClassErrors = (className, ...elements) => elements.forEach(item => removeClass(item, className));

// const windowOnClick = (event, el, classNameToggle) => {
//     if (event.target === el) {
//         // setTimeout(() => removeClass(el, classNameToggle), 300);
//         removeClass(el, classNameToggle);
//         removeClassErrors('error-box-form', name, phone, email, company);
//     }
// };

// const windowOnClick = event => {
//     if (event.target === formMain) {
//         setTimeout(() => removeClass(formMain, 'show-modal'), 300);
//         // removeClassErrors();
//         removeClassErrors('error-box-form', name, phone, email, company);
//     }
// };

// const mirageText = () => {
//     setTimeout(() => addClass(faidText, 'popup-up'), 750);
//     setTimeout(() => removeClass(faidText, 'popup-up'), 2000);
// };
// const removeClassErrors = () => {
//     removeClass(name, 'error-box-form');
//     removeClass(phone, 'error-box-form');
//     removeClass(email, 'error-box-form');
//     removeClass(company, 'error-box-form');
//     name.placeholder = '*Ваше ім\'я';
//     phone.placeholder = '*Телефон (+380 хххх хх хх)';
//     email.placeholder = '*Поштова скринька';
//     company.placeholder = '*Ваша компанія';
// };
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