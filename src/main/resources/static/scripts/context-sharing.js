let pscContext;

function getFromCache() {
    console.log('method getFromCache has been called')
    $.get("/secure/share", function (data) {
        console.log(data)
        if (data !== null && data !== "") {
            // localStorage.setItem("psc-context", JSON.stringify(data))
            pscContext = data;
            const btnFillForm = $("#btnFillForm");
            btnFillForm.removeAttr("disabled");
        }
    });
}

function fillForm() {
    $.getJSON('../patient-info-mapping.json', function(data) {
        // const jsonContext = localStorage.getItem("psc-context")
        // const pscContext = JSON.parse(jsonContext)

        for (const [key, value] of Object.entries(data)) {
            if (document.getElementById(key)) {
                $('#' + key).val(_.get(pscContext, value, ''))
            }
        }
    })
}

function putInCache() {
    let putPscContext = {};
    console.log("in");

    $.getJSON('../patient-info-mapping.json', function (data) {
        for (const [key, value] of Object.entries(data)) {
            console.log(key)
            if (document.getElementById(key)) {
                console.log(key)
                _.set(putPscContext, value, document.getElementById(key).value)
                console.log(putPscContext)
            //    assign current value of input of [key] id to [value] property of putPscContext
            }
        }
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


