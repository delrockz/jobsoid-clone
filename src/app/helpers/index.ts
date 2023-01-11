export const debounce = (func: any, timeout = 500) => {
  let timer = 0

  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}
