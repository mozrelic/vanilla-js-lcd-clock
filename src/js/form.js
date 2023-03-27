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

    handleChange(target) {
        const value = target.value || target.checked;
        const attribute = target.getAttribute('data-type');

        this.lastState = this.currentState;

        this.handleError(attribute, value);

        if (this.lastState[attribute] !== value) {
            this.currentState = {
                [attribute]: value,
            };
            this.updateSettings();
        }
        return settings;
    }

    updateSettings() {
        settings = {
            ...settings,
            ...this.currentState,
        };
    }

    returnState() {
        return settings;
    }
}
