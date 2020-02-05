$(document).ready(async function(){

	let DateControl = $('.date').datepicker({
		format: 'MM-yyyy',
		startView:1,
		minViewMode:1,
		todayBtn:false,
        autoclose: true
    });

    $('.date').datepicker('setDate', 'now');
    
    DateControl.on("changeMonth",function(e){
        var selectedmonth = new Date(e.date).getMonth() + 1;
        var selectedyear = new Date(e.date).getFullYear();
        let selected_value = $('#reportby').val();

        let tablecontents = [];
        
        if(selected_value=="0")
		{
			var dvTable =  $("#reportstable").get(0);
			dvTable.innerHTML = "<tr><td><p class=\"text-center\">There is no category selected</p></td></tr>";
		}else if(selected_value=='gst')
		{            
            tablecontents.push(["Bill No","Company Name","Taxable Amount","GST","Total Amount"]);
            for(let Index = 0;Index < BillReport.length; Index++)
			{
                let monthandyear = BillReport[Index][5].split('-');
                if(monthandyear[0]==selectedmonth && selectedyear==monthandyear[1])
                    tablecontents.push([BillReport[Index][0],BillReport[Index][1],BillReport[Index][2],BillReport[Index][3],BillReport[Index][4]]);
            }
            CreateDispatchTable(tablecontents);
        }else 
        if(selected_value=='hsn')
		{
			tablecontents.push(["HSN","Quantity","Taxable Amount","GST","Total Amount"]);	
			for(let Index = 0;Index < HSN.length; Index++)
			{
				let tax = Number(HSN[Index][2])*((9+9)/100);
                let totals = Number(HSN[Index][2])+tax;
                let monthandyear = HSN[Index][3].split('-');

                tax = tax.toFixed(2);
                totals = totals.toFixed(2);
                if(monthandyear[0]==selectedmonth && selectedyear==monthandyear[1])
				    tablecontents.push([HSN[Index][0],HSN[Index][1],HSN[Index][2],tax,totals]);
			}
		CreateDispatchTable(tablecontents);
        }
    });

	$('#reportby').on('change',function(){
		let selected_value = $(this).val();
        let tablecontents = [];
        let selectedDate = new Date('01-'+$('#filter-reportmonth').val());
        let selectedMonth = selectedDate.getMonth()+1;
        let selectedYear = (selectedDate.getFullYear())*-1;

		if(selected_value=="0")
		{
			var dvTable =  $("#reportstable").get(0);
			dvTable.innerHTML = "<tr><td><p class=\"text-center\">There is no category selected</p></td></tr>";
		}else if(selected_value=='gst')
		{

            tablecontents.push(["Bill No","Company Name","Taxable Amount","GST","Total Amount"]);
            for(let Index = 0;Index < BillReport.length; Index++)
			{
                let monthandyear = BillReport[Index][5].split('-');
                let gsttotal = BillReport[Index][3].toFixed(2);
                let total = BillReport[Index][4].toFixed(2);

                if(monthandyear[0]==selectedMonth && selectedYear==monthandyear[1])
                    tablecontents.push([BillReport[Index][0],BillReport[Index][1],BillReport[Index][2],gsttotal,total]);
            }
            CreateDispatchTable(tablecontents);
		}else if(selected_value=='hsn')
		{
			tablecontents.push(["HSN","Quantity","Taxable Amount","GST","Total Amount"]);	
			for(let Index = 0;Index < HSN.length; Index++)
			{
                let tax = Number(HSN[Index][2])*((9+9)/100);
                let totals = Number(HSN[Index][2])+tax;
                let monthandyear = HSN[Index][3].split('-');                

                tax = tax.toFixed(2);
                totals = totals.toFixed(2);
                if(monthandyear[0]==selectedMonth && selectedYear==monthandyear[1])
				    tablecontents.push([HSN[Index][0],HSN[Index][1],HSN[Index][2],tax,totals]);
			}
			CreateDispatchTable(tablecontents);
		}

    });

});

function CreateDispatchTable(arr)
{
            let selected_value = $('#reportby').val();

             //Create a HTML Table element.
             var table = document.createElement("TABLE");
             table.border = "0";
             table.setAttribute("style", "border: 2px,solid;");
             table.setAttribute("class", "table-sm table");
             //Get the count of columns.
             var columnCount = arr[0].length;

             //Add the header row.
             var row = table.insertRow(-1);
             for (var i = 0; i < columnCount; i++) {
                 var headerCell = document.createElement("TH");
                 headerCell.innerHTML = arr[0][i];
                 headerCell.setAttribute("style", "border: 1px solid;");
                 headerCell.setAttribute("width", "150");
                 headerCell.setAttribute("onmouseover","");
                 row.appendChild(headerCell);
             }
      
             let TotalTaxableAmount = 0;
             let TotalGST = 0;
             let TotalGrandTotal = 0;
             if(arr.length == 1)
             {
                row = table.insertRow(-1);
                var cell = row.insertCell(-1);
                cell.setAttribute("style", "border: 1px solid;");
                cell.setAttribute("colspan",columnCount.toString());
                cell.classList.add("text-center");
                cell.innerHTML = "There are no Data for this month";
             }
             //Add the data rows.
             for (var i = 1; i < arr.length; i++) {
                 row = table.insertRow(-1);
                 for (var j = 0; j < columnCount; j++) {
                     var cell = row.insertCell(-1);
                     cell.setAttribute("style", "border: 1px solid;");
                     cell.setAttribute("onmouseover","");
                     cell.innerHTML = arr[i][j];
                     if(j == 2)
                     {
                        TotalTaxableAmount+=Number(arr[i][j]);
                     }

                     if(j == 3)
                     {
                        TotalGST+=Number(arr[i][j]);
                     }

                     if(j == 4)
                     {
                        TotalGrandTotal+=Number(arr[i][j]);
                     }
                 }
             }
      
             if(arr.length != 1)
             {
                row = table.insertRow(-1);

                var cell = row.insertCell(-1);
                cell.setAttribute("style", "border: 1px solid;");
                cell.setAttribute("colspan",2);
                cell.classList.add("text-center");
                cell.setAttribute("onmouseover","");
                cell.innerHTML = "Totals"

                var cell = row.insertCell(-1);
                cell.setAttribute("style", "border: 1px solid;");
                cell.setAttribute("onmouseover","");
                cell.innerHTML = TotalTaxableAmount.toFixed(2);

                var cell = row.insertCell(-1);
                cell.setAttribute("style", "border: 1px solid;");
                cell.setAttribute("onmouseover","");
                cell.innerHTML = TotalGST.toFixed(2);

                var cell = row.insertCell(-1);
                cell.setAttribute("style", "border: 1px solid;");
                cell.setAttribute("onmouseover","");
                cell.innerHTML = TotalGrandTotal.toFixed(2);
             }

             var dvTable =  $("#reportstable").get(0);
             dvTable.innerHTML = "";
             dvTable.appendChild(table);
}
