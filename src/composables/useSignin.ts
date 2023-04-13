import { ref } from 'vue'
import { api, setLocalToken } from '@/api'
import { AxiosError, isAxiosError } from 'axios'

export function useSignin() {
  // email input
  const email = ref<string>()
  // password input
  const password = ref<string>()
  // server error message response
  const errorMessage = ref<string>()
  // bootstrap was-validated class on the form
  const wasValidated = ref<boolean>(false)

  interface IsValid {
    email: null | boolean
    password: null | boolean
  }
  interface SigninSuccessResponse {
    token: string
  }
  interface SigninErrorResponse {
    message: string
    isValid: IsValid
  }

  /**
   * Default value of isValid
   */
  const isValidDefault = {
    email: null,
    password: null
  }

  /**
   * /auth/signin endpoint returns such isValid object. It holds booleans if certain fields are valid or not. And null if unknown.
   */
  const isValid = ref<IsValid>(isValidDefault)

  /**
   * Is called when the form is submitted. At this point it has passed browser's built-in validation
   */
  const handleSignIn = async () => {
    wasValidated.value = false // remove bootstrap class (remove browser's built-in validation)
    api
      .post<SigninSuccessResponse>('/auth/signin', {
        email: email.value,
        password: password.value
      })
      .then((response) => {
        const { token } = response.data
        setLocalToken(token)
      })
      .catch((error: Error | AxiosError) => {
        // if (isAxiosError<SigninErrorResponse>(error) && error?.response?.data?.isValid) {
        if (isAxiosError(error) && error?.response?.data?.isValid) {
          errorMessage.value = error.response.data.message
          isValid.value = error.response.data.isValid
          console.error(error.response.data.message)
        } else console.error(error)
      })
  }

  /**
   * Is called when submit button is pressed. Useful when the form doesn't pass browser's built-in validation.
   */
  const handlePreSubmit = () => {
    wasValidated.value = true
    errorMessage.value = undefined
  }

  return {
    handleSignIn,
    handlePreSubmit,
    email,
    password,
    errorMessage,
    wasValidated,
    isValid,
    isValidDefault
  }
}
