
mysqlCon = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'multiplayergame'
});

mysqlCon.connect();

/* EXAMPLE
connection.query('SELECT * FROM players', function (error, results, fields) {
  if (error) throw error;

  for(result in results) {
    var p = results[result];
    console.log( result + '. name: ' + p.name + ' password: ' + p.password + ' ip: ' + p.ip);
  } 
});
*/

mysqlCon.query('SELECT * FROM players', function (error, results, fields) {
    if (error) throw error;

    console.log(results);
  
    for(result in results) {
      var p = results[result];
      console.log( result + '. name: ' + p.name + ' password: ' + p.password + ' ip: ' + p.ip);
    } 
});
 
mysqlCon.end();