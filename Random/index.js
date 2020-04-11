var name = "Mayank";

function clickButtonFunction() {
    var data = document.getElementById("user_name").value;
    alert(data);
    document.getElementById("user_name").value = "";
}

function mouseOverFunction() {
    alert("Mouse Over That Button")
}

function onValueChange() {
    console.log(document.getElementById("user_name").value)
}

function attachClassFunction() {
    document.getElementById("header_other").classList = ["header_data"]
}

function updateVariableValue(elementReference, event) {
    name = event.target.value
}

function getVariableValue() {
    alert(name)
}

