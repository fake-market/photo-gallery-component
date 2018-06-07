import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jsdom from 'jsdom';

jest.setTimeout(10000);

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
};

function setUpDOM() {
  const { JSDOM } = jsdom;
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {url: 'http://localhost:1337/'});
  const { window } = dom;

  global.window = window;
  global.document = window.document;
  global.navigator = {
    userAgent: 'node.js',
  };
  copyProps(window, global);
};

setUpDOM();

configure({ adapter: new Adapter() });