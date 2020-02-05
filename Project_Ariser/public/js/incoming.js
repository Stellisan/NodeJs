function newClientVisible(disp){
	if(disp == 0)
	{
		document.getElementById("customeraddress1").readOnly = true;
		document.getElementById("customeraddress2").readOnly = true;
		document.getElementById("city").readOnly = true;
		document.getElementById("pincode").readOnly = true;
		document.getElementById("gstin").readOnly = true;
	}
	else
	{
		document.getElementById("customer").readOnly = false;
		document.getElementById("customeraddress1").readOnly = false;
		document.getElementById("customeraddress2").readOnly = false;
		document.getElementById("city").readOnly = false;
		document.getElementById("pincode").readOnly = false;
		document.getElementById("gstin").readOnly = false;
		document.getElementById("customeraddress1").value = "";
		document.getElementById("customeraddress2").value = "";
		document.getElementById("city").value = "";
		document.getElementById("pincode").value = "";
		document.getElementById("gstin").value = "";
	}
}

function newComponentVisible(disp, index){
	if(disp == 1)
	{
		document.getElementById("customer").readOnly = false;
		$("#comp"+index).find(".desc").attr('readonly',false);
		$("#comp"+index).find(".operation").attr('readonly',false);
		$("#comp"+index).find(".hsn").attr('readonly',false);
	}
	else
	{
		document.getElementById("customer").readOnly = true;
		newClientVisible(0);
		$("#comp"+index).find(".desc").attr('readonly',true);
		$("#comp"+index).find(".operation").attr('readonly',true);
		$("#comp"+index).find(".hsn").attr('readonly',true);
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
var row_number= 1;

ClientList.forEach(function(value){
    customers.push(value[1]);
});

DrawingList.forEach(function(value){
	drawings.push(value[0]);
});

autocomplete(document.getElementById("customer"),customers);
autocomplete($("#comp0").find("#drawingcode").get(0),drawings);

$(document).ready(function(){

	$("#add_row").click(function(){
		let b=row_number-1;
		$('#comp'+row_number).html($('#comp'+b).html()).find('td:first-child').html(row_number+1);
		$('#incomingtable').append('<tr id="comp'+(row_number+1)+'"></tr>');

		autocomplete($("#comp"+row_number).find("#drawingcode").get(0),drawings);

		row_number++; 
	});

	$("#delete_row").click(function(){
		if(row_number>1){
	$("#comp"+(row_number-1)).html('');
	row_number--;
	}
	});

	$("#incomingtable tbody tr").on("keydown change",".drawingcode",function(key){

		if(key.keyCode == 8)
		{
			document.getElementById('customer').value = "";
			document.getElementById('customeraddress1').value = "";
			document.getElementById('customeraddress2').value = "";
			document.getElementById('city').value = "";
			document.getElementById('pincode').value = "";
			document.getElementById('gstin').value = "";

			for(var index = 0; index < row_number; index++ )
			{ 
				if($("#comp"+index).find("#drawingcode").val() == $(this).val())
				{
					$("#comp"+index).find(".price").val("");
					$("#comp"+index).find(".desc").val("");
					$("#comp"+index).find(".operation").val("");
					$("#comp"+index).find(".hsn").val("");
				}
			}
		}

		if(key.keyCode != 13)
			return;

		let selectedoption = $(this).val();

		if(Option_Checker(this) == 1)
		{
			$(this).val("");
		}

		let price = 0;
		let description = null;
		let hsn = 0;
		let operation = null;
		let newcomp = 1;

		DrawingList.forEach(function(value){
			if(value[0]==selectedoption)
			{
				description =  value[1];
				hsn = value[4];
				customer = value[2];
				operation = value[5];
				pricepiece = value[3];
				newcomp = 0;
				ClientList.forEach(function(value){
					if(value[1] == customer)
					{
						document.getElementById('customer').value = value[1];
						document.getElementById('customeraddress1').value = value[2];
						document.getElementById('customeraddress2').value = value[3];
						document.getElementById('city').value = value[4];
						document.getElementById('pincode').value = value[5];
						document.getElementById('gstin').value = "GSTIN: "+value[7];
					}
				});
				return;
			}
		});

		for(var index = 0; index < row_number; index++ )
		{
			if($("#comp"+index).find("#drawingcode").val() == $(this).val())
			{
				if(newcomp == 1)
				{
					newComponentVisible(1, index);
				}
				else {
					newComponentVisible(0, index);
				}
				$("#comp"+index).find(".price").val(pricepiece);
				$("#comp"+index).find(".desc").val(description);
				$("#comp"+index).find(".operation").val(operation);
				$("#comp"+index).find(".hsn").val(hsn);
			}
		}

	});

function Option_Checker(id)
{
	let selectedOption = $(id).val();
	let count = 0;
	for(var index = 0; index < row_number; index++ )
	{
		if($("#comp"+index).find("#drawingcode").val() != "" && $("#comp"+index).find("#drawingcode").val() == selectedOption)
			{
				count++;
				if(count > 1)
					{
						alert(selectedOption+' as been added already try new..');
						return 1;
					}
			}
	}
	return 0;
}

$("#customer").on("keydown change",function(key){
	let selectedOption = $(this).val();
	let newone = 1;
	ClientList.forEach(function(value){
		if(value[1] == selectedOption)
		{
			document.getElementById('customer').value = value[1];
			document.getElementById('customeraddress1').value = value[2];
			document.getElementById('customeraddress2').value = value[3];
			document.getElementById('city').value = value[4];
			document.getElementById('pincode').value = value[5];
			document.getElementById('gstin').value = "GSTIN: "+value[7];
			newone = 0;
			return;
		}
	});

	if(newone == 1)
	{
		newClientVisible(1);
	}
	else {
		newClientVisible(0);
	}

});

$('.date').datepicker({
	format: 'dd-mm-yyyy',
	autoclose: true
});

});
