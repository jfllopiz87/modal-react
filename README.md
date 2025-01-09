# React Modal Component
# React + TypeScript + Vite

Install a new Vite project with the following command:
npm init vite@latest modal-react

Select the following options:
 - react
 - TypeScript

run the following commands
...
- run cd modal-react
- run npm  install
- run npm  install --D vitest
...

Add the following script to the package.json file:
```js
"scripts": { "test": "vitest" }
```

Create a new file named vitest.config.ts in the root of the project with the following content:

```js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright',
    },
  },
})
```

Move react and react-dom to devDependencies
install the testing libraries with the following command:
...
- run npm install -D @testing-library/react @testing-library/user-event @testing-library/dom @testing-library/jest-dom
- run npm install -D @vitest/browser
- run npm install -D jest @types/jest
- run npm install -D playwright
...

install tailwindcss with the following command:
...
- run npm install --save-dev tailwindcs postcss autoprefixer
...

update the tailwind.config.js file with the following content:
```js
  /** @type {import('tailwindcss').Config} */
  export default {
    content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [],
  }
```
Copy tailwind css to the src/styles/index.css file
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
Create folder src/components
Create file src/components/Modal.tsx
Create folder src/components/__tests__
Create file src/components/__tests__/Modal.test.tsx

For Storybook:
run npx sb@latest init