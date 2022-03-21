import React from 'react';
import Filepult from "./filepult"

const Hero = () => {
  return (
    <div className="flex flex-wrap mx-auto">
      <div className="lg:w-1/2 mt-4 text-lg px-8">
        <h1 className="jumbo">Datapult</h1>
        <p className="lead">A free social media image sharing utility built on Web3 decentralized storage</p>
        <p className="lead-copy pt-4">
        <span className="font-bold">Share share share</span> with much web3 frens! Datapult is free and lets you share images on social media and is backed by IPFS and the Filecoin network. Drop an image in the box to try it out!</p>
      </div>
      <div className="flex mx-auto w-full lg:w-1/2 p-8 lg:pt-28 justify-center">
        <Filepult />
      </div>
    </div>
  );
}

export default Hero
