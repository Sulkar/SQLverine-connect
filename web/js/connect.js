
NAS_DOMAIN = undefined; //"https://sqlverine.synology.me/db_CRUD.php"

function getNasDomain(){
		NAS_DOMAIN = document.getElementById("txtNasDomain").value;
}

//execute SQL Button
document.getElementById("btnExecuteSQL").addEventListener("click", function () {
	getNasDomain();
  resetDataTable("dataTable");
  let sqlQuery = document.getElementById("txtSQLData").value;

  let columnNames = undefined;
  let sqlStatementType = undefined;
  let currentTableName = undefined;
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
    }

    let data = await databaseCRUD(sqlQuery);

	document.getElementById("info").innerHTML = data;
    if (data["error"] == "") {
      //globalHideError();
      if (sqlStatementType == "SELECT") {
        let values = data["result"];
        columnNames = await getColumnNames(currentTableName);
        createDataTable("dataTable", values, columnNames);
      } else if (sqlStatementType == "CREATE") {
        //globalShowSuccess("Table " + currentTableName + " created successfully.");
      } else if (sqlStatementType == "DROP TABLE") {
        //globalShowSuccess("Table " + currentTableName + " deleted successfully.");
      }

    } else {
      document.getElementById("info").innerHTML = (data["error"]["errorInfo"]);
      //globalHideLoader("loaderDIV");
    }
  })();
});

// universal CRUD function
async function databaseCRUD(query) {
  return fetch(NAS_DOMAIN, {
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