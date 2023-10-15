export function isSSR (){
    if (typeof window === 'undefined') return true
    return false
}