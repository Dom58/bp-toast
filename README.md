# Classic-toasts

## Classic Toast notification
This package is allowing all developers to customise their toast notifications

## Installation

```
1. npm install --save classic-toasts
2. yarn add classic-toasts
3. pnpm add classic-toasts
```

2. Import the package

To use the Classic Toast package you need to import it
```
import ClassicToast from 'classic-toasts';
import 'classic-toasts/dist/index.css';
```

### Methods
```
ClassicToast.success({message: "ADD_YOUR_SUCCESS_MESSAGE});
```
```
ClassicToast.error({message: "ADD_YOUR_ERROR_MESSAGE})
```
```
ClassicToast.warning({message: "ADD_YOUR_WARNING_MESSAGE})
```
## Props

Classic Toast should have different options

```
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
```

Where

```
type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'center';
```

E.g: 

`ClassicToast.error({message: "The error", subtitle: "server Error", position: "center", timeout: 5000, customClass: "your custom, tailwind or bootstrao class list", closeButtom: "your custom image icon", customStyle: "your css for toast"})`
