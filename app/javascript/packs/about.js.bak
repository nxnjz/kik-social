'use strict';

import loadPolyfills from '../kiksocial/load_polyfills';
import { start } from '../kiksocial/common';

start();

function loaded() {
  const TimelineContainer = require('../kiksocial/containers/timeline_container').default;
  const React             = require('react');
  const ReactDOM          = require('react-dom');
  const mountNode         = document.getElementById('kiksocial-timeline');

  if (mountNode !== null) {
    const props = JSON.parse(mountNode.getAttribute('data-props'));
    ReactDOM.render(<TimelineContainer {...props} />, mountNode);
  }
}

function main() {
  const ready = require('../kiksocial/ready').default;
  ready(loaded);
}

loadPolyfills().then(main).catch(error => {
  console.error(error);
});
