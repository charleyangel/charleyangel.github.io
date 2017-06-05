// JavaScript source code
function Food(slots) {
    this.type = slots.type;
    this.foodname = slots.foodname;
    this.quantity = slots.quantity;
    this.unit = slots.unit;
    this.price = slots.price;
    this.supermarket = slots.supermarket;
}

Food.instances = {};  // initially an empty associative array

// Convert row to object
Food.convertRow2Obj = function (foodRow) {
    var response = new Food( foodRow);
    return response;
};
// Load the Food table from Local Storage
Food.loadAll = function () {
    var key = "", keys = [], foodsString = "", foodlist = {}, i = 0;
    try {
        if (localStorage.getItem("Foods")) {
            foodsString = localStorage.getItem("Foods");
        }
    } catch (e) {
        alert("Error when reading from Local Storage\n" + e);
    }
    if (foodsString) {
        foodParsedString = JSON.parse( foodsString);
        keys = Object.keys(foodParsedString);
        console.log(keys.length + " Food loaded.");
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            Food.instances[key] = Food.convertRow2Obj( foodParsedString[key]);
        }
    }
};
//  Save all Food objects to Local Storage
Food.saveAll = function () {
    var foodsString = "", error = false,
        nmrOfFoods = Object.keys(Food.instances).length;
    try {
        foodsString = JSON.stringify(Food.instances);
        localStorage.setItem("Foods", foodsString);
    } catch (e) {
        alert("Error when writing to Local Storage\n" + e);
        error = true;
    }
    if (!error) console.log(nmrOfFoods + " Foods saved.");
};
//  Create a new Food row
Food.add = function (slots) {
    var food = new Food(slots);
    Food.instances[slots.foodname] = food;
    console.log("Food " + slots.foodname + " created!");
};
//  Update an existing Food row
Food.update = function (slots) {
    var food = Food.instances[slots.foodname];
    if (Food.foodname !== slots.foodname) { Food.foodname = slots.foodname; }
    console.log("Food " + slots.foodname + " modified!");
};
//  Delete a Food row from persistent storage
Food.destroy = function (foodname) {
    if (Food.instances[foodname]) {
        console.log("Food " + foodname + " deleted");
        delete Food.instances[foodname];
    } else {
        console.log("There is no food with the name " + foodname + " in the database!");
    }
};
/*******************************************
*** Auxiliary methods for testing **********
********************************************/
//  Create and save test data
Food.createTestData = function () {
    Food.instances["Milk - Semi Skimmed"] = new Food({ type: "Chilled", foodname: "Milk - Semi Skimmed", quantity: 4, unit: "pints", price: 1.19, supermarket: "Aldi" });
    Food.instances["Lean Beef Mince"] = new Food({ type: "Chilled", foodname: "Lean Beef Mince", quantity: 500, unit: "grams", price: 2.89, supermarket: "Aldi" });
    Food.instances["Goodfellas Pizza - Margharita"] = new Food({ type: "Frozen", foodname: "Goodfellas Pizza - Margharita", quantity: 1, unit: "", price: 2.49, supermarket: "Tesco" });
    Food.saveAll();
};
//  Clear data
Food.clearData = function () {
    if (confirm("Do you really want to delete all food data?")) {
        Food.instances = {};
        localStorage.setItem("food", "{}");
    }
};