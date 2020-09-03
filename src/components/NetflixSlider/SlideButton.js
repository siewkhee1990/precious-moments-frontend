import React from 'react';
import IconArrowDown from './Icons/IconArrowDown'
import './SliderButton.css'

const SlideButton = ({ onClick, type }) => (
  <button className={`slide-button slide-button--${type}`} onClick={onClick}>
    <span>
      <IconArrowDown />
    </span>
  </button>
);

export default SlideButton;