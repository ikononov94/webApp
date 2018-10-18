import React from 'react';
import { shallow } from 'enzyme';
import { ControlLabel, FormControl } from 'react-bootstrap';
import FieldGroup from './FieldGroup';

describe('Component <FieldGroup />', () => {
  const wrapper = shallow(<FieldGroup label="label" type="text" value="value" />);

  it('render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render ControlLabel', () => {
    expect(wrapper.find(ControlLabel).length === 1).toEqual(true);
  });

  it('should render FormControl', () => {
    expect(wrapper.find(FormControl).length === 1).toEqual(true);
  });
});
