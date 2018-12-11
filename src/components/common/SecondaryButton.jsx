import React from 'react';
import { Button } from 'semantic-ui-react';

const SecondaryButton = ({ className, style, onClick, txt, type, loading, disabled }) => (
  <Button
    type={type || 'submit'}
    className={`secondary-button ${loading ? 'loading' : ''} ${disabled ? 'disabled' : ''} ${className}`}
    style={style}
    onClick={onClick}
  >
    {txt}
  </Button>
);

export default SecondaryButton;
