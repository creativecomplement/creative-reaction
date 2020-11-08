export default function returnRows(batchRowValues){
    //Let batchRowsGather = batchRowValues;
    const rows = [];
    for (let i = 1; i < batchRowValues.length; i++) {
        let rowObject = {};
        for (let j = 0; j < batchRowValues[i].length; j++) {
            if (j < 2) {
              rowObject[batchRowValues[0][j]] = parseInt(batchRowValues[i][j]);
            } else if (j > 2){
              rowObject[batchRowValues[0][j]] = Boolean(parseInt(batchRowValues[i][j]));
            } else {
              rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
            }
          
          //console.log(rowObject);
        }
        rows.push(rowObject);
      }

      return rows;
}