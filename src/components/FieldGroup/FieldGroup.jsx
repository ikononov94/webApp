import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const FieldGroup = ({ label, ...props }) => (
  <FormGroup>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} />
  </FormGroup>
);

export default FieldGroup;
