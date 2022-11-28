let pscContext;

function getFromCache() {
    $.get("/secure/share", function (data) {
        console.log(data)
        if (data !== null && data !== "") {
            pscContext = data;
            const btnFillForm = $("#btnFillForm");
            btnFillForm.removeAttr("disabled");
        }
    });
}

function fillForm() {
    $.getJSON('../patient-info-mapping.json', function(data) {
        for (const [key, value] of Object.entries(data)) {
            if (document.getElementById(key)) {
                $('#' + key).val(_.get(pscContext, value, ''))
            }
        }
    })
}

function putInCache() {
    let putPscContext = {};

    $.getJSON('../patient-info-mapping.json', function (data) {
        for (const [key, value] of Object.entries(data)) {
            if (document.getElementById(key)) {
                _.set(putPscContext, value, document.getElementById(key).value)
            }
        }
        console.log(putPscContext);
    })

    // // then put putPscContext to API before submitting form
    // $.ajax({
    //     url: '/secure/share',
    //     type: 'PUT',
    //     dataType: 'json',
    //     contentType: 'application/json',
    //     accepts: 'application/json',
    //     data: JSON.stringify(putPscContext),
    //     success: function(data, status, jqXHR){
    //     },
    //     error: function(jqXHR, status, errorThrown){
    //     }
    // })
}


