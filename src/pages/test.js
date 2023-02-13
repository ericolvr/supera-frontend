import React, { useState } from "react";

function UpdateInputNumber() {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <input type="number" value={value} onChange={handleChange} />
    </div>
  );
}

export default UpdateInputNumber;