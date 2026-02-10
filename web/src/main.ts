import 'focus-visible';
import * as React from 'react';
import { render } from 'react-dom';
import './components/index.css';

declare var require: any;

// Safari hack to allow :active styles.
document.addEventListener('touchstart', function () {}, true);

// Start the app when DOM is ready.
document.addEventListener('DOMContentLoaded', async () => {
  const deferredPolyfills = [
    typeof window.IntersectionObserver === 'undefined'
      ? require('intersection-observer')
      : Promise.resolve(),
    typeof window.MediaRecorder === 'undefined'
      ? require('audio-recorder-polyfill')
      : Promise.resolve(),
  ];
  const [_, AudioRecorder] = await Promise.all(deferredPolyfills);
  if (AudioRecorder) window.MediaRecorder = AudioRecorder.default;
  const App = require('./components/app').default;
  render(React.createElement(App), document.getElementById('root'));
});

switch (window.location.hostname) {
  case "proaten.nl":
    document.title = "Proaten";
    break;
  case "proatn.nl":
    document.title = "Proatn";
    break;
  case "praoten.nl":
    document.title = "Praoten";
    break;
  case "praotn.nl":
    document.title = "praotn";
    break;
  case "localhost":
    document.title = "Praoten Dev";
    break;

  default:
    break;
}