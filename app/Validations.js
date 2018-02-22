import ValidationForm from './ValidationForm';
import store, {updateStatus, addValidation, clearValidation, clearErrors, gotErrors} from './ValidationsStore';
import testValidator from 'validator';
import React, { Component } from 'react';
import {ValidationButton, ValidationItems} from './ValidationComponents';

export default function Validations(){
}

function ValidationObject (name, expression, message){
  this.name = name;
  this.expression = expression;
  this.message = message;
}

Validations.prototype.createValidation = function(name, expressions, message){
  let validateExpression = testValidator.hasOwnProperty(expressions) ? testValidator[expressions] : expressions;
  if (typeof validateExpression === 'string'){
    console.error(`WARNING: The validator "${expressions}" on "${name}" is not a supported validator function. Please reference npm validator documentation for supported validation functions, or write your own validation function that accepts input from a form and returns a boolean!`);
    validateExpression = () => true;
  }

  if (typeof validateExpression !== 'function'){
    console.error(`WARNING: The validator "${expressions}" on "${name}" is not a function. Please check your code to ensure you are passing either a function or a string that matches a supported validator function.`);
    validateExpression = () => true;
  }

  store.dispatch(addValidation(new ValidationObject(name, validateExpression, message)))
}

Validations.prototype.onChangeStatus = function(name, status){
  store.dispatch(updateStatus(name, status))
  this.validate(name, status);
}

Validations.prototype.validate = function(name, status){
  let errorMessages = [];
  store.dispatch(clearErrors(name));
  let state = store.getState();
  let validations = state.validations.filter(validationObj => validationObj.name === name);
  if(!state.stateChanged.filter(elem => elem === name)) return [];
  if(validations.length){
    validations.forEach(validation => {
      if(!validation.expression(status)) errorMessages.push(validation.message);
    })
  }
  if (errorMessages.length) store.dispatch(gotErrors(name, errorMessages))
  return errorMessages;
}

Validations.prototype.clearStatus = function() {
  store.dispatch(clearValidation());
}

const notBlankValidation = function(item){
  return item.length;
}

testValidator.notBlank = notBlankValidation;

// export class ValidationItems extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       validations: [],
//       componentState: '',
//       shouldValidate: false
//     }
//     this.validate = this.validate.bind(this);
//   }

//   componentDidMount(){
//     this.unsubscribe = store.subscribe(() => {
//       let state = store.getState()
//       let validations = state.validations.filter(validationObj => validationObj.name === this.props.name)

//       let stateofComponent = state.formStatus.filter(statusObj => statusObj.name === this.props.name);
//       let componentState = stateofComponent.length ? stateofComponent[0].status : '';

//       let shouldValidate = !!state.stateChanged.filter(name => name === this.props.name).length;

//       this.setState({validations, componentState, shouldValidate});
//     })
//   }

//   componentWillUnmount(){
//       this.unsubscribe();
//   }

//   validate(){
//     let errorMessages = [];
//     if(!this.state.shouldValidate) return [];
//     if(this.state.validations.length){
//       this.state.validations.forEach(validation => {
//         if(!validation.expression(this.state.componentState)) errorMessages.push(validation.message);
//       })
//     }
//     return errorMessages;
//   }

//   render(){
//     return (
//       <div className="validations">
//         {this.validate().map((error, idx) => {return <ValidationForm key={idx} message={error} />})}
//       </div>
//     )
//   }
// }

// export class ValidationButton extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       disabled: true
//     }
//   }

//   componentDidMount(){
//     this.unsubscribe = store.subscribe(() => {
//       let state = store.getState()
//       let errors = state.errors;
//       let disabled = false;
//       errors.forEach(item => {
//         if (item.errors.length) disabled = true;
//       })

//       this.setState({disabled});
//     })
//   }

//   componentWillUnmount(){
//       this.unsubscribe();
//   }


//   render(){
//     return (
//       <button
//         type="submit"
//         disabled={this.state.disabled}
//       >
//           {this.props.name}
//       </button>
//     )
//   }
// }
