import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import HowItWorks from "../components/howitworks"
import About from "../components/about"
import InputFields from "../components/inputFields"
import "../styles/global.css"
import QRcode from "../images/qrcode"

const IndexPage = () => (
  <Layout>
    <Seo title='Web launcher'/>
    <div className="flex flex-wrap mx-auto">
      <div className="lg:w-1/2 mt-4 text-lg px-8">
        <h1 className="jumbo">Datapult</h1>
        <p className="lead">A free social media image sharing utility built on Web3 decentralized storage</p>
        <div className="pt-24" dangerouslySetInnerHTML={{__html: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/679305124?h=2e87c18e73&autoplay=1&loop=1&title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`}} /> 
      </div>
      <div className="flex mx-auto w-full lg:w-1/2 p-8 lg:pt-28 justify-center">
        <QRcode />
      </div>
    </div>
    <HowItWorks />
    <InputFields />
    <About />
  </Layout>
)

export default IndexPage
