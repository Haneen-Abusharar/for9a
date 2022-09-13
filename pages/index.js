import React, { useEffect, useState } from "react";

const Home = () => {

  const res = {
    statusCode: '404'
  }
  const { statusCode: code } = res;
  console.log(code);
  return <>
    <div className='mt-20 mr-20 ' >
      <h1>Hi</h1>
    </div>


  </>


}
export default Home;