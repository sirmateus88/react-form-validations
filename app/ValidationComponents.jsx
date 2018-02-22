import React, { Component } from 'react';
import store from './ValidationsStore';

export class ValidationItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      validations: [],
      componentState: '',
      shouldValidate: false
    }
    this.validate = this.validate.bind(this);
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => {
      let state = store.getState()
      let validations = state.validations.filter(validationObj => validationObj.name === this.props.name)

      let stateofComponent = state.formStatus.filter(statusObj => statusObj.name === this.props.name);
      let componentState = stateofComponent.length ? stateofComponent[0].status : '';

      let shouldValidate = state.stateChanged.filter(name => name === this.props.name).length ? true : false;

      this.setState({validations, componentState, shouldValidate});
    })
  }

  componentWillUnmount(){
      this.unsubscribe();
  }

  validate(){
    let errorMessages = [];
    if(!this.state.shouldValidate) return [];
    if(this.state.validations.length){
      this.state.validations.forEach(validation => {
        if(!validation.expression(this.state.componentState)) errorMessages.push(validation.message);
      })
    }
    return errorMessages;
  }

  render(){
    return (
      <div className="validations">
        {this.validate().map((error, idx) => {return <ValidationForm key={idx} message={error} />})}
      </div>
    )
  }
}

export class ValidationButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true
    }
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => {
      let state = store.getState()
      let errors = state.errors;
      let disabled = false;
      errors.forEach(item => {
        if (item.errors.length) disabled = true;
      })

      this.setState({disabled});
    })
  }

  componentWillUnmount(){
      this.unsubscribe();
  }


  render(){
    return (
      <button
        type="submit"
        disabled={this.state.disabled}
      >
          {this.props.name}
      </button>
    )
  }
}


export default function ValidationForm(props){
  return (
    <div className="validationError">
        {props.message}
    </div>
  )
}
