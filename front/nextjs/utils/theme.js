'use client'

function getTheme() {
  return typeof window !== 'undefined'
    ? window.localStorage.getItem('theme')
    : 'dark'
}

export { getTheme }
