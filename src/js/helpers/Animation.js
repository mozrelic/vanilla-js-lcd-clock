class AnimateTransition {
  target;
  animationType;
  time = 50;
  delay = 50;

  // constructor(target, animationType = 'slideIn'){
  //     this.target = document.querySelectorAll(target);
  //     this.animationType = animationType;
  // }

  startAnimation(target, animationType = 'slideIn') {
    if (!target) return;

    this.target = document.querySelectorAll(target);
    this.animationType = animationType;

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
      if (totalInd === ind) {
        // console.log('totalInd', totalInd, 'ind', ind);
        console.log(this.target);
        setTimeout(() => {
          this.target.forEach((element) => {
            // console.log('from Animate', element);
            console.log('TRUE', element);

            element.classList.remove('hide', 'slideIn');
            // element.classList.remove('slideIn');
          });
        }, totalTime);
      }
      console.log(totalTime);
    });
  }

  #slideOut() {
    const totalInd = this.target.length - 1;
    let endTime = 0;

    this.target.forEach((el, ind) => {
      let delay = Number(this.delay * ind);
      let totalTime = this.time + delay;

      el.classList.add('slideOut');

      // removes the classes required for the animation. This is probably unnecessary but I don't like the extra classes on the elements
      if (totalInd === ind) {
        // console.log('TRUE');
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

export default new AnimateTransition();
// export default AnimateTransition();
