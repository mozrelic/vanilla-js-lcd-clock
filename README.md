# vanilla-js-lcd-clock

A simple lcd clock and weather app built in vanilla JS on top of Vite. [Demo available here](https://www.mattoz.com/lcd-clock/).

!['Screenshot'](https://github.com/mozrelic/vanilla-js-lcd-clock/blob/main/Screenshot.png)

Weather requires an [OpenWeather](https://openweathermap.org/) API key.
User settings are saved in localStorage.

This is a work in progress.

Clone or download repo.

`npm install`

`npm run dev`

Build:

`npm run build`

`npm run preview`

TODO:

-   [ ] refactor modal to class, and rename module to modalHandler
-   [x] refactor transition animations into a class with appropriate methods
-   [ ] add the ability to save, replace and recall specific color settings
-   [x] add ability to show/hide weather in settings
-   [ ] refactor index.js, the goal is to eventually be able to call one class method and pass in a settings object and everything will just work.
-   [x] add a link to OpenWeather in settings menu, style link appropriately
-   [ ] write jsdocs for all the things
-   [ ] At the moment, weather temperature can only be 2 digits, meaning it cannot display anything over 99 degrees or negative temperatures, need to fix
