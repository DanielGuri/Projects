window.onload = function () {
  loadFromLocalStorage();
  createTable();
};

var make = [];
var model = [];
var year = [];
var imageURL = [];
var baalot = [];
var roof = [];
var price = [];

function loadCar(){
      
  var makeData = document.getElementById("make").value;     
  var modelData = document.getElementById("model").value;   
  var yearData = document.getElementById("year").value;   
  var urlData = document.getElementById("imageURL").value;
  var baalotData = document.getElementById("baalot").value;
  var roofData = document.getElementById("roof").checked ? "Yes" : "No";
  var priceData = document.getElementById("price").value;
    
  make.push(makeData);    
  model.push(modelData); 
  year.push(yearData); 
  imageURL.push(urlData);
  baalot.push(baalotData);  
  roof.push(roofData);  
  price.push(priceData);  

  saveToLocalStorage(); 
  createTable();
  document.getElementById("carsForm").reset();    
}


function saveToLocalStorage() {
  localStorage.setItem("make", JSON.stringify(make));
  localStorage.setItem("model", JSON.stringify(model));
  localStorage.setItem("year", JSON.stringify(year));
  localStorage.setItem("imageURL", JSON.stringify(imageURL));
  localStorage.setItem("baalot", JSON.stringify(baalot));
  localStorage.setItem("roof", JSON.stringify(roof));
  localStorage.setItem("price", JSON.stringify(price));
}

function loadFromLocalStorage() {
  make = JSON.parse(localStorage.getItem("make")) || [];
  model = JSON.parse(localStorage.getItem("model")) || [];
  year = JSON.parse(localStorage.getItem("year")) || [];
  imageURL = JSON.parse(localStorage.getItem("imageURL")) || [];
  baalot = JSON.parse(localStorage.getItem("baalot")) || [];
  roof = JSON.parse(localStorage.getItem("roof")) || [];
  price = JSON.parse(localStorage.getItem("price")) || [];
}


function updateRoofArray() {
  var roofCheckbox = document.getElementById("roof");
  var isChecked = roofCheckbox.checked;

  if (isChecked) {
      roof.push("Yes");
  } else {
      roof.push("No");
  }
}

function createTable(){
  var data = document.getElementById("data");   
  var info = "";

  for (var index=0;index<imageURL.length;index++){
      info += `
      <tr>
          <td>${make[index]}</td>
          <td>${model[index]}</td>
          <td>${year[index]}"</td>
          <td><img src="${imageURL[index]}"/></td>
          <td>${baalot[index]}</td>
          <td>${roof[index]}</td>
          <td>${price[index]}</td>
          </tr>
  `
  }

  data.innerHTML=info;
}

function createTable(){
  var data = document.getElementById("data");   
  var info = "";

  for (var index=0;index<imageURL.length;index++){
      info += `
      <tr>
          <td><strong>${make[index]}</strong></td>
          <td><strong>${model[index]}</strong></td>
          <td><strong>${year[index]}</strong></td>
          <td><img src="${imageURL[index]}"/></td>
          <td><strong>${baalot[index]}</strong></td>
          <td><strong>${roof[index]}</strong></td>
          <td><strong>${price[index]}</strong></td>
          <td><button class="remove-btn" onclick="removeCar(${index})">Remove</button></td>
      </tr>
  `
  }

  data.innerHTML=info;
}
function removeLast(){
  make.pop();
  model.pop();
  year.pop();
  imageURL.pop();
  baalot.pop();
  roof.pop();
  price.pop();

  saveToLocalStorage();
  createTable();
}

function removeCar(index) {
  make.splice(index, 1);
  model.splice(index, 1);
  year.splice(index, 1);
  imageURL.splice(index, 1);
  baalot.splice(index, 1);
  roof.splice(index, 1);
  price.splice(index, 1);

  saveToLocalStorage();
  createTable();
}

function clearTable() {
  make = [];
  model = [];
  year = [];
  imageURL = [];
  baalot = [];
  roof = [];
  price = [];

  saveToLocalStorage();
  createTable(); 
}

