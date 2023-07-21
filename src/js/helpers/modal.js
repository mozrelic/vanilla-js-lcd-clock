import { slideIn } from './slideIn';
export function modalHandler() {
    const modalContainer = document.querySelector('.modal-container');
    const modalTrigger = document.querySelector('.modal-trigger');
    const closeModal = document.querySelector('.close-modal');

    function closeOrOpenModal(action) {
        if (action === 'open') {
            modalContainer.classList.remove('hidden');
            modalContainer.classList.add('active');
        }

        if (action === 'close') {
            modalContainer.classList.remove('active');
            modalContainer.classList.add('hidden');
        }
    }

    function escOnParentClick(e) {
        if (e.target.classList.contains('modal-container')) {
            closeOrOpenModal('close');
            console.log(e.target);
        }
    }

    function escClose(e) {
        if (!e.keyCode || e.keyCode === 27) {
            closeOrOpenModal('close');
        }
    }

    modalTrigger.addEventListener('click', (e) => {
        if (!e.target) return;
        closeOrOpenModal('open');
        slideIn('.column');
    });

    closeModal.addEventListener('click', () => {
        closeOrOpenModal('close');
    });

    modalContainer.addEventListener('click', escOnParentClick);
    document.addEventListener('keydown', escClose);
}
