import React from 'react';

export default function EventList(props) {
  let [{title}] = props;

  return (
    
    <div>
      <li>p{title}</li>
    </div>
  );
}