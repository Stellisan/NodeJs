
$(document).ready(async function(){
	let OptionsArrays = null;
	let OptionsAutoComplete = null;
	let OptionsDefault = ["Select Client First"];
	let OptionsDesc = null;
	option_list('addr0',OptionsDefault);
	var row_number=1;

	//Adding a new row
    $("#add_row").click(function(){let b=row_number-1;
      	$('#addr'+row_number).html($('#addr'+b).html()).find('td:first-child').html(row_number+1);
		$('#tab_logic').append('<tr id="addr'+(row_number+1)+'"></tr>');

		if(OptionsArrays == null)
			option_list('addr'+row_number,OptionsDefault);
		else
			option_list('addr'+row_number,OptionsArrays);

		row_number++; 
	  });
	  
	//Deleting a rwo in the table
    $("#delete_row").click(function(){
    	if(row_number>1){
		$("#addr"+(row_number-1)).html('');
		row_number--;
		}
		calc();
	});
	
	//To check on the product selected.
	$(".product").on('change',function(){
		option_checker(this);
	});

	$('#tab_logic tbody').on('keyup change',function(){
		calc();
	});

	$('#tab_logic tbody tr').on('keyup change',function(){
		var selectedproduct = $(this).find('.product').val();
		let priceperquant;
		let productdescr;
		OptionsArrays.forEach(function(value){
			if(value[0] == selectedproduct)
			{
				priceperquant = value[2];
				productdescr = value[1];
			}
		});
		$(this).find('.desc').val(productdescr);
		$(this).find('.price').val(priceperquant);
	});

	$('#tab_logic tbody tr').on('focusout', function(){
		
		var selectedproduct = $(this).find('.product').val().split(":");
		var drawing_no = selectedproduct[0].trim();
		let quantity = $(this).find('.qty');
	
		TotalProductCount.forEach(function(value){			
			if(drawing_no == value[1] && value[2] < quantity.val())
			{
				alert("The given quantity is greater than the recieved quantity");
				quantity.val(0);
				quantity.focus();
			}
		});

	});

	$('.qty').on('keyup change',function(){
		let component = [];
		let desc = [];
		let price = [];
		let quantity = [];

		$('#tab_logic tbody tr').each(function(i, element) {
			
			if($(this).find('.product').val()!=null || $(this).find('.desc').val()!=null || $(this).find('.qty').val()!=null || $(this).find('.total').val()!=null)
			{

				component.push($(this).find('.product').val());
				desc.push($(this).find('.desc').val());
				quantity.push($(this).find('.qty').val());
				price.push($(this).find('.total').val());

			}
			
		});

		let daata = {components:component,
					description:desc,
					quantity:quantity,
					price:price};

		//let daata = JSON.parse(jsontext);

			$.ajax({
				type: 'POST',
				url: '/pages/updatebill',
				contentType: 'application/json',
				dataType: 'json',
				data : JSON.stringify(daata),
				success: function (data) {
					//console.log(data);
					addDispatch(data);
				}
			})

	});

	$('#get_dispatch').click(function(){
		
		let component = [];
		let desc = [];
		let price = [];
		let quantity = [];

		$('#tab_logic tbody tr').each(function(i, element) {
			
			if($(this).find('.product').val()!=null || $(this).find('.desc').val()!=null || $(this).find('.qty').val()!=null || $(this).find('.total').val()!=null)
			{

				component.push($(this).find('.product').val());
				desc.push($(this).find('.desc').val());
				quantity.push($(this).find('.qty').val());
				price.push($(this).find('.total').val());

			}
			
		});

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
					//console.log(data);
					addDispatch(data);
				}
			})

	});

	$('#customers').on('change',function(){
		var selectedcustomer = $(this).val();
		var ProductList = [];
		var DescList = [];
		var DrawingNo = [];
		Drawinglist.forEach(function(value){
			if(value[2] == selectedcustomer)
			{
				ProductList.push([value[0],value[1],value[3]]);
				DescList.push(value[1]);
				DrawingNo.push(value[0]);
			}
		});

		OptionsArrays = ProductList;
		OptionsDesc = DescList;
		OptionsAutoComplete = DrawingNo;

		ClientList.forEach(function(value){
			if(value[1] == selectedcustomer)
			{
				let address = value[2]+"\n"+value[3]+"\nGSTIN: "+value[7];
				document.getElementById('customeraddress').innerText = address;
			}
		});

		for(var iIndex = 0; iIndex <= row_number;iIndex++)
		{
			option_list('addr'+iIndex,OptionsArrays);
		}

		while(row_number>1){
			$("#addr"+(row_number-1)).html('');
			row_number--;
			}
			
		calc();

		$('#tab_logic tbody tr').each(function(i, element) {
			$(this).find('.qty').val(0.00);
			$(this).find('.price').val(0.00);
			$(this).find('.total').val(0.00);
		});

		document.getElementById('customervalidate').innerText = "";

		$('#tax_amount').val(0.00);
		$('#total_amount').val(0.00);
		$('#sub_total').val(0.00);

	});

	//$("#product").autocomplete({source:["ascern","bernh","kelio","oplk"]});


});

function addDispatch(dclist)
{
	$("#tab_logic_DC").find("tr:gt(0)").remove();
	for(let index = 0; index < dclist.length; index++)
    {
		let dcdate = dclist[index][1].split("T");
        $('#tab_logic_DC').append('<tr id="dc'+index+'"><td class="dcno">'+dclist[index][0]+'</td><td class="dcdate">'+dcdate[0]+'</td><td class="drawingno">'+dclist[index][2]+'</td><td class="quantity">'+dclist[index][3]+'</td></tr>');
    }
}

function option_checker(id)
{
	var myOption=$(id).val();
	var iSelection =0;
	$('#tab_logic tbody tr select').each(function(index, element){
         var myselect = $(this).val();
		if(myselect==myOption){
			iSelection += 1;
		}
    });
	
	if(iSelection>1){
		alert(myOption+' as been added already try new..');
		$(id).val("0");
	}

	let hasDispatch = 0;

	var selectedproduct = myOption.split(":");
	var drawing_no = selectedproduct[0].trim();
	TotalProductCount.forEach(function(value){
		if(drawing_no == value[1])
		{
			if(value[2] != 0)
				{
					hasDispatch = 1;
					return;
				}
		}
	});

	if(hasDispatch == 0 && drawing_no!=0)
	{
		alert("The selected product does not have any incoming piece");
		$(id).val("0");
	}

}

function option_list(id,OptionsArray)
{
	el='#'+id;
	if(OptionsArray[0] != "Select Client First")
	{
		var collect = '<option value="0">Select Product</option>';
		for(var iIndex = 0; iIndex<OptionsArray.length;iIndex++)
		{
    	    collect += '<option value="'+OptionsArray[iIndex][0]+'">'+OptionsArray[iIndex][0]+'</option>';
		}
	}
	else
	{
		collect = '<option value="0">'+OptionsArray[0]+'</option>';
	}
    $(el+" select").html(collect);
}

function calc()
{
	$('#tab_logic tbody tr').each(function(i, element) {
		var html = $(this).html();
		
			var qty = $(this).find('.qty').val();
			var price = $(this).find('.price').val();
			$(this).find('.total').val(qty*price);
			
			calc_total();
    });
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

function reset(row_number)
{
	$('#tab_logic tbody tr').each(function(i, element) {
		var html = $(this).html();
		
		$(this).find('.qty').val();
		var price = $(this).find('.price').val();
		$(this).find('.total').val(qty*price);
    });
}

function FormValidation()
{
	let valid = 1;
    let Customer =document.getElementById('customers');
	

	if(Customer.value.localeCompare("Select Client")==0)
    {
        document.getElementById('customervalidate').innerText = "* Please select a Client *";
		Customer.focus();
		return false;
    }
    else
    {
        document.getElementById('customervalidate').innerText = "";
    }

	$('#tab_logic tbody tr').each(function(i, element) {

		if($(this).find('.product').val() == 0 )
		{
			document.getElementById('customervalidate').innerText = "* Please select Products for all rows or delete rows. *";
			valid = 0;
		}
	});
	
	if(valid == 1)
    {
        return true;
    }
    else
    {
		Customer.focus();
        return false;
    }
}