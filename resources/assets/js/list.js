$(document).ready(function() {

    $.ajax({
        type: 'get',
        url: '/api/selects',
        dataType: 'json',
        async: false,
        data: {
        },
        statusCode: {
            200: function(response) {
                $.each(response, function(key, value) {
                    if (value.parent_id > 0) {
                        $('<option>').attr('disabled', true).attr('parent_id', value.parent_id).attr('setting_1', value.setting_1).attr('setting_2', value.setting_2).attr('setting_3', value.setting_3).val(value.id).text(value.name).appendTo('select[name=' + value.select_name + ']');
                    } else {
                        $('<option>').attr('setting_1', value.setting_1).attr('setting_2', value.setting_2).attr('setting_3', value.setting_3).val(value.id).text(value.name).appendTo('select[name=' + value.select_name + ']');
                    }
                });
            }
        }
    });

/* sorting options */
    var options = $('#filter select[name="company_partner"] option');
    options.detach().sort(function(a,b) {
        var at = $(a).text();
        var bt = $(b).text();
        return (at > bt)?1:((at < bt)?-1:0);
    });
    options.appendTo('#filter select[name="company_partner"]');
/* sorting options */

    $('#filter select[name=status]').multiselect({
        numberDisplayed: 1
    });

    load_filter();

    loadDataToTable();

    var table;

    function loadDataToTable () {

        table = $('#cases').DataTable( {
            "autoWidth": false,
            "lengthChange": true,
            "pageLength": 10,
            "order": [[ 0, "desc" ]],
            "info": true,
            "retrieve": true,
            "searching": true,
            "stateSave": true,
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "./api/listorders",
                "type": "GET",
                "data": function (data) {
                    data.date_of_handling_min = $('#filter #date_of_handling_min').val();
                    data.date_of_handling_max = $('#filter #date_of_handling_max').val();
                    data.status = $('#filter [name=status]').val();
                    data.company_partner = $('#filter [name=company_partner]').val();
                },
                "dataSrc": function (json) {
                    var sum_hospital_expense = json.data_sum_total.sum_hospital_expense;
                    var sum_invoice_bestservice_subtotal = json.data_sum_total.sum_invoice_bestservice_subtotal;
                    var sum_not_cover_position_usd = json.data_sum_total.sum_not_cover_position_usd;
                    var sum_franchise_usd = json.data_sum_total.sum_franchise_usd;
                    var sum_invoice_bestservice_amount = json.data_sum_total.sum_invoice_bestservice_amount;

                    var sum_hospital_expense_usd = json.data_sum_total.sum_hospital_expense_usd;
                    var sum_proceeds_usd = json.data_sum_total.sum_proceeds_usd;
                    var sum_sent_usd = json.data_sum_total.sum_sent_usd;
                    var sum_gop_usd = json.data_sum_total.sum_gop_usd;
                    var sum_paid_usd = json.data_sum_total.sum_paid_usd;

                    $('#sum_hospital_expense').html(currencyFormat(empty_to_zero(sum_hospital_expense)));
                    $('#sum_invoice_bestservice_subtotal').html(currencyFormat(empty_to_zero(sum_invoice_bestservice_subtotal)));
                    $('#sum_not_cover_position_usd').html(currencyFormat(empty_to_zero(sum_not_cover_position_usd)));
                    $('#sum_franchise_usd').html(currencyFormat(empty_to_zero(sum_franchise_usd)));
                    $('#sum_invoice_bestservice_amount').html(currencyFormat(empty_to_zero(sum_invoice_bestservice_amount)));

                    $('#sum_hospital_expense_usd').html(currencyFormat(empty_to_zero(sum_hospital_expense_usd)));
                    $('#sum_proceeds_usd').html(currencyFormat(empty_to_zero(sum_proceeds_usd)));
                    $('#sum_sent_usd').html(currencyFormat(empty_to_zero(sum_sent_usd)));
                    $('#sum_gop_usd').html(currencyFormat(empty_to_zero(sum_gop_usd)));
                    $('#sum_paid_usd').html(currencyFormat(empty_to_zero(sum_paid_usd)));

                    return json.data;
                }
            },
            "columns": [
                { "data": "id",
                  "orderable": false,
                  "render": function ( data, type, full, meta ) {
                                return '<input type="checkbox" class="checkbox" name="options[]" value="' + data + '" />'
                            }
                },
                { "data": "id" },
                { "data": "status" },
                { "data": "date_of_handling" },
                { "data": "company_partner" },
                { "data": "ref_number_bestservice" },
                { "data": "reference_id_partner" },
                { "data": "fio" },
                { "data": "insurance_company_name" },
                { "data": "region_name" },
                { "data": "hospital_name" },
                { "data": "additional_diagnosis" },
                { "data": "comment_coordinator",
                  "orderable": false },
                { "data": "comment_accounting",
                  "orderable": false },
                 { "data": "invoice_send_rate",
                  "orderable": false },
                {
                    "data": "invoice_bestservice_subtotal",
                    "render": function ( data, type, full, meta ) {
                        return currencyFormat(empty_to_zero(full.invoice_bestservice_subtotal));
                    }
                },
                {
                    "data": "not_cover_position_usd",
                    "render": function ( data, type, full, meta ) {
                        return currencyFormat(empty_to_zero(full.not_cover_position_usd));
                    }
                },
                {
                    "data": "franchise_usd",
                    "render": function ( data, type, full, meta ) {
                        console.log(full.franchise_usd);
                        return currencyFormat(empty_to_zero(full.franchise_usd));
                    }
                },
                {
                    "data": "invoice_bestservice_amount",
                    "render": function ( data, type, full, meta ) {
                        return currencyFormat(empty_to_zero(full.invoice_bestservice_amount));
                    }
                },
                {
                    "data": "hospital_expense_usd",
                    "render": function ( data, type, full, meta ) {
                        return currencyFormat(empty_to_zero(full.hospital_expense_usd));
                    }
                },
                {
                    "data": "proceeds_usd",
                    "render": function ( data, type, full, meta ) {
                        return currencyFormat(empty_to_zero(full.proceeds_usd));
                    }
                },
                {
                    "data": "sent_usd",
                    "render": function ( data, type, full, meta ) {
                        return currencyFormat(empty_to_zero(full.sent_usd));
                    }
                },
                {
                    "data": "gop_usd",
                    "render": function ( data, type, full, meta ) {
                        return currencyFormat(empty_to_zero(full.gop_usd));
                    }
                },
                {
                    "data": "paid_usd",
                    "render": function ( data, type, full, meta ) {
                        return currencyFormat(empty_to_zero(full.paid_usd));
                    }
                },
                {
                     "orderable": false,
                  "visible": false,
                   "data": "invoice_recv_rate",
                    "orderable": false,
                    "render": function ( data, type, full, meta ) {
                        return currencyFormat(empty_to_zero(full.invoice_recv_rate));
                    }
                },
                {
                    "orderable": false,
                    "visible": false,
                    "data": "invoice_recv_date",
                    "render": function ( data, type, full, meta ) {
                        return currencyFormat(empty_to_zero(full.invoice_recv_date));
                    }

                },
                {
                    "orderable": false,
                    "visible": false,
                    "data": "invoice_sent_date_real"
                },
                {
                    "orderable": false,
                    "visible": false,
                    "data": "hospital_expense",
                    "render": function ( data, type, full, meta ) {
                        return currencyFormat(empty_to_zero(full.hospital_expense));
                    }
                },
                { "data": "id",
                  "orderable": false,
                  "render": function ( data, type, full, meta ) {
                                var btn_class="success";
                                if(full.created_json == 1){
                                    btn_class="warning";
                                }                                

                                return  '<a href="create_invoices.html?id=' +
                                            data +
                                        '" class="btn btn-'+btn_class+' btn-xs">&nbsp;B&nbsp;</a> '+
                                        '<a href="insurance_cases_edit.html?id=' +
                                            data +
                                        '" class="btn btn-info btn-xs">&nbsp;E&nbsp;</a>';
                            }
                }
            ],
            "bSortCellsTop": true,
            "oLanguage": {
                "sProcessing": "<div style='position:absolute; height: 100%; width: 100%; opacity: 0.4; filter: alpha(opacity=40); background-color: black; z-index: 10000; overflow: auto;'></div>"
            },
            "language": {
                "processing": "Подождите...",
                "search": "Фильтр: ",
                "lengthMenu": "Показать _MENU_ записей",
                "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
                "infoEmpty": "Записи с 0 до 0 из 0 записей",
                "infoFiltered": "(отфильтровано из _MAX_ записей)",
                "infoPostFix": "",
                "loadingRecords": "Загрузка записей...",
                "zeroRecords": "Записи отсутствуют.",
                "emptyTable:": "В таблице отсутствуют данные",
                "paginate": {
                    "first": "Первая",
                    "previous": "Предыдущая",
                    "next": "Следующая",
                    "last": "Последняя"
                },
                "aria": {
                    "sortAscending": ": активировать для сортировки столбца по возрастанию",
                    "sortDescending": ": активировать для сортировки столбца по убыванию"
                }
            }
        });

        $('#filter [name="status"], #filter [name="company_partner"]').change(function() {
            table.ajax.reload();
            save_filter();
        });

        $('#filter #date_of_handling_min, #filter #date_of_handling_max, #update_invoice_sent_date_real #input-invoice_sent_date_real').datepicker({
            changeMonth: true,
            changeYear: true,
            closeText: 'Clear',
            dateFormat: 'yy-mm-dd',
            selectOtherMonths: true,
            showButtonPanel: true,
            showOtherMonths: true,
            beforeShow: function (input, inst) {
                var rect = input.getBoundingClientRect();
                setTimeout(function () {
                    inst.dpDiv.css({ top: rect.top + 40, left: rect.left + 0 });
                }, 0);
            },
            onSelect: function(input, inst) {
                if($(this).attr("reload") == 'true'){
                table.ajax.reload();
                save_filter();
                }
            },
            onClose: function (dateText, inst) {
                if ($(window.event.srcElement).hasClass('ui-datepicker-close')) {
                    document.getElementById(this.id).value = '';
                    table.ajax.reload();
                    save_filter();
                }
            }
        });
    }

    $('#cases tbody')
        .on( 'dblclick', 'tr', function () {
            console.log($(this).attr('id'));
            location.href = 'insurance_cases_view.html?id=' + $(this).attr('id');
        })
        .on('click', 'input, a', function(e) {
            e.stopPropagation();
        });

    $('body').on('click', '#select_all', function() {
        if(this.checked){
            $('.checkbox').each(function(){
                this.checked = true;
            });
        }else{
             $('.checkbox').each(function(){
                this.checked = false;
            });
        }
    });

    $('body').on('click', '.checkbox', function() {
        if($('.checkbox:checked').length == $('.checkbox').length){
            $('#select_all').prop('checked',true);
        }else{
            $('#select_all').prop('checked',false);
        }
    });

    $('body').on('click', 'input#set-status', function() {

        var status = $('#update select[name=status]').val();

        var checked = []
        $("input[name='options[]']:checked").each(function () {
            checked.push(parseInt($(this).val()));
        });

        var data = new Object;
        data.status = status;
        data.checked = checked;

        if (checked.length > 0) {
            if (confirm('Обновить статусы?')) {
                var response = http_post('/api/cases/status', data);
                if (response.status == 200) location.reload();
            }
        }
    });

    $('body').on('click', 'input#set-invoice_sent_date_real', function() {

        var invoice_sent_date_real = $('#input-invoice_sent_date_real').val();

        var checked = []
        $("input[name='options[]']:checked").each(function () {
            checked.push(parseInt($(this).val()));
        });

        var data = new Object;
        data.invoice_sent_date_real = invoice_sent_date_real;
        data.checked = checked;

        if (checked.length > 0) {
            if (confirm('Обновить date of send originals?')) {
                var response = http_post('/api/cases/invoice_sent_date_real', data);
                if (response.status == 200) location.reload();
            }
        }
    });

    $('body').on('click', 'input#show_hidden_fields', function() {
        var column = table.column([24,25,26,27]);
        column.visible( ! column.visible() );
    });


});

var save_filter = function() {
    $.cookie('filter_status', $('#filter [name="status"]').val(), { expires: 365 });
    $.cookie('filter_company_partner', $('#filter [name="company_partner"]').val(), { expires: 365 });
    $.cookie('filter_date_of_handling_min', $('#filter #date_of_handling_min').val(), { expires: 365 });
    $.cookie('filter_date_of_handling_max', $('#filter #date_of_handling_max').val(), { expires: 365 });
}

var load_filter = function() {
    if($.cookie('filter_date_of_handling_min') == null) {
        $.cookie('filter_date_of_handling_min', '', { expires: 365 });
    }
    if($.cookie('filter_date_of_handling_max') == null) {
        $.cookie('filter_date_of_handling_max', '', { expires: 365 });
    }
    if($.cookie('filter_status') == null) {
        $.cookie('filter_status', '', { expires: 365 });
    }
    if($.cookie('filter_company_partner') == null) {
        $.cookie('filter_company_partner', '', { expires: 365 });
    }

    $('#filter #date_of_handling_min').val($.cookie('filter_date_of_handling_min'));
    $('#filter #date_of_handling_max').val($.cookie('filter_date_of_handling_max'));

    if ($.cookie('filter_status') != null) {
        var filter_status = $.cookie('filter_status').split(",");
        if (filter_status.length > 0)
            $('#filter select[name="status"]').multiselect('select', filter_status);
    }

    $('#filter select[name="company_partner"]').val($.cookie('filter_company_partner'));

}