class Dispersion {
  #R = [];

  #G = [];

  #B = [];

  #A = [];

  #redLayer = null;

  #greenLayer = null;

  #blueLayer = null;

  #alphaLayer = null;

  #imageDataRed = [];

  #imageDataGreen = [];

  #imageDataBlue = [];

  #imageDataAlpha = [];

  constructor(canvas, rgbaData, xSide, ySide) {
    this.rgba = rgbaData;
    this.canvas = canvas;
    this.xSide = xSide;
    this.ySIde = ySide;
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

  #createColorLayers() {
    this.#redLayer = this.canvas.getContext('2d');
    this.#greenLayer = this.canvas.getContext('2d');
    this.#blueLayer = this.canvas.getContext('2d');
    this.#alphaLayer = this.canvas.getContext('2d');

    this.#imageDataRed = this.#redLayer.createImageData(this.xSide, this.ySIde);
    this.#imageDataGreen = this.#greenLayer.createImageData(this.xSide, this.ySIde);
    this.#imageDataBlue = this.#blueLayer.createImageData(this.xSide, this.ySIde);
    this.#imageDataAlpha = this.#alphaLayer.createImageData(this.xSide, this.ySIde);
  }

  addLayer(color, xPos, yPos) {
    this.#createColorLayers();
    this.#decomposition();

    let count = 0;
    switch (color) {
      case 'Red':
        for (let i = 0; i < this.#imageDataRed.data.length; i += 4) {
          this.#imageDataRed.data[i] = this.#R[count];
          this.#imageDataRed.data[i + 3] = this.#A[count];
          count += 1;
        }
        this.#redLayer.putImageData(this.#imageDataRed, xPos, yPos);
        break;
      case 'Green':
        for (let i = 1; i < this.#imageDataGreen.data.length; i += 4) {
          this.#imageDataGreen.data[i] = this.#G[count];
          this.#imageDataGreen.data[i + 2] = this.#A[count];
          count += 1;
        }
        this.#greenLayer.putImageData(this.#imageDataGreen, xPos, yPos);
        break;
      case 'Blue':
        for (let i = 2; i < this.#imageDataBlue.data.length; i += 4) {
          this.#imageDataBlue.data[i] = this.#B[count];
          this.#imageDataBlue.data[i + 1] = this.#A[count];
          count += 1;
        }
        this.#blueLayer.putImageData(this.#imageDataBlue, xPos, yPos);
        break;
      case 'Alpha':
        for (let i = 3; i < this.#imageDataAlpha.data.length; i += 4) {
          this.#imageDataAlpha.data[i] = this.#A[count];
          count += 1;
        }
        this.#alphaLayer.putImageData(this.#imageDataAlpha, xPos, yPos);
        break;
      default:
        break;
    }
  }

  getRedLayer() {
    let count = 0;
    for (let i = 0; i < this.#imageDataRed.data.length; i += 4) {
      this.#imageDataRed.data[i] = this.#R[count];
      count += 1;
    }
    return this.#imageDataRed.data;
  }

  getGreenLayer() {
    let count = 0;
    for (let i = 1; i < this.#imageDataGreen.data.length; i += 4) {
      this.#imageDataGreen.data[i] = this.#G[count];
      count += 1;
    }
    return this.#imageDataGreen.data;
  }

  getBlueLayer() {
    let count = 0;
    for (let i = 2; i < this.#imageDataBlue.data.length; i += 4) {
      this.#imageDataBlue.data[i] = this.#B[count];
      count += 1;
    }
    return this.#imageDataBlue.data;
  }

  getAlphaLayer() {
    let count = 0;
    for (let i = 3; i < this.#imageDataAlpha.data.length; i += 4) {
      this.#imageDataAlpha.data[i] = this.#A[count];
      count += 1;
    }
    return this.#imageDataAlpha.data;
  }

  getRedData() {
    this.#decomposition();
    return this.#R;
  }

  getGreenData() {
    this.#decomposition();
    return this.#G;
  }

  getBlueData() {
    this.#decomposition();
    return this.#B;
  }

  getAlphaData() {
    this.#decomposition();
    return this.#A;
  }
}

export default Dispersion;
