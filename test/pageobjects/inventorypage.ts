import { assert } from 'console';
import Page from './page';
import $ from 'jquery';

class inventorypage extends Page{
    get productsortSelect () { return $('span.select_container select') }
    get inventoryItem() {return $('.//div[@class="inventory_item_price"]') }
    get shoppingcart() {return $('.//span[@class="shopping_cart_badge"]')}
    
    async open () {
        await super.open('')
       }
    async sortProducts(sortOrderValue: String){
        // await this.inventoryItem.click();
        browser.pause(5000);
        await this.productsortSelect.selectByVisibleText('Price (high to low)');
        browser.pause(5000);
        await browser.waitUntil(
            async () => (await this.inventoryItem.isExisting()),
            {
                timeout: 5000
            });
        assert(await this.inventoryItem.isExisting(),"Inventory Items not found");

    }
    async addproductsToCart(){
         const elements= $$('.//div[@class="inventory_item_price"]/../button');
         var  numberofProducts=elements.size()
        await elements[numberofProducts-1].click();
        await elements[numberofProducts].click();
        this.inventoryItem.click();
        this.shoppingcart.click();
    }
}
export default new inventorypage();
