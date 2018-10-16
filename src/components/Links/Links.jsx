import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Links = () => (
  <div>
    <Link to="/">
      <Button bsStyle="link">Сетка</Button>
    </Link>
    <Link to="/departments">
      <Button bsStyle="link">Отделы</Button>
    </Link>
    <Link to="/employees">
      <Button bsStyle="link">Сотрудники</Button>
    </Link>
  </div>
);

export default Links;
