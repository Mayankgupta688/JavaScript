var name = "Mayank Gupta"

document.getElementById("input_name").value = name;

function updateData(elementRefernce, event) {
    var val = event.target.value.toUpperCase();
    elementRefernce.value = val;
    name = elementRefernce.value
}

function displayData() {
    alert(name);
}