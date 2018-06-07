import React from 'react';
import GalleryImage from '../components/GalleryImage/GalleryImage.jsx';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

const shallowWrapper = shallow(<GalleryImage />);

describe('<GalleryImage />', () => {
  //basic rendering of components to page
  it('renders GalleryImage component to page', () => {
    expect(shallowWrapper.find('td').exists()).to.eq(true);
  });

  //states are correctly rendered
  it('should create state object', () => {
    expect(typeof shallowWrapper.state()).to.eq('object');
  });

})

