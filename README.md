# vanilla-js-lcd-clock

A simple lcd clock and weather app built in vanilla JS on top of Vite. [Demo available here](https://www.mattoz.com/lcd-clock/).

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

-   refactor modal to class, and rename module to modalHandler
-   rename slideIn to animateIn
-   create animateOut
-   refactor animateIn and animateOut into a class with appropriate methods
-   add the ability to save, replace and recall specific color settings
-   add ability to show/hide weather in settings
-   refactor index.js, the goal is to eventually be able to call one class method and pass in a settings object and everything will just work.
-   add a link to OpenWeather in settings menu, style link appropriately
-   write jsdocs for all the things
