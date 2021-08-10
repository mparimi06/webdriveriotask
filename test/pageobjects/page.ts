/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {

    open (url: string) {
        return browser.url(url)
    }
}
