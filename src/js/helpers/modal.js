export function modalHandler() {
    const modalContainer = document.querySelector('.modal-container');
    const modalTrigger = document.querySelector('.modal-trigger');
    const closeModal = document.querySelector('.close-modal');

    modalTrigger.addEventListener('click', (e) => {
        if (!e.target) return;
        modalContainer.classList.remove('hidden');
        modalContainer.classList.add('active');
    });

    closeModal.addEventListener('click', () => {
        modalContainer.classList.remove('active');
        modalContainer.classList.add('hidden');
    });
}
