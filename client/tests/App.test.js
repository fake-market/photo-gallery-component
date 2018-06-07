import React from 'react';
import App from '../components/App/App.jsx';
// import styles from '../components/App/App.css';
import GalleryImage from '../components/GalleryImage/GalleryImage.jsx'
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

const shallowWrapper = shallow(<App />);

describe('App shallow tests', () => {
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

describe('App mount tests', () => {
  it('calls componentDidMount', () => {
    sinon.spy(App.prototype, 'componentDidMount');
    const wrapper = mount(<App />);
    expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
  })

  it('can set props', () => {
    const wrapper = mount(<App productId={1}/>);
    expect(wrapper.props().productId).to.equal(1);
    wrapper.setProps( { productId: 2 } );
    expect(wrapper.props().productId).to.equal(2);
  })

  it('can set state', () => {
    const wrapper = mount(<App />);
    wrapper.setState( { profileImage: 'http://test.com' } );
    expect(wrapper.state().profileImage).to.equal('http://test.com');
  })

})

