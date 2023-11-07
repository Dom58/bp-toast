import './classicToast.css';
import React from 'react';
import ReactDOM from 'react-dom';

type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'center';

interface ToastOptions {
  message: string;
  subtitle?: string;
  position?: ToastPosition;
  icon?: string | HTMLImageElement | React.ReactNode;
  timeout?: number;
  customClass?: string;
  iconClass?: string | string[];
  messageClass?: string | string[];
  subtitleClass?: string | string[];
  customStyle?: React.CSSProperties;
  closeButton?: React.ReactNode | string | HTMLImageElement | null;
}

const worldClassToast = (type: string, options: ToastOptions): void => {
  const {
    message,
    subtitle,
    position = 'top-center',
    icon,
    timeout = 3000,
    customClass,
    iconClass,
    messageClass,
    subtitleClass,
    customStyle,
    closeButton = '&times',
  } = options;

  const toastElement = document.createElement('div');
  toastElement.classList.add('my-toast', type, position);

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
    } else if (icon instanceof HTMLImageElement) {
      iconElement.appendChild(icon);
    } else if (React.isValidElement(icon)) {
      ReactDOM.render(icon, iconElement);
    }

    if (iconClass) {
      let classList: string[];

      if (typeof iconClass === 'string') {
        classList = iconClass.split(' ');
      } else if (Array.isArray(iconClass)) {
        classList = iconClass;
      } else {
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
    let classList: string[];

    if (typeof messageClass === 'string') {
      classList = messageClass.split(' ');
    } else if (Array.isArray(messageClass)) {
      classList = messageClass;
    } else {
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
      let classList: string[];

      if (typeof subtitleClass === 'string') {
        classList = subtitleClass.split(' ');
      } else if (Array.isArray(subtitleClass)) {
        classList = subtitleClass;
      } else {
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
    } else if (closeButton instanceof HTMLElement) {
      closeElement.appendChild(closeButton);
    } else if (React.isValidElement(closeButton)) {
      ReactDOM.render(closeButton, closeElement);
    }
  }

  closeElement.addEventListener('click', () => {
    if (toastElement.parentNode === document.body) {
      document.body.removeChild(toastElement);
    }
  });
  toastElement.appendChild(closeElement);

  document.body.appendChild(toastElement);

  if (timeout > 0) {
    setTimeout(() => {
      if (toastElement.parentNode === document.body) {
        document.body.removeChild(toastElement);
      }
    }, timeout);
  }
};

const classicToast = {
  success: (options: ToastOptions) => {
    worldClassToast('success', options);
  },
  warning: (options: ToastOptions) => {
    worldClassToast('warning', options);
  },
  error: (options: ToastOptions) => {
    worldClassToast('error', options);
  },
};

export default classicToast;
