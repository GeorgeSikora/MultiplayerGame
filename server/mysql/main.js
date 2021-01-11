
//mysqlCon.connect();

/* EXAMPLE
connection.query('SELECT * FROM players', function (error, results, fields) {
  if (error) throw error;

  for(result in results) {
    var p = results[result];
    console.log( result + '. name: ' + p.name + ' password: ' + p.password + ' ip: ' + p.ip);
  } 
});
*/

// UPDATE players SET connected=0

mysqlCon.query('UPDATE players SET connected=0', function (error, results, fields) {
  if (error) throw error;
});

/*
mysqlCon.query('SELECT * FROM players', function (error, results, fields) {
    if (error) throw error;

    //console.log(results);
  
    for(result in results) {
      var p = results[result];
      console.log( result + '. name: ' + p.name + ' password: ' + p.password + ' ip: ' + p.ip);
    } 
});
 */
//mysqlCon.end();