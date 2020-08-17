import domManipulation from './render/domManipulation';

// eslint-disable-next-line no-undef
places({
  appId: 'pl329QO9HIMJ',
  apiKey: 'a4154f5237168e76dfca7f1c06afa53f',
  container: document.getElementById('address-input'),
}).configure({ type: 'city' });

domManipulation.setListeners();
