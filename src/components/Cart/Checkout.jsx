import styles from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim().length === 0;

const Checkout = ({ onCancel, onConfirm }) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postcode: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postcodeRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPostcode = postcodeRef.current.value;
    const enteredCity = cityRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostcodeIsValid = !isEmpty(enteredPostcode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postcode: enteredPostcodeIsValid,
    });

    const isFormValid =
      enteredName && enteredStreet && enteredCity && enteredPostcode;

    if (!isFormValid) {
      return;
    }

    onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postcode: enteredPostcode,
    });
  };

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div
        className={`${styles.control} ${
          formInputValidity.name ? "" : styles.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input ref={nameRef} type="text" id="name" />
        {!formInputValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div
        className={`${styles.control} ${
          formInputValidity.street ? "" : styles.invalid
        }`}
      >
        <label htmlFor="street">Your Street</label>
        <input ref={streetRef} type="text" id="street" />
        {!formInputValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div
        className={`${styles.control} ${
          formInputValidity.postcode ? "" : styles.invalid
        }`}
      >
        <label htmlFor="postcode">Your Postcode</label>
        <input ref={postcodeRef} type="text" id="postcode" />
        {!formInputValidity.postcode && <p>Please enter a valid postcode</p>}
      </div>
      <div
        className={`${styles.control} ${
          formInputValidity.city ? "" : styles.invalid
        }`}
      >
        <label htmlFor="city">Your city</label>
        <input ref={cityRef} type="text" id="city" />
        {!formInputValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={styles.actions}>
        <button type={"button"} onClick={onCancel}>
          Cancel
        </button>
        <button>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
