$(document).ready(async function(){
    
    let billheight = 270;

    document.getElementById('company').innerHTML = "";
    document.getElementById('company').innerHTML = "<b>"+PrintBill.customername+"</b><br>"+PrintBill.customeraddress1+"<br>"+PrintBill.customeraddress2+"<br>"+PrintBill.customercity+" - "+PrintBill.customerpin+"<br>GSTIN: <b>"+PrintBill.gstin+"<b>";

    document.getElementById('invoiceno').innerHTML = "";
    document.getElementById('invoiceno').innerHTML = "<b style='font-size:25px'>"+PrintBill.invoiceno+"</b>";

    document.getElementById('invoicedate').innerHTML = "";
    document.getElementById('invoicedate').innerHTML = PrintBill.invoicedate;
    
    document.getElementById('dcno').innerHTML = "";
    document.getElementById('dcno').innerHTML = PrintBill.dcno[0];
    for(let index = 1; index < PrintBill.dcno.length; index++)
        document.getElementById('dcno').innerHTML += "<br>"+PrintBill.dcno[index];
        
    document.getElementById('dccode').innerHTML = "";
    document.getElementById('dccode').innerHTML = PrintBill.dccompcode[0];
    for(let index = 1; index < PrintBill.dccompcode.length; index++)
        document.getElementById('dccode').innerHTML += "<br>"+PrintBill.dccompcode[index];

    document.getElementById('dcqty').innerHTML = "";
    document.getElementById('dcqty').innerHTML = PrintBill.dcquantity[0];
    for(let index = 1; index < PrintBill.dcquantity.length; index++)
        document.getElementById('dcqty').innerHTML += "<br>"+PrintBill.dcquantity[index];

    document.getElementById('dcdate').innerHTML = "";
    document.getElementById('dcdate').innerHTML = PrintBill.dcdate[0];
    for(let index = 1; index < PrintBill.dcdate.length; index++)
        document.getElementById('dcdate').innerHTML += "<br>"+PrintBill.dcdate[index];

    // document.getElementById('billcomponents').innerHTML = 	"<tr id='billrow0'>"+
    // "<td id='sno' style='border: 2px solid black;'>1</td>"+
    // "<td id='drawingcode' style='border: 2px solid black;'>"+PrintBill.drawingcode[0]+"</td>"+
    // "<td id='description' style='border: 2px solid black;'>"+PrintBill.desc[0]+"</td>"+
    // "<td id='hsn' style='border: 2px solid black;'>"+PrintBill.hsn[0]+"</td>"+
    // "<td id='uom' style='border: 2px solid black;'>Units</td>"+
    // "<td id='qty' style='border: 2px solid black;'>"+PrintBill.qty[0]+"</td>"+
    // "<td id='rateunit' style='border: 2px solid black;'>"+PrintBill.price[0]+"</td>"+
    // "<td id='taxablevalue' style='border: 2px solid black;'>"+PrintBill.total[0]+"</td>"+
    // "</tr>";

    var table = document.getElementById('billtable'); 

    for(let index = PrintBill.drawingcode.length-1; index >= 0; index--)
    {
    
    var row = table.insertRow(8);
    var cell = row.insertCell(0);
    cell.innerHTML = (index+1);
    if(index == 0 && index == PrintBill.drawingcode.length-1)
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border: 2px solid black;border-bottom:2px solid black;");
    else if(index == 0)
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border: 2px solid black;border-bottom:none;");
    else if(index == PrintBill.drawingcode.length-1)
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border: 2px solid black;border-top:none;");
    else
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border-right: 2px solid black;border-left: 2px solid black;border-top:none;border-bottom:none;");

    cell = row.insertCell(1);
    cell.innerHTML = PrintBill.drawingcode[index];
    if(index == 0 && index == PrintBill.drawingcode.length-1)
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border: 2px solid black;border-bottom:2px solid black;");
    else if(index == 0)
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border: 2px solid black;border-bottom:none;");
    else if(index == PrintBill.drawingcode.length-1)
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border: 2px solid black;border-top:none;");
    else
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border-right: 2px solid black;border-left: 2px solid black;border-top:none;border-bottom:none;");

    cell = row.insertCell(2);
    cell.innerHTML = PrintBill.desc[index] +"<br> Operation "+PrintBill.dcoperation[index]+" Completed";
    if(index == 0 && index == PrintBill.drawingcode.length-1)
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border: 2px solid black;border-bottom:2px solid black;");
    else if(index == 0)
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border: 2px solid black;border-bottom:none;");
    else if(index == PrintBill.drawingcode.length-1)
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border: 2px solid black;border-top:none;");
    else
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border-right: 2px solid black;border-left: 2px solid black;border-top:none;border-bottom:none;");

    cell = row.insertCell(3);
    cell.innerHTML = PrintBill.hsn[index];
    if(index == 0 && index == PrintBill.drawingcode.length-1)
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border: 2px solid black;border-bottom:2px solid black;");
    else if(index == 0)
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border: 2px solid black;border-bottom:none;");
    else if(index == PrintBill.drawingcode.length-1)
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border: 2px solid black;border-top:none;");
    else
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border-right: 2px solid black;border-left: 2px solid black;border-top:none;border-bottom:none;");

    cell = row.insertCell(4);
    cell.innerHTML = "Nos";
    if(index == 0 && index == PrintBill.drawingcode.length-1)
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border: 2px solid black;border-bottom:2px solid black;");
    else if(index == 0)
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border: 2px solid black;border-bottom:none;");
    else if(index == PrintBill.drawingcode.length-1)
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border: 2px solid black;border-top:none;");
    else
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border-right: 2px solid black;border-left: 2px solid black;border-top:none;border-bottom:none;");


    cell = row.insertCell(5);
    cell.innerHTML = PrintBill.price[index];
    if(index == 0 && index == PrintBill.drawingcode.length-1)
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border: 2px solid black;border-bottom:2px solid black;");
    else if(index == 0)
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border: 2px solid black;border-bottom:none;");
    else if(index == PrintBill.drawingcode.length-1)
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border: 2px solid black;border-top:none;");
    else
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border-right: 2px solid black;border-left: 2px solid black;border-top:none;border-bottom:none;");

    cell = row.insertCell(6);
    cell.innerHTML = PrintBill.qty[index].toFixed(2);
    if(index == 0 && index == PrintBill.drawingcode.length-1)
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border: 2px solid black;border-bottom:2px solid black;");
    else if(index == 0)
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border: 2px solid black;border-bottom:none;");
    else if(index == PrintBill.drawingcode.length-1)
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border: 2px solid black;border-top:none;");
    else
        cell.setAttribute("style", "padding-top:20px; padding-left:3px; border-right: 2px solid black;border-left: 2px solid black;border-top:none;border-bottom:none;");
    
    cell = row.insertCell(7);
    cell.innerHTML = PrintBill.total[index];
    if(index == 0 && index == PrintBill.drawingcode.length-1)
        cell.setAttribute("style", "text-align:right; padding-left:3px; padding-top:20px; border: 2px solid black;border-bottom:2px solid black;");
    else if(index == 0)
        cell.setAttribute("style", "text-align:right; padding-left:3px; padding-top:20px; border: 2px solid black;border-bottom:none;");
    else if(index == PrintBill.drawingcode.length-1)
        cell.setAttribute("style", "text-align:right; padding-left:3px; padding-top:20px; border: 2px solid black;border-top:none;");
    else
        cell.setAttribute("style", "text-align:right; padding-top:20px; padding-left:3px; border-right: 2px solid black;border-left: 2px solid black;border-top:none;border-bottom:none;");
    
    row.setAttribute("valign","top");
    row.setAttribute("style","padding-top:100px;");

    if(index == (PrintBill.drawingcode.length-1))
        row.setAttribute("height", billheight.toString());
    else
        billheight -=row.offsetHeight;
    }

    document.getElementById('total').innerHTML = "";
    document.getElementById('total').innerHTML = PrintBill.sub_total;

    document.getElementById('cgst').innerHTML = "";
    document.getElementById('cgst').innerHTML = (Number(PrintBill.sub_total)*(9/100)).toFixed(2);

    document.getElementById('sgst').innerHTML = "";
    document.getElementById('sgst').innerHTML = (Number(PrintBill.sub_total)*(9/100)).toFixed(2);

    document.getElementById('grandtotal').innerHTML = "";
    document.getElementById('grandtotal').innerHTML = "<b>₹&nbsp"+Math.ceil(PrintBill.total_amount)+"</b>&nbsp&nbsp&nbsp";

    document.getElementById('totalwords').innerHTML = "";
    document.getElementById('totalwords').innerHTML = NumbertoWord(Number(Math.ceil(PrintBill.total_amount)));

});

let unitsplace = ['Zero','One','Two','Three','Four','Five','Six','Seven','Eight','Nine'];
let onetensplace = ['Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
let tensplace = ['Twenty','Thirty','Fourty','Fifty','Sixty','Seventy','Eighty','Ninety'];
let hundreds = 'Hundred';
let thousands = 'Thousand';
let lakhs = 'Lakhs';
let Rupees = 'Rupees';

function NumbertoWord(totalnum)
{
    let convertedWord=" only";
    let total = totalnum;
    let places = 0;
    let numbs = 0;
    
    while(total!=0)
    {
        
        if(places == 0)
        {
            numbs = total%10;
            if(numbs != 0)
            {
                convertedWord =" "+ unitsplace[numbs] + convertedWord;
            }
            total/=10;
            total = Math.floor(total);
        }
    
        if(places == 1)
        {
            numbs = total%10;
            if(numbs==1)
            {
                convertedWord = " only";
                numbs = totalnum%10;
                convertedWord = onetensplace[numbs] + convertedWord;
            }
            else if(numbs > 0)
            {
                convertedWord = tensplace[numbs-2] + convertedWord;
            }
                
            total/=10;
            total = Math.floor(total);
        }
    
        if(places == 2)
        {
            if(totalnum%100 > 0)
            {
                convertedWord =" And " + convertedWord;
            }
            numbs = total%10;
            if(numbs != 0)
            {
                convertedWord =" "+ unitsplace[numbs] +" "+hundreds+ convertedWord;
            }
            total/=10;
            total = Math.floor(total);
        }
    
        if(places == 3)
        {
            numbs = total%100;
            if(numbs%10 != 0)
            {
                let nu = numbs/10;
                nu = Math.floor(nu);
                if(nu ==0)
                {
                    convertedWord =" "+ unitsplace[numbs] +" "+thousands+ convertedWord;
                } 
                else
                {
                    if(nu != 1)
                        convertedWord =" "+tensplace[nu-2]+" "+ unitsplace[numbs%10] +" "+thousands+ convertedWord;
                    else if(nu != 0)
                        convertedWord =" "+onetensplace[numbs%10]+" "+thousands+ convertedWord;
                }
            }
            total/=100;
            total = Math.floor(total);
        }
    
        if(places == 4)
        {
            numbs = total%100;
            if(numbs%10 != 0)
            {
                let nu = numbs/10;
                nu = Math.floor(nu);
                if(nu ==0)
                {
                    convertedWord =" "+ unitsplace[numbs] +" "+lakhs+ convertedWord;
                } 
                else
                {
                    if(nu != 1)
                        convertedWord =" "+tensplace[nu-2]+" "+ unitsplace[numbs%10] +" "+lakhs+ convertedWord;
                    else if(nu != 0)
                        convertedWord =" "+onetensplace[numbs%10]+" "+lakhs+ convertedWord;
                }
            }
            total/=100;
            total = Math.floor(total);	
        }
    
        places++;
    }
    
    convertedWord = "Rupees "+convertedWord;
        
    return convertedWord;
    
}