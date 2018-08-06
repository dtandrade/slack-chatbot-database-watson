var ibmdb = require('ibm_db');
/**
  * Retrieve top N phrases
  *
  * Written by Dandara Andrade
  */

function fetchTopN(dsn, patientName) {
 try {
    var conn=ibmdb.openSync(dsn);

    var data=conn.querySync("select content from ( select content, count(*) as cnt from new_phrase inner join user on new_phrase.id_user = user.id_user where user.name_user=? group by content order by cnt desc limit 5 offset 0)", patientName);


    conn.closeSync();

    var resString="Data: \n";

    for (var i=0;i<data.length;i++) {
      resString+="Phrase: "+data[i]['CONTENT']+"\n";
    }

    // Return both generated string and data
    return {result : resString, data : data};
 } catch (e) {
     return { dberror : e }
 }
}

function main({patientName, __bx_creds: {dashDB:{dsn}}}) {
	return fetchTopN(dsn,patientName);
}
