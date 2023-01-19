//execute SQL Commands
document.getElementById("btnSql0").addEventListener("click", function(){
  document.getElementById("txtSQLData").value = "SELECT * FROM schueler;";
});
document.getElementById("btnSql1").addEventListener("click", function(){
  document.getElementById("txtSQLData").value = "ALTER TABLE schueler ADD COLUMN phone VARCHAR(15) AFTER nachname;";
});
document.getElementById("btnSql2").addEventListener("click", function(){
  document.getElementById("txtSQLData").value = "ALTER TABLE schueler DROP COLUMN nachname;";
});
document.getElementById("btnSql3").addEventListener("click", function(){
  document.getElementById("txtSQLData").value = "CREATE TABLE schueler (\n id int PRIMARY KEY UNIQUE AUTO_INCREMENT,\n vorname varchar(255),\n nachname varchar(255)\n)";
});
document.getElementById("btnSql4").addEventListener("click", function(){
  document.getElementById("txtSQLData").value = "INSERT INTO schueler (vorname, nachname)\nVALUES ('Ullrich', 'Gcheuder')";
});
document.getElementById("btnSql5").addEventListener("click", function(){
  document.getElementById("txtSQLData").value = "DROP TABLE schueler;";
});
document.getElementById("btnSql6").addEventListener("click", function(){
  document.getElementById("txtSQLData").value = "SHOW DATABASES;";
});
document.getElementById("btnSql7").addEventListener("click", function(){
  document.getElementById("txtSQLData").value = "DROP DATABASE name;";
});

//execute SQL Button
document.getElementById("btnExecuteSQL").addEventListener("click", function () {
  
  resetDataTable("dataTable");
  let sqlQuery = document.getElementById("txtSQLData").value;

  let columnNames = undefined;
  let sqlStatementType = undefined;
  let currentTableName = undefined;
  let currentDatabaseName = undefined;
  (async () => {
    //what happened SELECT, CREATE, ...
    if (sqlQuery.match(/CREATE TABLE/i)) {
      sqlStatementType = "CREATE";
      currentTableName = sqlQuery.match(/CREATE TABLE\s(\w+)/i)[1];
    } else if (sqlQuery.match(/SELECT/i)) {
      sqlStatementType = "SELECT";
      currentTableName = sqlQuery.match(/FROM\s(\w+)/i)[1];
    } else if (sqlQuery.match(/DROP TABLE/i)) {
      sqlStatementType = "DROP TABLE";
      currentTableName = sqlQuery.match(/DROP TABLE\s(\w+)/i)[1];
    }else if (sqlQuery.match(/DROP DATABASE/i)) {
      sqlStatementType = "DROP DATABASE";
      currentDatabaseName = sqlQuery.match(/DROP DATABASE\s(\w+)/i)[1];
    }

    let data = await databaseCRUD(sqlQuery);

	document.getElementById("info").innerHTML = data;

    if (data["error"] == "") {
      //globalHideError();
      if (sqlStatementType == "SELECT" || sqlStatementType == undefined) {
        let values = data["result"];
        columnNames = await getColumnNames(currentTableName);
        createDataTable("dataTable", values, columnNames);
      } else if (sqlStatementType == "CREATE") {
        document.getElementById("info").innerHTML = "Table " + currentTableName + " created successfully.";
      } else if (sqlStatementType == "DROP TABLE") {
        document.getElementById("info").innerHTML = "Table " + currentTableName + " deleted successfully.";
      }else if (sqlStatementType == "DROP DATABASE") {
        document.getElementById("info").innerHTML = "Database " + currentDatabaseName + " deleted successfully.";
      }

    } else {
      document.getElementById("info").innerHTML = (data["error"]);
    }
  })();
});

//execute create new database Button
document.getElementById("btnCreateNewDatabase").addEventListener("click", function () {
	let newDatabaseName = document.getElementById("txtDatabaseName").value;
	(async () => {
		let data = await databaseCreateDatabase(newDatabaseName);
		console.log(data);
		if(data["error"] == ""){
			document.getElementById("info").innerHTML = data["result"];
		} else {
    		document.getElementById("info").innerHTML = data["error"];
    	}
	})();
});

// create new database function
async function databaseCreateDatabase(databaseName) {
	console.log(databaseName);
  return fetch("./db_createNewDb.php", {
    method: "post",
    body: JSON.stringify(databaseName),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch(function (error) {
      return error;
    });
}

// universal CRUD function
async function databaseCRUD(query) {
  return fetch("./db_CRUD.php", {
    method: "post",
    body: JSON.stringify(query),
  })
    .then((response) => {
    	
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch(function (error) {
      return error;
    });
}
//get column names from table
async function getColumnNames(currentTableName) {
  let sqlQuery = "SHOW COLUMNS FROM " + currentTableName;

  let data = await databaseCRUD(sqlQuery);
  let columnArray = [];
  if (data["error"] == "") {
    data.result.forEach((element) => {
      columnArray.push(element["Field"]);
    });
  } else {
    //globalShowError(data["error"]["errorInfo"]);
  }
  return columnArray;
}

//creates a table of the database results
function resetDataTable(tableId) {
  document.getElementById(tableId).innerHTML = "";
}
function createDataTable(tableId, dataValues, columnNames) {
  let dataTable = document.getElementById(tableId);
  dataTable.innerHTML = "";
  let dataTableHead = createElement("thead", {});
  let dataTableTr = createElement("tr", {});
  //create header columns
  columnNames.forEach((column) => {
    dataTableTr.appendChild(createElement("th", {}, column));
  });
  dataTableHead.appendChild(dataTableTr);
  dataTable.appendChild(dataTableHead);

  //create rows with items
  let dataTableBody = createElement("tbody", {});
  dataValues.forEach((row) => {
    let dataTableBodyTr = createElement("tr", {});
    Object.values(row).forEach((item) => {
      dataTableBodyTr.appendChild(createElement("td", { dataTest: "2" }, item));
    });
    dataTableBody.appendChild(dataTableBodyTr);
  });

  dataTable.appendChild(dataTableBody);
}
//universal Create Element function
function createElement(type, props, ...children) {
  let dom = document.createElement(type);
  if (props) Object.assign(dom, props);
  for (let child of children) {
    if (typeof child != "string" && typeof child != "number" && child != null) {
      dom.appendChild(child);
    } else {
      dom.appendChild(document.createTextNode(child));
    }
  }
  return dom;
}
