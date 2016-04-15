@extends('app')
@section('content')
    <div class="row">
        <div class="col-md-12">
            <br />
            <br />
            <form class="form-inline">
                <div class="form-group" id="update">
                    <label>Set the status of selected cases:</label>
                    <select name="status" class="form-control input-sm"></select>
                    <input type="button" id="set-status" value="Apply" style="width: 100px;" class="form-control input-sm btn btn-info btn-xs" />
                </div>
            </form>
            <br />
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <form class="form-inline">
                <div class="form-group" id="update_invoice_sent_date_real">
                    <label>Set the date of send originals:</label>
                    <input class="form-control input-sm" type="text" id="input-invoice_sent_date_real" name="input-invoice_sent_date_real" />
                    <input type="button" id="set-invoice_sent_date_real" value="Apply" style="width: 100px;" class="form-control input-sm btn btn-info btn-xs" />
                </div>
            </form>
        </div>
        <br />
        <hr />
    </div>

    <div class="row">
        <div class="col-md-12">
            <div class="col-md-8">
                <form class="form-inline" id="filter">
                    <div class="form-group">
                        <label>Date min:</label>
                        <input class="form-control input-sm" type="text" id="date_of_handling_min" reload="true" name="date_of_handling_min" />
                        <label>Date max:</label>
                        <input class="form-control input-sm" type="text" id="date_of_handling_max" reload="true" name="date_of_handling_max" />
                        <label>Case status:</label>
                        <select name="status" class="form-control input-sm" multiple="multiple"></select>
                        <label>Company partner:</label>
                        <select name="company_partner" class="form-control input-sm">
                            <option value="0"></option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="col-md-4 text-right">
                <input type="button" id="show_hidden_fields" value="Отобразить/скрыть дополнительные столбцы" style="width: 300px;" class="form-control input-sm btn btn-info btn-xs" />
            </div>
        </div>
        <br />
        <br />
    </div>
    <br />

    <div class="row">
        <div class="col-md-12">
            <div class="table-responsive">
                <table id="cases" class="table table-condensed table-striped table-hover table-bordered display compact">
                    <thead>
                        <tr>
                            <th style="width: 80px;">&nbsp;<input type="checkbox" id="select_all" /></th>
                            <th title="">#</th>
                            <th title="Статус">Status</th>
                            <th style="width: 90px;" title="Дата обращения">Date</th>
                            <th title="Компания партнер">Assistance</th>

                            <th title="Реф. № Bestservice">Ref. No BS</th>
                            <th title="Реферальный номер компании партнера">Ref. № Assistance</th>
                            <th title="ФИО">Name</th>
                            <th title="Страховая компания">Insurance сompany</th>
                            <th title="Регион">City</th>

                            <th title="Госпиталь">Hospital</th>
                            <th title="Диагноз доп.">Diagnosis</th>
                            <th title="Комментарий координатор">Сoordinator comments</th>
                            <th title="Комментарий бухгалтерия">Accounting comments</th>
                            <th title="Курс доллара invoice_send_rate">Exchange rate</th>

                            <th title="Subtotal из счета Best Service">Bill BS (Subtotal), USD</th>
                            <th title="not_cover_position">Exclusion, USD</th>
                            <th title="franchise">Deductible, USD</th>
                            <th title="Выставленная сумма invoice_bestservice_amount">Bill BS (total), USD)</th>
                            <th title="hospital_expense_usd">Bill Hospital, USD</th>

                            <th title="proceeds_usd">Proceeds, USD</th>
                            <th title="sent_usd">Sent</th>
                            <th title="Прогарантированная сумма accounting_guaranteed_amount">GOP, USD</th>
                            <th title="Оплаченная сумма accounting_payment_amount">Paid, USD</th>
                            <th title="Exchange rate on the payment date invoice_recv_rate">Exchange rate</th>

                            <th title="Date of payment">Date of payment</th>
                            <th title="Date of send originals">Date of send originals</th>
                            <th title="Bill Hospital hospital_expense">Bill Hospital, y.e.</th>
                            <th>Действия</th>
                        </tr>
                        <tr class="danger">
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>

                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>

                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>

                            <th id="sum_invoice_bestservice_subtotal"></th>
                            <th id="sum_not_cover_position_usd"></th>
                            <th id="sum_franchise_usd"></th>
                            <th id="sum_invoice_bestservice_amount"></th>
                            <th id="sum_hospital_expense_usd"></th>

                            <th id="sum_proceeds_usd"></th>
                            <th id="sum_sent_usd"></th>
                            <th id="sum_gop_usd"></th>
                            <th id="sum_paid_usd"></th>
                            <th></th>

                            <th></th>
                            <th></th>
                            <th id="sum_hospital_expense"></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection