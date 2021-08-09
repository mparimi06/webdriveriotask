import { assert } from 'console';
import { count } from 'yargs';
import Page from './page';

class swaglabsloginpage extends Page{
     /**
     * define selectors using getter methods
     */
      get inputUsername () { return $('#user-name') }
      get inputPassword () { return $('#password') }
      get loginbutton () { return $('#login-button') }
      get productsHeader() {return $('.//span[text()="Products"]') }
      get productsortSelect () { return $('select.product_sort_container') }
      get productsortSelect1 () { return $('span.select_container') }
      get inventoryItem() {return $('div.inventory_item_price') }
      get shoppingcart() {return $('a.shopping_cart_link')}
      
      /**
       * a method to encapsule automation code to interact with the page
       * e.g. to login using username and password
       */
       constructor() {
        super();
      }
       async open () {
        await super.open('')
       }
      async login (username: string, password: string) {
        
          await this.inputUsername.setValue(username);
          await this.inputPassword.setValue(password);
          await this.loginbutton.click();
          
          await browser.waitUntil(
            async () => (await this.productsortSelect.isExisting()),
            {
                timeout: 5000
            });
          assert(await this.productsortSelect.isExisting(),"Login not successful")

        
      }      
    
}
export default new swaglabsloginpage();