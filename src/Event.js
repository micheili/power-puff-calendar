import React from 'react';

export default function Event(props) {

  let { title, description, start, stop } = props;
  
  return (
    <div className="col-12 lg-6">
      <h4>{title}</h4>
      <h5>{description}</h5>
      <p>
        börjar: {start + ' '} 
        slutar: {stop}
      </p>
    </div>
  )


}