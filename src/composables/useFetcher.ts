import { ref } from 'vue'
import { api } from '@/api'
import type { AxiosError, AxiosRequestConfig } from 'axios'

export function useFetcher<T>() {
  const data = ref<T>()
  const loading = ref(false)
  const error = ref<Error>()

  /**
   * GET an array from an endpoint. Manages `data`, `loading` and `error` refs by itself.
   */
  const getData = async (url: string, config?: AxiosRequestConfig) => {
    loading.value = true
    data.value = undefined
    error.value = undefined
    return api
      .get<T>(url, config)
      .then((res) => {
        data.value = res.data
        return data.value
      })
      .catch((err: AxiosError) => {
        console.error(err)
        error.value = new Error(err.message)
      })
      .finally(() => {
        loading.value = false
      })
  }

  return { data, loading, error, getData }
}
