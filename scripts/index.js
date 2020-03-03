const formMain = document.getElementById('form-main');
const modalOut = document.getElementById('button-blue-agro');
const faidText = document.getElementById('popup-text-container');
const company = document.getElementById('company-agro');
const toggle = document.getElementById('popup-toggle');
const phone = document.getElementById('phone-agro');
const email = document.getElementById('email-agro');
const close = document.getElementById('close');
const name = document.getElementById('name-agro');

const nameFormat = /^[a-zA-Zа-яА-Я ]{2,30}$/;
const phoneFormat = /^\+?([3-8]{2})\)?([0-9]{10})$/;
const mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const addClass = (el, className) => el.classList.add(className);
const toggleClass = (el, className) => el.classList.toggle(className);
const removeClass = (el, className) => el.classList.remove(className);

const toggleModal = (el, className, time) => {
    setTimeout(() => toggleClass(el,className), time);
};

const itemValidate = (item, itemFormat, itemFocus,  placeholderValue, className) => {

    if (item.value.match(itemFormat)) {
        itemFocus.focus();
        return true;
    }

    itemFocus.focus();
    item.placeholder = placeholderValue;
    item.classList.add(className);
    return false;
};

const getPlaceholderValue = (item, values) => {
    if (item.length === values.length) {
        for (let i = 0; i < item.length; i++) {
            item[i].placeholder = values[i];
        }
    }

};

const resetValue = elements => elements.forEach(item => item.value = '');

const removeClassErrors = (className, ...elements) => {
    const el = [...elements];
    el.forEach(item => removeClass(item, className));
};

const mirageText = (el, className, addTime, removeTime) => {
    setTimeout(() => addClass(el, className), addTime);
    setTimeout(() => removeClass(el, className), removeTime);
};

const submitForm = () => event => {
    event.preventDefault();

    const nameChecked = itemValidate(name, nameFormat, document.contactForm.name, 'Невірний формат даних', 'error-box-form');
    const phoneChecked = itemValidate(phone, phoneFormat, document.contactForm.phone, 'Невірний формат номеру', 'error-box-form');
    const emailChecked = itemValidate(email, mailFormat, document.contactForm.email, 'Невірний формат пошти', 'error-box-form');

    const elements = [name, phone, email, company];

    if (nameChecked && phoneChecked && emailChecked) {
        mirageText(faidText, 'popup-up', 750, 2000);
        removeClassErrors('error-box-form', name, phone, email, company);
        setTimeout(() => toggleClass(formMain, 'show-modal'), 500);
        resetValue(elements);
    }
};

toggle.onclick = () => toggleModal(formMain, 'show-modal', 500);

window.onclick = event => {
    if (event.target === formMain) {
        setTimeout( () => {
            removeClass(formMain, 'show-modal');
            removeClassErrors('error-box-form', name, phone, email, company);
            let items = [name, phone, email, company];
            let values = ['*Ваше ім\'я', '*Телефон (+380 хххх хх хх)', '*Поштова скринька', 'Ваша компанія']
            getPlaceholderValue(items, values);
        }, 300);
    }
};

close.onclick = () => {
    setTimeout( () => {
        removeClass(formMain, 'show-modal');
        removeClassErrors('error-box-form', name, phone, email, company);
        let items = [name, phone, email, company];
        let values = ['*Ваше ім\'я', '*Телефон (+380 хххх хх хх)', '*Поштова скринька', 'Ваша компанія']
        getPlaceholderValue(items, values);
    }, 300);
};

modalOut.addEventListener('click', submitForm('click'));
modalOut.removeEventListener('click', submitForm('click'));
