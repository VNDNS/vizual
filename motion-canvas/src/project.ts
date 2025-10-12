import {makeProject} from '@motion-canvas/core';
import './global.css';
import example from './scenes/example?scene';
import animation from './scenes/preview/animation?scene';
import audio from './audio/audio.wav';
import plugin from './plugins';

export default makeProject({
  scenes: [animation],
  audio: audio,
  plugins: [plugin()],
});
