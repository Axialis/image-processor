class Convolution {
  #rectMatrix = [[], []];

  #coreMatrix = [[1, 0, 1], [0, 1, 0], [1, 0, 1]];

  constructor(layer, xSide, ySide) {
    this.layer = layer;
    this.xSide = xSide;
    this.ySide = ySide;
  }

  #createRectMatrix() {
    let count = 0;
    for (let i = 0; i < this.xSide; i += 1) {
      for (let k = 0; k < this.ySide; k += 1) {
        this.#rectMatrix[[i][k]] = this.layer[count];
        count += 1;
      }
    }
  }

  run() {
    this.#createRectMatrix();
  }
}

export default Convolution;
