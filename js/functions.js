const makeTabs = (selectionString) => {
  $(selectionString).tabs();
};

const makeTabVisible = (tabNumber) => {
  tabNumbers = [0, 1, 2, 3, 4];
  disabledTabs = [];
  for (let num of tabNumbers) {
    if (num != tabNumber) {
      disabledTabs.push(num);
    }
  }
  $("#tabs").tabs("option", "disabled", disabledTabs);
  $("#tabs").tabs("option", "active", tabNumber);
};

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

const enableBackButtons = () => {
  for (form in formGuide) {
    let selectionString = form + " .back-button";
    let previousTab = formGuide[form] - 1;
    $(selectionString).click(() => {
      makeTabVisible(previousTab);
    });
  }
};

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

const personalSetup = () => {
  $("#personal-data-form").submit((evt) => {
    submitForm("#personal-data-form", evt);
  });
};

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

const schoolSetup = () => {
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

  $("#ed-yes").click(() => {
    $("#schools").css("display", "block");
  });

  $("#ed-no").click(() => {
    $("#schools").css("display", "none");
  });

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

const setUpMilitary = () => {
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

const experienceSetup = () => {
  setUpMilitary();

  $("#ex-no").click();

  $("#ex-no").click(function () {
    $("#employers").css("display", "block");
  });

  $("#ex-yes").click(function () {
    $("#employers").css("display", "none");
  });

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

const footprintSetup = () => {
  $("#footprint-data-form").submit(function (evt) {
    evt.preventDefault();
    submitForm("#footprint-data-form", evt);
  });
};

$("#tabs-5").change(function () {});
