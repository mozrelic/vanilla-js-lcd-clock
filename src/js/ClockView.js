/**
 * A class to handle the clock view and related functionality.
 * @extends ClockClassTemplate
 */
import { ClockClassTemplate } from './ClockClassTemplate';
import { checkIfLoaded } from './helpers/checkIfLoaded';
import { rgbToHsl } from './helpers/hexToHsl';
import markup from './markup';
import Time from './TimeObject';

class ClockView extends ClockClassTemplate {
  #timeInterval;
  #target;
  #options;

  /**
   * Sets the options for the clock view.
   * @param {Object} options - The options to be set for the clock view.
   */
  setOptions(options) {
    this.#options = { ...options };
  }

  #setTarget() {
    const target = this.#options.target ?? this.defaultOptions.target;

    this.#target = document.querySelector(`${target}`);
  }

  #setClockColors() {
    const { activeColor, inactiveColor } = this.#options;

    if (inactiveColor) {
      document.documentElement.style.setProperty(
        '--inactive-color',
        inactiveColor
      );
    }
    if (activeColor) {
      document.documentElement.style.setProperty(
        '--active-color',
        activeColor
      );

      // converting active-color to hsl so we can automatically create a variation of the color
      // and set it as --active-color-dark

      const [h, s, l] = rgbToHsl(activeColor).map((val) => val * 360);

      document.documentElement.style.setProperty(
        '--active-color-dark',
        `hsl(${h},${s}%,${l / 5}%)`
      );
    }
  }

  #setMeta(timeObj) {
    // console.log(this.options);
    if (!this.#options.showClockMeta) return;

    const target = this.#target.querySelector('.clock-meta-container');
    // this is a different way of spreading the target children into a new variable
    // const metaTargetArr = Object.values(target.children);
    if (!target) return;
    const metaTargetArr = [...target.children];
    let segmentGuard = metaTargetArr[0]?.children[1];

    const metaDataArr = [
      {
        val1: timeObj.da1,
        val2: timeObj.da2,
      },
      {
        val1: timeObj.mo1,
        val2: timeObj.mo2,
      },
      {
        val1: timeObj.ye1,
        val2: timeObj.ye2,
      },
    ];

    const setMeta = () => {
      metaTargetArr.forEach((segment, index) => {
        let { 0: num1, 1: num2 } = segment.children;

        num1.setAttribute('class', `num-${metaDataArr[index].val1}`);
        num2.setAttribute('class', `num-${metaDataArr[index].val2}`);
      });
    };
    function observerCallback(_, observer) {
      setMeta();
      observer.disconnect();
    }
    if (!segmentGuard) {
      checkIfLoaded(observerCallback, target);
    } else {
      setMeta();
    }
  }

  #updateTime() {
    const timeObj = Time.getTime(this.#options);
    this.#setAntePost(timeObj);
    this.#setTime(timeObj);
    this.#setMeta(timeObj);
  }

  #destroyElement(targetEl) {
    const target = document.querySelector(`${targetEl}`);
    if (!target) return;
    const elementGuard = [...target.children];
    if (elementGuard.length >= 0) {
      elementGuard.forEach((element) => {
        element.remove();
      });
    }
  }

  #setAntePost(timeObj) {
    if (!this.#options.showHour12) return;

    const antePostEl = this.#target.querySelector('.ante-post-svgs');
    if (!antePostEl) return;
    // get children elements of am-pm parent container
    const { 0: amEl, 1: pmEl } = antePostEl.children;

    const elClass = timeObj.antePost === 'am' ? 'its-am' : 'its-pm';

    // check if both elements exist before proceeding
    if (!amEl || !pmEl) return;
    // check if both elements have their active class
    const resetLetters =
      amEl.classList.contains('its-am') &&
      pmEl.classList.contains('its-pm');

    // if both do, remove active class from both
    if (resetLetters) {
      amEl.classList.remove('its-am');
      pmEl.classList.remove('its-pm');
    }

    // set active class
    if (timeObj.antePost === 'am')
      amEl.setAttribute('class', `${elClass} `);

    if (timeObj.antePost === 'pm') pmEl.setAttribute('class', `${elClass}`);
  }

  #setTime(timeObj) {
    const target = this.#target.querySelector('.hour');
    const clockFace = [
      ...this.#target.querySelector('.clock-face').children,
    ];
    const [hourEl, minutesEl, secondsEl] = clockFace;
    let segmentGuard = hourEl.firstElementChild;

    const setTime = () => {
      hourEl.firstElementChild.setAttribute(
        'class',
        `num-${timeObj.hh1}`
      );
      hourEl.lastElementChild.setAttribute('class', `num-${timeObj.hh2}`);
      minutesEl.firstElementChild.setAttribute(
        'class',
        `num-${timeObj.mm1}`
      );
      minutesEl.lastElementChild.setAttribute(
        'class',
        `num-${timeObj.mm2}`
      );
      secondsEl.firstElementChild.setAttribute(
        'class',
        `num-${timeObj.ss1}`
      );
      secondsEl.lastElementChild.setAttribute(
        'class',
        `num-${timeObj.ss2}`
      );
    };

    const observerCallback = (_, observer) => {
      setTime();
      observer.disconnect();
    };
    // check to see if hour element exists, if it doesn't, use mutation observer
    // this if else exists because on initialization, we need to set the time as soon as the digits become available, and then we need to update time
    // so we check to see if the first digit in the hours segment exists, and if it does, we render time as SOON as the empty digit is in the screen
    // then, otherwise, setInterval in start() will just call setTime(). If I don't do the if check on hourEl, I get a flash of unset time on init, and if
    // I don't call setTime in the the else condition, the clock won't update when setInterval fires.
    if (!segmentGuard) {
      checkIfLoaded(observerCallback, target);
    } else {
      setTime();
    }
  }

  #renderAntePost() {
    if (!this.#options.showHour12) return;

    const target = this.#target.querySelector('.am-pm');
    const guard = this.#target.querySelector('.ante-post-svgs');
    const antePostMarkup = markup.antePostMarkup();

    // had to add this guard because when we destroyElement in the rerenderUpdatedOptions method, we were getting an
    // empty ante-post-svgs div each time the show 12 hour option is toggled on and off.
    if (guard) {
      guard.remove();
      target.insertAdjacentHTML('afterbegin', antePostMarkup);
    } else {
      target.insertAdjacentHTML('afterbegin', antePostMarkup);
    }
  }

  #renderClockMeta() {
    if (!this.#options.showClockMeta) return;

    const metaTypes = ['day', 'month', 'year'];
    const metaTarget = this.#target.querySelector('.clock-meta-container');
    const digitsMarkup = markup.digitMarkup();

    metaTypes.forEach((item) => {
      const metaMarkup = markup.clockMetaMarkup(item);

      metaTarget.insertAdjacentHTML('beforeend', metaMarkup);
    });

    const metaTargetforDigits = [...metaTarget.children];
    metaTargetforDigits.forEach((item) => {
      item.insertAdjacentHTML('afterbegin', digitsMarkup);
    });
  }

  /**
   * Initializes the clock view by setting up the basic markup structure.
   */
  init() {
    const target = this.#target;
    const initMarkup = markup.initMarkup();
    const digitMarkup = markup.digitMarkup();
    const settingsButtonMarkup = markup.settingsButtonMarkup();

    const observerCallback = (mutationList, observer) => {
      if (mutationList.length === 0) return;

      const completeElementArray = [
        // ...target.querySelector('.clock-meta-container').children,
        ...target.querySelector('.clock-face').children,
      ];

      completeElementArray.forEach((el) =>
        el.insertAdjacentHTML('afterbegin', digitMarkup)
      );
      observer.disconnect();
    };

    // I had to set up this mutation observer and call it BEFORE we add the initial markup so that the observer would exist
    // when initMarkup is inserted, and then the observer sees that the initial markup is on the page and we are then
    // ready to insert the markup for the actual digits of the clock.
    checkIfLoaded(observerCallback, target);

    // finally insert markup, and since the mutation observer is already looking for changes, it will automatically add the digits for each segment
    // when it notices that our initial markup has been added to the page
    target.insertAdjacentHTML('afterbegin', initMarkup);

    // have to define targetAntePost here after initMarkup is inserted
    const targetAntePost = target.querySelector('.am-pm');
    // render AntePost glyphs based on whether or not 12 hour clock is being shown
    this.#renderAntePost();
    // render clock meta (day month year) based on what the user has set as an option. The default is to show it
    this.#renderClockMeta();

    targetAntePost.insertAdjacentHTML('beforeend', settingsButtonMarkup);
  }
  /**
   * Starts the clock with the given options.
   * @param {Object} [options=this.defaultOptions] - The options to start the clock with.
   * @param {string} options.target - The target element to render the clock in.
   * @param {string} options.activeColor - The color to use for the active segment.
   * @param {string} options.inactiveColor - The color to use for the inactive segments.
   * @param {boolean} options.showClockMeta - Whether or not to show the clock meta (day, month, year).
   * @param {boolean} options.showHour12 - Whether or not to show the am/pm indicator.
   * @param {boolean} options.showWeather - Whether or not to show the weather.
   * @param {string} options.zipcode - The zipcode to use for weather data.
   * @param {string} options.apiKey - The API key to use for weather data.
   */
  start(options = this.defaultOptions) {
    // the call order matters here
    this.setOptions(options);
    this.#setTarget(this.#options);
    this.init();
    this.#setClockColors(this.#options);
    this.#updateTime();
    this.timeInterval = setInterval(() => this.#updateTime(), 1000);
  }

  /**
   * Stops the clock by clearing the time interval.
   */
  stop() {
    clearInterval(this.#timeInterval);
  }

  /**
   * Rerenders the clock view after options have been updated.
   */
  rerenderUpdatedOptions() {
    this.#setClockColors();

    this.#destroyElement('.ante-post-svgs');
    this.#renderAntePost();

    this.#destroyElement('.clock-meta-container');
    this.#renderClockMeta();
  }
}

export default new ClockView();
