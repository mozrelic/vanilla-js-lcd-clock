export class AnimateTransition {
  target;
  animationType;
  time = 200;
  delay = 50;

  constructor(target, animationType = 'slideIn') {
    this.target = document.querySelectorAll(`${target}`);
    this.animationType = animationType;
  }

  startAnimation() {
    if (!this.target) return;

    if (this.animationType === 'slideIn') {
      this.#slideIn();
    }
    if (this.animationType === 'slideOut') {
      return this.#slideOut();
    }
  }

  #slideIn() {
    const totalInd = this.target.length - 1;

    this.target.forEach((el, ind) => {
      let delay = Number(this.delay * ind);
      let totalTime = this.time + delay;
      el.classList.add('hide');
      setTimeout(() => {
        el.classList.add('slideIn');
      }, totalTime);

      // removes the classes required for the animation. This is probably unnecessary but I don't like the extra classes on the elements
      // IMPORTANT NOTE about totalTime for this setTimeout: when there is only 1 element in the target, the classes are removed
      // at the exact same time they are applied in the previous setTimout, this make the transition animation happen so fast it
      // becomes inpercievable, so I have to add 100ms to totalTime to ensure
      // that the animation can actually be seen.
      if (totalInd === ind) {
        setTimeout(() => {
          this.target.forEach((element) => {
            element.classList.remove('hide', 'slideIn');
          });
        }, totalTime + 100);
      }
    });
  }

  #slideOut() {
    const totalInd = this.target.length - 1;
    let endTime = 0;

    this.target.forEach((el, ind) => {
      let delay = Number(this.delay * ind);
      let totalTime = this.time + delay;

      el.classList.add('slideOut');
      el.classList.add('hide');

      // removes the classes required for the animation. This is probably unnecessary but I don't like the extra classes on the elements
      if (totalInd === ind) {
        endTime = totalTime;
        setTimeout(() => {
          this.target.forEach((element) => {
            element.classList.remove('slideOut');
          });
        }, totalTime);
      }
    });
    return endTime;
  }
}
