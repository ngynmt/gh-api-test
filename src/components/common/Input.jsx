import React from 'react';

const Input = ({ id, type, containerClass, labelClass, inputClass, placeHolder, containerStyle, labelStyle, inputStyle, onChange, labelTxt, onFocus, defaultValue, onSubmit }) => (
  <div className={containerClass} style={containerStyle}>
    <label
      htmlFor={id}
      className={`common-label ${labelClass}`}
      style={labelStyle}
    >
      {labelTxt || null}
      <form onSubmit={onSubmit ? e => onSubmit(e) : e => e.preventDefault()}>
        <input
          id={id}
          type={type || 'text'}
          className={`common-input ${inputClass}`}
          style={inputStyle}
          placeholder={placeHolder || 'Type something'}
          onChange={onChange}
          defaultValue={defaultValue || null}
          onFocus={onFocus}
          autoComplete="off"
        />
      </form>
    </label>
  </div>
);

export default Input;
