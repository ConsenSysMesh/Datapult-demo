import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Hero from "../components/hero"
import HowItWorks from "../components/howitworks"
import About from "../components/about"
import InputFields from "../components/inputFields"
import "../styles/global.css"

const IndexPage = () => (
  <Layout>
    <Seo title='Web launcher'/>
    <Hero />
    <HowItWorks />
    <InputFields />
    <About />
  </Layout>
)

export default IndexPage
