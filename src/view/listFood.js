/**
 * @fileOverview  Contains various view functions for the use case listFoods
 * @author Gerd Wagner
 */
sp.view.listFood = {
    setupUserInterface: function () {
        var tableBodyEl = document.querySelector("table#food>tbody");
        var keys = [], key = "", row = {}, i = 0;
        // load all food objects
        Food.loadAll();
        keys = Object.keys(Food.instances);
        // for each food, create a table row with a cell for each attribute
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            row = tableBodyEl.insertRow();
            row.insertCell(-1).textContent = Food.instances[key].type;
            row.insertCell(-1).textContent = Food.instances[key].foodname;
            row.insertCell(-1).textContent = Food.instances[key].quantity;
            row.insertCell(-1).textContent = Food.instances[key].unit;
            row.insertCell(-1).textContent = Food.instances[key].price;
            row.insertCell(-1).textContent = Food.instances[key].supermarket;
        }
    }
};
