const formMain = document.getElementById('form-main');
const modalOut = document.getElementById('button-blue-agro');
const faidText = document.getElementById('popup-text-container');
const company = document.getElementById('company-agro');
const toggle = document.getElementById('popup-toggle');
const phone = document.getElementById('phone-agro');
const email = document.getElementById('email-agro');
const close = document.getElementById('close');
const name = document.getElementById('name-agro');

const nameValidate = name => {
    const nameFormat = /^[a-zA-Zа-яА-Я ]{2,30}$/;

    if (name.value.match(nameFormat)) {
        document.contactForm.name.focus();
        return true;
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
        return true;
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

// const companyNameValidate = company => {

//     if (company.value.length <= 0) {
//         document.contactForm.company.focus();
//         company.placeholder = "Дане поле обов'язкове";
//         company.classList.add('error-box-form');
//         return false;
//     }

//     document.contactForm.company.focus();
//     return true;

// };

const removeClassErrors = () => {
    removeClass(name, 'error-box-form');
    removeClass(phone, 'error-box-form');
    removeClass(email, 'error-box-form');
    removeClass(company, 'error-box-form');
    name.placeholder = '*Ваше ім\'я';
    phone.placeholder = '*Телефон (+380 хххх хх хх)';
    email.placeholder = '*Поштова скринька';
    company.placeholder = 'Ваша компанія';
};

const toggleClass = (el, className) => el.classList.toggle(className);
const removeClass = (el, className) => el.classList.remove(className);
const addClass = (el, className) => el.classList.add(className);

const toggleModal = () => {
    setTimeout(() => toggleClass(formMain,'show-modal'), 500);
};

const windowOnClick = event => {
    if (event.target === formMain) {
        setTimeout(() => removeClass(formMain, 'show-modal'), 300);
        removeClassErrors();
    }
};

const mirageText = () => {
    setTimeout(() => addClass(faidText, 'popup-up'), 750);
    setTimeout(() => removeClass(faidText, 'popup-up'), 2000);
};

toggle.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);

close.addEventListener('click', () => {
    setTimeout(() => removeClass(formMain, 'show-modal'), 500);
    removeClassErrors();
});

let config = {
    fields: {
        "Name": "#name-agro", // ФИО контакта, который регистрируется на мероприятие
        "MobilePhone": "#phone-agro", // Мобильный телефон контакта
        "Email": "#email-agro", // Email контакта
        "Commentary": "#comment-agro",
        "Company": "#company-agro",
        "UsrLeadProduct":"#wileId"
    },
    landingId: "7f0b525b-20af-4f05-b836-f78ea56c7676",
    serviceUrl: "https://crm.s1.ventalab.ua/0/ServiceModel/GeneratedObjectWebFormService.svc/SaveWebFormObjectData",
    redirectUrl: ''
};

modalOut.addEventListener('click', event => {
        event.preventDefault();
        const nameChecked = nameValidate(document.contactForm.name);
        const phoneChecked = phoneValidate(document.contactForm.phone);
        const emailChecked = emailValidate(document.contactForm.email);
//         const companyChecked = companyNameValidate(document.contactForm.company);
        let fieldId = $("#meter-select-agro option:selected").text();
        $("#wileId").val(fieldId);
        if (nameChecked && phoneChecked && emailChecked) {
            mirageText();
            createObject();
            setTimeout(() => toggleClass(formMain, 'show-modal'), 500);
            name.value = '';
            phone.value = '';
            email.value = '';
            company.value = '';
            return false;
        }
    }
);

function createObject() {
    landing.createObjectFromLanding(config);
}
function initLanding() {
    landing.initLanding(config);
}
jQuery(document).ready(initLanding);