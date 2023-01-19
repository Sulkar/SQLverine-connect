<?php

define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'Thistime1!');

// data from js file
$data = json_decode(file_get_contents('php://input'), true);
$newDatabaseName = $data;

 $results["error"] = "";
try {
   $pdo = new PDO("mysql:host=" . DB_SERVER, DB_USERNAME, DB_PASSWORD);
} catch (PDOException $e) {
    die($results["error"] = "ERROR: Could not connect. " . $e->getMessage());
}

try{ 
    $test = $pdo->exec("CREATE DATABASE " . $newDatabaseName .";");
    
    if($test){
    	$results["result"] = "Database " .$newDatabaseName . " created";
    }else{
    	$results["error"] = $pdo->errorInfo();
    }
}catch (PDOException $e) {
	$results["error"] = $e;
}
// Close statement
unset($test);

// Close connection
unset($pdo);

// return results
echo json_encode($results);