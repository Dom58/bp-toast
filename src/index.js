"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./classicToast.css");
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));

const worldClassToast = (type, options) => {
    const {
        message,
        subtitle,
        position = 'center', // Default position to center
        icon,
        timeout = 3000,
        customClass,
        iconClass,
        messageClass,
        subtitleClass,
        customStyle,
        closeButton = '&times',
        animationDuration = 300 // Duration for fade-in/out animation
    } = options;

    const toastElement = document.createElement('div');
    toastElement.classList.add('my-toast', type, position);

    // Apply any custom classes
    if (customClass) {
        const classList = customClass.split(' ');
        classList.forEach((className) => {
            toastElement.classList.add(className);
        });
    }

    // Apply any custom styles
    if (customStyle) {
        Object.assign(toastElement.style, customStyle);
    }

    // Add icon if present
    if (icon) {
        const iconElement = document.createElement('div');
        iconElement.classList.add('icon');
        if (typeof icon === 'string') {
            const imageElement = document.createElement('img');
            imageElement.src = icon;
            iconElement.appendChild(imageElement);
        } else if (icon instanceof HTMLImageElement) {
            iconElement.appendChild(icon);
        } else if (react_1.default.isValidElement(icon)) {
            react_dom_1.default.render(icon, iconElement);
        }

        if (iconClass) {
            const classList = typeof iconClass === 'string' ? iconClass.split(' ') : iconClass;
            classList.forEach((className) => {
                iconElement.classList.add(className);
            });
        }

        toastElement.appendChild(iconElement);
    }

    // Add the message
    const messageElement = document.createElement('span');
    messageElement.classList.add('message');
    if (messageClass) {
        const classList = typeof messageClass === 'string' ? messageClass.split(' ') : messageClass;
        classList.forEach((className) => {
            messageElement.classList.add(className);
        });
    }
    messageElement.innerText = message;
    toastElement.appendChild(messageElement);

    // Add the subtitle if present
    if (subtitle) {
        const subtitleElement = document.createElement('div');
        subtitleElement.classList.add('subtitle');
        if (subtitleClass) {
            const classList = typeof subtitleClass === 'string' ? subtitleClass.split(' ') : subtitleClass;
            classList.forEach((className) => {
                subtitleElement.classList.add(className);
            });
        }
        subtitleElement.innerText = subtitle;
        toastElement.appendChild(subtitleElement);
    }

    // Add the close button
    const closeElement = document.createElement('button');
    closeElement.classList.add('close-button');
    if (closeButton !== null) {
        if (typeof closeButton === 'string') {
            closeElement.innerHTML = closeButton;
        } else if (closeButton instanceof HTMLElement) {
            closeElement.appendChild(closeButton);
        } else if (react_1.default.isValidElement(closeButton)) {
            react_dom_1.default.render(closeButton, closeElement);
        }
    }
    closeElement.addEventListener('click', () => {
        fadeOutAndRemove(toastElement, animationDuration);
    });
    toastElement.appendChild(closeElement);

    // Append toast to the body
    document.body.appendChild(toastElement);

    // Fade in animation
    fadeIn(toastElement, animationDuration);

    // Auto-remove toast after timeout
    if (timeout > 0) {
        setTimeout(() => {
            fadeOutAndRemove(toastElement, animationDuration);
        }, timeout);
    }
};

// Function to fade in an element
function fadeIn(element, duration) {
    element.style.opacity = 0;
    element.style.transition = `opacity ${duration}ms`;
    setTimeout(() => {
        element.style.opacity = 1;
    }, 10); // A slight delay to ensure transition is applied
}

// Function to fade out and remove an element
function fadeOutAndRemove(element, duration) {
    element.style.opacity = 1;
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = 0;
    setTimeout(() => {
        if (element.parentNode === document.body) {
            document.body.removeChild(element);
        }
    }, duration);
}

// Toast types
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
    },
};

exports.default = classicToast;
