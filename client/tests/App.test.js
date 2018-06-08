import React from 'react';
import App from '../components/App/App.jsx';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

const shallowWrapper = shallow(<App />);

describe('App shallow tests', () => {
  it('renders App component to page', () => {
    expect(shallowWrapper.find('div.app').exists()).to.equal(true);
  });

  it('renders Profile Image component to page', () => {
    expect(shallowWrapper.find('div.profileImage').exists()).to.equal(true);
  });

  it('profile image container has current className', () => {
    expect(shallowWrapper.find('div.profileImageContainer').exists()).to.equal(true);
  })

  it('renders Image Gallery to page', () => {
    expect(shallowWrapper.find('div.gallery').exists()).to.equal(true);
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

  it('should render No Images picture if no images', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('img.noImage').length).to.equal(1);
  })


  it('should not render No Images picture if there are images', () => {
    const wrapper = mount(<App />);
    wrapper.setState({
      images:  ['a', 'b', 'c', 'd', 'e', 'f', 'g']
    })
    expect(wrapper.find('img.noImage').length).to.equal(0);
  })

  it('should not render buttons if not enough images', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('a#prev').length).to.equal(0);
    expect(wrapper.find('a#next').length).to.equal(0);
    wrapper.setState({
      images:  ['a', 'b', 'c', 'd', 'e']
    })
    expect(wrapper.find('a#prev').length).to.equal(0);
    expect(wrapper.find('a#next').length).to.equal(0);
  })

  it('should render buttons if enough images', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('a#prev').length).to.equal(0);
    expect(wrapper.find('a#next').length).to.equal(0);
    wrapper.setState({
      images:  ['a', 'b', 'c', 'd', 'e', 'f', 'g']
    })
    expect(wrapper.find('a#prev').length).to.equal(1);
    expect(wrapper.find('a#next').length).to.equal(1);
  })

})

describe('Buttons setting indices', () => {
  it('should have default start and end indices', () => {
    const wrapper = mount(<App />);
    expect(wrapper.state('startIndex')).to.equal(0);
    expect(wrapper.state('endIndex')).to.equal(5);
  })

  it('should update indices when previous or next are selected', () => {
    const wrapper = mount(<App />);
    wrapper.setState({
      images:  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm']
    })
    wrapper.find('a#next').simulate('click');
    expect(wrapper.state('startIndex')).to.equal(6);
    expect(wrapper.state('endIndex')).to.equal(11);

    wrapper.find('a#prev').simulate('click');
    expect(wrapper.state('startIndex')).to.equal(0);
    expect(wrapper.state('endIndex')).to.equal(5);

  })

  it('should not update indices if greater than length of images or negative', () => {
    const wrapper = mount(<App />);
    wrapper.setState({
      images:  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
    })
    wrapper.find('a#next').simulate('click');
    expect(wrapper.state('startIndex')).to.equal(3);
    expect(wrapper.state('endIndex')).to.equal(8);

    wrapper.find('a#next').simulate('click');
    expect(wrapper.state('startIndex')).to.equal(3);
    expect(wrapper.state('endIndex')).to.equal(8);

    wrapper.find('a#prev').simulate('click');
    expect(wrapper.state('startIndex')).to.equal(0);
    expect(wrapper.state('endIndex')).to.equal(5);

    wrapper.find('a#prev').simulate('click');
    expect(wrapper.state('startIndex')).to.equal(0);
    expect(wrapper.state('endIndex')).to.equal(5);

  })

  describe('Hovering changing profile image', () => {
    it('should change states if hovered over', () =>{
      const wrapper = mount(<App />);
      wrapper.setState({
        profileImage: 'profile.jpg'
      })
      wrapper.instance().tempProfileImageOnHover({ target: { src: 'test.jpg'} });
      expect(wrapper.state().tempProfileImage).to.equal('profile.jpg');
      expect(wrapper.state().profileImage).to.equal('test.jpg');
    })

    it('should change states if hovered over', () =>{
      const wrapper = mount(<App />);
      wrapper.setState({
        profileImage: 'profile.jpg'
      })
      wrapper.instance().tempProfileImageOnHover({ target: { src: 'test'} });
      wrapper.instance().tempProfileImageOffHover();
      expect(wrapper.state().tempProfileImage).to.equal(null);
      expect(wrapper.state().profileImage).to.equal('profile.jpg');

    })

  })

  describe('Changing Profile Images', () => {
    it('should change profile image if thumbnail is selected', () =>{
      const wrapper = mount(<App />);
      expect(wrapper.state().profileImage).to.equal('');
      expect(wrapper.state().selectedImage).to.equal('');
      expect(wrapper.state().tempProfileImage).to.equal(null);
      wrapper.instance().changeProfileImage('test.jpg');
      expect(wrapper.state().profileImage).to.equal('test.jpg');
      expect(wrapper.state().selectedImage).to.equal('test.jpg');
      expect(wrapper.state().tempProfileImage).to.equal('test.jpg');
    })

    it('should change profile image if thumbnail is selected', () =>{
      const wrapper = mount(<App />);
      const images = [
        {
          is_primary: 0,
          s3_url: 'test1.jpg'
        },
        {
          is_primary: 1,
          s3_url: 'test2.jpg'
        }
      ];
      expect(wrapper.state().profileImage).to.equal('');
      wrapper.instance().setProfileImage();
      expect(wrapper.state().profileImage).to.equal('https://s3-us-west-1.amazonaws.com/hrla22-ebay-fe/NoImageFound.jpg');
      wrapper.setState({
        images: images
      });
      wrapper.instance().setProfileImage();
      expect(wrapper.state().profileImage).to.equal('test2.jpg');
    })

  })

})
