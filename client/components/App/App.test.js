import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme';
import {expect} from 'chai'
import sinon from 'sinon';

const mountWrapper = mount(<App />);
const shallowWrapper = shallow(<App />);

describe('<App />', () => {
  it('renders without crasshing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  })

  it('renders App component to page', () => {
    expect(shallowWrapper.find('div.app').exists()).to.eq(true);
  });

})

