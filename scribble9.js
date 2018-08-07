var enableDraw = false;
var pencilDraw = true;
var started = false;
var canvas, context;
var lastColor = 'black';
var thickness = 2;
alpha = 1;
var scatRect = false;
var scatCirc = false;
var sprayPaint = false;
var x1 = 0;
var y1=0;
var x2 = 0;
var y2=0;
var x3 = 0;
var y3 = 0;
copyCount = 0;
//var x4 = 0;
//var y4 = 0;

drawRect = false;
drawCirc = false;
drawLine = false;
drawQCurve = false;
startQCurve = false;
fill = false;
drawSelect = false;
moveTool = false;
copyTool = false;
deleteTool = false;
selectStart = false;
var imgData;
backgroundColor = 'white';
changeBackground = false;



function init() {
	canvas = $('#imageView').get(0);
	context = canvas.getContext('2d');
	canvas.width = window.innerWidth - 75;
	canvas.height = window.innerHeight - 75;
	context.fillStyle = 'white';
	context.fillRect(0,0,context.canvas.width, context.canvas.height)
	context.fillStyle = 'black';
	canvas.addEventListener('mousemove', onMouseMove, false);	
	canvas.addEventListener('click', onClick, false);		
	canvas.addEventListener('mousedown', function(e) { onMouseDown(e);enableDraw = true;}, false);
	canvas.addEventListener('mouseup', function(e) { onMouseUp(e); enableDraw = false; started = false;}, false);
	canvas.addEventListener('mouseleave', function(e) { enableDraw = false; started = false;}, false);
	
	$('#darkred').get(0).addEventListener('click', function(e) {
	  onColorClick(e.target.id);}, false);
	$('#gold').get(0).addEventListener('click', function(e) {
	  onColorClick(e.target.id);}, false);
	$('#crimson').get(0).addEventListener('click', function(e) {
	  onColorClick(e.target.id);}, false);
	$('#orchid').get(0).addEventListener('click', function(e) {
	  onColorClick(e.target.id);}, false);
	$('#mediumseagreen').get(0).addEventListener('click', function(e) {
	  onColorClick(e.target.id);}, false);
	$('#darkcyan').get(0).addEventListener('click', function(e) {
	  onColorClick(e.target.id);}, false);	  
	$('#greenyellow').get(0).addEventListener('click', function(e) {
	  onColorClick(e.target.id);}, false);  
	$('#royalblue').get(0).addEventListener('click', function(e) {
	  onColorClick(e.target.id);}, false);
	$('#mediumblue').get(0).addEventListener('click', function(e) {
	  onColorClick(e.target.id);}, false);
	$('#navy').get(0).addEventListener('click', function(e) {
	  onColorClick(e.target.id);}, false);
	$('#indigo').get(0).addEventListener('click', function(e) {
	  onColorClick(e.target.id);}, false);  
	$('#mediumvioletred').get(0).addEventListener('click', function(e) {
	  onColorClick(e.target.id);}, false); 
	$('#purple').get(0).addEventListener('click', function(e) {
	  onColorClick(e.target.id);}, false);
	$('#yellow').get(0).addEventListener('click', function(e) {
	 onColorClick(e.target.id);}, false);
	 $('#orangered').get(0).addEventListener('click', function(e) {
	 onColorClick(e.target.id);}, false);
	 $('#orange').get(0).addEventListener('click', function(e) {
	 onColorClick(e.target.id);}, false);
	 $('#white').get(0).addEventListener('click', function(e) {
	 onColorClick(e.target.id);}, false);
//	$('#white').get(0).addEventListener('click', function(e) {
	//  onColorClick(e.target.id);}, false);
	$('#black').get(0).addEventListener('click', function(e) {
	  onColorClick(e.target.id);}, false);	 
	  
	$('#save').get(0).addEventListener('click', function(e) { onSave(); }, false);  
	$('#clear').get(0).addEventListener('click', function(e) { clearPage(); }, false);  
	$('#widen').get(0).addEventListener('click', function(e) { widenLine();}, false);
	$('#narrow').get(0).addEventListener('click', function(e) { narrowLine();}, false);
	$('#rAlpha').get(0).addEventListener('click', function(e) { raiseOpacity();}, false);
	$('#lAlpha').get(0).addEventListener('click', function(e) { lowerOpacity();}, false);
	$('#fill').get(0).addEventListener('click', function(e) { fill = true;}, false);
	
	$('#stroke').get(0).addEventListener('click', function(e) { fill = false;}, false);
	$('#bc').get(0).addEventListener('click', function(e) { changeBackground = true;}, false);
	$('#scatRect').get(0).addEventListener('click', function(e) { pencilDraw = false; scatRect = true; drawRect = false; drawLine = false; drawCirc = false; drawSelect = false;/* rectTool();*/}, false);
	$('#scatCirc').get(0).addEventListener('click', function(e) { pencilDraw = false; scatRect = false; scatCirc = true; drawRect = false; drawLine = false; drawCirc = false; drawSelect = false;/* rectTool();*/}, false);
	$('#paint').get(0).addEventListener('click', function(e) { pencilDraw = true; scatRect = false; drawLine = false; scatCirc = false; drawCirc = false; drawSelect = false;}, false);
	$('#spray').get(0).addEventListener('click', function(e) { pencilDraw = false; scatRect = false; scatCirc = false; sprayPaint = true; drawRect = false; drawLine = false; drawCirc = false; drawSelect = false;/* rectTool();*/}, false);
	$('#rect').get(0).addEventListener('click', function(e) { /*rectTool(); */pencilDraw = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = true; drawSelect = false;}, false);
	$('#circ').get(0).addEventListener('click', function(e) { /*rectTool(); */pencilDraw = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = true; drawSelect = false;}, false);
	$('#line').get(0).addEventListener('click', function(e) { /*rectTool(); */pencilDraw = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = true; drawSelect = false;}, false);
	$('#qCurve').get(0).addEventListener('click', function(e) { /*rectTool(); */pencilDraw = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = false; drawQCurve = true; drawSelect = false;}, false);
	//$('#select').get(0).addEventListener('click', function(e) { /*rectTool(); */pencilDraw = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = false; drawQCurve = false; drawSelect = true;}, false);
	$('#move').get(0).addEventListener('click', function(e) { /*moveSelection(); rectTool(); */pencilDraw = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = false; drawQCurve = false; drawSelect = false; copyTool = false; deleteTool = false; moveTool = true; drawSelect = true;}, false);
	$('#copy').get(0).addEventListener('click', function(e) { /*copySelection(); rectTool(); */pencilDraw = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = false; drawQCurve = false; drawSelect = false; copyTool = true; deleteTool = false; moveTool = false; drawSelect = true;}, false);
	$('#delete').get(0).addEventListener('click', function(e) { /*deleteSelection();rectTool(); */pencilDraw = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = false; drawQCurve = false; drawSelect = false; copyTool = false; deleteTool = true; moveTool = false; drawSelect = true;}, false);
	//$('#move').get(0).addEventListener('click', function(e) { moveSelection(); moveTool = true;}, false);  
}
function clearPage (){
	context.clearRect(0,0,context.canvas.width, context.canvas.height)
	var xcolor = lastColor;
	//var xalpha = alpha;
	context.globalAlpha=1;
	
	context.fillStyle = backgroundColor;
	context.fillRect(0,0,context.canvas.width, context.canvas.height)
	context.fillStyle = xcolor;
	context.globalAlpha = alpha;
}
function onMouseMove(ev) {
	var x,y;
	if (ev.layerX >=0) {
		x = ev.layerX - 38;
		y = ev.layerY - 39;
	}
	else if (ev.offsetX >= 0) {
		x = ev.offsetX - 38;
		y = ev.offsetY - 39;
	}

	
	if (enableDraw  ){
		if (pencilDraw){
		if (!started) {
		started = true;
		
		context.beginPath();
		context.moveTo(x, y);		
	} else {
		context.lineTo(x, y);
		context.globalAlpha = alpha;
		context.lineWidth = thickness;
		if(fill) {
			context.fill();
		} else {context.stroke();}
	}
		}
	 else if(pencilDraw == false && scatRect == true) {
		context.moveTo(x,y)
		context.globalAlpha = alpha;
		if(fill) {
			context.fillRect(x,y,10 + thickness,10 + thickness);
		} else {context.strokeRect(x,y,10 + thickness,10 + thickness);}
		
	} else if(pencilDraw == false && scatCirc == true){
		context.closePath();
		context.beginPath();
		context.moveTo(x,y)
		context.globalAlpha = alpha;
		context.arc(x,y,5 + thickness, 2 * Math.PI, false);
		//context.fill();
		if(fill) {
			context.fill();
		} else {context.stroke();}
		
	} else if(pencilDraw == false && scatRect == false && scatCirc == false && sprayPaint == true){
		context.closePath();
		context.beginPath();
		context.moveTo(x,y)
		context.globalAlpha = alpha;
		context.arc(x,y,thickness/5, 2 * Math.PI, false);
		context.arc(x+(thickness/5)+(thickness/10),y,thickness/5, 2 * Math.PI, false);
		context.arc(x+(thickness/5)+(thickness/10),y+(thickness/5)+(thickness/10),thickness/5, 2 * Math.PI, false);
		context.arc(x+(thickness/5)+(thickness/10),y+3*(thickness/5)+(thickness/10),thickness/5, 2 * Math.PI, false);
		context.arc(x,y+(thickness/5)+(thickness/10),thickness/5, 2 * Math.PI, false);
		context.arc(x+3*(thickness/5)+(thickness/10),y,thickness/5, 2 * Math.PI, false);
		context.arc(x+3*(thickness/5)+(thickness/10),y+(thickness/5)+(thickness/10),thickness/5, 2 * Math.PI, false);
		context.arc(x+3*(thickness/5)+(thickness/10),y+3*(thickness/5)+(thickness/10),thickness/5, 2 * Math.PI, false);
		context.arc(x,y+3*(thickness/5)+(thickness/10),thickness/5, 2 * Math.PI, false);
		context.arc(x+(thickness/5)+(thickness/10),y-(thickness/5)+(thickness/10),thickness/5, 2 * Math.PI, false);
		context.arc(x+(thickness/5)+(thickness/10),y+thickness,thickness/5, 2 * Math.PI, false);
		context.arc(x+thickness+1,y+2*(thickness/5)+(thickness/10),thickness/5, 2 * Math.PI, false);
		
		context.fill();
		
	}

	$('#stats').text(x + ', ' + y);
	}
}
function widenLine (){
		thickness++;
			
}
function narrowLine (){
		thickness--;
		if( thickness <= 0){console.log("too thin"); thickness = 1}
		
}

function lowerOpacity(){
		alpha -= .1;
		if( alpha <= 0){console.log("too light");alpha = .1}
}
function raiseOpacity(){
		alpha += .1;
}
/*function toolDisplay(){
if(fill){
$('#' + color).css("border-top", "3px solid " + borderColor);	
}
$('#' + color).css("border-top", "3px solid " + borderColor);
}*/
function onColorClick(color) {
	if(changeBackground){
		backgroundColor = color;
		context.fillStyle = backgroundColor;
		context.fillRect(0,0,context.canvas.width, context.canvas.height)
		changeBackground = false;}
	else{
	context.closePath();
	context.beginPath();
	context.strokeStyle = color;
	context.fillStyle = color;
	var borderColor = 'aliceblue';
	if (color == 'white' || color == 'yellow') {
		borderColor = 'azure';
	} 
	//$('#' + lastColor).css("box-shadow", "3px 3px 5px #0ff");
	$('#' + lastColor).css("border", "0px solid white");
	//$('#' + color).css("box-shadow", "2px 2px 5px #0ff");// + borderColor);
	$('#' + color).css("border-top", "3px solid " + borderColor); /*+ "; border-style: " , "solid none none none;"*/
	
	lastColor = color;
	}
}
function onClick(ev) {

}

function onMouseDown(e) {
	if (e.layerX >=0) {
		x1 = e.layerX - 38;
		y1 = e.layerY -39;
	}
	else if (e.offsetX >= 0) {
		x1 = e.offsetX - 38;
		y1 = e.offsetY -39;
	}
	console.log("yo",x1,y1);
	return x1,y1;
}
function onMouseUp(e) {
	if (e.layerX >=0) {
		x2 = e.layerX - 38;
		y2 = e.layerY - 39;
	}
	else if (e.offsetX >= 0) {
		x2 = e.offsetX - 38;
		y2 = e.offsetY - 39;
	}
	console.log("blah",x2,y2);

	if(!pencilDraw && drawRect == true)
		{rectTool(x1,y1,x2,y2);}
	else if (!pencilDraw && !drawRect && drawCirc== true){
		circTool(x1,y1,x2,y2);
	} else if (!pencilDraw && !drawRect && !drawCirc &&drawLine== true){
		lineTool(x1, y1,x2,y2);
	} else if (!pencilDraw && !drawRect && !drawCirc && !drawLine && drawQCurve== true){
		qCurveTool(x1, y1,x2,y2, x3,y3); 
	} else if(!pencilDraw && !drawRect && !drawCirc && !drawLine && !drawQCurve && drawSelect== true){
		selectTool(x1,y1,x2,y2);
	}
	
	return x2,y2;
}
function rectTool(int, int,int,int){
	enableDraw = false;
	context.globalAlpha = alpha;
	if(fill) {
			context.fillRect (x1, y1, x2-x1, y2-y1);
		} else {context.strokeRect (x1, y1, x2-x1, y2-y1);}
	
	
}
function circTool(int,int, int, int){
	context.closePath();
	context.beginPath();
	context.globalAlpha = alpha;
	radius = (Math.max(Math.abs(y2-y1),Math.abs(x2-x1)))/2;
	context.arc((x1+x2)/2,(y1+y2)/2,radius, 2 * Math.PI, false);
	//context.fill();
	if(fill) {
			context.fill();
		} else {context.stroke();}
}
function lineTool (int,int,int,int){
	context.closePath();
	context.beginPath();
	context.globalAlpha = alpha;
	context.moveTo(x1,y1);
	context.lineTo(x2,y2);
	context.lineWidth = thickness;
	context.stroke();
	console.log("line");
	
}
function selectTool(int,int, int, int){
	//imgData = null;
	imgData=context.getImageData(x1,y1,Math.abs(x2-x1),Math.abs(y2-y1));
	/*canvas.addEventListener('dblclick', onDoubleClick, false);
	function onDoubleClick(e) {	
		if (e.layerX >=0) {
			x4 = e.layerX - 35;
			y4 = e.layerY - 5;
		}
		else if (e.offsetX >= 0) {
			x4 = e.offsetX - 35;
			y4 = e.offsetY - 5;
		}
		console.log("single",x4,y4);
		selectStart = true;
		return x4,y4, selectStart;
	}*/
	
	if (moveTool){
		//context.strokeRect(x1+1,y1+1,Math.abs(x2-x1)-1,Math.abs(y2-y1)-1);
		moveSelection(imgData,x1,y1,x2,y2);
	} else if(!moveTool && copyTool){
		copySelection(imgData,x1,y1,x2,y2);
	} else if(!moveTool && !copyTool && deleteTool){
		deleteSelection(imgData,x1,y1,x2,y2);
	}
	
		/*if (moveTool && selectStart){
		//context.strokeRect(x1+1,y1+1,Math.abs(x2-x1)-1,Math.abs(y2-y1)-1);
		context.putImageData(imgData, x4,y4);
		context.clearRect(x1,y1,Math.abs(x2-x1),Math.abs(y2-y1));
	} else if(!moveTool && copyTool){
		context.putImageData(imgData, x4,y4);
	} else if(!moveTool && !copyTool && deleteTool){
		context.clearRect(x1,y1,x2-x1,y2-y1);
	}*/
	console.log(imgData, x1,y1,x2,y2);
	//return imgData, x1,y1,x2,y2;
}
/*function moveSelection(imgData, int, int,int,int){
		var x4;
		var y4;
		canvas.addEventListener('dblclick', onDoubleClick, false);
			function onDoubleClick(e) {	
				if (e.layerX >=0) {
					x4 = e.layerX - 35;
					y4 = e.layerY - 5;
				}
				else if (e.offsetX >= 0) {
					x4 = e.offsetX - 35;
					y4 = e.offsetY - 5;
				}
		//console.log("single",x4,y4);
		//lectStart = true;
		
	
		//context.putImageData(imgData, x4,y4, x1,y1, Math.abs(x2-x1),Math.abs(x2-x1));
		//context.clearRect(x1,y1,Math.abs(x2-x1),Math.abs(y2-y1));
		context.putImageData(imgData, x4,y4);
		
			}
			context.clearRect(x1,y1,Math.abs(x2-x1),Math.abs(y2-y1));
}*/
function moveSelection(){
		console.log("um");
		var x4;
		var y4;
		canvas.addEventListener('dblclick', onDoubleClick, false);
			function onDoubleClick(e) {	
				if (e.layerX >=0) {
					x4 = e.layerX - 38;
					y4 = e.layerY - 39;
				}
				else if (e.offsetX >= 0) {
					x4 = e.offsetX - 38;
					y4 = e.offsetY - 39;
				}
		//console.log("single",x4,y4);
		//lectStart = true;
		
	
		//context.putImageData(imgData, x4,y4, x1,y1, Math.abs(x2-x1),Math.abs(x2-x1));
		//context.clearRect(x1,y1,Math.abs(x2-x1),Math.abs(y2-y1));
		context.putImageData(imgData, x4,y4);
		
			}
			context.clearRect(x1,y1,Math.abs(x2-x1),Math.abs(y2-y1));
			var xcolor = lastColor;
			context.globalAlpha=1;
			context.fillStyle = backgroundColor;
			context.fillRect(x1,y1,x2-x1,y2-y1)
			context.fillStyle = xcolor;
			context.globalAlpha = alpha;
}
function copySelection(/*imgData, int, int,int,int*/){
		var x4;
		var y4;
		
		canvas.addEventListener('dblclick', onDoubleClick, false);
			function onDoubleClick(e) {	
			
				if (e.layerX >=0) {
					x4 = e.layerX - 38;
					y4 = e.layerY - 39;
				}
				else if (e.offsetX >= 0) {
					x4 = e.offsetX - 38;
					y4 = e.offsetY - 39;
				}
		//console.log("single",x4,y4);
		//selectStart = true;
		//return x4,y4;
	//	}
		/*if(copyCount !=0){*/
		context.putImageData(imgData, x4,y4);
		/*console.log("putest");
		copyCount++;}
		else {*/
		//context.putImageData(imgData, x4,y4,x1,y1,Math.abs(x2-x1),Math.abs(y2-y1));//}
		
		//context.clearRect(x1,y1,Math.abs(x2-x1),Math.abs(y2-y1));
		}
		
}
function deleteSelection(imgData, int, int,int,int) {
	 context.clearRect(x1,y1,x2-x1,y2-y1);
	 var xcolor = lastColor;
	 context.globalAlpha=1;
	context.fillStyle = backgroundColor;
	context.fillRect(x1,y1,x2-x1,y2-y1)
	context.fillStyle = xcolor;
	context.globalAlpha = alpha;
	 
}

function qCurveTool (int,int,int,int,int,int) {
	canvas.addEventListener('dblclick', onDoubleClick, false);
	function onDoubleClick(e) {
	context.closePath();
	startQCurve = true;
	if (e.layerX >=0) {
		x3 = e.layerX - 38;
		y3 = e.layerY - 39;
	}
	else if (e.offsetX >= 0) {
		x3 = e.offsetX - 38;
		y3 = e.offsetY - 39;
	}
	console.log("double",x3,y3);
	
	return x3,y3;
}
	if(startQCurve){	
	context.closePath();
	context.beginPath();
	context.globalAlpha = alpha;
	context.moveTo(x1,y1);
	context.quadraticCurveTo(x3,y3,x2,y2);
	context.lineWidth = thickness;
	//context.stroke();
	if(fill) {
			context.fill();
		} else {context.stroke();}
	context.closePath();
	console.log("dude");
	startQCurve = false;
	}
}

function onSave() {
	//var img = context.toDataURL();

	//document.getElementById('canvasImg').src = dataURL;
	//var dataURL = canvas.toDataURL();
	
	//	var img = canvas.toDataURL("image/png");
//	document.write('<img src"' + img + '"/>');
	
	/*  var dataURL = $canvas[0].toDataURL('image/png');
  var w = window.open('about:blank', 'image from canvas');
  w.document.write("<img src='" + dataURL + "' alt='from canvas'/>");*/
  
  var canvas  = document.getElementById("imageView");
var dataUrl = canvas.toDataURL();

console.log(dataUrl);

window.open(dataUrl, "toDataURL() image", "width=" + canvas.width +", height=" + canvas.height);

}



