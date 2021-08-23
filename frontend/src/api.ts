import axios from 'axios'

const CSRF_TOKEN_NAME = 'csrf-token'
const CSRF_HEADER_NAME = 'CSRF-Token'

/**
 * cookie
 * Returns the value of the first cookie matching name `name`
 * or undefined.
 */
export function cookie(name: string): string | undefined {
  // Inspired from
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie#example_2_get_a_sample_cookie_named_test2
  return document.cookie
    .split('; ')
    .find((entry) => entry?.split('=')[0] === name)
    ?.split('=')[1]
}

export function hasCSRFToken() {
  return cookie(CSRF_TOKEN_NAME)
}

export function fetchCSRFToken() {
  client
    .get('/auth/csrf')
    .then(() => {
      client.defaults.headers[CSRF_HEADER_NAME] = cookie(CSRF_TOKEN_NAME)
    })
    .catch((error) => {
      console.warn('Received error while fetching CSRF token :', error)
    })
}

type HeaderEntry = {
  [name: string]: string
}

const client = axios.create({
  headers: [
    {
      name: CSRF_HEADER_NAME,
      value: cookie(CSRF_TOKEN_NAME),
    },
  ].reduce<HeaderEntry>((headers, entry) => {
    if (entry.value) {
      headers[entry.name] = entry.value
    }
    return headers
  }, {}),
})

export default client
