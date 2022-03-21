import React from 'react';

import Pick1 from "../images/1_PICK"
import Pick2 from "../images/2_PICK"
import Pick3 from "../images/3_PICK"

const HowItWorks = () => {
  return (
    <div className="my-8 howitworks px-4">
      <h2>How It works</h2>
      <div className="flex flex-col lg:flex-row gap-4 justify-center">
        <div className="lg:w-1/3 p-4 px-8">
          <div className="lg:-ml-8"><Pick1 /></div>
          <h3 className="-mt-8">Pick</h3>
          <p>Choose the image you want to share from your photo library or media files.</p>
        </div>
        <div className="lg:w-1/3 p-4 px-8">
          <div className="lg:-mt-2"><Pick2 /></div>
          <h3 className="-mt-8 lg:-mt-6">Pult</h3>
          <p>Your file gets packaged, processed, and catapulted to the distributed web where it can be seen by all and stored for all time.</p>
        </div>
        <div className="-mt-4 lg:w-1/3 p-4 px-8">
          <div><Pick3 /></div>
          <h3 className="-mt-8 lg:-mt-4">Publish</h3>
          <p>Publish your tweet with your custom datapult link and your followers will see you use web3 to share your media</p>
        </div>
      </div>

    </div>
  );
}

export default HowItWorks
