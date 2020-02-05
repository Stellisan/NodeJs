function newClientVisible(disp){
	if(disp == 1)
	{
		document.getElementById("NewCustomer").style.display = "block";
	}
	else
		document.getElementById("NewCustomer").style.display = "none";
}

function newComponentVisible(disp){
	if(disp == 1)
	{
		document.getElementById("NewComponent").style.display = "block";
	}
	else
		document.getElementById("NewComponent").style.display = "none";
}

let newClient = 0;
let newComponent = 0;

function autocomplete(inp, arr) {
	
	var currentFocus;

	inp.addEventListener("input", function(e) {
		var a, b, i, val = this.value;
		closeAllLists();
		if (!val) { return false;}
		currentFocus = -1;
	
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		this.parentNode.appendChild(a);
		
		for (i = 0; i < arr.length; i++) {
		  if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {

			b = document.createElement("DIV");
			
			b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
			b.innerHTML += arr[i].substr(val.length);
			
			b.innerHTML += "<input type='hidden' class='autocomplete_option' value='" + arr[i] + "'>";
			
			b.addEventListener("click", function(e) {
				if(inp.id == "customer")
				{
					newClient = 0;
					newClientVisible(0);
				} else if(inp.id == "Drawingno")
				{
					newComponent = 0;
					newComponentVisible(0);
				}
				inp.value = this.getElementsByTagName("input")[0].value;
				closeAllLists();
			});
			a.appendChild(b);
			
			if(a.childElementCount == 1)
			{
				currentFocus++;
				b.classList.add("autocomplete-active");
			}

		  }
		}

		b = document.createElement("DIV");

		b.innerHTML = "Add New";
		
		b.innerHTML += "<input type='hidden' class='autocomplete_option' value='" + arr[i] + "'>";
		
		b.addEventListener("click", function(e) {
		if(inp.id == "customer")
		{
			newClient = 1;
			newClientVisible(1);
		} else if(inp.id == "Drawingno")
		{
			newComponent = 1;
			newComponentVisible(1);
		}
		closeAllLists();
		});
		a.appendChild(b);
		
		if(a.childElementCount == 1)
		{
			currentFocus++;
			b.classList.add("autocomplete-active");
		}

	});

	inp.addEventListener("keydown", function(e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {//down
		 
		  currentFocus++;
		 
		  addActive(x);
		} else if (e.keyCode == 38) { //up
		  currentFocus--;
		 
		  addActive(x);
		} else if (e.keyCode == 13) {//enter
		  e.preventDefault();
		  if (currentFocus > -1) {
			if (x) x[currentFocus].click();
			}
		}
	});
	function addActive(x) {
	  
	  if (!x) return false;
	 
	  removeActive(x);
	  if (currentFocus >= x.length) currentFocus = 0;
	  if (currentFocus < 0) currentFocus = (x.length - 1);
	  
	  x[currentFocus].classList.add("autocomplete-active");
	}
	function removeActive(x) {
	  
	  for (var i = 0; i < x.length; i++) {
		x[i].classList.remove("autocomplete-active");
	  }
	}
	function closeAllLists(elmnt) {
	  
	  var x = document.getElementsByClassName("autocomplete-items");
		
		for (var i = 0; i < x.length; i++) 
		{
			if (elmnt != x[i] && elmnt != inp) 
			{
				x[i].parentNode.removeChild(x[i]);
	  	}
		}
	
	}
	
	
  document.addEventListener("click", function (e) {
	  closeAllLists(e.target);
	});
	
  } 

var customers = [];
var drawings = [];

ClientList.forEach(function(value){
    customers.push(value[1]);
});

DrawingList.forEach(function(value){
	drawings.push(String(value));
});

autocomplete(document.getElementById("customer"),customers);
autocomplete(document.getElementById("Drawingno"),drawings);

$(document).ready(async function(){

	$("#customer").on("keydown change",function(key){
		if (key.keyCode == 13) {//enter
		 if(newClient == 1)
		 {
			newClientVisible(1);
		 }
		else
		{
			newClientVisible(0);
			if(key.keyCode == 8)
				this.value = "";
		}
		}
	});

	$("#DrawingNo").on("keydown change",function(key){
		if(key.keyCode == 8 && this.value == "")
			newComponentVisible(0);
		if (key.keyCode == 13) {//enter
		 if(newComponent == 1)
		 {
			newComponentVisible(1);
		 }
		else
			newComponentVisible(0);
		}
	});

	$("#customer").on("keyup", function(key){
		if(key.keyCode == 8 && this.value == "")
		{
			newClientVisible(0);
		}
	});

	$("#DrawingNo").on("keyup", function(key){
		if(key.keyCode == 8 && this.value == "")
		{
			newComponentVisible(0);
		}
	});

});