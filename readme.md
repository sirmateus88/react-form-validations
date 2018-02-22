# react-form-validations
Library of javascript methods and react components that make setting up real time form validations a breeze.

## TL:DR
This libarary allows you to add real time validation to your react forms with some quick boilerplate, simple rules setup, and some helpful components to display errors. _It comes with:_
- A validations constructor with many helpful methods
- An error displaying react component
- A button that is disabled if you have any validation errors displayed


## Boilerplate and Setup
### Basic Code Sample
```javascript
import Validate, {ValidationItems, ValidationButton} from 'react-real-time-form-validation';
const formValidation = new Validate();


export default class AddForm extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this);
  }

  onChange(event){
    formValidation.onChangeStatus(event.target.name, event.target.value);
  }

  componentDidMount(){
    formValidation.createValidation('name', 'notBlank', 'Name cannot be blank');
    formValidation.createValidation('gpa', (gpa) => gpa <= 4, 'Gpa must be less than or equal to 4');
    formValidation.createValidation('gpa', (gpa) => gpa >= 0, 'Gpa must be greater than or equal to 0');
  }

  componentWillUnmount(){
    formValidation.clearStatus();
  }

  render(){
    return (
      <form onSubmit={this.props.onSubmit} id={this.props.formType}>
        <div className="formItem">
          <legend>Student Name:</legend>
          <input
            name="name"
            type="text"
            className="form-like large-font"
            placeholder="Jon Doe"
            defaultValue={this.props.name}
            onChange={this.onChange}
          />
          <ValidationItems name="name" />
        </div>
        <div className="formItem">
          <legend>GPA:</legend>
          <input
            name="gpa"
            type="number"
            min="0" max="4" step="0.01"
            className="form-like large-font"
            placeholder="3.5"
            defaultValue={this.props.gpa}
            onChange={this.onChange}
          />
          <ValidationItems name="gpa"/>
        </div>
        <ValidationButton name="Ship it!" />
      </form>
    )
  }
}
```

### Boilerplate Explanation
First, npm install this library with `npm i react-real-time-form-validation`
Then require this module into your file and create a new instance of Validate with the following:
```javascript
import Validate, {ValidationItems, ValidationButton} from 'react-real-time-form-validation';
const formValidation = new Validate();
```
ValidationButton is not required, but does give you a button that is set to disabled if there are active validation errors.
Add the following items to both handle changes on the form and clear the form when you leave the component. Don't forget to bind your onChange function!
```javascript
onChange(event){
  formValidation.onChangeStatus(event.target.name, event.target.value);
}
componentWillUnmount(){
  formValidation.clearStatus();
}
```

### How To Setup
Once you have the boilerplate, start by setting up the validation rules in componentDidMount. You can do this using the __.createValidation(inputName, ruleFunction, message)__ method. `inputName` should match the name of the input item on the form. If your input doesn't have names, be sure to name them! ruleFunction is either a string matching a method on the excellent Validators npm module, or any function that takes input and returns a boolean. The message will be displayed by the ValidationItems component. Examples:
```javascript
componentDidMount(){
  formValidation.createValidation('name', 'notBlank', 'Name cannot be blank');
  formValidation.createValidation('gpa', (gpa) => gpa <= 4, 'Gpa must be less than or equal to 4');
  formValidation.createValidation('gpa', (gpa) => gpa >= 0, 'Gpa must be greater than or equal to 0');
}
```
Next, add our on change function to any form items we are validating like so:
```javascript
<input
  name="gpa"
  onChange={this.onChange}
/>
```
Lastly, add the __ValidationItem__ component whereever you'd like validation errors for a particular form item to show up. Be sure to pass each ValidationItem the name of the form item for which is it displaying errors!
```javascript
<ValidationItems name="gpa"/>
```
### What about the button?
You can use a normal submit button if you'd like, but if you want the button to disable when there are active validation errors, use the __<ValidationButton>__ component! Pass it a name to set the text on the button.
```javascript
<ValidationButton name="Ship it!" />
```
