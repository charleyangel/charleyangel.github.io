/***********************************************
***  Methods for the use case updateFood  ******
************************************************/
sp.view.updateFood = {
    setupUserInterface: function () {
        var formEl = document.forms['Food'],
            saveButton = formEl.commit,
            selectFoodEl = formEl.selectFood;
        var key = "", keys = [], food = null, optionEl = null, i = 0;
        // load all food objects
        Food.loadAll();
        // populate the selection list with foods
        keys = Object.keys(Food.instances);
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            food = Food.instances[key];
            optionEl = document.createElement("option");
            optionEl.text = food.foodname;
            selectFoodEl.add(optionEl, null);
        }
        // when a food is selected, populate the form with the food data
        selectFoodEl.addEventListener("change", function () {
            var food = null, key = selectFoodEl.value;
            if (key) {
                food = Food.instances[key];
                formEl.type.value = food.type;
                formEl.foodname.value = food.foodname;
                formEl.quantity.value = food.quantity;
                formEl.unit.value = food.unit;
                formEl.price.value = food.price;
                formEl.supermarket.value = food.supermarket;
            } else {
                formEl.reset();
            }
        });
        saveButton.addEventListener("click",
            sp.view.updateFood.handleSaveButtonClickEvent);
        window.addEventListener("beforeunload", function () {
            Food.saveAll();
        });
    },
    // save data
    handleSaveButtonClickEvent: function () {
        var formEl = document.forms['Food'];
        var slots = {
            type: formEl.type.text,
            foodname: formEl.foodname.text,
            quantity: formEl.quantity.value,
            unit: formEl.unit.text,
            price: formEl.price.value,
            supermarket: formEl.supermarket.text
        };
        Food.update(slots);
        formEl.reset();
    }
};
