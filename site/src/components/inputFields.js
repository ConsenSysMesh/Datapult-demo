import React from 'react';
import IosSignup from "./ios"
import AndroidSignup from "./android"
import "../styles/global.css"

const InputFields = () => {
  return (
    <div className="flex flex-wrap p-8">
      <div className="flex-col mx-auto w-full lg:w-1/3 lg:justify-center pb-8">
        <h2>iOS Private Beta</h2>
        <p className="pb-4">
          Interested in trying the iOS app? Sign up to get notified when spots open up in our private beta.
        </p>
        <IosSignup />
      </div>
      <div className="flex-col mx-auto w-full lg:w-1/3 lg:justify-center pb-8">
        <h2>Android App Launch</h2>
        <p className="pb-4">
          Want to see Datapult on Android? Sign-up here and we'll let you know when it's ready.
        </p>
        <AndroidSignup/>
      </div>
    </div>
  );
}

export default InputFields
