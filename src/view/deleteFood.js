/***********************************************
***  Methods for the use case "delete food"  ***
************************************************/
sp.view.deleteFood = {
    setupUserInterface: function () {
        var deleteButton = document.forms['Food'].commit;
        var selectEl = document.forms['Food'].selectFood;
        var key = "", keys = [], food = null, optionEl = null, i = 0;
        // load all food objects
        Food.loadAll();
        keys = Object.keys(Food.instances);
        // populate the selection list with foods
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            food = Food.instances[key];
            optionEl = document.createElement("option");
            optionEl.text = food.foodname;
            selectEl.add(optionEl, null);
        }
        deleteButton.addEventListener("click",
            sp.view.deleteFood.handleDeleteButtonClickEvent);
        window.addEventListener("beforeunload", function () {
            Food.saveAll();
        });
    },
    // Event handler for deleting a food
    handleDeleteButtonClickEvent: function () {
        var selectEl = document.forms['Food'].selectFood;
        var foodname = selectEl.value;
        if (foodname) {
            Food.destroy(foodname);
            // remove deleted food from select options
            selectEl.remove(selectEl.selectedIndex);
        }
    }
};
