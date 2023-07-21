import { slideIn } from './slideIn';
export function modalHandler() {
    const modalContainer = document.querySelector('.modal-container');
    const modalTrigger = document.querySelector('.modal-trigger');
    const closeModal = document.querySelector('.close-modal');

    function setModalState(target, state, callback) {
        target.classList.toggle('active', state);
        if (typeof state !== 'undefined') {
            state = !state;
            target.setAttribute('aria-hidden', state);
        }
        callback;
    }

    function escClose(e) {
        if (!e.keyCode || e.keyCode === 27) {
            setModalState(modalContainer, false);
        }
    }

    modalTrigger.addEventListener('click', (e) => {
        if (!e.target) return;
        setModalState(modalContainer, true, slideIn('.column'));
    });

    closeModal.addEventListener('click', (e) => {
        if (!e.target) return;
        setModalState(modalContainer, false);
    });

    modalContainer.addEventListener('click', (e) => {
        if (!e.target) return;
        if (e.target.classList.contains('modal-container')) {
            setModalState(modalContainer, false);
        }
    });

    document.addEventListener('keydown', escClose);
}
