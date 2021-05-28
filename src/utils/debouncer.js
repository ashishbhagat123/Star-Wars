
// Debouncer for delaying the api call 
export const debounce = (callback, timeout = 500) => {
    let timer
    return (e) => {
        timer && clearTimeout(timer)
        let val = e.target.value
        timer = setTimeout(() => {
            callback(val)
        }, timeout);
    }
}