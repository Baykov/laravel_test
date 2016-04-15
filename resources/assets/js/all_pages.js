$(document).ready(function() {
    $('ul#main-menu')
        .append('<li><a id="index"                      href="index.html">Главная</a></li>')
        .append('<li><a id="insurance_cases"            href="insurance_cases.html">Случаи</a></li>')
        .append('<li><a id="insurance_company_cases"    href="insurance_company_cases.html">СК</a></li>')
        .append('<li><a id="accounting"                 href="accounting.html">Бухгалтерия</a></li>')
        .append('<li><a id="administration"             href="administration.html">Администрирование</a></li>')
        .append('<li><a id="login"                      href="login.html">Выход</a></li>');

    var pathname = window.location.pathname;
    switch (pathname) {
        case '/insurance_cases.html':
        case '/insurance_cases_comments.html':
        case '/insurance_cases_create.html':
        case '/insurance_cases_create_child.html':
        case '/insurance_cases_edit.html':
        case '/insurance_cases_view.html':
        case '/letter_of_guarantee.html':
        case '/verification_of_benefits.html':
        case '/create_invoices.html':
            $('a#insurance_cases').parent().addClass('active');
            break;
        case '/insurance_company_cases.html':
        case '/insurance_company_cases_view.html':
            $('a#insurance_company_cases').parent().addClass('active');
            break;
        case '/accounting.html':
        case '/accounting_company_partners.html':
        case '/accounting_upload_new_payment.html':
            $('a#accounting').parent().addClass('active');
            break;
        case '/administration.html':
        case '/dropdown_lists_settings.html':
        case '/dropdown_list_edit.html':
        case '/users_settings.html':
        case '/users_settings_edit.html':
        case '/administration_accounting.html':
        case '/exchange_rates.html':
        case '/administration_exchange_rates_oanda.html':
        case '/administration_exchange_rates_cp.html':
        case '/administration_fields_account.html':
        case '/mails.html':
            $('a#administration').parent().addClass('active');
            break;
    }

});

jQuery.fn.reverse = function() {
    return this.pushStack(this.get().reverse(), arguments);
};

Date.prototype.getMySQLMonth = function () {
	var year, month, day, hours, minutes, seconds;
	year = String(this.getFullYear());
	month = String(this.getMonth() + 1);
	if (month.length == 1) {
		month = "0" + month;
	}
	// should return something like: 2011-06
	return year + "-" + month;
}

Date.prototype.getMySQLDate = function () {
	var year, month, day, hours, minutes, seconds;
	year = String(this.getFullYear());
	month = String(this.getMonth() + 1);
	if (month.length == 1) {
		month = "0" + month;
	}
	day = String(this.getDate());
	if (day.length == 1) {
		day = "0" + day;
	}
	// should return something like: 2011-06-16
	return year + "-" + month + "-" + day;
}

function getCountOfDaysInMonth (month) {
    var month_array = month.split(/[-]/);
    return new Date(month_array[0], month_array[1] - 1, 0).getDate();
}

// проверка авторизации
$.ajax({
    type: 'get',
    url: '/api/authenticate',
    async: false,
    data: {
        id: $.cookie("user.id"),
        hashKey: $.cookie("user.hashKey")
    },
    statusCode: {
        403: function() {
            $(location).attr('href', 'index.html');
        }
    }
});

$.urlParam = function(name) {
    var results = new RegExp('[\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    if (results==null){
        return null;
    } else {
        return results[1] || 0;
    }
}

///////////////////////// START: JSONIFY FORM /////////////////////////
$.fn.jsonify = function(options) {
    var settings = $.extend({
        stringify : false
    }, options);
    var json = {};
    $.each(this.serializeArray(), function() {
        if (json[this.name]) {
            if (!json[this.name].push)
                json[this.name] = [json[this.name]];
            json[this.name].push(this.value || '');
        } else
            json[this.name] = this.value || '';
    });
    if(settings.stringify)
        return JSON.stringify(json);
    else
        return json;
};

$.fn.jsonify_not_empty = function(options) {
    var settings = $.extend({
        stringify : false
    }, options);
    var json = {};
    $.each(this.serializeArray(), function() {
        if (!empty(this.value)) {
            if (json[this.name]) {
                if (!json[this.name].push)
                    json[this.name] = [json[this.name]];
                json[this.name].push(this.value || '');
            } else
                json[this.name] = this.value || '';
        }
    });
    if(settings.stringify)
        return JSON.stringify(json);
    else
        return json;
};
///////////////////////// END: JSONIFY FORM /////////////////////////

function empty(e) {
    switch(e) {
        case "":
        case 0:
        case "0":
        case null:
        case 'NaN':
        case false:
        case typeof this == "undefined":
            return true;
                default : return false;
    }
}

function empty_to_empty(e) {
    if (empty(e)) {
        return '';
    } else {
        return e;
    }
}

function empty_to_zero(e) {
    if (empty(e)) {
        return 0;
    } else {
        return e;
    }
}

function ajaxBusy (show) {
    if (show == true) {
        if( $('#ajax-busy').length ) {
            $('#ajax-busy').show();
        } else {
            $('<div id="ajax-busy"/>').css({
                opacity: 0.8,
                zIndex: 2000,
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: $(window).height() + 'px',
                background: 'white url(../image/giphy.gif) no-repeat center'
                }).hide().appendTo('body');
            $('#ajax-busy').show();
        }
    } else if (show == false) {
        $('#ajax-busy').hide();
    }
}

function http_post (url, data) {

    $.ajax({
        type: 'POST',
        async: false,
        contentType: 'application/json',
        url: url,
        dataType: 'json',
        data: JSON.stringify(data),
        statusCode: {
            // OK
            200: function(response) {
                result = {
                    status: 200,
                    response: response
                };
            },
            // Bad request
            400: function(response) {
                result = {
                    status: 400,
                    response: JSON.parse(response.responseText)
                };
            },
            // Not found
            404: function(response) {

                result = {
                    status: 404,
                    //response: JSON.parse(response.responseText)
                };
            }
        }
    });

    return result;
}

function http_get (url) {
    var result;

    $.ajax({
        type: 'get',
        async: false,
        url: url,
        dataType: 'json',
        statusCode: {
            200: function(response) {
                result = {
                    status: 200,
                    response: response
                };
            },
            // Not found
            404: function(response) {

                result = {
                    status: 404
                };
            }
        }
    });

    return result;
}

// role based access control
function RBAC () {
    var pathname = window.location.pathname;
    var role = $.cookie("user.role");

    switch (pathname) {
        case '/insurance_cases_view.html':
            if (role == 'coordinator') {
                $('a#create-invoice').css('display', 'none');
            }
            break;

        case '/insurance_cases_create_child.html':

            $('input[name=rate_thb_usd]').attr('disabled', 'disabled');

            $('input[name=fio]').attr('disabled', 'disabled');
            $('select[name=gender]').attr('disabled', 'disabled');
            $('input[name=phone]').attr('disabled', 'disabled');
            $('input[name=date_of_birth]').attr('disabled', 'disabled');
            $('input[name=series_of_policy]').attr('disabled', 'disabled');
            $('select[name=insurance_company]').attr('disabled', 'disabled');
            $('select[name=company_partner]').attr('disabled', 'disabled');
            $('input[name=reference_id_partner]').attr('disabled', 'disabled');
            $('input[name=date_start_policy]').attr('disabled', 'disabled');
            $('input[name=end_date_policy]').attr('disabled', 'disabled');
            $('input[name=count_days_policy]').attr('disabled', 'disabled');
            $('input[name=hotel]').attr('disabled', 'disabled');
            $('input[name=room]').attr('disabled', 'disabled');
            $('select[name=presence_of_explanatory]').attr('disabled', 'disabled');
            break;

        case '/insurance_cases_create.html':

            $('input[name=rate_thb_usd]').attr('disabled', 'disabled');

            if (role == 'coordinator') {
                $('select[name=status]').children('option[value=193]').attr('disabled', 'disabled');
            }
            break;

        case '/insurance_cases_edit.html':

            $('input[name=rate_thb_usd]').attr('disabled', 'disabled');

            if (role == 'coordinator') {
                if ($('select[name=status]').val() == 193) {
                    window.history.back();
                }
                $('select[name=status]').children('option[value=193]').attr('disabled', 'disabled');
            }
            if (role == 'accountant') {
                if ($('select[name=status]').val() == 26 || $('select[name=status]').val() == 193) {
                    window.history.back();
                }
            }

            var ref_number_bestservice = $('input[name=ref_number_bestservice]').val();
            var ref_number_bestservice_array = ref_number_bestservice.split('-');
            if(typeof ref_number_bestservice_array[1] !== 'undefined') {
                $('input[name=fio]').attr('disabled', 'disabled');
                $('select[name=gender]').attr('disabled', 'disabled');
                $('input[name=phone]').attr('disabled', 'disabled');
                $('input[name=date_of_birth]').attr('disabled', 'disabled');
                $('input[name=series_of_policy]').attr('disabled', 'disabled');
                $('select[name=insurance_company]').attr('disabled', 'disabled');
                $('select[name=company_partner]').attr('disabled', 'disabled');
                $('input[name=reference_id_partner]').attr('disabled', 'disabled');
                $('input[name=date_start_policy]').attr('disabled', 'disabled');
                $('input[name=end_date_policy]').attr('disabled', 'disabled');
                $('input[name=count_days_policy]').attr('disabled', 'disabled');
                $('input[name=reference_id_partner]').attr('disabled', 'disabled');
                $('input[name=hotel]').attr('disabled', 'disabled');
                $('input[name=room]').attr('disabled', 'disabled');
                $('select[name=presence_of_explanatory]').attr('disabled', 'disabled');
            }
            break;

        default:
            if (role == 'coordinator') {
                $('a[href*="administration.html"]').parent().remove();
                $('a[href="accounting.html"]').parent().remove();
            }
            if (role == 'client') {
                $('a[href*="insurance_cases.html"]').parent().remove();
                $('a[href*="administration.html"]').parent().remove();
                $('a[href="accounting.html"]').parent().remove();
            } else {
                $('a[href*="insurance_company_cases.html"]').parent().remove();
            }

            if (role == 'accounting') {
                $('a[href*="insurance_cases.html"]').parent().remove();
            }
    }
}

$(document).ready(function() {
    $('body').on('click', '#back-history', function() {
        window.history.back();
    });

    $('body').on('click', 'a[href*="login.html"]', function() {
        $.cookie("user.id", 0);
        $(location).attr('href', 'index.html');
        return false
    });

    RBAC();
});

function currencyFormat (num) {
    num =
        parseFloat(num)
       .toFixed(2) // always two decimal digits
       .replace(".", ",") // replace decimal point character with ,
       .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") + "" // use . as a separator

    return num;
}

Array.prototype.pushUnique = function (item){
    if(this.indexOf(item) == -1) {
    //if(jQuery.inArray(item, this) == -1) {
        this.push(item);
        return true;
    }
    return false;
}

function mathsOnly(ch, event, value, base, decimalChar) {
    return '+-*/'.indexOf(ch) > -1 && !(ch === '-' && value === '');
}