import React from 'react';
import { Button } from 'semantic-ui-react';

const PrimaryButton = ({ className, style, onClick, txt, loading, type, disabled }) => (
  <Button
    type={type || 'submit'}
    className={`primary-button  ${loading ? 'loading' : ''} ${disabled ? 'disabled' : ''} ${className}`}
    style={style}
    onClick={onClick}
  >
    {txt}
  </Button>
);

export default PrimaryButton;
