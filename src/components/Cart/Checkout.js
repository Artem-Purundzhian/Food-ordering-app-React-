import useInput from "../../hooks/use-input";

import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameisValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredStreet,
    isValid: enteredStreetisValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangedHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreetInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPostal,
    isValid: enteredPostalisValid,
    hasError: postalInputHasError,
    valueChangeHandler: postalChangedHandler,
    inputBlurHandler: postalBlurHandler,
    reset: resetPostalInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredCity,
    isValid: enteredCityisValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useInput((value) => value.trim() !== "");

  const confirmHandler = (event) => {
    event.preventDefault();
    if (
      enteredNameisValid &&
      enteredStreetisValid &&
      enteredPostalisValid &&
      enteredCityisValid
    ) {
      props.submitHandler({
        name: enteredName,
        street: enteredStreet,
        postal: enteredPostal,
        city: enteredCity,
      });

      resetNameInput();
      resetStreetInput();
      resetPostalInput();
      resetCityInput();
    }else{
        nameBlurHandler();
        streetBlurHandler();
        postalBlurHandler();
        cityBlurHandler();
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={` ${classes.control} ${
          nameInputHasError && classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div
        className={` ${classes.control} ${
          streetInputHasError && classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetChangedHandler}
          onBlur={streetBlurHandler}
        />
        {streetInputHasError && (
          <p className="error-text">Street must not be empty</p>
        )}
      </div>
      <div
        className={` ${classes.control} ${
          postalInputHasError && classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostal}
          onChange={postalChangedHandler}
          onBlur={postalBlurHandler}
        />
        {postalInputHasError && (
          <p className="error-text">Postal Code must not be empty</p>
        )}
      </div>
      <div
        className={` ${classes.control} ${
          cityInputHasError && classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityChangedHandler}
          onBlur={cityBlurHandler}
        />
        {cityInputHasError && (
          <p className="error-text">City must not be empty</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
