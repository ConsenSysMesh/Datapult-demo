import { useState } from "react"
import { submitEmail } from "../utils/submit_forms"

const useEmailCollector = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async email => {
    setLoading(true)
    try {
      // send the email to the back end api
      const resp = await submitEmail(email)
      if (resp && resp.status === 200) {
        setSuccess(true)
      } else {
        const jsonResp = JSON.parse(resp.body)
        // eslint-disable-next-line no-console
        console.log("Form error", jsonResp.error)
        setError(`Error submitting email: ${jsonResp.error}`)
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      setError(`Error submitting email: ${e.toString()}`)
    } finally {
      setLoading(false)
    }
  }

  return {
    success,
    error,
    loading,
    submit,
  }
}

export default useEmailCollector
