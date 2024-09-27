
import Image from "next/image";
// import Signup from  "./teaser/page";
import SignUpPage from "./sign-up/page";
import React from "react";
import FarmersDetails from "./farmerdetails/page";

function App() {
  return (

    <div>

      {/* <Signup/> */}
      <SignUpPage/>
     <FarmersDetails />
    </div>
  );
}

export default App;
