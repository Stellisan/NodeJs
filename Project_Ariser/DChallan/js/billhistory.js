
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

ClientList.forEach(function(value){
    customers.push(value[1]);
});

autocomplete(document.getElementById("filter-customername"), customers);

$(document).ready(async function(){


    let Billno = 0;
    let status = "";
    let rowids = 0;

    for(var Index = 0; Index < BillHistories.length; Index++)
    {
        var BillDate = BillHistories[Index][2].split("T");
        BillDate = BillDate[0].split(",");
        BillDate = BillDate[0].split("-");
        BillDate = BillDate[2]+"/"+BillDate[1]+"/"+BillDate[0];
        var Total = BillHistories[Index][4];
        Total = Total.toFixed(2);
        let StatusOption = "";
        if(BillHistories[Index][5] == 0)
        {
            StatusOption+="<select onclick=\"ChildClick(event,this)\" onchange=\"StatusChange(this)\" class=\"form-control\">";
            StatusOption+="<option value=\"open\">Not Recieved</option>";
            StatusOption+="<option value=\"close\">Recieved</option>";
            StatusOption+="</select>";
        }
        else if(BillHistories[Index][5] == 1)
        {
            StatusOption+="<select class=\"form-control\" disabled>";;
            StatusOption+="<option selected>Recieved</option>";
            StatusOption+="</select>";
        }
        
       // $('#addr'+row_number).html($('#addr'+row_number).html()).find('td:first-child').html(row_number+1);
        $('#tab_logic').append('<tr id="bill'+Index+'"><td id="billno" class="billno">'+BillHistories[Index][0]+'</td><td id="componentname" class="componentname">'+BillHistories[Index][1]+'</td><td id="billdate" class="billdate">'+BillDate+'</td><td class="GST">'+BillHistories[Index][3]+'</td><td id="total" class="total">'+Total+'</td><td id="billclosed" class="billclosed">'+StatusOption+'</td><td><input id="print" type="button" onclick="clickprint(this)" value="Print"/></td></tr><tr id="dispatch'+Index+'" style="visibility:collapse" class="dispatcher"><td colspan=6><div class="Dispatchpara container"></div></td></tr>');
    }

    $('#tab_logic tbody').on("click","tr",function(){

        if($(this).get(0).id.includes("bill") != true)
        {
            return;
        }

        let dctables = [];

        dctables.push(["DC NO","Component","Description","Quantity"]);

        let rowdata = $(this).children("td").map(function() {
                return this.innerHTML;
            }).get();
            
            var table = document.getElementById('tab_logic');
            for (var i=0;i < table.rows.length;i++){
                table.rows[i].style.backgroundColor = origColor;
                let rowid = table.rows[i].id;
                rowid = rowid.replace(/[^\d.,]+/,'');

                if(i>0 && table.rows[i].id == ("dispatch"+rowid))
                {
                    $("#"+table.rows[i].id).css("visibility","collapse");
                }
            }

            if($(this).css("background-color") == '#BCD4EC')
                this.style.backgroundColor = origColor;
            else
                this.style.backgroundColor = '#BCD4EC';
                
            let rowid = $(this).attr('id');
            rowid = rowid.replace(/[^\d.,]+/,'');

            for(var index = 0; index < DCHistories.length; index++)
            {
                if(DCHistories[index][0] == rowdata[0])
                {
                    dctables.push([DCHistories[index][1],DCHistories[index][2],DCHistories[index][3],DCHistories[index][4]]);
                }
            }
            CreateDispatchTable(rowid,dctables);
            $("#dispatch"+rowid).css("visibility","visible");
    });

    $("#updatestatus").click(function(){
        
    });

    $('.date').datepicker({
        format: 'dd-mm-yyyy',
        autoclose: true
    });

});

function unhighlight(){
    var table = document.getElementById('tab_logic');
    for (var i=0;i < table.rows.length;i++){
      var row = table.rows[i];
      row.style.backgroundColor=this.origColor;
      row.hilite = false;
    }
   }

function CreateDispatchTable(rowid,arr)
{
             //Create a HTML Table element.
             var table = document.createElement("TABLE");
             table.border = "0";
             table.setAttribute("style", "border: none;");
             table.setAttribute("class", "table-sm table");
             //Get the count of columns.
             var columnCount = arr[0].length;
      
             //Add the header row.
             var row = table.insertRow(-1);
             for (var i = 0; i < columnCount; i++) {
                 var headerCell = document.createElement("TH");
                 headerCell.innerHTML = arr[0][i];
                 headerCell.setAttribute("style", "border: none;");
                 headerCell.setAttribute("width", "150");
                 headerCell.setAttribute("onmouseover","");
                 row.appendChild(headerCell);
             }
      
             //Add the data rows.
             for (var i = 1; i < arr.length; i++) {
                 row = table.insertRow(-1);
                 for (var j = 0; j < columnCount; j++) {
                     var cell = row.insertCell(-1);
                     cell.setAttribute("style", "border: none;");
                     cell.setAttribute("onmouseover","");
                     cell.innerHTML = arr[i][j];
                 }
             }
      
             var dvTable =  $("#dispatch"+rowid).find(".Dispatchpara").get(0);
             dvTable.innerHTML = "";
             dvTable.appendChild(table);
}

function ChildClick(event)
{
    event.stopPropagation();
}
function StatusChange(id)
{
    let parentid = $(id).parent().parent().get(0).id;
    Billno = $("#"+parentid).find("#billno").html();
    status = $(id).val();
    rowids = parentid;
    $("#exampleModal").modal({backdrop: "static"});
}

function UpdateBill()
{
    let daata = {
        billnumber:Billno,
        statuss:status};
        
    $.ajax({
        type: 'POST',
        url: '/pages/updatebill',
        contentType: 'application/json',
        dataType: 'json',
        data : JSON.stringify(daata),
        success: function (data) {
            UpdateBillRow(data);
        }
    })
}

function UpdateBillRow(data)
{
    let indexno = rowids.replace(/[^\d.,]+/,'');

    BillHistories[indexno][5] = 1;

    let StatusOption ="<select class=\"form-control\" disabled>";
    StatusOption+="<option selected>Recieved</option>";
    StatusOption+="</select>";

    if(data[0]==1)
    $("#"+rowids).find("#billclosed").html(StatusOption);

    $("#exampleModal").close();
}

function FilterTable()
{
    let billnumber = $("#filter-billno").val();
    let customername = $("#filter-customername").val();
    let billdatefrom = $("#filter-billdatefrom").val();
    let billdateto = $("#filter-billdateto").val();
    let billstatus = $("#filter-billstatus").val();

    $("#tab_logic tbody tr").remove();

    let filteredTable = BillHistories;

    if(billnumber!="")
    {
        filteredTable = filteredTable.filter(function(value){
            return billnumber == value[0];
        });
    }

    if(customername!="")
    {
        filteredTable = filteredTable.filter(function(value){
            return customername == value[1];
        });
    }


    if(billdateto != "" && billdatefrom != "" && billdateto >= billdatefrom)
    {

        filteredTable = filteredTable.filter(function(value){
            var BillDate = value[2].split("-");
            
            let BDateto = billdateto.split("-");
            let BDatefrom = billdatefrom.split("-");
            
            billdateto = new Date(Number(BDateto[2]),Number(BDateto[1])-1,Number(BDateto[0]));
            billdatefrom = new Date(Number(BDatefrom[2]),Number(BDatefrom[1])-1,Number(BDatefrom[0]));
            BillDate = new Date(Number(BillDate[2]),Number(BillDate[1])-1,Number(BillDate[0]));
            return (BillDate >= billdatefrom && BillDate <= billdateto);
        });
    } 
    else if(billdateto < billdatefrom)
    {
        alert("The to date is lesser than the from date");
    }
    

    if(billstatus!=0 && billstatus!=undefined)
    {
        filteredTable = filteredTable.filter(function(value){
            if((billstatus=="open" && value[5]==0) || (billstatus=="close" && value[5]==1))
                return true;
            else
                return false;
        });
    }

    for(var Index = 0; Index < filteredTable.length; Index++)
    {
        var BillDate = filteredTable[Index][2].split("T");
        BillDate = BillDate[0].split(",");
        BillDate = BillDate[0].split("-");
        BillDate = BillDate[2]+"/"+BillDate[1]+"/"+BillDate[0];
        var Total = filteredTable[Index][4];
        Total = Total.toFixed(2);
        let StatusOption = "";
        if(filteredTable[Index][5] == 0)
        {
            StatusOption+="<select onclick=\"ChildClick(event,this)\" onchange=\"StatusChange(this)\" class=\"form-control\">";
            StatusOption+="<option value=\"open\">Not Recieved</option>";
            StatusOption+="<option value=\"close\">Recieved</option>";
            StatusOption+="</select>";
        }
        else if(filteredTable[Index][5] == 1)
        {
            StatusOption+="<select class=\"form-control\" disabled>";;
            StatusOption+="<option selected>Recieved</option>";
            StatusOption+="</select>";
        }
        
       // $('#addr'+row_number).html($('#addr'+row_number).html()).find('td:first-child').html(row_number+1);
        $('#tab_logic').append('<tr id="bill'+Index+'"><td id="billno" class="billno">'+filteredTable[Index][0]+'</td><td id="componentname" class="componentname">'+filteredTable[Index][1]+'</td><td id="billdate" class="billdate">'+BillDate+'</td><td class="GST">'+filteredTable[Index][3]+'</td><td id="total" class="total">'+Total+'</td><td id="billclosed" class="billclosed">'+StatusOption+'</td><td><input id="print" type="button" onclick="clickprint(this)" value="Print"/></td></tr><tr id="dispatch'+Index+'" style="visibility:collapse" class="dispatcher"><td colspan=6><div class="Dispatchpara container"></div></td></tr>');
    }
    
     

}

function clickprint(id){
    event.stopPropagation();
    $("#invoiceno").val($(id).parent().parent().find('#billno').html());
    $("#customername").val($(id).parent().parent().find('#componentname').html());

    document.getElementById("formbillid").submit();
}