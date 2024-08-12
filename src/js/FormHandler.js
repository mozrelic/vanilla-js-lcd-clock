/**
 * NOTES:
 *
 */

class FormHandler {
    lastState = {};
    currentState = {};
    settings = {};

    // gets data stored in settings and shows that data in the form fields on load
    init(data) {
        const fields = document.querySelectorAll('.setting');
        this.settings = { ...data };
        // console.log(settings);

        fields.forEach((field) => {
            const attribute = field.getAttribute('data-type');

            if (!field.classList.contains('checkbox'))
                field.value = this.settings[attribute];

            if (
                field.getAttribute('data-type') === 'clockMeta' ||
                field.getAttribute('data-type') === 'hour12' ||
                field.getAttribute('data-type') === ''
            ) {
                field.checked = Boolean(this.settings[attribute]);
            }
        });
    }

    handleChange(target) {
        const value = target.value || Boolean(target.checked);
        const attribute = target.getAttribute('data-type');

        this.lastState = this.currentState;

        if (this.lastState[attribute] !== value) {
            this.currentState = {
                [attribute]: value,
            };

            this.#updateSettings();
        }
    }

    #updateSettings() {
        this.settings = {
            ...this.settings,
            ...this.currentState,
        };
    }

    returnState() {
        return this.settings;
    }
}
export default new FormHandler();
