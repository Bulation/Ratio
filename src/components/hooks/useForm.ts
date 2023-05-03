import { ref } from "vue";

export default function useForm(
  formState: Record<string, any>,
  errors: Record<string, boolean>,
  rules: Record<string, (value: string) => boolean>
) {
  const isSubmitDisabled = ref(false)
  const clearError = (errorKey: string) => {
    isSubmitDisabled.value = false
    if (errors[errorKey] !== undefined) {
      errors[errorKey] = false
    }
  }

  const validateForm = () => {
    Object.keys(errors).forEach((key) => {
      const isError = rules[key](formState[key])
      errors[key] = isError
      if (!isSubmitDisabled.value && isError) {
        isSubmitDisabled.value = true
      }
    })
  }

  const updateFormState = (value: string, name: string) => {
    formState[name] = value
    clearError(name)
  }
  return { isSubmitDisabled, clearError, updateFormState, validateForm }
}