var ibmdb = require('ibm_db');
/**
  * Retrieve all phrases selected by the patient.
  *
  * Written by Dandara Andrade
  */

function fetchLastPhrase(dsn, patientName) {
 try {
    var conn = ibmdb.openSync(dsn);

    var data = conn.querySync("select content, recorded_date, recorded_time from new_phrase inner join user on new_phrase.id_user = user.id_user where user.name_user=? and id_phrase = (select max(id_phrase) from new_phrase)", patientName);


    conn.closeSync();

    var resString="Data: \n";

    for (var i=0;i<data.length;i++) {
      resString+="Phrase: "+data[i]['CONTENT']+" Date: "+data[i]['RECORDED_DATE']+" Time: "+data[i]['RECORDED_TIME']+"\n";
    }

    // Return both generated string and data
    return {result : resString, data : data};
 } catch (e) {
     return { dberror : e }
 }
}

function main({patientName, __bx_creds: {dashDB:{dsn}}}) {
	return fetchLastPhrase(dsn,patientName);
}
