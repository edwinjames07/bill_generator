function readHTML() {
	var invoiceNumber=document.getElementById("inputInvoice").value;   
	var invoiceNumber =document.getElementById("inputInvoice").value;
	var date = new Date($('#inputDate').val());
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	var invoiceDate =[day, month, year].join('-')
	var shop =document.getElementById("shop").value;
	var quantity =document.getElementById("inputQuantity").value;
	var rate =document.getElementById("inputRate").value;

	console.log(invoiceNumber);
	console.log(invoiceDate);
	console.log(shop);
	console.log(quantity);
	console.log(rate);

	var shopDetails ="";
	switch (shop) {
		case "1":
		  shopDetails = "Simla Jewellers<br />kottiyam<br />GSTIN: 32AGKPS6975JIZP";
		  break;
		case "2":
		  shopDetails = "Vanitha Fashion Jewellery<br />kottiyam<br />GSTIN: 32AILPA1960GIZP";
		  break;
		case "3":
		  shopDetails = "M S JEWELLERY<br />ATTINGAL<br />GSTIN: 32ABLFM4632J1Z7";
		  break;
		case "4":
		  shopDetails = "AISWARYA JEWELLERY<br />KOLLAM<br />GSTIN: 32ABAFA8534C1ZO";
		  break;
		case "5":
		 shopDetails = "";
		 break;
		case 6:
			shopDetails = "";
	}
	var quantityVal = parseFloat(quantity);
	var rateVal = parseFloat(rate);

	
	var totalAmount = quantityVal* rateVal;
	totalAmount =Math.round((totalAmount + Number.EPSILON) * 100) / 100;

	var totalTax = (totalAmount* 2.5 )/100;
	totalTax =Math.round((totalTax + Number.EPSILON) * 100) / 100;

	var grandTotal = totalAmount +(totalTax *2);
	grandTotal =Math.round((grandTotal + Number.EPSILON) * 100) / 100;

	var mtotalAmount = quantityVal* 120;
	mtotalAmount= Math.round((mtotalAmount + Number.EPSILON) * 100) / 100;

	var mtotalTax = (mtotalAmount* 2.5 )/100;
	mtotalTax= Math.round((mtotalTax + Number.EPSILON) * 100) / 100;

	var mgrandTotal = mtotalAmount +(mtotalTax *2);
	mgrandTotal =Math.round((mgrandTotal + Number.EPSILON) * 100) / 100

	var rowTotal =totalAmount +mtotalAmount;
	rowTotal =Math.round((rowTotal + Number.EPSILON) * 100) / 100;

	var rowTotalTax =totalTax +mtotalTax;
	rowTotalTax =Math.round((rowTotalTax + Number.EPSILON) * 100) / 100

	var finalAmount = grandTotal+ mgrandTotal;
	finalAmount =Math.round((finalAmount + Number.EPSILON) * 100) / 100
	  
    var amountInWords =amountInWord(finalAmount); 
	var divContents = $("#bill").html();
	divContents =divContents.replaceAll("finalAmount", finalAmount);
	divContents =divContents.replaceAll("rowTotalTax", rowTotalTax);
	divContents =divContents.replaceAll("rowTotal", rowTotal);
	divContents =divContents.replaceAll("mgrandTotal", mgrandTotal);
	divContents =divContents.replaceAll("mtotalTax", mtotalTax);
	divContents =divContents.replaceAll("mtotalAmount", mtotalAmount);
	divContents =divContents.replaceAll("grandTotal", grandTotal);
	divContents =divContents.replaceAll("totalTax", totalTax);
	divContents =divContents.replaceAll("totalAmount", totalAmount);
	divContents =divContents.replaceAll("amountInWords", amountInWords);

	divContents =divContents.replaceAll("invioceNumber", invoiceNumber);
	divContents =divContents.replaceAll("invioceDate", invoiceDate);
	divContents =divContents.replaceAll("itemQuantity", quantity);
	divContents =divContents.replaceAll("itemRate", rate);
	divContents =divContents.replaceAll("shopDetails", shopDetails);
	var printWindow = window.open('', '', 'height=400,width=800');
	printWindow.document.write('<html><head><title> &nbsp;</title>');
	printWindow.document.write('<link href="./assets/css/style.css" type="text/css" rel="stylesheet" />');
	printWindow.document.write('<style type="text/css" media="print">@page{size: auto;margin: 5mm;  }</style>');
	printWindow.document.write('</head><body >');
	printWindow.document.write(divContents);
	printWindow.document.write('</body></html>');
	printWindow.document.close();
	//printWindow.print();
}

function amountInWord(num){
	if(num.toString().includes(".")){
		var splittedNum =num.toString().split('.')
		var nonDecimal=splittedNum[0]
		var decimal=splittedNum[1]
		var value=price_in_words(Number(nonDecimal))+" and "+price_in_words(Number(decimal))+" paise";
		return value;
	}else{
		return price_in_words(num);
	}
	
}
function price_in_words(price) {
	var sglDigit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
	  dblDigit = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
	  tensPlace = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
	  handle_tens = function(dgt, prevDgt) {
		return 0 == dgt ? "" : " " + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt])
	  },
	  handle_utlc = function(dgt, nxtDgt, denom) {
		return (0 != dgt && 1 != nxtDgt ? " " + sglDigit[dgt] : "") + (0 != nxtDgt || dgt > 0 ? " " + denom : "")
	  };
  
	var str = "",
	  digitIdx = 0,
	  digit = 0,
	  nxtDigit = 0,
	  words = [];
	if (price += "", isNaN(parseInt(price))) str = "";
	else if (parseInt(price) > 0 && price.length <= 10) {
	  for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--) switch (digit = price[digitIdx] - 0, nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0, price.length - digitIdx - 1) {
		case 0:
		  words.push(handle_utlc(digit, nxtDigit, ""));
		  break;
		case 1:
		  words.push(handle_tens(digit, price[digitIdx + 1]));
		  break;
		case 2:
		  words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2] ? " and" : "") : "");
		  break;
		case 3:
		  words.push(handle_utlc(digit, nxtDigit, "Thousand"));
		  break;
		case 4:
		  words.push(handle_tens(digit, price[digitIdx + 1]));
		  break;
		case 5:
		  words.push(handle_utlc(digit, nxtDigit, "Lakh"));
		  break;
		case 6:
		  words.push(handle_tens(digit, price[digitIdx + 1]));
		  break;
		case 7:
		  words.push(handle_utlc(digit, nxtDigit, "Crore"));
		  break;
		case 8:
		  words.push(handle_tens(digit, price[digitIdx + 1]));
		  break;
		case 9:
		  words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2] ? " and" : " Crore") : "")
	  }
	  str = words.reverse().join("")
	} else str = "";
	return str
  
  }
function converHTMLFileToPDF() {
	const { jsPDF } = window.jspdf;
	var doc = new jsPDF('l', 'mm', [ 595.28,  841.89])
	let pdf = new jsPDF('l', 'mm', 'a4');
	let margin = 10; // narrow margin - 12.7 mm
	let srcwidth = document.getElementById('temp-target').scrollWidth;
	console.log(srcwidth);
	let scale = (595.28 - margin * 2) / 3800; // a4 pageSize 595.28
	
	pdf.html(document.getElementById('temp-target'), {
		backgroundColor: 'lightyellow',
		html2canvas: {
			scale: scale // default is window.devicePixelRatio,
		},
		x: margin,
		y: margin,
		callback: function () {
			window.open(pdf.output('bloburl'));
		}
	});

	
}
