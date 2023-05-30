import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Position from './position';
import BodyTemp from './bbt';
import Rotation from './rotation';
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

function ControlledCarousel(props) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

    return (
    <Carousel activeIndex={index} onSelect={handleSelect} controls={true} slide={false} indicators={false} keyboard={true} prevLabel={''} nextLabel={''}>
      <Carousel.Item>
        <Position data={props.data}/>
      </Carousel.Item>
      <Carousel.Item>
        <Rotation data={props.data}/>
      </Carousel.Item>
      <Carousel.Item>
        <BodyTemp data={props.data}/>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel