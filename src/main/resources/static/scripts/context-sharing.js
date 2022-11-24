function getFromCache() {
    console.log('method getFromCache has been called')
    $.get("/secure/share", function (data) {
        console.log(data)
        if (data !== null && data !== "") {
            localStorage.setItem("psc-context", JSON.stringify(data))
            const btnFillForm = $("#btnFillForm");
            btnFillForm.removeAttr("disabled");
        }
    });
}

function putInCache(data) {
    $.ajax({
        url: '/secure/share',
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        accepts: 'application/json',
        data: JSON.stringify(data),
        success: function(data, status, jqXHR){
        },
        error: function(jqXHR, status, errorThrown){
        }
    })
}

function fillForm() {
    $.getJSON('../patient-info.json', function(data) {
        const jsonContext = localStorage.getItem("psc-context")
        const pscContext = JSON.parse(jsonContext)

        for (const [key, value] of Object.entries(data)) {
            console.log(_.get(pscContext, value))
            if (document.getElementById(key)) {
                $('#' + key).val(_.get(pscContext, value, ''))
            }
        }
    })
}
