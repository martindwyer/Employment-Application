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
 * Current File:  functions.js
 * Purpose:       Implements UI functionality using environment.js and validation.js
 *
 */

/*
 *  makeTabs(selectionString) facilitates making tabs for
 *  each application section
 */
const makeTabs = (selectionString) => {
  $(selectionString).tabs();
};

/*
 * makeTabsVisible(tabNumber) streamlines making only one
 * selected tabNumber viewable at a time
 */
const makeTabVisible = (tabNumber) => {
  let tabNumbers = [0, 1, 2, 3, 4];
  let disabledTabs = [];
  for (let num of tabNumbers) {
    if (num != tabNumber) {
      disabledTabs.push(num);
    }
  }
  $("#tabs").tabs("option", "disabled", disabledTabs);
  $("#tabs").tabs("option", "active", tabNumber);
};

/**
 * setUpDatepickers utilizes the environment variable datepickers
 * which provides the Id's and parameters for each of the application
 * datepicker objects
 */

const setUpDatepickers = () => {
  let datepickerKeys = Object.keys(datepickers);
  for (key of datepickerKeys) {
    $(key).datepicker({
      changeMonth: true,
      changeYear: true,
      yearRange: datepickers[key].dateRange,
      minDate: datepickers[key].minDatePickable,
      maxDate: datepickers[key].maxDatePickable,
    });
  }
};

/**
 * enableBackButtons utilizes the environment variable formGuide
 * to streamline the setup for users to go back and edit the previous
 * section - or in the case of the final page go back and edit
 * the application from the beginning
 */
const enableBackButtons = () => {
  for (form in formGuide) {
    if (form == "#final-form") {
      let selectionString = form + " .back-button";
      $(selectionString).click(() => {
        makeTabVisible(0);
      });
    } else {
      let selectionString = form + " .back-button";
      let previousTab = formGuide[form] - 1;
      $(selectionString).click(() => {
        makeTabVisible(previousTab);
      });
    }
  }
};

/**
 * submitForm streamlines form submission for each of the tab forms
 * @param {*} selectionString | identifies the form submitted
 * @param {*} evt | the full event of the form submission
 * applicationData | the environment variable capturing the application
 */
const submitForm = (selectionString, evt) => {
  evt.preventDefault();
  if ($(selectionString).valid()) {
    for (element of evt.target) {
      applicationData[element.name] = element.value;
    }
    console.log("form submitted", applicationData);
    let nextTab = formGuide[selectionString] + 1;
    makeTabVisible(nextTab);
    if ($("#tabs-5").attr("aria-hidden") == "false") {
      displayApplication();
    }
  } else {
    console.log("form not valid");
  }
};

/**
 * personalSetup initializes the submit process for the
 * personal portion of the application
 */
const personalSetup = () => {
  $("#personal-data-form").submit((evt) => {
    submitForm("#personal-data-form", evt);
  });
};

/**
 * getSchool facilitates the display of a second or third school
 * @param {*} schoolNumber | either 2 or 3
 */
const getSchool = (schoolNumber) => {
  if (schoolNumber == 2) {
    $("#school-number-2").css("display", "block");
    $("#get-school-2").css("display", "none");
    $("#remove-school-2").css("display", "block");
    numSchools += 1;
  } else if (schoolNumber == 3) {
    $("#school-number-3").css("display", "block");
    $("#get-school-3").css("display", "none");
    $("#remove-school-2").css("display", "none");
    $("#remove-school-3").css("display", "block");

    numSchools += 1;
  } else {
    console.error("unrecognized school number");
  }
};

/**
 * removeSchool facilitates the removal of a second or third school
 * @param {} schoolNumber
 */
const removeSchool = (schoolNumber) => {
  if (schoolNumber == 3) {
    $("#school-number-3").css("display", "none");
    $("#get-school-3").css("display", "block");
    $("#remove-school-3").css("display", "none");
    $("#remove-school-2").css("display", "block");
    numSchools -= 1;
  } else if (schoolNumber == 2) {
    $("#school-number-2").css("display", "none");
    $("#get-school-2").css("display", "block");
    $("#remove-school-2").css("display", "none");
    numSchools -= 1;
  } else {
    console.error("unrecognized school number");
  }
};

/**
 * schoolSetup is an encapsulated approach to setting up the
 * education section of the application
 */
const schoolSetup = () => {
  // facilitating the adding and removing of schools as needed
  $("#get-school-2").click(() => {
    getSchool(2);
  });

  $("#get-school-3").click(() => {
    getSchool(3);
  });

  $("#remove-school-3").click(() => {
    removeSchool(3);
  });

  $("#remove-school-2").click(() => {
    removeSchool(2);
  });

  // discerning whether or not the education section needs completed
  $("#ed-yes").click(() => {
    $("#schools").css("display", "block");
  });

  $("#ed-no").click(() => {
    $("#schools").css("display", "none");
  });

  // the unique submission protocol for the education data form
  $("#education-data-form").submit(function (evt) {
    evt.preventDefault();

    let hasEducation = document.getElementById("ed-yes").checked;

    if (hasEducation) {
      submitForm("#education-data-form", evt);
    } else {
      makeTabVisible(2);
    }
  });
};

/**
 * setUpMilitary facilitates the functionality necessary for the
 * military section of the application
 */
const setUpMilitary = () => {
  // display military form only if candidate has military background
  $("#military-yes").click(function () {
    $("#military-form").css("display", "block");
    $("#military-start").addClass("required");
    $("#discharge-status").addClass("required");
  });

  $("#military-no").click(function () {
    $("#military-form").css("display", "none");
    $("#military-start").removeClass("required");
    $("#discharge-status").removeClass("required");
  });

  // display discharge comments only if discharge was other than honorable
  $("#discharge-status").change(function () {
    if ($(this).val() == "Other") {
      $("#discharge-comments").css("display", "block");
      $("#discharge-details").addClass("required");
    } else {
      $("#discharge-comments").css("display", "none");
      $("#discharge-details").removeClass("required");
    }
  });
};

/**
 * getEmployer facilitates the viewing of a second or third employer
 * @param {*} employerNumber | either 2 or 3
 */
const getEmployer = (employerNumber) => {
  if (employerNumber == 2) {
    $("#employer-number-2").css("display", "block");
    $("#get-employer-2").css("display", "none");
    $("#remove-employer-2").css("display", "block");
    numEmployers += 1;
  } else if (employerNumber == 3) {
    $("#employer-number-3").css("display", "block");
    $("#get-employer-3").css("display", "none");
    $("#remove-employer-2").css("display", "none");
    $("#remove-employer-3").css("display", "block");

    numEmployers += 1;
  } else {
    console.error("unrecognized employer number");
  }
};

/**
 * removeEmployer facilitates the removing of second or third employer
 * @param {*} employerNumber | either 2 or 3
 */
const removeEmployer = (employerNumber) => {
  if (employerNumber == 2) {
    $("#employer-number-2").css("display", "none");
    $("#get-employer-2").css("display", "block");
    $("#remove-employer-2").css("display", "none");
    numEmployers -= 1;
  } else if (employerNumber == 3) {
    $("#employer-number-3").css("display", "none");
    $("#get-employer-3").css("display", "block");
    $("#remove-employer-3").css("display", "none");
    $("#remove-employer-2").css("display", "block");
    numEmployers -= 1;
  } else {
    console.error("unrecognized employer number");
  }
};

/**
 * experienceSetup is an encapsulated approach to setting up the
 * experience section of the application
 */
const experienceSetup = () => {
  // setting up the military section
  setUpMilitary();

  // discerning whether or not the experience section is required
  $("#ex-no").click();

  $("#ex-no").click(function () {
    $("#employers").css("display", "block");
  });

  $("#ex-yes").click(function () {
    $("#employers").css("display", "none");
  });

  // Facilitating the addition of up to three employers
  $("#get-employer-2").click(function () {
    getEmployer(2);
  });

  $("#remove-employer-2").click(function () {
    removeEmployer(2);
  });

  $("#get-employer-3").click(function () {
    getEmployer(3);
  });

  $("#remove-employer-3").click(function () {
    removeEmployer(3);
  });

  // The unique submission protocol for the experience data form
  $("#experience-data-form").submit(function (evt) {
    evt.preventDefault();

    let hasExperience = document.getElementById("ex-no").checked;

    if (hasExperience) {
      if ($("#experience-data-form").valid()) {
        submitForm("#experience-data-form", evt);
        console.log("experience form submitted", applicationData);
        makeTabVisible(3);
      } else {
        console.log("education form not valid");
      }
    } else {
      makeTabVisible(3);
    }
  });
};

/**
 * displayApplication utilizes the environment variables applicationData,
 * and labelGuide to iteratively print the application as rows in a table
 * on the final application tab.  The table Id is #application-content
 */
const displayApplication = () => {
  let applicationDisplay = document.querySelector("#application-content");

  let appKeys = Object.keys(labelGuide);

  applicationDisplay.innerHTML = "";

  for (let key of appKeys) {
    if (applicationData[key] && labelGuide[key]) {
      let item = labelGuide[key];
      let itemLabel = item["label"];

      applicationDisplay.innerHTML += "<tr><td>" + itemLabel + "</td><td>" + applicationData[key] + "</td></tr>";
    }
  }
};

/**
 * With no required input from the applicant, the footprint set up is
 * fairly straightforward
 */
const footprintSetup = () => {
  $("#footprint-data-form").submit(function (evt) {
    evt.preventDefault();
    submitForm("#footprint-data-form", evt);
  });
};

/**
 * finishSetup sets up the activity in the final applicaiton tab
 */
const finishSetup = () => {
  // Felony explanation is displayed and required only if applicant indicates
  // they have committed a felony
  $("select[name='felony']").change(function () {
    if ($(this).val() == "yes") {
      $("#criminal_explanation").css("display", "block");
      $("#criminal_explanation").addClass("required");
    } else {
      $("#criminal_explanation").css("display", "none");
      $("#criminal_explanation").removeClass("required");
    }
  });

  // unique submission protocol for final form
  $("#final-form").submit(function (evt) {
    evt.preventDefault();

    if ($("#final-form").valid()) {
      submitForm("#final-form", evt);
      console.log("final form submitted", applicationData);
      applicationData = {};
      window.location = "https://mdbytes.com";
    } else {
      console.log("education form not valid");
    }
  });
};
