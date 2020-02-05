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


var drawingnos = [];
var row_number= 1;
let productcodes = [];
let productpricesdesc = [];


Drawinglist.forEach(function(value){
	productcodes.push(value[0]);
	productpricesdesc.push([value[0],value[3],value[1],value[4],value[2]]);
});

autocomplete($("#comp0").find(".drawingcode")[0],productcodes);


function LoadInvoiceDate()
{
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = dd + '-' + mm + '-' + yyyy;
	document.getElementById('invoicedate').value = today;
}

$(document).ready(async function(){

	
	LoadInvoiceDate();
	
	$("#add_row").click(function(){
		let b=row_number-1;
		$('#comp'+row_number).html($('#comp'+b).html()).find('td:first-child').html(row_number+1);
		$('#billtable').append('<tr id="comp'+(row_number+1)+'"></tr>');

		autocomplete($("#comp"+row_number).find("#drawingcode").get(0),productcodes);

		row_number++; 
	});

	$("#delete_row").click(function(){
		if(row_number>1){
	$("#comp"+(row_number-1)).html('');
	row_number--;
	}
	calc();
});


	$("#billtable tbody tr").on("keydown change",".drawingcode",function(key){

		if(key.keyCode != 13)
			return;

		let selectedoption = $(this).val();

		if(Option_Checker(this) == 1)
		{
			$(this).val("");
		}

		ProductCount_Check(this);

		let price = 0;
		let description = null;
		let hsn = 0;

		productpricesdesc.forEach(function(value){
			if(value[0]==selectedoption)
			{
				price = value[1];
				description =  value[2];
				hsn = value[3];
				customer = value[4];
				ClientList.forEach(function(value){
					if(value[1] == customer)
					{
						document.getElementById('customer').value = value[1];
						document.getElementById('customeraddress1').value = value[2];
						document.getElementById('customeraddress2').value = value[3];
						document.getElementById('city').value = value[4] + "-" + value[5];
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
				$("#comp"+index).find(".price").val(price);
				$("#comp"+index).find(".desc").val(description);
				$("#comp"+index).find(".hsn").val(hsn);
			}
		}

		calc();

	});

	$("#billtable tbody tr").on("keyup change",function(){

		let drawing_no = $(this).find(".drawingcode").val();
		let quantity = $(this).find(".qty");

		TotalProductCount.forEach(function(value){
			if(drawing_no == value[1] && Number(quantity.val()) > Number(value[2]))
			{			
				alert("The given quantity is greater than the recieved quantity. The present quantity is "+value[2]+" Nos");
				quantity.val("");
				quantity.focus();
			}

		});
		calc();
	});

	$("#billtable tbody tr").on("keyup change",".qty",function(key){
		calc();

		let component = [];
		let desc = [];
		let price = [];
		let quantity = [];

		for(var index = 0; index < row_number; index++ )
		{
			if($("#comp"+index).find(".drawingcode").val()!=null || $("#comp"+index).find('.desc').val()!=null || $("#comp"+index).find('.qty').val()!=null || $("#comp"+index).find('.total').val()!=null)
			{
				component.push($("#comp"+index).find(".drawingcode").val());
				desc.push($("#comp"+index).find('.desc').val());
				quantity.push($("#comp"+index).find('.qty').val());
				price.push($("#comp"+index).find('.total').val());

			}
			
		}

		let daata = {components:component,
					description:desc,
					quantity:quantity,
					price:price};

		//let daata = JSON.parse(jsontext);

			$.ajax({
				type: 'POST',
				url: '/pages/getdispatch',
				contentType: 'application/json',
				dataType: 'json',
				data : JSON.stringify(daata),
				success: function (data) {
					addDispatch(data);
				}
			})


	});

	$("#billtable tbody tr").on("click",function(){
		if($(this).find(".drawingcode").get(0) == undefined)
		{
			return;
		}
		let selectedoption = $(this).find(".drawingcode").val();

		if(Option_Checker($(this).find(".drawingcode")) == 1)
		{
			$(this).find(".drawingcode").val("");
		}

		ProductCount_Check($(this).find(".drawingcode"));

		let price = 0;
		let description = null;
		let hsn = 0;

		productpricesdesc.forEach(function(value){
			if(value[0]==selectedoption)
			{
				price = value[1];
				description =  value[2];
				hsn = value[3];
				return;
			}
		});

		for(var index = 0; index < row_number; index++ )
		{
			if($("#comp"+index).find("#drawingcode").val() == selectedoption)
			{
				$("#comp"+index).find(".price").val(price);
				$("#comp"+index).find(".desc").val(description);
				$("#comp"+index).find(".hsn").val(hsn);
			}
		}

		calc();

	});

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

function calc_total()
{
	total=0;
	$('.total').each(function() {
        total += parseInt($(this).val());
    });
	$('#sub_total').val(total.toFixed(2));
	tax_sum=(total/100)*(Number($('#CGST').val())+Number($('#SGST').val()));
	$('#tax_amount').val(tax_sum.toFixed(2));
	$('#total_amount').val((tax_sum+total).toFixed(2));
}

function calc()
{
	$('#billtable tbody tr').each(function(i, element) {
		
			var qty = Number($(this).find('.qty').val());
			var price = Number($(this).find('.price').val());
			$(this).find('.total').val((qty*price).toFixed(2));
			
			calc_total();
    });
}

function ProductCount_Check(id)
{
	let hasCount = 0;
	var drawing_no = $(id).val();

	TotalProductCount.forEach(function(value){
		if(drawing_no == value[1])
		{
			if(value[2] != 0)
				{
					hasCount = 1;
					return;
				}
		}
	});

	if(hasCount == 0 && drawing_no != 0)
	{
		alert("The selected product does not have any incoming piece");
		$(id).val("");
	}
}

var dclength = 0;

function addDispatch(dclist)
{
	document.getElementById("DCNo").innerHTML = "";
	document.getElementById("DCCompCode").innerHTML = "";
	document.getElementById("DCQuantity").innerHTML = "";
	document.getElementById("DCDate").innerHTML = "";
	
	// var dvTable =  $("#bill"+rowid).find(".Billpara").get(0);
	
	// let dcdate = dclist[0][1].split("T");
	// document.getElementById("DCNo").innerHTML += dclist[0][0];
	// document.getElementById("DCCompCode").innerHTML += dclist[0][2];
	// document.getElementById("DCQuantity").innerHTML += dclist[0][3];
	// document.getElementById("DCDate").innerHTML += dcdate[0];

	//alert(dclist[0][1]);

	for(let index = 0; index < dclist.length; index++)
    {
		dcdate = dclist[index][1].split("T");
		dcdate = dcdate[0].split("-");
		dcdate = dcdate[1]+"/"+dcdate[2]+"/"+dcdate[0];
		document.getElementById("DCNo").innerHTML += "<p style='padding:0px;margin:0px;'>"+dclist[index][0]+"</p><input type='hidden' id='dcno"+index+"' name='dcno[]' value='"+dclist[index][0]+"' style='padding:0px;' width=10/>";
		document.getElementById("DCCompCode").innerHTML += "<p style='padding:0px;margin:0px;'>"+dclist[index][2]+"</p><input type='hidden' id='dcno"+index+"' name='dccompcode[]' value='"+dclist[index][2]+"' style='padding:0px;' width=10/>";
		document.getElementById("DCQuantity").innerHTML += "<p style='padding:0px;margin:0px;'>"+dclist[index][3]+"</p><input type='hidden' id='dcno"+index+"' name='dcquantity[]' value='"+dclist[index][3]+"' style='padding:0px;' width=10/>";
		document.getElementById("DCDate").innerHTML += "<p style='padding:0px;margin:0px;'>"+dcdate+"</p><input type='hidden' id='dcno"+index+"' value='"+dcdate[0]+"' name='dcdate[]' style='padding:0px;' width=10/>";
	}
	
	if(dclist.length == 0)
		dclength = 0;
}