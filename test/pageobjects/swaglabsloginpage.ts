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

      async sortProducts(){
        browser.pause(5000);
        // await this.productsortSelect.selectByVisibleText('Price (high to low)');
        await this.productsortSelect.click();
        $('.//option[text()="Price (high to low)"]').click();
       
        await browser.waitUntil(
            async () => (await this.inventoryItem.isExisting()),
            {
                timeout: 5000
            });
        assert(await this.inventoryItem.isExisting(),"Inventory Items not found");

    }
    async addproductsToCart(){
        //  const elements= browser.$$('button.btn_inventory');
        var count=0;
         var results = browser.$$('button.btn_inventory').forEach(element => {
          console.info("Number of products: "+count); 
          count=count+1;
          });
        
         console.info("Number of products: ");
        //  var  numberofProducts=results
         console.info("Number of products: "+count);
        
        // await browser.elementIdClick(elements.value[numberofProducts-1].ELEMENT);
        // await browser.elementIdClick(elements.value[numberofProducts-2].ELEMENT);
        var element = browser.$$('button.btn_inventory')[count];
        element.click();
        browser.pause(5000);
        element = browser.$$('button.btn_inventory')[count-1];
        element.click();
        browser.pause(5000);
      //  this.inventoryItem.click();
        browser.moveTo(this.shoppingcart,0,0);
        await this.shoppingcart.click();
        browser.pause(5000);
    }
}
export default new swaglabsloginpage();