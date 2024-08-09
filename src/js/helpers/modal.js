import AnimateTransition from './Animation';

export function modalHandler() {
    const modalContainer = document.querySelector('.modal-container');

    function setModalState(target, state, delayTime = 0) {
        if (typeof state !== 'undefined') {
            setTimeout(() => {
                target.classList.toggle('active', state);
                target.setAttribute('aria-hidden', !state);
            }, delayTime);
        }
    }
    function openModal(e) {
        if (!e) return;

        AnimateTransition.startAnimation('.column, .settings');
        setModalState(modalContainer, true);
    }

    function closeModal(e) {
        if (!e) return;

        const delayTime = AnimateTransition.startAnimation(
            '.settings, .modal-container',
            'slideOut'
        );

        setModalState(modalContainer, false, delayTime);
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
