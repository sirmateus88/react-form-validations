import React from 'react';


export default function ValidationForm(props){
  return (
    <div className="validationError">
        {props.message}
    </div>
  )
}
