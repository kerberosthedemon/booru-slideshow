export default class PictureController {

  new(handleClose) {
    this.position = { x: 0, y: 0 };
    this.scale = 1;
    this.handleClose = handleClose;
  }

  handleInput = (input, setStyle) => {
    if (input.key === 'c')
      this.resetImageTransform(setStyle);

    if (input.isKeyUp)
      this.handleKeyUp(input);
    else
      this.handleKeyDown(input);

    setStyle(this.getStyle());
  }

  resetImageTransform = setStyle => {
    this.position = { x: 0, y: 0 };
    this.scale = 1;
    setStyle(this.getStyle());
  }

  getStyle() {
    console.log(this);
    return { transform: `scale(${this.scale}) translateX(${this.position.x}em) translateY(${this.position.y}em)` }
  };

  handleKeyDown(input) {

    switch (input.key) {
      case 'q' && !this.scaleInterval:
        this.scaleImage(1); //usar setInterval() y clearInterval() para estas funciones
        break;

      case 'e' && !this.scaleInterval:
        this.scaleImage(-1);
        break;

      case 'a' && !this.translateIntervalX:
        this.translateImageHorizontally(1)
        break;

      case 'd' && !this.translateIntervalX:
        this.translateImageHorizontally(-1)
        break;

      case 'w' && !this.translateIntervalY:
        this.translateImageVertically(1)
        break;

      case 's' && !this.translateIntervalY:
        this.translateImageVertically(-1)
        break;

      default:
        break;
    }
  }

  scaleImage = (sign) => {
    this.scaleInterval = setInterval(() => {
      this.scale += .02 * sign;
    }, 5)
  }

  translateImageVertically = (sign) => {
    this.translateIntervalY = setInterval(() => {
      this.position.y += .2 * sign;
    }, 5)
  }

  translateImageHorizontally = (sign) => {
    this.translateIntervalX = setInterval(() => {
      this.position.x += .2 * sign;
    }, 5)
  }

  handleKeyUp = (event) => {
    switch (event.key) {
      case 'q':
      case 'e':
        clearInterval(this.scaleInterval);
        this.scaleInterval = null;
        break;

      case 'w':
      case 's':
        clearInterval(this.translateIntervalY);
        this.translateIntervalY = null;
        break;

      case 'a':
      case 'd':
        clearInterval(this.translateIntervalX);
        this.translateIntervalX = null;
        break;

      case 'Escape': //Para Linux
        this.handleClose();
        break;

      default:
        break;
    }
  }
}