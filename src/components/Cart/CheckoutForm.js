import { useState } from 'react';

import classes from './CheckoutForm.module.css';

const isEmpty = (input) => input.trim() === '';
const isNotPostal = (postal) => postal.trim().length !== 5;

const CheckoutForm = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [postal, setPostal] = useState('');
  const [city, setCity] = useState('');

  const onChangeNameHandler = (event) => {
    setName(event.target.value);
  };

  const onChangeStreetHandler = (event) => {
    setStreet(event.target.value);
  };

  const onChangePostalHandler = (event) => {
    setPostal(event.target.value);
  };

  const onChangeCityHandler = (event) => {
    setCity(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const enteredNameIsValid = !isEmpty(name);
    const enteredSetreetIsValid = !isEmpty(street);
    const enteredPostalIsValid = !isNotPostal(postal);
    const enteredCityIsValid = !isEmpty(city);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredSetreetIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid,
    });

    // setName('');
    // setStreet('');
    // setPostal('');
    // setCity('');

    const formIsValid =
      enteredNameIsValid &&
      enteredSetreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
      console.log('form not valid');
      return;
    }

    props.onConfirm({
      name,
      street,
      postal,
      city,
    });

    console.log(name, street, postal, city);
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? '' : classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? '' : classes.invalid
  }`;

  const postalControlClasses = `${classes.control} ${
    formInputsValidity.postal ? '' : classes.invalid
  }`;

  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onChangeNameHandler}
        />
        {!formInputsValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={street}
          onChange={onChangeStreetHandler}
        />
        {!formInputsValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postal}
          onChange={onChangePostalHandler}
        />
        {!formInputsValidity.postal && <p>Please enter a valid postal</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={onChangeCityHandler}
        />
        {!formInputsValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button
          className={classes.submit}
          type="button"
          onClick={props.onCancel}
        >
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
