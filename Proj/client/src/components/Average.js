import React from 'react';

function Average({data,colnum}) {
    
    var sum = 0;
    for (var i = 0;i< data.length;i++){
        sum += data[i][Object.keys(data[i])[colnum]]
    }
    var average = sum/(data.length)
    console.log(average)
  return (
    <div>
        {average}
    </div>
  );
}

export default Average;