<!doctype html>

<html>

<head>
    <title>Компании-партнеры</title>
    <meta name="viewport" content="width=device-width" />

    <link href="{{ URL::asset('resources/assets/lib/js/bootstrap.min.css') }}" rel="stylesheet" type="text/css" >
    <link href="{{ URL::asset('resources/assets/lib/js/jquery-ui.min.css') }}" rel="stylesheet" type="text/css" >
    <script type="text/javascript" src="{{ URL::asset('resources/assets/lib/js/jquery.min.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('resources/assets/lib/js/bootstrap.min.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('resources/assets/lib/js/jquery.cookie.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('resources/assets/lib/js/jquery-ui.js') }}"></script>

    <!-- DATA TABLES -->
    <link href="{{ URL::asset('resources/assets/lib/js/datatables/dataTables.bootstrap.css') }}" rel="stylesheet" type="text/css" >
    <script type="text/javascript" src="{{ URL::asset('resources/assets/lib/js/datatables/jquery.dataTables.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('resources/assets/lib/js/datatables/dataTables.bootstrap.js') }}"></script>

    <!-- http://silviomoreto.github.io/bootstrap-select/ -->
    <script type="text/javascript" src="{{ URL::asset('resources/assets/lib/js/bootstrap-multiselect/bootstrap-multiselect.js') }}"></script>
    <link href="{{ URL::asset('resources/assets/lib/js/bootstrap-multiselect/bootstrap-multiselect.css') }}" rel="stylesheet" type="text/css" >


    <style type="text/css">
        /*       * Style tweaks       * --------------------------------------------------       */
        body {
            margin-left: 15px;
            margin-right: 15px;
            padding-top: 70px;
        }
        table#cases {
            font-family: Arial;
            font-size: 12px;
            margin: 0 auto;
            text-align: center;
        }
        table#cases > tbody > tr > td, table#cases > thead > tr > td {
            padding: 2px 2px 2px 2px;
        }
        table#cases > tbody > tr > td {
            cursor: pointer;
        }
    </style>
    <script type="text/javascript" src="{{ URL::asset('resources/assets/js/all_pages.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('resources/assets/js/list.js') }}"></script>
</head>

<body>
<div class="navbar navbar-fixed-top navbar-inverse" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">CRM Бестсервис</a>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav" id="main-menu"></ul>
        </div>
        <!-- /.nav-collapse -->
    </div>
    <!-- /.container -->
</div>
<!-- /.navbar -->
<!--/.container-->
<div class="row">
    <div class="col-md-12">
        <ol class="breadcrumb">
            <li>
                <a href="accounting.html">
                    Бухгалтерия
                </a>
            </li>
            <li class="active">
                Компании-партнеры
            </li>
        </ol>
    </div>
</div>

@yield('content')
</body>

</html>