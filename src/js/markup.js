class Markup {
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
        <div class="svg ante-post-svgs">
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
        </div>
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

    loadingSpinnerMarkup() {
        return `
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    `;
    }

    settingsButtonMarkup() {
        return `
      <div class="modal-trigger">
        <button class="modal-button" type="modal-trigger-button" data-toggle="modal">            
<span class="button-name">Settings</span>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6527 10.3496L19.7085 10.6856C19.8769 10.713 20.0003 10.8584 20 11.0289V12.9419C20 13.1106 19.8789 13.2553 19.7123 13.2845L17.6537 13.6459C17.5344 14.0584 17.3706 14.4557 17.1643 14.8313L18.3811 16.5207C18.4809 16.6591 18.4653 16.8494 18.3449 16.9701L16.9924 18.3235C16.8728 18.4428 16.6849 18.4598 16.5465 18.3621L14.8402 17.1652C14.4639 17.3746 14.0642 17.5416 13.6471 17.6643L13.2836 19.713C13.2544 19.879 13.11 20 12.9413 20H11.0281C10.858 20 10.7129 19.8772 10.6855 19.7099L10.3459 17.6713C9.92956 17.551 9.52778 17.385 9.14758 17.176L7.45352 18.3624C7.31542 18.4595 7.12723 18.4428 7.00791 18.3235L5.65545 16.9701C5.53544 16.8494 5.51978 16.6598 5.61858 16.5217L6.81555 14.8477C6.6044 14.4657 6.43673 14.0626 6.31533 13.6442L4.28698 13.2845C4.12105 13.255 4 13.1106 4 12.9419V11.0289C4 10.8591 4.12314 10.7137 4.29081 10.6859L6.31916 10.3482C6.44126 9.9287 6.60892 9.52557 6.81938 9.1447L5.63701 7.45322C5.53996 7.31513 5.55666 7.1273 5.67597 7.008L7.02809 5.656C7.1488 5.536 7.33768 5.52 7.47648 5.61913L9.15662 6.81913C9.53405 6.61252 9.93478 6.448 10.3522 6.328L10.6848 4.29183C10.7122 4.12348 10.8576 4 11.0281 4H12.9413C13.1104 4 13.2547 4.12174 13.2839 4.288L13.6426 6.3353C14.0576 6.456 14.4576 6.62226 14.8364 6.83165L16.5211 5.62087C16.6595 5.52104 16.8495 5.5367 16.9702 5.65704L18.323 7.00904C18.4423 7.1287 18.459 7.31687 18.3619 7.45496L17.1618 9.16522C17.3678 9.54052 17.5323 9.93704 17.6527 10.3496ZM9.56501 12C9.56501 13.3447 10.6552 14.4348 12 14.4348C13.3448 14.4348 14.435 13.3447 14.435 12C14.435 10.6553 13.3448 9.56522 12 9.56522C10.6552 9.56522 9.56501 10.6553 9.56501 12Z" ></path></svg>
</button>
      </div>
        `;
    }

    weatherMarkup(data, iconData) {
        return `
  <div class="weather svg">
  <div class="location-title">${data?.name || '--'}</div>
      <div class="temp">
    <div class="icon">
    <i class="wi wi-${iconData?.icon === 'n'
                ? 'owm-night'
                : iconData?.icon === 'd'
                    ? 'owm-day'
                    : !iconData?.icon
                        ? 'fire'
                        : ''
            }-${iconData?.iconId || ''}"></i>
    </div>
        <div class="temp-svg">

        </div>
        <div class="icon">
            <i class="wi wi-fahrenheit"></i>
        </div>
      </div>
    <div class="description">
        ${data?.description || '--'}
      </div>
    </div>
   
      `;
    }
}

export default new Markup();
