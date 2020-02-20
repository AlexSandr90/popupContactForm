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

const config = {
    fields: {
        "Name": "#name-agro", // ФИО контакта, который регистрируется на мероприятие
        "MobilePhone": "#phone-agro", // Мобильный телефон контакта
        "Email": "#email-agro", // Email контакта
        "Commentary": "#comment-agro",
        "Company": "#wileId"
    },
    landingId: "7f0b525b-20af-4f05-b836-f78ea56c7676",
    serviceUrl: "https://crm.s1.ventalab.ua/0/ServiceModel/GeneratedObjectWebFormService.svc/SaveWebFormObjectData",
    redirectUrl: ''
};

const toggleClass = (el, className) => el.classList.toggle(className);
const removeClass = (el, className) => el.classList.remove(className);
const addClass = (el, className) => el.classList.add(className);

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

const removeClassErrors = () => {
    removeClass(name, 'error-box-form');
    removeClass(phone, 'error-box-form');
    removeClass(email, 'error-box-form');
    removeClass(company, 'error-box-form');
    name.placeholder = '*Ваше ім\'я';
    phone.placeholder = '*Телефон (+380 хххх хх хх)';
    email.placeholder = '*Поштова скринька';
    company.placeholder = '*Ваша компанія';
};

const windowOnClick = (event, el, classNameToggle) => {
    if (event.target === el) {
        setTimeout(() => removeClass(el, classNameToggle), 300);
        removeClassErrors();
    }
};

// const windowOnClick = event => {
//     if (event.target === formMain) {
//         setTimeout(() => removeClass(formMain, 'show-modal'), 300);
//         removeClassErrors();
//     }
// };

const mirageText = () => {
    setTimeout(() => addClass(faidText, 'popup-up'), 500);
    setTimeout(() => removeClass(faidText, 'popup-up'), 1500);
};

const submitForm = () => event => {
    event.preventDefault();

    const nameChecked = itemValidate(name, nameFormat, document.contactForm.name, 'Невірний формат даних', 'error-box-form');
    const phoneChecked = itemValidate(phone, phoneFormat, document.contactForm.phone, 'Невірний формат номеру', 'error-box-form');
    const emailChecked = itemValidate(email, mailFormat, document.contactForm.email, 'Невірний формат пошти', 'error-box-form');
    const wileId1 = $("#meter-select-agro option:selected").text();
    $("#wileId").val(wileId1);

    if (nameChecked && phoneChecked && emailChecked) {
        mirageText();
        createObject();
        removeClassErrors();
        setTimeout(() => toggleClass(formMain, 'show-modal'), 500);
        name.value = '';
        phone.value = '';
        email.value = '';
        company.value = '';
        return false;
    }
};

// toggle.addEventListener('click',() => toggleModal(formMain));
toggle.onclick = () => toggleModal(formMain, 'show-modal', 500);
window.addEventListener('click', windowOnClick);

// window.onclick = windowOnClick('click', formMain, 'show-modal');

close.addEventListener('click', () => {
    setTimeout(() => removeClass(formMain, 'show-modal'), 500);
    removeClassErrors();
});



modalOut.addEventListener('click', submitForm('click'));
modalOut.removeEventListener('click', submitForm('click'));

function createObject() {
    landing.createObjectFromLanding(config);
}
function initLanding() {
    landing.initLanding(config);
}
jQuery(document).ready(initLanding);