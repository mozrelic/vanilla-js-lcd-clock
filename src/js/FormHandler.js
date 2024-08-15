/**
 * A class to handle form interactions and manage settings.
 */
class FormHandler {
    #lastState = {};
    #currentState = {};
    #settings = {};

    /**
     * Initializes the form with the provided data, setting up field values.
     * @param {Object} data - The initial data to populate the form fields.
     */
    init(data) {
        const fields = document.querySelectorAll('.setting');
        this.#settings = { ...data };
        // console.log(settings);

        fields.forEach((field) => {
            const attribute = field.getAttribute('data-type');

            if (!field.classList.contains('checkbox'))
                field.value = this.#settings[attribute];

            if (
                field.getAttribute('data-type') === 'showClockMeta' ||
                field.getAttribute('data-type') === 'showHour12' ||
                field.getAttribute('data-type') === 'showWeather'
            ) {
                field.checked = Boolean(this.#settings[attribute]);
            }
        });
    }

    /**
     * Handles changes to form fields, updating the current state.
     * @param {HTMLElement} target - The form field element that triggered the change.
     */
    handleChange(target) {
        const value = target.value || Boolean(target.checked);
        const attribute = target.getAttribute('data-type');

        this.#lastState = this.#currentState;

        if (this.#lastState[attribute] !== value) {
            this.#currentState = {
                [attribute]: value,
            };

            this.#updateSettings();
        }
    }

    #updateSettings() {
        this.#settings = {
            ...this.#settings,
            ...this.#currentState,
        };
    }

    /**
     * Returns the current settings state.
     * @returns {Object} The current settings.
     */
    returnState() {
        return this.#settings;
    }
}
export default new FormHandler();
