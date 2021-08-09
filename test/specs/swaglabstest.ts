import swaglabsloginpage from "../pageobjects/swaglabsloginpage"
import inventorypage from "../pageobjects/inventorypage"


describe('SwagLabs Demo Application', () => {
    it('login successful with standard user', async () => {
      await swaglabsloginpage.open("https://www.saucedemo.com");
      browser.maximizeWindow();
      await swaglabsloginpage.login('standard_user', 'secret_sauce');
    });
    
    it('Sort the products by Price high to low', async () => {
      swaglabsloginpage.sortProducts();
    });

    it('Add the two cheapest products to your basket ', async () => {
      swaglabsloginpage.addproductsToCart();
  });
    
});
