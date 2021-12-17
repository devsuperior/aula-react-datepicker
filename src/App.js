import React, { useState } from "react";
import DatePicker from "react-datepicker"; 
import "./index.css";
import "react-datepicker/dist/react-datepicker.css"

export default function App() {
  
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [selectedDate, setselectedDate] = useState(null);

  const handleFirstNameInputChange = (event) => {
    setValues({...values, firstName: event.target.value})
  }

  const handleLastNameInputChange = (event) => {
    setValues({...values, lastName: event.target.value})
  }

  const handleEmailInputChange = (event) => {
    setValues({...values, email: event.target.value})
  }

  const dateFormatAux = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;
    
    return [year, month, day].join('-');
  }

  const dateFormat = (date) => {

    console.log(new Date(date));

    let formatYearMonthDay = dateFormatAux(date);
    //console.log(formatYearMonthDay);

    let formatISO8601 = new Date(date).toISOString();
    //console.log(formatISO8601);

    return [formatYearMonthDay, formatISO8601];
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let birthDateYMD, birthDateISO8601;

    if (selectedDate != null)
      [birthDateYMD, birthDateISO8601] = dateFormat(selectedDate);

    if(values.firstName && values.lastName && values.email)
      setValid(true)
    setSubmitted(true);

    let formData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      birthDate: selectedDate,
      birthDateFmtYMD: birthDateYMD,
      birthDateFmtISO8601: birthDateISO8601,
    };

    console.log(formData);
  }

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        {submitted && valid ? <div className="success-message">Success! Thank you for registering</div> : null }
        <input
          onChange={handleFirstNameInputChange}
          value={values.firstName}
          id="first-name"
          className="form-field"
          type="text"
          placeholder="First Name"
          name="firstName"
        />
        { submitted && !values.firstName ? <span id="first-name-error">Please enter a first name</span> : null}
        <input
          onChange={handleLastNameInputChange}
          value={values.lastName}
          id="last-name"
          className="form-field"
          type="text"
          placeholder="Last Name"
          name="lastName"
        />
        { submitted && !values.lastName ? <span id="last-name-error">Please enter a last name</span> : null}
        <input
          onChange={handleEmailInputChange}
          value={values.email}
          id="email"
          className="form-field"
          type="text"
          placeholder="Email"
          name="email"
        />
        { submitted && !values.email ? <span id="email-error">Please enter an email address</span> : null }
        <DatePicker 
          selected={selectedDate} 
          onChange={date => setselectedDate(date)}
          showTimeSelect
          dateFormat="dd/MM/yyyy"
          className="form-field"
          id="birthDate"
          minDate={new Date()}
        />
        <button className="form-field" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
