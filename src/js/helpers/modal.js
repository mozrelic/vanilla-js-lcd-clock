import { AnimateTransition } from './Animation';

export function modalHandler() {
    const modalContainer = document.querySelector('.modal-container');

    function setModalState(target, state, delayLength = 0) {
        if (typeof state !== 'undefined') {
            setTimeout(() => {
                target.classList.toggle('active', state);
                target.setAttribute('aria-hidden', !state);
            }, delayLength);
        }
    }
    function openModal(e) {
        if (!e) return;

        const animate = new AnimateTransition('.column, .settings');
        animate.startAnimation();
        setModalState(modalContainer, true);
    }

    function closeModal(e) {
        if (!e) return;

        const animate = new AnimateTransition(
            '.settings, .modal-container',
            'slideOut'
        );
        const delayLength = animate.startAnimation();
        setModalState(modalContainer, false, delayLength);
    }

    document.addEventListener('click', (e) => {
        const target = e.target;

        if (target.closest('.modal-button')) {
            openModal(target);
        }

        if (
            target.classList.contains('close-button') ||
            target.classList.contains('modal-container')
        ) {
            closeModal(target);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('active')) {
            closeModal(e);
        }
    });
}
