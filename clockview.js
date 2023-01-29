'use strict';
//
// NOTES:
//

class ClockView {
    timeInterval;
    target;
    options;
    defaultOptions = {
        target: '.clock-container',
        activeColor: 'undefined',
        inactiveColor: 'undefined',
        clockMeta: true,
        hour12: false,
    };

    #setOptions(options) {
        this.options = { ...options };
    }

    #setTarget() {
        const target =
            this.options.target === true
                ? this.options.target
                : this.defaultOptions.target;

        this.target = document.querySelector(`${target}`);
    }

    #checkIfLoaded(observerCallback, target) {
        const config = { childList: true, subtree: true };

        const observer = new MutationObserver(observerCallback);
        observer.observe(target, config);
    }

    #setClockColors() {
        const { activeColor, inactiveColor } = this.options;

        if (inactiveColor !== undefined) {
            document.documentElement.style.setProperty(
                '--inactive-color',
                `${inactiveColor}`
            );
        }
        if (activeColor !== undefined) {
            document.documentElement.style.setProperty(
                '--active-color',
                `${activeColor}`
            );
        }
    }

    #getTime() {
        const rawTime = new Date();

        const hour12 =
            this.options.hour12 === true
                ? this.options.hour12
                : this.defaultOptions.hour12;

        const formatter = new Intl.DateTimeFormat('en-us', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: hour12,
        });

        const filteredTime = formatter
            .formatToParts(rawTime)
            .filter((row) => row['type'] !== 'literal');

        // this takes the filtered time object and gets the last two digits from each value string, so i can then save them into a new
        // object with a specific key name. I have done it this way so I can use the final key value as a template literal to render
        // the correct css class
        const tempTimeObj = {};
        filteredTime.forEach(function(item) {
            let tempTimeValue = item['value']
                .padStart(2, '0')
                .split('')
                .slice(-2);

            tempTimeValue.forEach((value, i) => {
                tempTimeObj[`${item['type']}${i + 1}`] = value;
            });
        });

        const timeObj = {
            ye1: tempTimeObj.year1,
            ye2: tempTimeObj.year2,
            mo1: tempTimeObj.month1,
            mo2: tempTimeObj.month2,
            da1: tempTimeObj.day1,
            da2: tempTimeObj.day2,
            hh1: tempTimeObj.hour1,
            hh2: tempTimeObj.hour2,
            mm1: tempTimeObj.minute1,
            mm2: tempTimeObj.minute2,
            ss1: tempTimeObj.second1,
            ss2: tempTimeObj.second2,
            antePost:
                `${tempTimeObj.dayPeriod1}${tempTimeObj.dayPeriod2}`.toLowerCase(),
        };
        return timeObj;
    }

    #setMeta(timeObj) {
        const target = document.querySelector('.clock-meta-container');
        // this is a different way of spreading the target children into a new variable
        // const metaTargetArr = Object.values(target.children);
        const metaTargetArr = [...target.children];

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

        function observerCallback(mutationList, observer) {
            if (mutationList.length === 0) return;

            metaTargetArr.forEach((segment, index) => {
                let { 0: num1, 1: num2 } = segment.children;

                num1.setAttribute('class', `num-${metaDataArr[index].val1}`);
                num2.setAttribute('class', `num-${metaDataArr[index].val2}`);
            });

            observer.disconnect();
        }

        this.#checkIfLoaded(observerCallback, target);
    }

    #updateTime() {
        const timeObj = this.#getTime();
        this.#setAntePost(timeObj);
        this.#setTime(timeObj);
        if (this.options.clockMeta === false) return;
        this.#setMeta(timeObj);
    }

    start(options = this.defaultOptions) {
        // the call order matters here
        this.#setOptions(options);
        this.#setTarget(this.options);
        this.init();
        this.#setClockColors(this.options);
        this.#updateTime();
        this.timeInterval = setInterval(() => this.#updateTime(), 1000);
    }

    stop() {
        clearInterval(this.timeInterval);
    }

    #setAntePost(timeObj) {
        if (!this.options.hour12) return;
        const antePostEl = this.target.querySelector('.am-pm');
        // get children elements of am-pm parent container
        const { 0: amEl, 1: pmEl } = antePostEl.children;

        const elClass = timeObj.antePost === 'am' ? 'its-am' : 'its-pm';

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
        const target = this.target.querySelector('.hour');
        const clockFace = [
            ...this.target.querySelector('.clock-face').children,
        ];
        const [hourEl, minutesEl, secondsEl] = clockFace;

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

        const observerCallback = (mutationList, observer) => {
            setTime();
            observer.disconnect();
        };
        // check to see if hour element exists, if it doesn't, use mutation observer
        // this if else exists because on initialization, we need to set the time as soon as the digits become available, and then we need to update time
        // so we check to see if the first digit in the hours segment exists, and if it does, we render time as SOON as the empty digit is in the screen
        // then, otherwise, setInterval in start() will just call setTime(). If I don't do the if check on hourEl, I get a flash of unset time on init, and if
        // I don't call setTime in the the else condition, the clock won't update when setInterval fires.
        if (!hourEl.firstElementChild) {
            this.#checkIfLoaded(observerCallback, target);
        } else {
            setTime();
        }
    }

    #renderAntePost() {
        const target = this.target.querySelector('.am-pm');
        const antePostMarkup = this.antePostMarkup();

        target.insertAdjacentHTML('afterbegin', antePostMarkup);
    }

    #renderClockMeta(metaType) {
        const metaTarget = this.target.querySelector('.clock-meta-container');
        const metaMarkup = this.clockMetaMarkup(metaType);

        metaTarget.insertAdjacentHTML('beforeend', metaMarkup);
    }

    init() {
        const target = this.target;
        const initMarkup = this.initMarkup();
        const digits = this.digitMarkup();

        const observerCallback = (mutationList, observer) => {
            if (mutationList.length === 0) return;

            const completeElementArray = [
                ...target.querySelector('.clock-meta-container').children,
                ...target.querySelector('.clock-face').children,
            ];

            completeElementArray.forEach((el) =>
                el.insertAdjacentHTML('afterbegin', digits)
            );

            observer.disconnect();
        };

        // I had to set up this mutation observer and call it BEFORE we add the initial markup so that the observer would exist
        // when initMarkup is inserted, and then the observer sees that the initial markup is on the page and we are then
        // ready to insert the markup for the actual digits of the clock.
        this.#checkIfLoaded(observerCallback, target);

        // finally insert markup, and since the mutation observer is already looking for changes, it will automatically add the digits for each segment
        // when it notices that our initial markup has been added to the page
        this.target.insertAdjacentHTML('afterbegin', initMarkup);

        // render AntePost glyphs based on whether or not 12 hour clock is being shown
        if (this.options.hour12) this.#renderAntePost();

        // render clock meta (day month year) based on what the user has set as an option. The default is to show it
        if (this.options.clockMeta === false) return;

        const metaTypes = ['day', 'month', 'year'];

        metaTypes.forEach((metaType) => this.#renderClockMeta(metaType));
    }

    initMarkup() {
        return `
        <div class="am-pm">

        </div>
        <!-- end am-pm display -->

        <div class="clock-face">
          <section class="svg hour"></section>

          <section class="svg minutes"></section>

          <section class="svg seconds"></section>
        </div>
        <!-- end clock face container -->

        <div class="clock-meta-container">

        </div>
        <!-- end clock meta container  -->
      </div>
      <!-- end of main clock container -->

    `;
    }

    clockMetaMarkup(metaType) {
        return `
          <section class="svg ${metaType}">
            <div class="meta-title">${metaType}</div>
          </section>
          <!-- end ${metaType} container-->
        `;
    }

    antePostMarkup() {
        return `
          <svg
            class="am"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 83 46.3"
          >
            <path
              id="letters"
              d="M1.8,46.3c-0.2,0-0.5-0.1-0.7-0.2c-0.9-0.4-1.3-1.5-0.9-2.3L20,1.2c0.3-0.6,0.9-1,1.6-1l0,0  c0.7,0,1.3,0.4,1.6,1l18.2,39.1L59.7,1c0.3-0.7,1.2-1.2,2-1c0.8,0.2,1.4,0.9,1.4,1.7l0.1,34.8L79.6,1.1c0.3-0.8,1.2-1.2,2-1  
        C82.4,0.3,83,1,83,1.8l0,42.3c0,1-0.8,1.8-1.8,1.8c0,0,0,0,0,0c-1,0-1.8-0.8-1.8-1.8l0-34.2L63,45.2c-0.3,0.8-1.2,1.2-2,1 
        c-0.8-0.2-1.4-0.9-1.4-1.7L59.6,9.7L43,45.2c-0.3,0.6-0.9,1-1.6,1c-0.7,0-1.3-0.4-1.6-1L21.6,6.1L3.4,45.2  C3.1,45.9,2.4,46.3,1.8,46.3z"
            />
          </svg>

          <svg
            class="pm"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 84.5 49.4"
          >
            <path
              id="letters"
              d="M83.1,0.1c-0.8-0.2-1.6,0.2-2,1L64.7,36.5L64.6,1.8c0-0.8-0.6-1.5-1.4-1.7
c-2.5-0.5-3.2,4.4-5.2,7.8c-2.3,4.9-5,10.8-5.7,12.2C50.6,7,33.9-0.6,22.8,6.6l1.9-4.1c1-2-2.3-3.6-3.2-1.5
c-0.7,1.6-20.1,43-21.3,45.8c-1,2,2.2,3.6,3.2,1.5c0,0,10.1-21.7,10.1-21.7c1.6,13.3,18.1,21,29.3,14c-0.3,0.9-2,3.5-1.5,4.4
c0.5,1.2,2.6,1.7,3.3,0.1C48.8,36.2,57,18.6,61.1,9.7l0.1,34.8c0,1.8,2.6,2.4,3.4,0.7c0,0,16.4-35.3,16.4-35.3l0,34.2
c0,2.3,3.6,2.3,3.5,0c0,0,0-42.2,0-42.2C84.5,1,83.9,0.3,83.1,0.1z M33,7.4c2.3,0.1,4.3,0.5,6.1,1.2l-14,29.2C12.3,31,14.3,8,33,7.4z M26,38.2L40,8.9c0.8,0.3,1.5,0.7,2.1,1.2L28.3,39.1C27.5,38.8,26.7,38.6,26,38.2z M30.3,39.5l13.4-28.1c0.5,0.4,0.9,0.9,1.3,1.4
L32.2,39.7C31.6,39.6,30.9,39.6,30.3,39.5z M36.1,39.4L47.2,16c0.3,0.7,0.6,1.4,0.9,2.1l-9.9,20.8C37.5,39.1,36.8,39.3,36.1,39.4z"
            />
          </svg>
    `;
    }

    digitMarkup() {
        return `
      <svg
    class=""
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 179.54 263.79"
      >
      <path
    id="arm7"
    class="arm"
    d="M151.75,123.12l-6.94-9.36c-.74-1-1.85-1.57-3.08-1.57H42.67c-1.23,0-2.48,.56-3.47,1.57l-9.22,9.35c-2.05,2.08-2.45,5.44-.89,7.5l7,9.28c.74,.99,1.84,1.54,3.06,1.54h98.96c1.22,0,2.45-.55,3.44-1.54l9.26-9.27c2.06-2.06,2.48-5.42,.94-7.5Z"
      />
      <path
    id="arm6"
    class="arm"
    d="M14.87,121.24l1.12,1.33c.74,.88,1.78,1.37,2.92,1.37h2.19c1.23,0,2.48-.56,3.47-1.57l12.11-12.29c.98-.99,1.63-2.34,1.8-3.74L47.6,31.78c0-.05,.02-.1,.03-.16l-15.38-7.56c-2.49-1.22-5.67,.56-6.69,3.75-.83,2.59-1.44,5.28-1.77,8.05L13.83,117.31c-.18,1.5,.19,2.93,1.04,3.94Z"
      />
      <path
    id="arm5"
    class="arm"
    d="M23.13,232l10.37-84.81c.17-1.41-.15-2.77-.9-3.76l-9.06-12.02c-.74-.99-1.84-1.54-3.06-1.54h-2.33c-1.1,0-2.22,.45-3.15,1.27l-1.37,1.2c-1.15,1.01-1.92,2.48-2.11,4.03L.31,227.92c-.34,2.75-.39,5.42-.2,7.99,.24,3.08,2.9,4.8,5.61,3.72l17.38-6.95c0-.22,0-.44,.02-.68Z"
      />
      <path
    id="arm4"
    class="arm"
    d="M127.06,237.35c-.16,.02-.32,.06-.48,.06H27.17c-.16,0-.3-.04-.45-.05l-17.7,7.08c-3.33,1.33-4.79,5.99-2.75,8.74,4.85,6.55,12.19,10.61,20.85,10.61H120.17c1.62,0,3.23-.14,4.81-.42,2.83-.49,5-3.64,4.59-6.73l-2.52-19.28Z"
      />
      <path
    id="arm3"
    class="arm"
    d="M165.83,132.31l-1.03-1.15c-.74-.82-1.74-1.27-2.84-1.27h-2.33c-1.22,0-2.45,.55-3.44,1.54l-13.56,13.58-.04-.06-10.64,87.06c-.01,.1-.04,.19-.06,.29l2.64,20.21c.48,3.67,4.24,5.1,7.06,2.61,7.45-6.58,12.85-16.32,14.18-27.19l11.2-91.58c.19-1.55-.22-3.02-1.12-4.03Z"
      />
      <path
    id="arm2"
    class="arm"
    d="M156.05,34.77l-8.74,71.53c-.17,1.4,.15,2.74,.88,3.74l9.15,12.35c.74,1,1.85,1.57,3.08,1.57h2.19c1.14,0,2.3-.49,3.26-1.37l1.39-1.28c1.09-1.01,1.82-2.44,2-3.94l9.96-81.5c.84-6.9-.07-13.34-2.34-18.8-1.29-3.1-5.14-3.28-7.45-.42l-12,14.84c-.76,.94-1.25,2.09-1.39,3.29Z"
      />
      <path
    id="arm1"
    class="arm"
    d="M50.19,25.98c.7,.34,1.48,.55,2.29,.44,.16-.02,.32-.03,.48-.03h99.41s.02,0,.02,0c1.49,0,3.01-.66,4.1-2.01l10.09-12.48c2.13-2.63,1.86-6.5-.55-8.02-3.93-2.47-8.55-3.87-13.63-3.87H59.37c-8.62,0-16.91,4.02-23.35,10.52-2.68,2.7-2.46,7.28,.45,8.71l13.72,6.75Z"
      />
      </svg>

      <svg
    class=""
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 179.54 263.79"
      >
      <path
    id="arm7"
    class="arm"
    d="M151.75,123.12l-6.94-9.36c-.74-1-1.85-1.57-3.08-1.57H42.67c-1.23,0-2.48,.56-3.47,1.57l-9.22,9.35c-2.05,2.08-2.45,5.44-.89,7.5l7,9.28c.74,.99,1.84,1.54,3.06,1.54h98.96c1.22,0,2.45-.55,3.44-1.54l9.26-9.27c2.06-2.06,2.48-5.42,.94-7.5Z"
      />
      <path
    id="arm6"
    class="arm"
    d="M14.87,121.24l1.12,1.33c.74,.88,1.78,1.37,2.92,1.37h2.19c1.23,0,2.48-.56,3.47-1.57l12.11-12.29c.98-.99,1.63-2.34,1.8-3.74L47.6,31.78c0-.05,.02-.1,.03-.16l-15.38-7.56c-2.49-1.22-5.67,.56-6.69,3.75-.83,2.59-1.44,5.28-1.77,8.05L13.83,117.31c-.18,1.5,.19,2.93,1.04,3.94Z"
      />
      <path
    id="arm5"
    class="arm"
    d="M23.13,232l10.37-84.81c.17-1.41-.15-2.77-.9-3.76l-9.06-12.02c-.74-.99-1.84-1.54-3.06-1.54h-2.33c-1.1,0-2.22,.45-3.15,1.27l-1.37,1.2c-1.15,1.01-1.92,2.48-2.11,4.03L.31,227.92c-.34,2.75-.39,5.42-.2,7.99,.24,3.08,2.9,4.8,5.61,3.72l17.38-6.95c0-.22,0-.44,.02-.68Z"
      />
      <path
    id="arm4"
    class="arm"
    d="M127.06,237.35c-.16,.02-.32,.06-.48,.06H27.17c-.16,0-.3-.04-.45-.05l-17.7,7.08c-3.33,1.33-4.79,5.99-2.75,8.74,4.85,6.55,12.19,10.61,20.85,10.61H120.17c1.62,0,3.23-.14,4.81-.42,2.83-.49,5-3.64,4.59-6.73l-2.52-19.28Z"
      />
      <path
    id="arm3"
    class="arm"
    d="M165.83,132.31l-1.03-1.15c-.74-.82-1.74-1.27-2.84-1.27h-2.33c-1.22,0-2.45,.55-3.44,1.54l-13.56,13.58-.04-.06-10.64,87.06c-.01,.1-.04,.19-.06,.29l2.64,20.21c.48,3.67,4.24,5.1,7.06,2.61,7.45-6.58,12.85-16.32,14.18-27.19l11.2-91.58c.19-1.55-.22-3.02-1.12-4.03Z"
      />
      <path
    id="arm2"
    class="arm"
    d="M156.05,34.77l-8.74,71.53c-.17,1.4,.15,2.74,.88,3.74l9.15,12.35c.74,1,1.85,1.57,3.08,1.57h2.19c1.14,0,2.3-.49,3.26-1.37l1.39-1.28c1.09-1.01,1.82-2.44,2-3.94l9.96-81.5c.84-6.9-.07-13.34-2.34-18.8-1.29-3.1-5.14-3.28-7.45-.42l-12,14.84c-.76,.94-1.25,2.09-1.39,3.29Z"
      />
      <path
    id="arm1"
    class="arm"
    d="M50.19,25.98c.7,.34,1.48,.55,2.29,.44,.16-.02,.32-.03,.48-.03h99.41s.02,0,.02,0c1.49,0,3.01-.66,4.1-2.01l10.09-12.48c2.13-2.63,1.86-6.5-.55-8.02-3.93-2.47-8.55-3.87-13.63-3.87H59.37c-8.62,0-16.91,4.02-23.35,10.52-2.68,2.7-2.46,7.28,.45,8.71l13.72,6.75Z"
      />
      </svg>
      `;
    }
}

export default new ClockView();
