import Dispersion from './Dispersion';
import Conversion from './Conversion';
import Convolution from './Convolution';
import './style.css';

const canvas = document.getElementById('canvas1');
canvas.width = 1000;
canvas.heigth = 500;
const ctx = canvas.getContext('2d');

const image = new Image();
image.src = './assets/img/crab.jpg';

const X = 200;
const Y = 200;

image.onload = function () {
  ctx.drawImage(image, 0, 0, X, Y);
  const RGBA = ctx.getImageData(0, 0, X, Y).data;
  const layer = new Dispersion(canvas, RGBA, X, Y);
  const second = new Conversion(canvas, RGBA, X, Y);
  const conv = new Convolution(layer.getBlueData(), X, Y);
  conv.run();
  second.rgbaToImage(0, 220);
  layer.addLayer('Red', 220, 0);
  layer.addLayer('Green', 440, 0);
  layer.addLayer('Blue', 660, 0);
  layer.addLayer('Alpha', 0, 440);
};
