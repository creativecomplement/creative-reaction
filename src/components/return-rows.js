export default function returnRows(batchRowValues){
    //Let batchRowsGather = batchRowValues;
    const rows = [];
    for (let i = 1; i < batchRowValues.length; i++) {
        let rowObject = {};
        for (let j = 0; j < batchRowValues[i].length; j++) {
          rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
        }
        rows.push(rowObject);
      }

      return rows;
}