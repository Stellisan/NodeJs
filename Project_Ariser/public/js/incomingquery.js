
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

    if(DCHist.length == 0)
    {
        $('#tab_logic').append("<tr id=\"NoData\"><td colspan=7 class='center-text'>There are no Incomings to display</td></tr>");
        return;
    }

    for(var Index = 0; Index < DCHist.length; Index++)
    {
        var DCDate = DCHist[Index][1].split("T");
        DCDate = DCDate[0].split(",");
        DCDate = DCDate[0].split("-");
        DCDate = DCDate[1]+"-"+DCDate[2]+"-"+DCDate[0];
        
       // $('#addr'+row_number).html($('#addr'+row_number).html()).find('td:first-child').html(row_number+1);
        $('#tab_logic').append('<tr id="dc'+Index+'"><td id="dcno" class="dcno">'+DCHist[Index][0]+'</td><td id="dccustomer" class="dccustomer">'+DCHist[Index][2]+'</td><td id="dcdate" class="dcdate">'+DCDate+'</td><td id="dccomponent" class="dccomponent">'+DCHist[Index][3]+'</td><td id="dcdescription" class="dcdescription">'+DCHist[Index][4]+'</td><td  id="phyquan" class="phyquan">'+DCHist[Index][5]+'</td><td id="recquant" class="recquant">'+DCHist[Index][6]+'</td></tr><tr id="bill'+Index+'" style="visibility:collapse" class="bill"><td colspan=7 class="text-center"><div class="Billpara container"></div></td></tr>');
    }
    
    $('#tab_logic tbody').on("click","tr",function(){

        if($(this).get(0).id.includes("dc") != true)
        {
            return;
        }

        let dctables = [];

        dctables.push(["Bill No","Component Code","Description","Quantity","Price"]);

        let rowdata = $(this).children("td").map(function() {
                return this.innerHTML;
            }).get();
            
            var table = document.getElementById('tab_logic');
            for (var i=0;i < table.rows.length;i++){
                table.rows[i].style.backgroundColor = origColor;
                let rowid = table.rows[i].id;
                rowid = rowid.replace(/[^\d.,]+/,'');

                if(i>0 && table.rows[i].id == ("bill"+rowid))
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
                if(DCHistories[index][1] == rowdata[0])
                {
                    dctables.push([DCHistories[index][0],DCHistories[index][2],DCHistories[index][3],DCHistories[index][4],DCHistories[index][5]]);
                }
            }
            CreateDispatchTable(rowid,dctables);
            $("#bill"+rowid).css("visibility","visible");
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
    if(arr.length == 1)
    {
        var dvTable =  $("#bill"+rowid).find(".Billpara").get(0);
        dvTable.innerHTML = "<p class=\"center-text\">There are no bills for this Incoming<p>";
        return
    }
             //Create a HTML Table element.
             var table = document.createElement("TABLE");
             table.border = "0";
             table.setAttribute("style", "border: none;");
             table.setAttribute("class", "table-sm table");
             //Get the count of columns.
             var columnCount = arr[0].length;
            let totalQuantity = 0;
      
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
                 totalQuantity += Number(arr[i][3]);
                 for (var j = 0; j < columnCount; j++) {
                     var cell = row.insertCell(-1);
                     cell.setAttribute("style", "border: none;");
                     cell.setAttribute("onmouseover","");
                     cell.innerHTML = arr[i][j];
                 }
             }
      
             let Caption = table.createCaption();
             Caption.innerHTML = "<b>Total Number of Bills: </b>"+(arr.length-1)+" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Total Quantity sent: </b>"+totalQuantity;

             var dvTable =  $("#bill"+rowid).find(".Billpara").get(0);
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
    StatusOption+="<option selected>Closed</option>";
    StatusOption+="</select>";

    if(data[0]==1)
    $("#"+rowids).find("#billclosed").html(StatusOption);

    $("#exampleModal").close();
}

function FilterTable()
{
    let dcnumber = $("#filter-dcno").val();
    let customername = $("#filter-customername").val();
    let dcdate = $("#filter-dcdate").val();
    let pendingdc = $("#filter-pendingdc").is(":checked");

    $("#tab_logic tbody tr").remove();

    let filteredTable = DCHist;
    
    if(dcnumber!="")
    {
        filteredTable = filteredTable.filter(function(value){
            return dcnumber == value[0];
        });
    }

    if(customername!="")
    {
        filteredTable = filteredTable.filter(function(value){
            return customername == value[2];
        });
    }


    if(dcdate!="")
    {
        filteredTable = filteredTable.filter(function(value){
            var DCDate = value[1].split("T");
            DCDate = DCDate[0].split(",");
            DCDate = DCDate[0].split("-");

            let DDate = dcdate.split("/");
            return (DCDate[0]==DDate[2] && DCDate[1]==DDate[1] && DCDate[2]==DDate[0]);
        });
    }

    if(pendingdc == true && pendingdc!=undefined)
    {
        filteredTable = filteredTable.filter(function(value){
            return value[5]>0;
        });
    }

    for(var Index = 0; Index < filteredTable.length; Index++)
    {
        var DCDate = filteredTable[Index][1].split("T");
        DCDate = DCDate[0].split(",");
        DCDate = DCDate[0].split("-");
        DCDate = DCDate[2]+"-"+DCDate[1]+"-"+DCDate[0];
        
       // $('#addr'+row_number).html($('#addr'+row_number).html()).find('td:first-child').html(row_number+1);
        $('#tab_logic').append('<tr id="dc'+Index+'"><td id="dcno" class="dcno">'+filteredTable[Index][0]+'</td><td id="dccustomer" class="dccustomer">'+filteredTable[Index][2]+'</td><td id="dcdate" class="dcdate">'+DCDate+'</td><td id="dccomponent" class="dccomponent">'+filteredTable[Index][3]+'</td><td id="dcdescription" class="dcdescription">'+filteredTable[Index][4]+'</td><td  id="phyquan" class="phyquan">'+filteredTable[Index][5]+'</td><td id="recquant" class="recquant">'+filteredTable[Index][6]+'</td></tr><tr id="bill'+Index+'" style="visibility:collapse" class="bill"><td colspan=7 class="text-center"><div class="Billpara container"></div></td></tr>');
    }
    
     

}