export function modalHandler() {
    const modalContainer = document.querySelector('.modal-container');
    const modalTrigger = document.querySelector('.modal-trigger');
    const buttonTrigger = document.querySelector('.modal-trigger button');
    const closeModal = document.querySelector('.close-modal');
    console.log(modalTrigger);
    modalTrigger.addEventListener('click', (e) => {
        if (!e.target) return;
        modalContainer.classList.remove('hidden');
        modalContainer.classList.add('active');
    });

    closeModal.addEventListener('click', (e) => {
        modalContainer.classList.remove('active');
        modalContainer.classList.add('hidden');
    });
}
