'use strict';

export function slideIn(target) {
    const slideIn = document.querySelectorAll(target);
    // console.log(slideIn);

    slideIn.forEach((el) => {
        el.classList.add('slideIn');
        setTimeout(() => {
            el.classList.remove('slideIn');
        }, 700);
    });
}
