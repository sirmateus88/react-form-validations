import React from 'react';


export default function ValidationForm(props){
  console.log('validation form props:', props);
  return (
    <div className="validationError">
        {props.message}
    </div>
  )
}
