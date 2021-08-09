/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
   
    // open (path: string) {
    //     return browser.url(`https://the-internet.herokuapp.com/${path}`)
    // }

    open (url: string) {
        return browser.url(url)
    }
}
