class Conversion {
  #R = [];

  #G = [];

  #B = [];

  #A = [];

  #imageLayer = null;

  #image = [];

  constructor(canvas, rgbaData, xSide, ySide) {
    this.rgba = rgbaData;
    this.xSide = xSide;
    this.ySide = ySide;
    this.canvas = canvas;
  }

  #createImageLayer() {
    this.#imageLayer = this.canvas.getContext('2d');
    this.#image = this.#imageLayer.createImageData(this.xSide, this.ySide);
  }

  #decomposition() {
    let count = 0;
    for (let i = 0; i < this.rgba.length; i += 4) {
      this.#R[count] = this.rgba[i + 0];
      this.#G[count] = this.rgba[i + 1];
      this.#B[count] = this.rgba[i + 2];
      this.#A[count] = this.rgba[i + 3];
      count += 1;
    }
  }

  rgbaToImage(xPos, yPos) {
    this.#createImageLayer();
    this.#decomposition();
    let count = 0;
    for (let i = 0; i < this.#image.data.length; i += 4) {
      this.#image.data[i + 0] = this.#R[count];
      this.#image.data[i + 1] = this.#G[count];
      this.#image.data[i + 2] = this.#B[count];
      this.#image.data[i + 3] = this.#A[count];
      count += 1;
    }
    this.#imageLayer.putImageData(this.#image, xPos, yPos);
  }

  pixelsToImage(xPos, yPos, r, g, b, a) {
    this.#createImageLayer();
    let count = 0;
    for (let i = 0; i < this.#image.data.length; i += 4) {
      this.#image.data[i + 0] = r[count];
      this.#image.data[i + 1] = g[count];
      this.#image.data[i + 2] = b[count];
      this.#image.data[i + 3] = 255;
      count += 1;
    }
    this.#imageLayer.putImageData(this.#image, xPos, yPos);
  }
}

export default Conversion;
