## Digital Clock with Weather

!['Screenshot'](https://github.com/mozrelic/vanilla-js-lcd-clock/blob/main/Screenshot.png)

Weather requires an [OpenWeather](https://openweathermap.org/) API key.
User settings are saved in localStorage.

This is a work in progress.

This project is a customizable digital clock with optional weather display, built using JavaScript, HTML, SCSS, and Vite.

### Features

-   Digital clock display with customizable colors
-   Optional 12/24 hour format
-   Optional display of date (day, month, year)
-   Optional weather display with customizable location
-   Responsive design

### Installation

`npm install`

`npm run dev`

Build:

`npm run build`

`npm run preview`

### Usage

The clock will start automatically when the page loads. You can customize various settings through the settings panel.

### Clock Settings

-   Active Color: Set the color for active clock segments
-   Inactive Color: Set the color for inactive clock segments
-   Show Clock Meta: Toggle display of day, month, and year
-   Show 12 Hour: Toggle between 12-hour and 24-hour format

### Weather Settings

-   Show Weather: Toggle weather display
-   Zipcode: Set the location for weather data
-   API Key: Enter your OpenWeatherMap API key

TODO:

-   [x] refactor modal to class, and rename module to modalHandler
-   [x] refactor transition animations into a class with appropriate methods
-   [ ] add the ability to save, replace, delete and recall specific color settings
-   [ ] add ability to change page background color
-   [x] add ability to show/hide weather in settings
-   [ ] refactor index.js, the goal is to eventually be able to call one class method and pass in a settings object and everything will just work.
-   [x] add a link to OpenWeather in settings menu, style link appropriately
-   [ ] write jsdocs for all the things
-   [ ] At the moment, weather temperature can only be 2 digits, meaning it cannot display anything over 99 degrees or negative temperatures, need to fix
-   [ ] Instead of using a class method to update the clock settings and weather settings, look into using Proxy or Reflect to automatically grab changes to settings when the settings object is changed. This will require refactoring how state is handled i.e. a global state object.
-   [x] Refactor modal to be a drawer instead of a popup so that it lives on the left hand side of the screen. This way, settings don't obscure the clockface or weather.
