import Dispersion from './Dispersion';
import Conversion from './Conversion';
import Convolution from './Convolution';
import './style.css';

const canvas = document.getElementById('canvas1');
canvas.width = 500;
canvas.heigth = 500;
const ctx = canvas.getContext('2d');

const image = new Image();
image.src = './assets/img/fish.jpg';

const X = 300;
const Y = 300;

image.onload = () => {
  ctx.drawImage(image, 0, 0, X, Y);
  const RGBA = ctx.getImageData(0, 0, X, Y).data;
  const layer = new Dispersion(canvas, RGBA, X, Y);
  const second = new Conversion(canvas, RGBA, X, Y);
  const red = new Convolution(layer.getRedData(), X, Y);
  const blue = new Convolution(layer.getBlueData(), X, Y);
  const green = new Convolution(layer.getGreenData(), X, Y);
  const alpha = new Convolution(layer.getAlphaData(), X, Y);
  second.pixelsToImage(0, 320, red.getConvArray(), green.getConvArray(), blue.getConvArray(), alpha.getConvArray());
  // second.rgbaToImage(0, 220);
  // layer.addLayer('Red', 220, 0);
  // layer.addLayer('Green', 440, 0);
  // layer.addLayer('Blue', 660, 0);
  // layer.addLayer('Alpha', 0, 440);
};
