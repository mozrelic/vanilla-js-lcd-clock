export function modalHandler() {
  const modalContainer = document.querySelector('.modal-container');
  const modalTrigger = document.querySelector('.modal-trigger button');
  console.log(modalTrigger);
  modalTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    if (!e.target) return;
    modalContainer.classList.remove('hidden');
    modalContainer.classList.add('active');
  });
}
