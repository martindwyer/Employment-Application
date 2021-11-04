let applicationData = {};
let numSchools = 1;
let numEmployers = 1;

let today = new Date();

let thisDay = today.getDate();
let thisMonth = today.getMonth() + 1;
let thisYear = today.getYear() - 100;
let minHireYear = thisYear - 16;
let dateString = thisMonth + "/" + thisDay + "/" + minHireYear;
let maxHireBirthday = new Date(dateString);

let thisObject = {};

const formGuide = {
  "#personal-data-form": 0,
  "#education-data-form": 1,
  "#experience-data-form": 2,
  "#footprint-data-form": 3,
  "#final-form": 4,
};

const datepickers = {
  "#datepicker-birthday": {
    dateRange: "-100:-0",
    maxDatePickable: maxHireBirthday,
    minDatePickable: "",
  },
  "#start-date": {
    dateRange: "-0:+1",
    maxDatePickable: "",
    minDatePickable: today,
  },
  "#education-1-date": {
    dateRange: "-100:+100",
    maxDatePickable: "",
    minDatePickable: "",
  },
  "#education-2-date": {
    dateRange: "-100:+100",
    maxDatePickable: "",
    minDatePickable: "",
  },
  "#education-3-date": {
    dateRange: "-100:+100",
    maxDatePickable: "",
    minDatePickable: "",
  },
  "#military-start": {
    dateRange: "-60:-0",
    maxDatePickable: new Date(),
    minDatePickable: "",
  },
  "#military-end": {
    dateRange: "-60:-0",
    maxDatePickable: new Date(),
    minDatePickable: "",
  },
  "#employer-1-start": {
    dateRange: "-40:-0",
    maxDatePickable: new Date(),
    minDatePickable: "",
  },
  "#employer-1-end": {
    dateRange: "-40:-0",
    maxDatePickable: new Date(),
    minDatePickable: "",
  },
  "#employer-2-start": {
    dateRange: "-40:-0",
    maxDatePickable: new Date(),
    minDatePickable: "",
  },
  "#employer-2-end": {
    dateRange: "-40:-0",
    maxDatePickable: new Date(),
    minDatePickable: "",
  },
  "#employer-3-start": {
    dateRange: "-40:-0",
    maxDatePickable: new Date(),
    minDatePickable: "",
  },
  "#employer-3-end": {
    dateRange: "-40:-0",
    maxDatePickable: new Date(),
    minDatePickable: "",
  },
};

const labelGuide = {
  legalName: {
    label: "Legal Name",
  },
  preferredName: {
    label: "Preferred Name",
  },
  streetAddress: {
    label: "Street Address",
  },
  cityAddress: {
    label: "City",
  },
  stateAddress: {
    label: "State",
  },
  zipAddress: {
    label: "Postal Code",
  },
  socialSecurityNumber: {
    label: "Social Security Number",
  },
  birthday: {
    label: "Date of Birth",
  },
  primaryPhone: {
    label: "Primary Phone",
  },
  emailAddress: {
    label: "Email Address",
  },
  website: {
    label: "Personal Website",
  },
  startDate: {
    label: "Earliest Start Date",
  },
  higherEd: {
    label: "Completed college or university",
  },
  educationNumberOne: {
    label: "School Attended",
  },
  educationNumberOneCity: {
    label: "City",
  },
  educationNumberOneDegree: {
    label: "Degree or Certificate",
  },
  educationNumberOneStatus: {
    label: "Degree Status",
  },
  educationNumberOneMajor: {
    label: "Major Field of Study",
  },
  educationNumberOneDate: {
    label: "Date of Degree",
  },
  educationNumberTwo: {
    label: "School Attended",
  },
  educationNumberTwoCity: {
    label: "City",
  },
  educationNumberTwoDegree: {
    label: "Degree or Certificate",
  },
  educationNumberTwoStatus: {
    label: "Degree Status",
  },
  educationNumberTwoMajor: {
    label: "Major Field of Study",
  },
  educationNumberTwoDate: {
    label: "Date of Degree",
  },
  educationNumberThree: {
    label: "School Attended",
  },
  educationNumberThreeCity: {
    label: "City",
  },
  educationNumberThreeDegree: {
    label: "Degree or Certificate",
  },
  educationNumberThreeStatus: {
    label: "Degree Status",
  },
  educationNumberThreeMajor: {
    label: "Major Field of Study",
  },
  educationNumberThreeDate: {
    label: "Date of Degree",
  },
  hasMilitary: {
    label: "Past Military Experience",
  },
  militaryStart: {
    label: "Start of Military Service",
  },
  militaryEnd: {
    label: "End of Military Service",
  },
  dischargeStatus: {
    label: "Discharge Status",
  },
  dischargeComments: {
    label: "Discharge Comments",
  },
  hasExperience: {
    label: "Is this your first job?",
  },
  employerNumberOne: {
    label: "Employer",
  },
  employerOneTitle: {
    label: "Position Title",
  },
  employerOneStart: {
    label: "Employment Start Date",
  },
  employerOneEnd: {
    label: "Employment End Date",
  },
  employerOneCity: {
    label: "City",
  },
  employerOneState: {
    label: "State",
  },
  employerOneCurrent: {
    label: "Currently employed at this employer?",
  },
  employerNumberTwo: {
    label: "Employer",
  },
  employerTwoTitle: {
    label: "Position Title",
  },
  employerTwoStart: {
    label: "Employment Start Date",
  },
  employerTwoEnd: {
    label: "Employment End Date",
  },
  employerTwoCity: {
    label: "City",
  },
  employerTwoState: {
    label: "State",
  },
  employerNumberThree: {
    label: "Employer",
  },
  employerThreeTitle: {
    label: "Position Title",
  },
  employerThreeStart: {
    label: "Employment Start Date",
  },
  employerThreeEnd: {
    label: "Employment End Date",
  },
  employerThreeCity: {
    label: "City",
  },
  employerThreeState: {
    label: "State",
  },
  linkedInProfile: {
    label: "LinkedIn Profile",
  },
  githubProfile: {
    label: "Github Profile",
  },
  stackOverflowProfile: {
    label: "StackOverflow Profile",
  },
  redditProfile: {
    label: "Reddit Profile",
  },
  otherProProfiles: {
    label: "Other Professional Profiles",
  },
  twitterProfile: {
    label: "Twitter Profile",
  },
  facebookProfile: {
    label: "Facebook Profile",
  },
  youTubeProfile: {
    label: "YouTube Profile",
  },
  otherPersonalProfiles: {
    label: "Other Personal Profiles",
  },
};
