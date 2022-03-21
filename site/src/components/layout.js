import * as React from "react"

const Layout = ({ children }) => {

  return (
    <>
      <div className="container mx-auto" >
        <main>{children}</main>
        <footer>
 
          <h3 className="text-xl font-bold">
            ⚡️ This is experimental software. Use at your own risk! ⚡️</h3>
          <h5 className="pb-4">
            Also, thanks 🙏 for trying it out. Send us your feedback! 📢 
          </h5>
          © {new Date().getFullYear()}, Built by
          {` `}
          <a href="https://team-zero.dev">Team Zero</a><br/>
          <a href="https://team-zero.dev">https://team-zero.dev</a><br/>
          <a href="https://twitter.com/TeamZeroDev">@TeamZeroDev</a><br/>
          { process.env.CF_PAGES &&
             <p className="text-xs color-gray-400">{process.env.CF_PAGES_BRANCH}-{process.env.CF_PAGES_COMMIT_SHA}</p>
          }
        </footer>
      </div>
    </>
  )
}

export default Layout
