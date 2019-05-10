$(document).ready(async function(){
	
	option_list('addr0');
	var row_number=1;
	
    $("#add_row").click(function(){b=row_number-1;
      	$('#addr'+row_number).html($('#addr'+b).html()).find('td:first-child').html(i+1);
      	$('#tab_logic').append('<tr id="addr'+(row_number+1)+'"></tr>');
		option_list('addr'+row_number);
		row_number++; 
	  });
	  
    $("#delete_row").click(function(){
    	if(row_number>1){
		$("#addr"+(i-1)).html('');
		row_number--;
		}
		calc();
	});
	
	$(".product").on('change',function(){
	    option_checker(this)
	});

	$('#tab_logic tbody').on('keyup change',function(){
		calc();
	});

	$('#tax').on('keyup change',function(){
		calc_total();
	});

	$('#save').click(function(){
		alert('feef');
			$.post('save');
	});
});

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
		alert(myOption+' as been added already try new..')	
	}
}

function option_list(id)
{
	el='#'+id;
	var myArray = ["Product 1", "Product 2", "Product 3", "Product 4"];
	var collect = '<option value="">Select Product</option>';
    for(var iIndex = 0; iIndex<myArray.length;iIndex++){
        collect += '<option value="'+myArray[iIndex]+'">'+myArray[iIndex]+'</option>';
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
	tax_sum=total/100*$('#tax').val();
	$('#tax_amount').val(tax_sum.toFixed(2));
	$('#total_amount').val((tax_sum+total).toFixed(2));
}