<!doctype html>
<html lang="de">
	<head>
		<title>Herzlich willkommen auf connect.sqlverine.org</title>
		<meta name="robots" content="index,follow">
		<meta charset="utf-8">
		<!--<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> -->
		
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="content-language" content="de">
		<meta name="language" content="deutsch, de">
		
	</head>
	<body>
		<div class="container">

			<h1>Herzlich willkommen auf connect.sqlverine.org</h1>
			<div>
				<span>NAS-Box domain/ip: </span><input id="txtNasDomain" placeholder="abc1234.synology.me/db_CRUD.php" style="width: 300px;" value="https://sqlverine.synology.me/db_CRUD.php"/>
			</div>
			<br>
			<div>
                        <textarea class="form-control" id="txtSQLData" rows="8" cols="100" >SELECT * FROM schueler</textarea>
                    </div>
               
                <br>
                <button id="btnExecuteSQL" type="button" class="btn btn-primary">SQL ausführen</button>
				
				<div id="info"></div>
        <!-- SQL table area -->
        <div class="row">
            <div class="col-md-12">
                <table class="table" id="dataTable">
                </table>
            </div>
        </div>
		
            </div>

		<script src="/js/connect.js" ></script>
	</body>
</html>
