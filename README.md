# `@formsible/element`

[![npm version](https://badge.fury.io/js/%40formsible%2Felement.svg)](https://badge.fury.io/js/%40formsible%2Felement)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`@formsible/element` is a Vue.js component library designed to provide highly customizable elements for form-building applications. This library leverages the best UI practices, optimized performance, and offers a range of form-related components.

**Note:** This library is used in the form-building application [Formsible](https://formsible.com). You can use it in any Vue or Nuxt applications. The project is sponsored by [WellCare](https://wellcare.vn).

## Features

- 📦 Lightweight and modular form-building components
- 🎨 Customizable themes with Tailwind CSS
- 🖼️ Integration with Codemirror, Google Maps, and PayPal Checkout
- 💻 Works seamlessly with Vue 3
- 🔌 Extensible and built with flexibility in mind

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install `@formsible/element` via **pnpm**:

```bash
pnpm add @formsible/element
```

or using **npm**:

```bash
npm install @formsible/element
```

or with **yarn**:

```bash
yarn add @formsible/element
```

## Usage

Import the components you need in your Vue.js app:

```javascript
import { createApp } from 'vue';
import { ElementComponent } from '@formsible/element';
import '@formsible/element/dist/style.css'; // Import the library's styles

const app = createApp(App);
app.component('ElementComponent', ElementComponent);
app.mount('#app');
```

Now you can use the component in your template:

```vue
<template>
  <ElementComponent :prop="value" />
</template>
```

### Example with Tailwind CSS

Make sure to install and configure **Tailwind CSS** if you're using the included styles:

```bash
pnpm add tailwindcss postcss autoprefixer
npx tailwindcss init
```

Then, add this to your `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/@formsible/element/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
```

## Components

`@formsible/element` includes a variety of components that can be used to enhance your form-building application. Here are a few examples:

- **ElementComponent**: A core form element component.
- **GoogleMap**: Google Maps integration.
- **PayPalCheckout**: PayPal Checkout integration for payment forms.
- **SignaturePad**: A signature pad for capturing signatures.

You can find a detailed list of components in the [documentation](#) (link to docs or components folder).

## Development

### Setup

To start developing locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/formsible/element.git
   cd element
   ```

2. Install dependencies using **pnpm**:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm run dev
   ```

4. Build the library for production:
   ```bash
   pnpm run build
   ```

5. Run tests:
   ```bash
   pnpm run test
   ```

### Publishing to NPM

The library is automatically published to NPM when pull requests are merged into the `main` branch. The CI/CD pipeline uses **GitHub Actions** to ensure all tests pass before publishing.

To publish manually:

1. Build the project:
   ```bash
   pnpm run build
   ```

2. Publish to NPM:
   ```bash
   pnpm publish --access public
   ```

## Contributing

We welcome contributions! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes.
4. Push the changes to your forked repository: `git push origin feature-branch-name`
5. Create a pull request.

### Guidelines

- Ensure the code passes the linting and tests before submitting a pull request.
- Follow the coding standards defined by ESLint and Prettier.
- Add relevant tests for any new features or changes.

### Running Lint and Tests

To lint the code:

```bash
pnpm run lint
```

To run tests:

```bash
pnpm run test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.