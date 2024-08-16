"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./classicToast.css");
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const worldClassToast = (type, options) => {
    const { message, subtitle, position = 'top-center', icon, timeout = 3000, customClass, iconClass, messageClass, subtitleClass, customStyle, closeButton = '&times', } = options;
    const toastElement = document.createElement('div');
    toastElement.classList.add('my-toast', type, position);
    toastElement.setAttribute('role', 'alert');
    toastElement.setAttribute('aria-live', 'assertive');
    // Apply any custom classes
    if (customClass) {
        const classList = customClass.split(' ');
        classList.forEach((className) => {
            toastElement.classList.add(className);
        });
    }
    if (customStyle) {
        Object.assign(toastElement.style, customStyle);
    }
    if (icon) {
        const iconElement = document.createElement('div');
        iconElement.classList.add('icon');
        if (typeof icon === 'string') {
            const imageElement = document.createElement('img');
            imageElement.src = icon;
            iconElement.appendChild(imageElement);
        }
        else if (icon instanceof HTMLImageElement) {
            iconElement.appendChild(icon);
        }
        else if (react_1.default.isValidElement(icon)) {
            react_dom_1.default.render(icon, iconElement);
        }
        if (iconClass) {
            let classList;
            if (typeof iconClass === 'string') {
                classList = iconClass.split(' ');
            }
            else if (Array.isArray(iconClass)) {
                classList = iconClass;
            }
            else {
                classList = [];
            }
            classList.forEach((className) => {
                iconElement.classList.add(className);
            });
        }
        toastElement.appendChild(iconElement);
    }
    const messageElement = document.createElement('span');
    messageElement.classList.add('message');
    if (messageClass) {
        let classList;
        if (typeof messageClass === 'string') {
            classList = messageClass.split(' ');
        }
        else if (Array.isArray(messageClass)) {
            classList = messageClass;
        }
        else {
            classList = [];
        }
        classList.forEach((className) => {
            messageElement.classList.add(className);
        });
    }
    messageElement.innerText = message;
    toastElement.appendChild(messageElement);
    if (subtitle) {
        const subtitleElement = document.createElement('div');
        subtitleElement.classList.add('subtitle');
        if (subtitleClass) {
            let classList;
            if (typeof subtitleClass === 'string') {
                classList = subtitleClass.split(' ');
            }
            else if (Array.isArray(subtitleClass)) {
                classList = subtitleClass;
            }
            else {
                classList = [];
            }
            classList.forEach((className) => {
                subtitleElement.classList.add(className);
            });
        }
        subtitleElement.innerText = subtitle;
        toastElement.appendChild(subtitleElement);
    }
    const closeElement = document.createElement('button');
    closeElement.classList.add('close-button');
    if (closeButton !== null) {
        if (typeof closeButton === 'string') {
            closeElement.innerHTML = closeButton;
        }
        else if (closeButton instanceof HTMLElement) {
            closeElement.appendChild(closeButton);
        }
        else if (react_1.default.isValidElement(closeButton)) {
            react_dom_1.default.render(closeButton, closeElement);
        }
    }
    closeElement.addEventListener('click', () => {
        if (toastElement.parentNode === document.body) {
            document.body.removeChild(toastElement);
        }
    });
    toastElement.appendChild(closeElement);
    document.body.appendChild(toastElement);
    // Set timeout for auto-close with fade-out animation
    if (timeout > 0) {
        setTimeout(() => {
            toastElement.classList.add('fade-out');
            setTimeout(() => {
                if (toastElement.parentNode === document.body) {
                    document.body.removeChild(toastElement);
                }
            }, 500); // match with fade-out duration
        }, timeout);
    }
};
const classicToast = {
    success: (options) => {
        worldClassToast('success', options);
    },
    warning: (options) => {
        worldClassToast('warning', options);
    },
    error: (options) => {
        worldClassToast('error', options);
    },
    info: (options) => {
        worldClassToast('info', options);
    }
};
exports.default = classicToast;
