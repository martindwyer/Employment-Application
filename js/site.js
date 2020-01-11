console.log("JavaScript is Ready");

$(document).ready(function () {
    console.log("JQuery is Ready");

    // The following sets the hidden tab structure for the application
    // The height of each tab will be determined by its content
    $('#tabs').tabs({
        heightStyle: "content"
    });

    // jQuery UI datepicker applied to each of the various date fields
    $(".date").datepicker();
    $("#start_date").datepicker({
        minDate: 0
    });
    $("#birth_date").datepicker({
        maxDate: 0,
        minDate: new Date(1937, 1, 1, )
    });
    $(".date_started_input").datepicker({
        maxDate: 0
    });
    $(".date_ended_input").datepicker({
        maxDate: 0
    });
    $(".employment_date").datepicker({
        maxDate: 0
    });
    $(".military_date").datepicker({
        maxDate: 0
    });

    // The first tab is active and all other tabs are disabled
    // Tabs are progressively revealed as the application is correctly completed
    $('#tabs').tabs("option", "disabled", [1, 2, 3, 4]);
    $('#tabs').tabs("option", "active", 0);

    // Validation of the first form - personal information about the applicant
    // If required fields are completed, applicant is directed to the education tab
    // If fields not completed, then error message printed and fields are highlighted
    $('#submit_personal_form').click(function () {
        if ($('#personal_form').valid()) {
            $('#tabs').tabs("option", "disabled", [0, 2, 3, 4]);
            $('#tabs').tabs("option", "active", 1);
        } else {
            $('#personal_form_error_message').fadeToggle();
        }
    });

    // Validation of the second form - education and skills of the applicant
    // If required fields are completed, applicant is directed to the employment tab
    // If required fields not completed, required fields are highlights and error message shown
    $('#submit_education_form').click(function () {
        if ($('#school_1').val() != "") {
            $('#tabs').tabs("option", "disabled", [0, 1, 3, 4]);
            $('#tabs').tabs("option", "active", 2);
        } else {
            $("#school_1").attr("placeholder", "High School or GED Required");
            $('#school_1').addClass('error');
            $("#school_1_city").attr("placeholder", "Required");
            $('#school_1_city').addClass('error');
            $('#school_1_state').addClass('error');
            $('#date_1_started').addClass('error');
            $('#education_form_error_message').fadeToggle();
        }
    });


    // The following script reveals two additional employer box forms if the applicant
    // clicks on a checkbox asking for space for more employers.
    $('#more_employers').click(function () {
        $('.additional_employer').fadeToggle();
    });

    // Validation of the third form - employment experience of the applicant
    // If required fields are completed, applicant is directed to the employment tab
    // If required fields not completed, required fields are highlights and error message shown
    $('#submit_employment_form').click(function () {
        if ($('#employment_form').valid()) {
            $('#tabs').tabs("option", "disabled", [0, 1, 2, 4]);
            $('#tabs').tabs("option", "active", 3);
        } else {
            $('#employment_form_error_message').show();
        }
    });


    // The following script hides the discharge explanation box when the application is loaded
    // The discharge explanation is revealed if the applicant indicates other than honorable discharge
    $('#discharge').hide();
    $('#discharge_other').click(function () {
        $('#discharge').toggle();
    });


    // The following script validates the fourth form - military background and references
    // The validation requires that the applicant to indicate whether or not they have had military experience
    // The validation requires that an explanation be given if "other" than honorable discharge is selected
    $('#submit_background_form').click(function () {
        if ($('#background_form').valid()) {
            if ($("#military_screen").val() == "99") {
                $('#background_form_error_message').show();
                $('#military_screen > label.no_military').text("Required");
                $('#military_screen label.no_military').css('background-color', '#f9e6ae');
            } else if (($("#discharge_other").is(':checked')) && ($('#discharge_explanation').val() == "")) {
                console.log("condition triggered");
                $('#background_form_error_message').show();
                $('#military_screen > label.no_military').text("Required");
                $('#military_screen label.no_military').css('background-color', '#f9e6ae');
                $('#discharge_explanation').css('background-color', '#f9e6ae');
            } else {
                $('#tabs').tabs("option", "disabled", [0, 1, 2, 3]);
                $('#tabs').tabs("option", "active", 4);
            }

        } else {
            if ($("#military_screen option:selected").val() === "99") {
                $('#military_screen > label.no_military').text("Required");
                $('#military_screen label.no_military').css('background-color', '#f9e6ae');
                $('#background_form_error_message').show();
            } else {
                $('#background_form_error_message').show();
            }
        }
    });

    // The following script validates the final form - criminal history, consent and agreement
    // The applicant is required to answer the question related to felony criminal history
    // The applicant is required to give an explanation if they have felony criminal history
    // When completed, a final dialog box appears asking the applicant to submit their application
    // The applicant is forwarded to careers.google.com after they have responded to the dialog box
    // See CSS for additional settings on dialog box, including the elimination of box closure options
    $('#submit_application_close_form').click(function () {
        if ($('#application_close').valid()) {
            if ($("#crime_screen option:selected").val() == "99") {
                $('#application_close_form_error_message').show();
                $('#crime_screen > label.no_felony_selection').text("Required");
                $('#crime_screen label.no_felony_selection').css('background-color', '#f9e6ae');
            } else if (($("#crime_screen option:selected").val() == "00") && ($('#criminal_explanation').val() == "")) {
                $('#application_close_form_error_message').show();
                $('#crime_screen > label.no_felony_selection').text("Required");
                $('#crime_screen label.no_felony_selection').css('background-color', '#f9e6ae');
                $('#application_close textarea').css('background-color', '#f9e6ae');
            } else {
                $('#dialog2').dialog({
                    modal: true,
                    height: 400,
                    width: 600,
                    buttons: {
                        "Submit Application": function () {
                            window.open('https://bdo-tech.com/gallery/', '_self');
                        },
                        "Return to Application": function () {
                            $(this).dialog("close");
                        }
                    },
                    closeOnEscape: false,
                    open: function (event, ui) {
                        $(this).parent().children().children('.ui-dialog-titlebar-close').hide();
                    }
                });
            }
        } else {
            if ($("#crime_screen option:selected").val() === "99") {
                $('#application_close_form_error_message').show();
                $('#crime_screen > label.no_felony_selection').text("Required");
                $('#crime_screen label.no_felony_selection').css('background-color', '#f9e6ae');
            } else {
                $('#application_close_form_error_message').show();
            }
        }
    });

});
