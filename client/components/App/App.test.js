import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme';
import {expect} from 'chai'
import sinon from 'sinon';
import jest from 'jest';
import axios from 'axios';

const shallowWrapper = shallow(<App />);

describe('<App />', () => {
  it('renders App component to page', () => {
    expect(shallowWrapper.find('div.app').exists()).to.eq(true);
  });

})

