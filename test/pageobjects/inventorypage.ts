import { assert } from 'console';
import Page from './page';

class inventorypage extends Page{
    get productsortSelect () { return $('select.product_sort_container') }
    get inventoryItem() {return $('.//div[@class="inventory_item_price"]') }
    get shoppingcart() {return $('.//span[@class="shopping_cart_badge"]')}
    get checkoutButton() {return $('#checkout')}
    get invPrice1() {return $('(.//div[@class="inventory_item_price"])[1]')}
    get invPrice2() {return $('(.//div[@class="inventory_item_price"])[2]')}
    get checkoutContainer() {return $('#checkout_info_container')}
    
    
       async sortProducts(){
        browser.pause(5000);
        // await this.productsortSelect.selectByVisibleText('Price (high to low)');
        await this.productsortSelect.selectByAttribute("value",'hilo');
        browser.pause(5000);
        await browser.waitUntil(
            async () => (await this.inventoryItem.isExisting()),
            {
                timeout: 5000
            });
        assert(await this.inventoryItem.isExisting(),"Inventory Items not found");

    }
    async addproductsToCart1(){
         const elements= $$('.//div[@class="inventory_item_price"]/../button');
       
        await elements[numberofProducts-1].click();
        await elements[numberofProducts].click();
        this.inventoryItem.click();
        this.shoppingcart.click();
    }
    async  addproductsToCart(){
        let elements= browser.$$('.//div[@class="inventory_item_price"]/../button');
        
        const results = await elements.filter(function (ele) {
            return ele;       
        });

        const count= await results.length;
        console.log("Number of products:"+ count);
    
        await $('(.//div[@class="inventory_item_price"]/../button)['+count+']').click();
    
        browser.pause(2000);
       
        await $('(.//div[@class="inventory_item_price"]/../button)['+(count-1)+']').click();
      
        await this.shoppingcart.click();
        browser.pause(5000);
        var value1 = await this.invPrice1.getText();
        var value2 = await this.invPrice2.getText();
        console.log(value1);
        console.log(value2);
        if(+value1 > +value2){
            await $('(.//div[@class="inventory_item_price"]/../button)[2]').click();
        }
        else await $('(.//div[@class="inventory_item_price"]/../button)[1]').click();
        await this.checkoutButton.click();
        browser.pause(5000);
        await browser.waitUntil(
            async () => (await this.checkoutContainer.isExisting()),
            {
                timeout: 5000
            });
          assert(await this.checkoutContainer.isExisting(),"Checkout page not opened")
    }
}
export default new inventorypage();
