//when using the sheets data I need to go through and get the
//values by reading through each set (looping)
//it is not a json file returned, close-ish
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