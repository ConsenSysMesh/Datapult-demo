import React, { useState } from "react"

import useEmailCollector from "../hooks/use_email_collector"

const EmailCapture = () => {
  const {
    success,
    loading,
    error: submissionError,
    submit,
  } = useEmailCollector()

  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)

  const isValidEmail = input => {

    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(input).toLowerCase())
  }

  const handleEmailChange = e => {
    setEmail(e.target.value)
    if (error) {
      const valid = isValidEmail(e.target.value)
      if (valid) {
        setError(false)
      }
    }
  }

  const handleEmailSubmit = async e => {
    e.preventDefault()

    typeof window.gtag !== "undefined" &&
      window.gtag("event", "click", {
        category: "community",
        action: "email_submit",
        label: "signup",
      })

    const valid = isValidEmail(email)

    if (!valid) {
      setError(true)
      return
    }

    if (valid) {
      setError(false)
      submit(email)
      setEmail("")
    }
  }

  return (
    <>
      <form onSubmit={handleEmailSubmit}>
        <div className="input">
        <input
          type="email"
          name="email"
          placeholder="you@email.com"
          className="input"
          style={{ width: "70%" }}
          color={email === "invalid email" ? "red" : "black"}
          value={email}
          disabled={success}
          onChange={handleEmailChange}
        />
        {loading ? (
          <p className="lead">SUBMITTING...</p>
        ) : success ? (
          <p className="lead">Thanks. We will be in touch!</p>
        ) : (
          <button
            type="button"
            onClick={handleEmailSubmit}
          >
            Submit
          </button>
        )}
        </div>
      </form>
      {error && <p style={{ color: "red" }}>Invalid email</p>}
      {submissionError && <p style={{ color: "red" }}>{submissionError}</p>}
    </>
  )
}

export default EmailCapture
