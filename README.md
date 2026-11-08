# JavaScript assignment - Frida Totland

RainyDays is a fictional online store created as a school project using HTML, CSS and vanilla JavaScript.

Product information, images and prices are fetched from a public demonstration API provided by Noroff.

## Links

- Live site: https://frida-totland.github.io/JavaScript1-FridaTotland/
- Repository: https://github.com/frida-totland/JavaScript1-FridaTotland

## Features

- Product list on the homepage, fetched from the API
- Jackets page with filtering by gender, plus separate pages for men's and women's jackets
- Product page with size selection and add to cart
- Shopping cart that is saved in the browser (localStorage) and stays between pages
- Change quantity or remove items in the cart
- Checkout with delivery options, a price summary and form validation
- Confirmation page after an order is placed
- Loading indicators and clear error messages if something goes wrong
- Terms and Conditions and Privacy Policy pages

## Built with

- HTML and CSS
- JavaScript (ES modules, async/await, fetch)
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for fonts

## Running the project

The site is published at: https://frida-totland.github.io/JavaScript1-FridaTotland/.

To run it locally instead, follow these steps:

1. Clone or download the repository.
2. Open the folder in VS Code.
3. Start the project with the Live Server extension (right-click `index.html` and choose "Open with Live Server").

The project uses JavaScript modules, so it must be run through a local server. Opening the HTML files directly from the folder will not work.

## Project structure

- `scripts/` - JavaScript. `api.js` fetches data, `cart.js` handles the cart, `ui.js` has the loading and error helpers, and the other files belong to one page each.
- `css/` - stylesheets
- `images/` and `assets/` - images and favicons
- `fonts/` - fonts

## API

Data is fetched from `https://v2.api.noroff.dev/rainy-days`.

## AI use and sources

Claude (Anthropic) was used as a tutor during the project. It explained concepts, gave hints, reviewed my code and pointed out mistakes, and in some places showed example code that I adapted and wrote into my own files. I tested the finished features myself in the browser. Claude also generated the text for the Terms and Conditions and Privacy Policy pages (November 2026) and wrote the first draft of this README.

## Author

Frida Totland
