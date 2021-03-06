var ibmdb = require('ibm_db');
/**
  * Retrieve all phrases selected by the patient.
  *
  * Written by Dandara Andrade
  */

function fetchPhrasesByStartDate(dsn, patientName, startDate) {
 try {
    var conn=ibmdb.openSync(dsn);

    var data=conn.querySync("select new_phrase.content, count(*) as cnt from new_phrase inner join user on new_phrase.id_user = user.id_user where user.name_user =? and new_phrase.recorded_date >?  group by content order by cnt desc", patientName, startDate);


    conn.closeSync();

    var resString="Data: \n";

    for (var i=0;i<data.length;i++) {
      resString+="Phrase: "+data[i]['CONTENT']+" Count: "+data[i]['CNT']+"\n";
    }

    // Return both generated string and data
    return {result : resString, data : data};
 } catch (e) {
     return { dberror : e }
 }
}

function main({patientName, startDate, __bx_creds: {dashDB:{dsn}}}) {
	return fetchPhrasesByStartDate(dsn,patientName, startDate);
}
