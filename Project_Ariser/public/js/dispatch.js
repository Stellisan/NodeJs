function newClientVisible(disp){
	if(disp == 1)
	{
		document.getElementById("NewCustomer").style.display = "block";
		document.getElementById("gstin").required = true;
		document.getElementById("AddressOne").required = true;
		document.getElementById("AddressTwo").required = true;
		document.getElementById("City").required = true;
		document.getElementById("Pincode").required = true;
		document.getElementById("Phoneno").required = true;
	}
	else
	{
		document.getElementById("NewCustomer").style.display = "none";
		document.getElementById("gstin").required = false;
		document.getElementById("AddressOne").required = false;
		document.getElementById("AddressTwo").required = false;
		document.getElementById("City").required = false;
		document.getElementById("Pincode").required = false;
		document.getElementById("Phoneno").required = false;
	}
}

function newComponentVisible(disp){
	if(disp == 1)
	{
		document.getElementById("NewComponent").style.display = "block";
		document.getElementById("customer").readOnly = false;
		document.getElementById("hsnnumber").required = true;
		document.getElementById("Description").required = true;
		document.getElementById("operation").required = true;
		document.getElementById("pricepiece").required = true;
		document.getElementById("RecievedQnt").required = true;
	}
	else
	{
		document.getElementById("NewComponent").style.display = "none";
		document.getElementById("customer").readOnly = true;
		document.getElementById("hsnnumber").required = false;
		document.getElementById("Description").required = false;
		document.getElementById("operation").required = false;
		document.getElementById("pricepiece").required = false;
		document.getElementById("RecievedQnt").required = false;
	}
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
			if(inp.id=="Drawingno")
			{
				if(newComponent == 1)
		 		{
					newComponentVisible(1);
				}
			else
			{
				newComponentVisible(0);
				DrawingList.forEach(function(value){
					if(value[0] == inp.value)
					{
						document.getElementById("customer").value = value[2];
					}					
				});
			}
			}
		}
		else if(e.keyCode == 8)
		{
			if(inp.id == "Drawingno"){
				if(inp.value.length == 1)
				{
					newComponentVisible(0);
					document.getElementById("customer").value = "";
				}
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
	drawings.push(value[0]);
});

autocomplete(document.getElementById("customer"),customers);
autocomplete(document.getElementById("Drawingno"),drawings);

$(document).ready(async function(){

	// $("#customer").on("keydown change",function(key){
	// 	if (key.keyCode == 13) {//enter
	// 	 if(newClient == 1)
	// 	 {
	// 		newClientVisible(1);
	// 		return;
	// 	 }
	// 	else
	// 	{
	// 		newClientVisible(0);
	// 		if(key.keyCode == 8)
	// 			this.value = "";
	// 	}
	// 	}
	// });

	document.getElementById("DrawingNo").addEventListener("keydown change",function(key){
		alert("sdf");
		if(key.keyCode == 8 && this.value == "")
			newComponentVisible(0);
		if (key.keyCode == 13) {//enter
		 if(newComponent == 1)
		 {
			newComponentVisible(1);
			return;
		 }
		else
		{
			newComponentVisible(0);
		}
		DrawingList.forEach(function(value){
				if(value[0] == this.value)
				{
					alert(value[2]);
					document.getElementById("customer").value = value[2];
				}					
			});
		}
	});
	// $("#customer").on("keyup", function(key){
	// 	if(key.keyCode == 8 && this.value == "")
	// 	{
	// 		newClientVisible(0);
	// 	}
	// });

	// $("#DrawingNo").on("keyup", function(key){
	// 	alert("sdf");
	// 	if(key.keyCode == 8 && this.value == "")
	// 	{
	// 		newComponentVisible(0);
	// 	}
	// });

});