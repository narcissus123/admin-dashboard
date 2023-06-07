import React from "react";
export const UseValidation = (value) => {
  let obj = {
    val: value,
    error: false,
    errorMessage: "",
    stringType: function (message = "Not a valid input.") {
      if (typeof this.val !== "string") {
        this.error = true;
        this.errorMessage = message;
      }

      return this;
    },
    min: function (minLength, message = "Not a valid input.") {
      if (typeof this.val === "number") this.val.toString();
      if (this.val.length < minLength) {
        this.error = true;
        this.errorMessage = message;
      }

      return this;
    },
    max: function (maxLength, message = "Not a valid input.") {
      if (typeof this.val === "number") this.val.toString();

      if (this.val.length > maxLength) {
        this.error = true;
        this.errorMessage = message;
      }

      return this;
    },
    number: function (message = "Not a valid input.") {
      if (isNaN(this.val)) {
        this.error = true;
        this.errorMessage = message;
        return this;
      }

      return this;
    },
    dateType: function (message = "Not a valid input.") {
      // A number representing the timestamp, in milliseconds, of this date. Returns NaN if the date is invalid.
      if (isNaN(this.val.getTime())) {
        this.error = true;
        this.errorMessage = message;
        return this;
      }

      return this;
    },
    emailType: function (
      message = "Not a valid input.",
      pattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*$"
    ) {
      const regex = new RegExp(pattern);

      if (!regex.test(this.val)) {
        this.error = true;
        this.errorMessage = message;
      }

      return this;
    },
    match: function (pattern, message = "Not a valid input.") {
      const regex = new RegExp(pattern);

      if (!regex.test(this.val)) {
        this.error = true;
        this.errorMessage = message;
      }

      return this;
    },
    getError: function () {
      return this.error;
    },
    getErrorMessage: function () {
      return this.errorMessage;
    },
  };

  return [obj];
};

export const validation = () => {
  let obj = {
    val: "",
    error: false,
    field: "title",
    errorMessage: "",
    setValue: function (value) {
      this.val = value;
      return this;
    },
    stringType: function (message = "Not a valid input.") {
      if (this.val === null) {
        this.error = true;
        this.errorMessage = "You cannot leave the field empty.";
        return this;
      }
      if (typeof this.val !== "string") {
        this.error = true;
        this.errorMessage = message;
      }

      return this;
    },
    minLength: function (minLen, message = "Not a valid input.") {
      if (this.val === null) {
        this.error = true;
        this.errorMessage = "You cannot leave the field empty.";
        return this;
      }

      if (typeof this.val === "number" && this.val.toString().length < minLen) {
        this.error = true;
        this.errorMessage = message;
      }

      if (typeof this.val === "string" && this.val.length < minLen) {
        this.error = true;
        this.errorMessage = message;
      }

      return this;
    },
    maxLength: function (miaxLen, message = "Not a valid input.") {
      if (this.val === null) {
        this.error = true;
        this.errorMessage = "You cannot leave the field empty.";
        return this;
      }

      if (
        typeof this.val === "number" &&
        this.val.toString().length > miaxLen
      ) {
        this.error = true;
        this.errorMessage = message;
      }

      if (typeof this.val === "string" && this.val.length > miaxLen) {
        this.error = true;
        this.errorMessage = message;
      }

      return this;
    },
    min: function (min, message = "Not a valid input.") {
      if (this.val === null) {
        this.error = true;
        this.errorMessage = "You cannot leave the field empty.";
        return this;
      }

      if (typeof this.val === "number" && this.val < min) {
        this.error = true;
        this.errorMessage = message;
      }

      return this;
    },
    max: function (max, message = "Not a valid input.") {
      if (this.val === null) {
        this.error = true;
        this.errorMessage = "You cannot leave the field empty.";
        return this;
      }

      if (typeof this.val === "number" && this.val > max) {
        this.error = true;
        this.errorMessage = message;
      }

      return this;
    },
    number: function (message = "Not a valid input.") {
      if (this.val === null) {
        this.error = true;
        this.errorMessage = "You cannot leave the field empty.";
        return this;
      }

      if (isNaN(this.val)) {
        this.error = true;
        this.errorMessage = message;
      }

      return this;
    },
    dateType: function (message = "Not a valid input.") {
      // A number representing the timestamp, in milliseconds, of this date. Returns NaN if the date is invalid.
      if (this.val === null) {
        this.error = true;
        this.errorMessage = "You cannot leave the field empty.";
        return this;
      }

      if (isNaN(this.val.getTime())) {
        this.error = true;
        this.errorMessage = message;
        return this;
      }

      return this;
    },
    emailType: function (
      message = "Not a valid input.",
      pattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*$"
    ) {
      if (this.val === null) {
        this.error = true;
        this.errorMessage = "You cannot leave the field empty.";
        return this;
      }

      const regex = new RegExp(pattern);

      if (!regex.test(this.val)) {
        this.error = true;
        this.errorMessage = message;
      }

      return this;
    },
    match: function (pattern, message = "Not a valid input.") {
      if (this.val === null) {
        this.error = true;
        this.errorMessage = "You cannot leave the field empty.";
        return this;
      }

      const regex = new RegExp(pattern);

      if (!regex.test(this.val)) {
        this.error = true;
        this.errorMessage = message;
      }

      return this;
    },
    getError: function () {
      return this.error;
    },
    getErrorMessage: function () {
      return this.errorMessage;
    },
  };

  return obj;
};
