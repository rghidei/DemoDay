function  getDate(dateTime){
   return dateTime.toISOString().slice(0, 19).replace("T", " ");
 }

exports.getDate = getDate
