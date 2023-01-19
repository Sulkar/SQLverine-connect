<html>
<head></head>
<body>
<main class="flex-shrink-0">

    <div class="container mt-5">
        <div class="row text-center">
            <h1 class="mb-3">SQL Abfragen</h1>
        </div>
        <!-- SQL textarea -->
        <div class="row">
            <div class="col-md-12">
                <div id="loginForm" class="" style="">
                    <div class="row"><span>SQL Code:</span></div>
                    <div class="row">
                        <div class="col-md-12">
                        	<a href="#" id="btnSql0">SELECT</a> |
                            <a href="#" id="btnSql1">Add Column</a> |
                            <a href="#" id="btnSql2">Remove Column</a> |
                            <a href="#" id="btnSql3">Create Table</a> |
                            <a href="#" id="btnSql4">Insert Data</a> |
                            <a href="#" id="btnSql5">Drop Table</a> |
                            <a href="#" id="btnSql6">Show Databases</a> |
                            <a href="#" id="btnSql7">Drop Database</a>
                        </div>
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" id="txtSQLData" rows="8" cols="100" >SELECT * FROM schueler</textarea>
                    </div>
                </div>
                <br>
                <button id="btnExecuteSQL" type="button" form="formUpdateEmail" class="btn btn-primary">SQL ausführen</button>
                <input id="txtDatabaseName" placeholder="new DatabaseName"></input>
                <button id="btnCreateNewDatabase" type="button" form="formUpdateEmail" class="btn btn-primary">Create New Database</button>
            </div>
        </div>
        <div id="info"></div>
        <!-- SQL table area -->
        <div class="row">
            <div class="col-md-12">
                <table class="table" id="dataTable">
                </table>
            </div>
        </div>
    </div>
</main>
<script src="editor.js">
</script>
</body>
</html>
