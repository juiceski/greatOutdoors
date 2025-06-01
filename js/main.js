/*eslint-env browser*/

function validate(parent) {
    parent.classList.remove("invalid");
    parent.classList.add("valid");
}

function invalidate(parent) {
    parent.classList.remove("valid");
    parent.classList.add("invalid");
}

function formValidator(element) {
    var id = element.id;
    var value = element.value;
    var parent = element.parentNode
    var productIds = ["100109", "100110", "100111", "100201", "100301", "100302"]
    if (id == "name") {
        (value.length >= 4 && !/[^a-z]/i.test(value)) ? validate(parent) : invalidate(parent);
    }    
    else if (id == "phone") {
        (/[0-9]{3}\s{1}[0-9]{3}\s{1}[0-9]{4}/.test(value)) ? validate(parent) : invalidate(parent);
    }    
    else if (id == "productId") {
        (productIds.includes(value)) ? validate(parent) : invalidate(parent);
    }
    else if (id == "msg") {
        (value.length >= 10 && value.length <= 30) ? validate(parent) : invalidate(parent);
    }
}

function hideProductInput(element) {
    var value = element.value;
    var fields = document.getElementsByName("productId");
    var hide = true;
    if (value == "productInfo") { hide = false; }
    for (var i = 0; i < fields.length; i++) {
        fields[i].hidden = hide;
        fields[i].parentNode.classList.remove("invalid");
        fields[i].parentNode.classList.remove("valid");
        if (hide) { fields[i].value = ""; }
    }
}

function showModal() {
    var inputs = [document.getElementById("name"), document.getElementById("phone"), document.getElementById("productId"), document.getElementById("msg")];
    var sentModal = new bootstrap.Modal(document.getElementById("sentModal"));
    var failedModal = new bootstrap.Modal(document.getElementById("failedModal"));
    var productIdEnabled = (document.getElementById("reason").value == "productInfo") ? true : false;
    var bool = true;
    for (var i = 0; i < inputs.length; i++) {
        if (!productIdEnabled && inputs[i].id == "productId") { continue; } // Handle when product id is empty but not the reason for msg, otherwise would count towards other reasons
        if (inputs[i].parentNode.classList.contains("invalid") || (inputs[i].value == "" || inputs[i].value == null) ) // If any input is invalid or when they are all empty then show failed modal 
        {
            bool = false;
            break;
        }
    }
    bool ? sentModal.show() : failedModal.show(); 
}

function scrollfire() {
    var scroll = window.scrollY;
    var emp1 = document.getElementById("employee1");
    var emp2 = document.getElementById("employee2");
    var emp3 = document.getElementById("employee3");

    if (scroll > 250) {
        scrollfireHelper(emp1);
    }
    if (scroll > 350) {
        scrollfireHelper(emp3);
    }
    if (scroll > 450) {
        scrollfireHelper(emp2);
    }
}

function scrollfireHelper(element) {
    element.classList.remove("hideUntilSlide");
    element.classList.add("slideUp");
}

function scrollParallax() {
    var scroll = window.scrollY;
    var para = document.getElementsByName("para");
    var m = -0.20;
    var b = 0;
    var newY = m*scroll + b;
    for (var i = 0; i < para.length; i++) {
        para[i].style.backgroundPositionY = newY + "px";
    }
    
}
