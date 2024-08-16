import { AnimateTransition } from './Animation';

class ModalHandler {
    constructor() {
        this.modalContainer = document.querySelector('.modal-container');
    }

    setModalState(target, state, delayLength = 0) {
        if (typeof state !== 'undefined') {
            setTimeout(() => {
                target.classList.toggle('active', state);
                target.setAttribute('aria-hidden', !state);
            }, delayLength);
        }
    }

    openModal(e) {
        if (!e) return;

        const animate = new AnimateTransition('.column, .settings');
        animate.startAnimation();
        this.setModalState(this.modalContainer, true);
    }

    closeModal(e) {
        if (!e) return;

        const animate = new AnimateTransition(
            '.settings, .modal-container',
            'slideOut'
        );
        const delayLength = animate.startAnimation();
        this.setModalState(this.modalContainer, false, delayLength);
    }

    handleClicks(e) {
        const target = e.target;

        if (target.closest('.modal-button')) {
            this.openModal(target);
        }

        if (
            target.classList.contains('close-button') ||
            target.classList.contains('modal-container')
        ) {
            this.closeModal(target);
        }
    }

    handleEscPress(e) {
        if (
            e.key === 'Escape' &&
            this.modalContainer.classList.contains('active')
        ) {
            this.closeModal(e);
        }
    }

    start() {
        document.addEventListener('click', (e) => this.handleClicks(e));

        document.addEventListener('keydown', (e) => this.handleEscPress(e));
    }
}

export default new ModalHandler();
