import React from 'react'
import { shallow } from 'enzyme';
import Links from './Links';
import { Button } from 'react-bootstrap';

test('should render <Links />', () => {
    const wrapper = shallow(<Links />);
    
    expect(wrapper.find(Button).length === 3).toEqual(true);
    expect(wrapper).toMatchSnapshot();
});
