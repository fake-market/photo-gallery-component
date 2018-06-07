import React from 'react';
// import ReactDOM from 'react-dom';
import App from '../components/App/App.jsx';
import styles from '../components/App/App.css';
// import GalleryImage from '../GalleryImage/GalleryImage.jsx'
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
// import sinon from 'sinon';
import jsdom from 'jsdom';
import { truncateSync } from 'fs';
const { JSDOM } = jsdom;

const doc = new JSDOM('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

const shallowWrapper = shallow(<App />);

describe('App rendering tests', () => {
  //basic rendering of components to page
  it('renders App component to page', () => {
    expect(shallowWrapper.find('div.app').exists()).to.eq(true);
  });

  it('renders Profile Image component to page', () => {
    expect(shallowWrapper.find('div.profileImage').exists()).to.eq(true);
  });

  it('profile image container has current className', () => {
    expect(shallowWrapper.find('div.profileImageContainer').exists()).to.eq(true);
  })

  it('renders Image Gallery to page', () => {
    expect(shallowWrapper.find('div.gallery').exists()).to.eq(true);
  });

  it('renders previous button onto app' ,() => {
    expect(shallowWrapper.find('a#prev').exists()).to.eq(true);
  });

  it('renders next button onto app' ,() => {
    expect(shallowWrapper.find('a#next').exists()).to.eq(true);
  });

});

describe('App state tests', () => {


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

