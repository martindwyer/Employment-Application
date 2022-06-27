/**
 * After loading jQuery, jQuery-ui, jQuery-validate, and Bootstrap, the
 * JavaScript for the application is loaded in five separate files,
 * which appear below in the order in which they are loaded:
 *
 * environment.js  | provides constants and variables used by the application
 * validation.js   | provides validation rules, messages, and error placement
 *                   for each of the five forms comprising the application
 * functions.js    | implements UI functionality such as datepickers and event
 *                   listeners for areas such as military experience or criminal
 *                   background - utilizes both environment.js and validation.js
 * site.js         | serves as the top level in the hierarchy, initiating the
 *                   functions in functions.js
 *
 * Current File:  validation.js
 * Purpose:       Provide the validation parameters for application forms
 *
 */

/**
 * Validation rules, messages, and error placement for the personal data form
 */
$("#personal-data-form").validate({
  rules: {
    legalName: "required",
    streetAddress: "required",
    cityAddress: "required",
    stateAddress: "required",
    zipAddress: "required",
    socialSecurityNumber: "required",
    birthday: {
      required: true,
      date: true,
    },
    emailAddress: {
      required: true,
      email: true,
    },
    primaryPhone: "required",
    startDate: {
      required: true,
      date: true,
    },
  }, // end of rules
  messages: {
    legalName: {
      required: "Legal name required",
    },
    streetAddress: {
      required: "Street address required",
    },
    cityAddress: {
      required: "City address required",
    },
    stateAddress: {
      required: "State address required",
    },
    postalCode: {
      required: "Post code required",
    },
    socialSecurityNumber: {
      required: "Social security number required",
    },
    birthday: {
      required: "Required",
      date: "Invalid date.",
    },
    startDate: {
      required: "Required",
      date: "Invalid date.",
    },
    emailAddress: {
      required: "Valid email address required",
      email: "Invalid email",
    },
    primaryPhone: {
      required: "Phone number required",
    },
  },
  errorPlacement: function (error, element) {
    if (element.val() || element.hasClass("hasPlaceholder") || element.hasClass("hasDatepicker")) {
      error.insertAfter(element);
      console.dir(element.next());
    } else {
      element.attr("placeholder", error.text());
      element.addClass("input-error-border");
      console.log(element.attr("placeholder"));
    }
  },
});

/**
 * Validation rules, messages, and error placement for the education data form
 */
$("#education-data-form").validate({
  rules: {
    educationNumberOne: "required",
    educationNumberOneCity: "required",
    educationNumberOneDegree: "required",
    educationNumberOneStatus: "required",
    educationNumberOneMajor: "required",
    educationNumberOneDate: {
      required: true,
      date: true,
    },
  }, // end of rules

  messages: {
    educationNumberOneDate: {
      required: "Required",
      date: "Invalid date.",
    },
  },
  errorPlacement: function (error, element) {
    if (
      element.val() ||
      element.hasClass("hasPlaceholder") ||
      element.hasClass("hasDatepicker") ||
      element.hasClass("edStatus")
    ) {
      error.insertAfter(element);
    } else {
      element.attr("placeholder", error.text());
      element.addClass("input-error-border");
    }
  },
});

/**
 * Validation rules, messages, and error placement for the experience data form
 */
$("#experience-data-form").validate({
  rules: {
    hasMilitary: "required",
    hasExperience: "required",
    employerNumberOne: "required",
    employerOneTitle: "required",
    employerOneStart: {
      required: true,
      date: true,
    },
    employerOneCity: "required",
    employerOneState: "required",
  }, // end of rules
  messages: {},
  errorPlacement: function (error, element) {
    if (
      element.val() ||
      element.hasClass("hasPlaceholder") ||
      element.hasClass("hasDatepicker") ||
      element.hasClass("dischargeComments")
    ) {
      error.insertAfter(element);
      $("label.error").addClass("col-md-3");
    } else {
      element.attr("placeholder", error.text());
      element.addClass("input-error-border");
    }
  },
});

/**
 * Validation rules, messages, and error placement for the footprint data form
 */
$("#footprint-data-form").validate({
  rules: {}, // end of rules

  messages: {},
  errorPlacement: function (error, element) {
    if (element.val() || element.hasClass("hasPlaceholder") || element.hasClass("hasDatepicker")) {
      error.insertAfter(element);
    } else {
      element.attr("placeholder", error.text());
      element.addClass("input-error-border");
    }
  },
});

/**
 * Validation rules, messages, and error placement for the final form
 */
$("#final-form").validate({
  rules: {
    felony: "required",
    signature: "required",
  }, // end of rules
  messages: {
    felony: "This field is required",
    signature: "Required",
  },
  errorPlacement: function (error, element) {
    if (
      element.val() ||
      element.hasClass("hasPlaceholder") ||
      element.hasClass("hasDatepicker") ||
      element.hasClass("dischargeComments") ||
      element.attr("name", "felony")
    ) {
      error.insertAfter(element);
      $("label.error").addClass("col-md-3");
    } else {
      element.attr("placeholder", error.text());
      element.addClass("input-error-border");
    }
  },
});
