<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// Include config file
require_once "config.php";

// data from js file
$data = json_decode(file_get_contents('php://input'), true);
$sqlQuery = $data;

//check sql query for permissions
$sqlSelect = false;
$sqlShow = false;
$sqlUpdate = false;
$sqlDrop = false;
$sqlCreate = false;
$sqlAlter = false;
$sqlInsert = false;
$sqlDelete = false;

$regex_select = "/\bselect\b/i";
if (preg_match($regex_select, $sqlQuery) == 1) $sqlSelect = true;
$regex_show = "/\bshow\b/i";
if (preg_match($regex_show, $sqlQuery) == 1) $sqlShow = true;
$regex_update = "/\bupdate\b/i";
if (preg_match($regex_update, $sqlQuery) == 1) $sqlUpdate = true;
$regex_drop = "/\bdrop\b/i";
if (preg_match($regex_drop, $sqlQuery) == 1) $sqlDrop = true;
$regex_create = "/\bcreate\b/i";
if (preg_match($regex_create, $sqlQuery) == 1) $sqlCreate = true;
$regex_alter = "/\balter\b/i";
if (preg_match($regex_alter, $sqlQuery) == 1) $sqlAlter = true;
$regex_insert = "/\binsert\b/i";
if (preg_match($regex_insert, $sqlQuery) == 1) $sqlInsert = true;
$regex_delete = "/\bdelete\b/i";
if (preg_match($regex_delete, $sqlQuery) == 1) $sqlDelete = true;



    $results["error"] = "";
    try {
        $stmt = $pdo->query($sqlQuery);

        $results["result"] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $exception) {
        $results["error"] = $exception;
    }

    // Close statement
    unset($stmt);

    // Close connection
    unset($pdo);

// return results
echo json_encode($results);