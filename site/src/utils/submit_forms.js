const FORM_API_URL = "http://localhost:3000/dev"

const headers = {
  "Content-Type": "application/json",
}

const submitEmail = async email => {
  try {
    return await fetch(`${FORM_API_URL}/collectEmail`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

const submitFeedback = async (email, location, message) => {
  try {
    return await fetch(`${FORM_API_URL}/collectFeedback`, {
      method: "POST",
      body: JSON.stringify({ email, location, message }),
      headers,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}
export { submitEmail, submitFeedback }
