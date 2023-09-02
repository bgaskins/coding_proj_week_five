/*Create a menu app as seen in this week’s video. What you create is up to you 
as long as it meets the following requirements:
Use at least one array.
Use at least two classes.
Your menu should have the options to create, view, and delete elements.*/

//Farm stand details. Farm stand name and the product they sell
class FarmStand  {
    constructor(standName) {
        this.standName = standName; // Name of farm stand
        this.products = []; // Farm stand products being sold
    }

    getFarmStandDetails() {
        return `
        ${this.standName} has ${this.products.length} product(s) in stock.
        `;
    }
}

class Product {
    constructor(standProduct) {
        this.standProduct = standProduct; //The product the stand sells
    }
    //Returns product
    getProductDetails() {
        return this.standProduct;
    }
}

class Menu {
    constructor() {
        this.stands = []; // Farm stands
        this.selectedStand = null; // Selected farm stand
    }

    start() { //Main menu options
        let selection = this.showMainMenuOptions(); 
        while (selection != '0') {
            switch (selection) {
                case '1':
                    this.createFarmStand(); //Create a farm stand
                    break;
                case '2':
                    this.viewFarmStand(); //View a farm stand by index
                    break;
                case '3':
                    this.deleteFarmStand(); //Delete a farm stand
                    break;
                case '4':
                    this.viewAllFarmStands(); //
                    break;
                default:
                    selection = '0';
            }
            selection = this.showMainMenuOptions();
        }
        alert("Thanks for visiting!");
    }
    //MAIN/PRODUCT MENUS//
    showMainMenuOptions() {
        return prompt(`
        0. Exit
        1. Create farm stand
        2. View farm stand
        3. Delete farm stand
        4. View all farm stands
        `);
    }
    //Returns the name of the farm stand's product
    showProductOptions(productInfo) {
        return prompt(`
        0. Back
        1. Add a product
        2. Delete a product
        -----------------
        ${productInfo} 
        -----------------

        `);
    }
    //Returns list of all farm stands
    viewAllFarmStands() {
        let farmStandList = '';
        for (let i = 0; i < this.stands.length; i++) {
            farmStandList += i + '.) ' + this.stands[i].standName + '\n';
        }
        alert(farmStandList);
    }
    //Creates a farm stand when added via the menu
    createFarmStand() {
        let standName = prompt("Enter a farm stand name: ");
        let newFarmStand = new FarmStand(standName);
        this.stands.push(newFarmStand);
    }
    //View a specific farm stand by inputting its index number
    viewFarmStand() {
        let index = prompt("Enter index # of farm stand you're searching for: ");
        if (index >= 0 && index < this.stands.length) {
            this.selectedStand = this.stands[index];
            let description = 'Farm stand: ' + this.selectedStand.standName + '\n';
            description += ' ' + this.selectedStand.getFarmStandDetails() + '\n';

            if (this.selectedStand.products && this.selectedStand.products.length > 0) {
                for (let i = 0; i < this.selectedStand.products.length; i++) {
                    description += i + '.) ' + this.selectedStand.products[i].getProductDetails() + '\n';
                }
            } else {
                description += 'No products available.\n';
            }
            //Product menu options
            let selection = this.showProductOptions(description);
            switch (selection) {
                case '1':
                    this.createProduct();
                    break;
                case '2':
                    this.deleteProduct();
                    break;
            }
        } else {
            alert('Invalid index.');
        }
    }
    //User inputs an index number and the corresponding farm stand is deleted
    deleteFarmStand() {
        let index = prompt('Enter the index of the farm stand you want to delete: ');
        if (index >= 0 && index < this.stands.length) {
            this.stands.splice(index, 1);
        }
    }
    //User inputs product name (apples, honey, etc.). Name is then pushed to product array to be accessed later
    createProduct() {
        if (this.selectedStand) {
            let standProduct = prompt("Enter a farm stand product name: ");
            this.selectedStand.products.push(new Product(standProduct));
        } else {
            alert('No farm stand selected.');
        }
    }
    //User inputs index number to find and then delete product 
    deleteProduct() {
        if (this.selectedStand && this.selectedStand.products.length > 0) {
            let index = prompt("Enter the index of the product you want to delete: ");
            if (index >= 0 && index < this.selectedStand.products.length) {
                this.selectedStand.products.splice(index, 1);
            } else {
                alert('Invalid index.');
            }
        } else {
            alert('No products available.');
        }
    }
}
//Starts the menu at startup
let menu = new Menu();
menu.start();