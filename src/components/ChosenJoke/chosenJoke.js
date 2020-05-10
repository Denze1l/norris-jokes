import React from "react";

const ChosenJoke = () => {
  // console.log(this.props.foundJoke.value, this.props.foundJoke.id);
  const { id, value } = this.props.foundJoke;
  return (
    <li>
      <p className="forID">ID: {id}</p>
      <p>{value}</p>
    </li>
  );
};

export default ChosenJoke;
