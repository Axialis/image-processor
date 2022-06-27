class Convolution {
  #rectMatrix = [];

  #generateMatrix = [];

  #coreMatrixBlur = [
    [0.0625, 0.125, 0.0625],
    [0.125, 0.25, 0.125],
    [0.0625, 0.125, 0.0625]
  ];

  #coreMatrixBottomSobel = [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1]
  ];

  #coreMatrixEmboss = [
    [-2, -1, 0],
    [-1, 1, 1],
    [0, 1, 2]
  ];

  #coreMatrixLeftSobel = [
    [1, 0, -1],
    [2, 0, -2],
    [1, 0, -1]
  ];

  #coreMatrixOutline = [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1]
  ];

  #coreMatrixRightSobel = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]
  ];

  #coreMatrixSharpen = [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0]
  ];

  #coreMatrixTopSobel = [
    [1, 2, 1],
    [2, 0, -2],
    [-1, -2, -1]
  ];

  constructor(layer, xSide, ySide) {
    this.layer = layer;
    this.xSide = xSide;
    this.ySide = ySide;
  }

  #createRectMatrix() {
    let count = 0;
    for (let i = 0; i < this.xSide; i += 1) {
      this.#rectMatrix[i] = [];
      for (let k = 0; k < this.ySide; k += 1) {
        this.#rectMatrix[i][k] = this.layer[count];
        count += 1;
      }
    }
  }

  run() {
    this.#createRectMatrix();
  }

  generate() {
    this.#createRectMatrix();
    let data = 0;
    let countX = 0;
    let countY = 0;
    for (let y = 2; y < this.#rectMatrix.length; y += 1) {
      this.#generateMatrix[countY] = [];
      for (let x = 0; x < this.#rectMatrix[0].length; x += 1) {
        data = 0;
        for (let coreY = 0; coreY < this.#coreMatrixOutline.length; coreY += 1) {
          for (let coreX = 0; coreX < this.#coreMatrixOutline[0].length; coreX += 1) {
            data += this.#rectMatrix[y + (0 - coreY)][x + (0 - coreX)]
              * this.#coreMatrixOutline[coreY][coreX];
          }
        }
        this.#generateMatrix[countY][countX] = Math.round(data);
        countX += 1;
      }
      countY += 1;
    }
    return this.#generateMatrix;
  }

  getConvArray() {
    return this.generate().flat();
  }
}

export default Convolution;
