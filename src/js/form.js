/**
 * NOTES: Need to set up error handling for the following fields:
 * zipcode, based on response from server
 * apiKey based on response from server
 * activeColor
 * inactiveColor
 *
 *
 */
let settings;

export class FormHandler {
    lastState = {};
    currentState = {};

    handleError(attribute, value) {
        const reg = /^#([0-9a-f]{3}){1,2}$/i;
        const toggleState = reg.test(value);
        if (toggleState && attribute === 'activeColor') {
            console.log(toggleState);
        }
    }

    init(data) {
        const fields = document.querySelectorAll('.setting');
        settings = { ...data };
        console.log(settings);

        fields.forEach((field) => {
            const attribute = field.getAttribute('data-type');

            if (!field.classList.contains('checkbox'))
                field.value = settings[attribute];

            if (
                field.getAttribute('data-type') === 'clockMeta' ||
                field.getAttribute('data-type') === 'hour12'
            ) {
                field.checked = Boolean(settings[attribute]);
            }
        });
    }

    handleChange(target) {
        const value = target.value || Boolean(target.checked);
        const attribute = target.getAttribute('data-type');

        this.lastState = this.currentState;

        this.handleError(attribute, value);

        if (this.lastState[attribute] !== value) {
            this.currentState = {
                [attribute]: value,
            };

            this.#updateSettings();
        }
    }

    #updateSettings() {
        settings = {
            ...settings,
            ...this.currentState,
        };
    }

    returnState() {
        return settings;
    }
}
