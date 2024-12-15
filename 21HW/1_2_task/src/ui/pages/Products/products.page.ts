import { SalesPortalPage } from "../salesPortal.page";
import deleteProductModal from "./deleteProduct.modal";
import detailsProductModal from "./details.modal";

class ProductsPage extends SalesPortalPage {
  private ["Details Modal"] = detailsProductModal;
  readonly ["Delete Modal"] = deleteProductModal;
  readonly ["Add New Product"] = "button.page-title-button";
  readonly Title = '//h2[.="Products List "]';
  readonly ["Table row"] = (productName: string) => `//tr[./td[.="${productName}"]]`;
  readonly ["Product Name in table"] = (productName: string) => `${this["Table row"](productName)}/td[1]`;
  readonly ["Product Price in table"] = (productName: string) => `${this["Table row"](productName)}/td[2]`;
  readonly ["Product Manufacturer in table"] = (productName: string) => `${this["Table row"](productName)}/td[3]`;
  readonly ["Product Creation Date in table"] = (productName: string) => `${this["Table row"](productName)}/td[4]`;
  readonly ["Product Delete button in table"] = (productName: string) =>
    `${this["Table row"](productName)}//button[@title="Delete"]`;
  readonly ["Product Details button in table"] = (productName: string) =>
    `${this["Table row"](productName)}//button[@title="Details"]`;
  readonly ["Search Field"] = 'input[type="search"]';
  readonly ["Search Button"] = 'button[type="submit"]';
  readonly ["Table Rows"] = "table tbody tr";
 

  async clickOnAddNewProduct() {
    await this.click(this["Add New Product"]);
  }

  async waitForPageOpened(): Promise<void> {
    await this.waitForDisplayed(this.Title);
    await this.waitForSpinnersToBeHidden("Products");
  }

  async getProductFromTable(productName: string) {
    const [name, price, manufacturer] = await Promise.all([
      this.getText(this["Product Name in table"](productName)),
      this.getText(this["Product Price in table"](productName)),
      this.getText(this["Product Manufacturer in table"](productName)),
    ]);

    return {
      name,
      price: +price.replace("$", ""),
      manufacturer,
    };
  }

  async clickOnDeleteProductButton(productName: string) {
    await this.click(this["Product Delete button in table"](productName));
  }

  async clickOnDetailsProductButton(productName: string) {
    await this.click(this["Product Details button in table"](productName));
  }
  async fillSearchField(text: string) {
    await this.setValue(this["Search Field"], text);
  }

  async clickSearchButton() {
    await this.click(this["Search Button"]);
  }

}

export default new ProductsPage();
