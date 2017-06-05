/***********************************************
***  Methods for the use case createFood  ******
************************************************/
sp.view.createFood = {
    setupUserInterface: function () {
        var saveButton = document.forms['Food'].commit;
        // load all food objects
        Food.loadAll();
        // Set an event handler for the save/submit button
        saveButton.addEventListener("click",
            sp.view.createFood.handleSaveButtonClickEvent);
        window.addEventListener("beforeunload", function () {
            Food.saveAll();
        });
    },
    // save user input data
    handleSaveButtonClickEvent: function () {
        var formEl = document.forms['Food'];
        var slots = {
            type: formEl.type.value,
            foodname: formEl.foodname.value,
            quantity: formEl.quantity.value,
            unit: formEl.unit.value,
            price: formEl.price.value,
            supermarket: formEl.supermarket.value
        };
        Food.add(slots);
        formEl.reset();
    }
};
