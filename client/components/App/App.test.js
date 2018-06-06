import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import GalleryImage from '../GalleryImage/GalleryImage.jsx'
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

const doc = new JSDOM('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

const shallowWrapper = shallow(<App />);

describe('<App />', () => {
  //basic rendering of components to page
  it('renders App component to page', () => {
    expect(shallowWrapper.find('div.app').exists()).to.eq(true);
  });

  it('renders Profile Image component to page', () => {
    expect(shallowWrapper.find('div.profileImage').exists()).to.eq(true);
  });

  it('renders Image Galley to page', () => {
    expect(shallowWrapper.find('div.gallery').exists()).to.eq(true);
  });

  //states are correctly rendered
  it('should create state object', () => {
    expect(typeof shallowWrapper.state()).to.eq('object');
  });

  // it('calls componentDidMount', () => {
  //   sinon.spy(App.prototype, 'componentDidMount');
  //   const wrapper = mount(<App />);
  //   expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
  // });


})

