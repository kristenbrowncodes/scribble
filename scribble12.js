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
var density = 5;
var x1 = 0;
var y1=0;
var x2 = 0;
var y2=0;
var x3 = 0;
var y3 = 0;
copyCount = 0;
//var x4 = 0;
//var y4 = 0;
var ffxoffset= 40;
var ffyoffset= 39;
//var wkxoffset = 38;
//var wkyoffset = 39;
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
var xalpha;
var backgroundLayers = [];
var backgroundAlphaLayers = [];

enableTrans = false;
disableTrans = true;
var w =0;
var h =0;


function init() {
	canvas = $('#imageView').get(0);
	context = canvas.getContext('2d');
	canvas.width = window.innerWidth - 95;
	canvas.height = window.innerHeight - 185;
	context.fillStyle = 'white';
	context.fillRect(0,0,context.canvas.width, context.canvas.height)
	context.fillStyle = 'black';
	//context.lineJoin = context.lineCap = 'round';
	canvas.addEventListener('mousemove', onMouseMove, false);	
	canvas.addEventListener('click', onClick, false);		
	canvas.addEventListener('mousedown', function(e) { onMouseDown(e);enableDraw = true;}, false);
	canvas.addEventListener('mouseup', function(e) { onMouseUp(e); enableDraw = false; started = false;}, false);
	canvas.addEventListener('mouseleave', function(e) { enableDraw = false; started = false;}, false);
	canvas.addEventListener('touchmove', function(ev){onMouseMove; ev.preventDefault();}, false);
	canvas.addEventListener('touchstart', function(e) { onMouseDown(e);enableDraw = true;}, false);
	canvas.addEventListener('touchend', function(e) { onMouseUp(e); enableDraw = false; started = false;}, false);
	canvas.addEventListener('touchleave', function(e) { enableDraw = false; started = false;}, false);
	
	$('#darkred').get(0).addEventListener('click', function(e) {
	  onColorClick(e.target.id);}, false);
	$('#coral').get(0).addEventListener('click', function(e) {
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
//experiment to make ie checkbox work	 
$(".checkbox").click(function(){
    $(this).change();
});	 
	$('#save').get(0).addEventListener('click', function(e) { onSave(); }, false);  
	$('#clear').get(0).addEventListener('click', function(e) { clearPage(); }, false);  
//	$('#widen').get(0).addEventListener('click', function(e) { widenLine();}, false);
	$('#eTrans').get(0).addEventListener('click', function(e) { enableTranparency();}, false);
	$('#dTrans').get(0).addEventListener('click', function(e) { disableTranparency();}, false);
	/*$('#narrow').get(0).addEventListener('click', function(e) { narrowLine();}, false);
	$('#rAlpha').get(0).addEventListener('click', function(e) { raiseOpacity();}, false);
	$('#lAlpha').get(0).addEventListener('click', function(e) { lowerOpacity();}, false);*/
	$('#fill').get(0).addEventListener('click', function(e) { fill = true;}, false);
	document.getElementById("save").addEventListener('click', onSave, false);
	$('#stroke').get(0).addEventListener('click', function(e) { fill = false;}, false);
	$('#bc').get(0).addEventListener('click', function(e) { changeBackground = true;}, false);
	$('#scatRect').get(0).addEventListener('click', function(e) { pencilDraw = false; scatRect = true; drawRect = false; drawLine = false; drawCirc = false; drawSelect = false;/* rectTool();*/}, false);
	$('#scatCirc').get(0).addEventListener('click', function(e) { pencilDraw = false; scatRect = false; scatCirc = true; drawRect = false; drawLine = false; drawCirc = false; drawSelect = false;/* rectTool();*/}, false);
	$('#paint').get(0).addEventListener('click', function(e) { pencilDraw = true; scatRect = false; drawLine = false; scatCirc = false; drawCirc = false; drawSelect = false;}, false);
	//$('#spray').get(0).addEventListener('click', function(e) { pencilDraw = false; scatRect = false; scatCirc = false; sprayPaint = true; drawRect = false; drawLine = false; drawCirc = false; drawSelect = false;/* rectTool();*/}, false);
	$('#spray2').get(0).addEventListener('click', function(e) { pencilDraw = false; scatRect = false; scatCirc = false; sprayPaint = false; spray2 = true; drawRect = false; drawLine = false; drawCirc = false; drawSelect = false;/* rectTool();*/}, false);
	$('#cPen').get(0).addEventListener('click', function(e) { pencilDraw = false; scatRect = false; scatCirc = false; sprayPaint = false; spray2 = false; calPen=true; drawRect = false; drawLine = false; drawCirc = false; drawSelect = false;/* rectTool();*/}, false);
	$('#rect').get(0).addEventListener('click', function(e) { /*rectTool(); */pencilDraw = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = true; drawSelect = false; moveTool = false; copyTool = false; deleteTool = false;}, false);
	$('#circ').get(0).addEventListener('click', function(e) { /*rectTool(); */pencilDraw = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = true; drawSelect = false; moveTool = false; copyTool = false; deleteTool = false;}, false);
	$('#line').get(0).addEventListener('click', function(e) { /*rectTool(); */pencilDraw = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = true; drawSelect = false; moveTool = false; copyTool = false; deleteTool = false;}, false);
	$('#qCurve').get(0).addEventListener('click', function(e) { /*rectTool(); */pencilDraw = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = false; drawQCurve = true; drawSelect = true; moveTool = false; copyTool = false; deleteTool = false;}, false);
	//$('#select').get(0).addEventListener('click', function(e) { /*rectTool(); */pencilDraw = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = false; drawQCurve = false; drawSelect = true;}, false);
	$('#move').get(0).addEventListener('click', function(e) { /*moveSelection(); rectTool(); */pencilDraw = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = false; drawQCurve = false; drawSelect = false; copyTool = false; deleteTool = false; moveTool = true; drawSelect = true;}, false);
	$('#copy').get(0).addEventListener('click', function(e) { /*copySelection(); rectTool(); */pencilDraw = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = false; drawQCurve = false; drawSelect = false; copyTool = true; deleteTool = false; moveTool = false; drawSelect = true;}, false);
	$('#delete').get(0).addEventListener('click', function(e) { /*deleteSelection();rectTool(); */pencilDraw = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = false; drawQCurve = false; drawSelect = false; copyTool = false; deleteTool = true; moveTool = false; drawSelect = true;}, false);
	//$('#move').get(0).addEventListener('click', function(e) { moveSelection(); moveTool = true;}, false);  
}
function clearPage (){
	
	context.clearRect(0,0,context.canvas.width, context.canvas.height);
	var xcolor = lastColor;
	xalpha = alpha;
	if(disableTrans){
	context.globalAlpha=1;
	context.fillStyle = 'white';
	context.fillRect(0,0,context.canvas.width, context.canvas.height);}
	/*context.fillStyle = backgroundColor;
	context.globalAlpha = alpha;
	context.fillRect(0,0,context.canvas.width, context.canvas.height)*/
	w = context.canvas.width;
	h = context.canvas.height;
	reloadBackground(0,0, w, h);
	context.fillStyle = xcolor;
	//} else {clearTrans();}
}
function clearTrans(){
	context.clearRect(0,0,context.canvas.width, context.canvas.height)
	context.fillStyle = backgroundColor;
}

function getRandomAng() {
  ang = Math.random() * 2 * Math.PI;
  return ang;
  
  
}

function getRandomRad() {
  rad = Math.random() * thickness;
  return rad;
  
  
}
function angleBetween(point1, point2) {
  return Math.atan2( point2.curX - point1.curX, point2.curY - point1.curY );
}
function onMouseMove(ev) {
	var x,y;
	/*if (ev.layerX >=0) {
		x = ev.layerX - wkxoffset;
		y = ev.layerY - wkyoffset;
	}
	else if (ev.offsetX >= 0) {
		x = ev.offsetX - ffxoffset;
		y = ev.offsetY - ffyoffset;
	}
*/
	if (!ev) var ev = window.event;
	if (ev.pageX || ev.pageY) 	{
		x = ev.pageX - ffxoffset;
		y = ev.pageY - ffyoffset;
	}
	else if (ev.clientX || ev.clientY) 	{
		x = ev.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft - ffxoffset;
		y = ev.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop - ffyoffset;
	}
	// posx and posy contain the mouse position relative to the document
	// Do something with this information
	
	
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
		context.closePath();
		context.beginPath();
		context.moveTo(x,y)
		context.globalAlpha = alpha;
		var sThickness = Number(thickness) *4 ; 
		context.rect(x,y,sThickness, sThickness)
		if(fill) {
			context.fill();
		} else {context.lineWidth = 1; context.stroke();}
		context.lineWidth = thickness;
		/*if(fill) {
			context.fillRect(x,y,/*5 + thickness +5,/*5 + thickness + 5);
		/*} else {
			//var xthickness = thickness;
			context.lineWidth = 1;
		//	context.strokeRect(x,y,/*5 + thickness + 5,/*5 + thickness +5);
		//	context.lineWidth = thickness;}*/
		
	} else if(pencilDraw == false && scatCirc == true){
		context.closePath();
		context.beginPath();
		context.moveTo(x,y)
		context.globalAlpha = alpha;
		var cThickness = Number(thickness) * 2;
		context.arc(x,y,cThickness,2 * Math.PI, false);
		//context.fill();
		if(fill) {
			context.fill();
		} else {context.lineWidth = 1; context.stroke();}
		context.lineWidth = thickness;
	} else if(pencilDraw == false && scatRect == false && scatCirc == false && sprayPaint == true){
		var spot = thickness/5;
		var dist = thickness/10;
		context.closePath();
		context.beginPath();
		context.moveTo(x,y)
		context.globalAlpha = alpha;
		context.arc(x,y,dist, 2 * Math.PI, false);
		context.arc(x+dist+spot,y,spot, 2 * Math.PI, false);
		context.arc(x+spot+dist,y+spot+ dist,spot, 2 * Math.PI, false);
		context.arc(x+spot+dist,y+ spot * 3 +dist,spot, 2 * Math.PI, false);
		context.arc(x,y+(spot)+(dist),spot, 2 * Math.PI, false);
		context.arc(x+3*(spot)+(dist),y,spot, 2 * Math.PI, false);
		context.arc(x+3*(spot)+(dist),y+(spot)+(dist),spot, 2 * Math.PI, false);
		context.arc(x+3*(spot)+(dist),y+3*(spot)+(dist),spot, 2 * Math.PI, false);
		context.arc(x,y+3*(spot)+(dist),spot, 2 * Math.PI, false);
		context.arc(x+(spot)+(dist),y-(spot)+(dist),spot, 2 * Math.PI, false);
	//	context.arc(x+(spot)+(dist),y+thickness,spot, 2 * Math.PI, false);
	//	context.arc(x+thickness+1,y+2*(spot)+(dist),spot, 2 * Math.PI, false);
		
		context.stroke();
		
	} else if(pencilDraw == false && scatRect == false && scatCirc == false && sprayPaint == false && spray2 == true){
		density = thickness + 5;
		for(var i = density; i--;){
			
			//var adjX = getRandomInt(-thickness, thickness) +x;
			//var adjY = getRandomInt(-thickness, thickness)+y;
			var adjX = Math.cos(getRandomAng()) * getRandomRad() + x;
			var adjY = Math.sin(getRandomAng()) * getRandomRad() + y;
			context.fillRect(adjX,adjY,1,1);
		}
		
	} else if(pencilDraw == false && scatRect == false && scatCirc == false && sprayPaint == false && spray2 == false && calPen == true){
		context.closePath();
		context.beginPath();
		context.globalAlpha = alpha;
		/*var current = {curX:x,curY:y};
		var dist = distanceBetween(old, current);
		var ang = angleBetween(old,current)
		for(var i = 0; i < dist; i+=1){
			context.moveTo(x,y)
			context.beginPath();;
			context.moveTo(old.curX+(Math.sin(ang) *i-25),old.curY+(Math.cos(ang)*i-25));
			//context.lineTo(x+Number(thickness),y-Number(thickness));
			
			context.lineTo(current.curX+Number(thickness),current.curY-Number(thickness));
			console.log(old,current);
			context.lineWidth = 4;
			context.stroke();
			context.closePath();
			old = current;
			}*/
			context.moveTo(x,y);
			context.lineTo(x+Number(thickness),y-Number(thickness));
			context.lineWidth = 4;
			context.stroke();
			context.lineWidth = thickness;
	}

	$('#stats').text(x + ', ' + y);
	}
}
/*
function widenLine (){
		thickness++;
			
}
function narrowLine (){
		thickness--;
		if( thickness <= 0){console.log("too thin"); thickness = 1}
		
}*/
/*
function lowerOpacity(){
		alpha -= .1;
		if( alpha <= .1){console.log("too light");alpha = .2}
}
function raiseOpacity(){
		alpha += .1;
		if( alpha >= 1){console.log("too dark");alpha = 1}
}*/

function opacitySlider(OS) {
    document.querySelector('#opacity').value = OS;
    alpha = Number((document.querySelector('#opacity').value))/10
    console.log(alpha);
}
function strokeWidthSlider(SWS) {
    document.querySelector('#lineThickness').value = SWS;
    thickness = document.querySelector('#lineThickness').value
    console.log(thickness);
}
function enableTranparencySlider(ETS) {
    document.querySelector('#ET').value = ETS;
    trans1 = document.querySelector('#ET').value
	if (trans1 == 1){
		enableTranparency();
	} else if (trans1 == 0){
		disableTranparency();
	}
    console.log(trans1);
}
function getTrans(){
	var checkVal = document.getElementById("transCheck").checked;
	console.log(checkVal);
	if (checkVal){
		enableTranparency();
		
	} else {
		disableTranparency();
	}
}
function distanceBetween(point1, point2) {
  return Math.sqrt(Math.pow(point2.curX - point1.curX, 2) + Math.pow(point2.curY - point1.curY, 2));
}

/*function getTransToggle() {
   var isChecked = document.getElementById("myCheckBox").checked;
    
   if(isChecked){ 
    enableTranparency();
   } else {
     disableTranparency();
   }
}*/



function enableTranparency(){
	enableTrans = confirm('Changing transparency settings will erase existing artwork. Do you wish to proceed?');
	if(enableTrans){
		backgroundAlphaLayers.length = 0;
		backgroundLayers.length = 0;
		disableTrans = false;
		clearPage();
		$('#eTrans').css("background-color:", "azure;" );
		$('#dTrans').css("background-color:", "aliceblue;" );
		
		disableTrans = false;
		pencilDraw = true;
		console.log("en",enableTrans,disableTrans);
	}
}
function disableTranparency(){
	disableTrans = confirm('Changing transparency settings will erase existing artwork. Do you wish to proceed?');
	if(disableTrans){
		backgroundAlphaLayers.length = 0;
		backgroundLayers.length = 0;
		backgroundColor = 'white';
		clearPage();
		$('#dTrans').css("background-color:", "azure;" );
		$('#eTrans').css("background-color:", "aliceblue;" );
		enableTrans = false;
		pencilDraw = true;
		console.log("dis",enableTrans,disableTrans);
	}
}
/*function toolDisplay(){
if(fill){
$('#' + color).css("border-top", "3px solid " + borderColor);	
}
$('#' + color).css("border-top", "3px solid " + borderColor);
}*/
function onColorClick(color) {
	if(changeBackground){
		var zcolor = lastColor;
		xalpha = alpha;
		context.globalAlpha = alpha;
		backgroundAlphaLayers.push(alpha);
		
		backgroundColor = color;
		backgroundLayers.push(backgroundColor);
		globalAlpha = alpha;
		context.fillStyle = backgroundColor;
		console.log(backgroundLayers, backgroundAlphaLayers);
		context.fillRect(0,0,context.canvas.width, context.canvas.height)
		changeBackground = false;
		context.fillStyle = zcolor;}
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
function reloadBackground(x,y,w,h){
	var xalpha = alpha;
	var ycolor = lastColor;
	for(var i=0;  i < backgroundLayers.length; i++){
	//for(let value of backgroundLayers){
	//backgroundLayers.forEach(function(value){
		console.log(backgroundLayers);
		//var colorLayer = backgroundLayers.shift();
		//var alphaLayer = backgroundAlphaLayers.shift();
		var colorLayer = backgroundLayers[i];
		var alphaLayer = backgroundAlphaLayers[i];
		context.globalAlpha = alphaLayer;
		context.fillStyle = colorLayer;
	
		context.fillRect(x,y,w,h);
		
	}//)
}
function onClick(ev) {

}

function onMouseDown(e) {
/*	if (e.layerX >=0) {
		x1 = e.layerX - wkxoffset;
		y1 = e.layerY -wkyoffset;
	}
	else if (e.offsetX >= 0) {
		x1 = e.offsetX - ffxoffset;
		y1 = e.offsetY - ffyoffset;
	}*/
	
	
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) 	{
		x1 = e.pageX - ffxoffset;
		y1 = e.pageY - ffyoffset;
	}
	else if (e.clientX || ev.clientY) 	{
		x1 = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft - ffxoffset;
		y1 = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop - ffyoffset;
	}
	old = {curX: x1, curY: y1};
	console.log("yo",x1,y1);
	return x1,y1;
}
function onMouseUp(e) {
	/*if (e.layerX >=0) {
		x2 = e.layerX - wkxoffset;
		y2 = e.layerY - wkyoffset;
	}
	else if (e.offsetX >= 0) {
		x2 = e.offsetX - ffxoffset;
		y2 = e.offsetY - ffyoffset;
	}*/
	
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) 	{
		x2 = e.pageX - ffxoffset;
		y2 = e.pageY - ffyoffset;
	}
	else if (e.clientX || ev.clientY) 	{
		x2 = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft - ffxoffset;
		y2 = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop - ffyoffset;
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
	} else if(!pencilDraw && !drawRect && !drawCirc && !drawLine /*&& !drawQCurve*/ && drawSelect== true){
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
	
	if (moveTool && !drawQCurve && !copyTool && !deleteTool){
		//context.strokeRect(x1+1,y1+1,Math.abs(x2-x1)-1,Math.abs(y2-y1)-1);
		moveSelection(imgData,x1,y1,x2,y2);
	} else if(!moveTool && copyTool && !drawQCurve){
		copySelection(imgData,x1,y1,x2,y2);
	} else if(!moveTool && !copyTool && deleteTool &&!drawQCurve){
		deleteSelection(/*imgData,*/x1,y1,x2,y2);
	}/* else if (!moveTool && !copyTool && !deleteTool && drawQCurve){
		qCurveTool(x1, y1,x2,y2); }*/
	
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
		if (moveTool && !drawQCurve) {
		console.log("um");
		var x4;
		var y4;
		canvas.removeEventListener('dblclick', onDoubleClick, false);
		canvas.addEventListener('dblclick', onDoubleClick, false);
			function onDoubleClick(e) {	
			startQCurve = false;
			if (drawQCurve == true){return;}
			if (!e) var e = window.event;
			if (e.pageX || e.pageY) 	{
				x4 = e.pageX - ffxoffset;
				y4 = e.pageY - ffyoffset;
				}
			else if (e.clientX || ev.clientY) 	{
				x4 = e.clientX + document.body.scrollLeft
				+ document.documentElement.scrollLeft - ffxoffset;
				y4 = e.clientY + document.body.scrollTop
				+ document.documentElement.scrollTop - ffyoffset;
			}		
			/*	if (e.layerX >=0) {
					x4 = e.layerX - wkxoffset;
					y4 = e.layerY - wkyoffset;
				}
				else if (e.offsetX >= 0) {
					x4 = e.offsetX - ffxoffset;
					y4 = e.offsetY - ffyoffset;
				}*/
		//console.log("single",x4,y4);
		//lectStart = true;
		
	
		//context.putImageData(imgData, x4,y4, x1,y1, Math.abs(x2-x1),Math.abs(x2-x1));
		//context.clearRect(x1,y1,Math.abs(x2-x1),Math.abs(y2-y1));
		
		context.putImageData(imgData, x4,y4);}
		
			
			context.clearRect(x1,y1,Math.abs(x2-x1),Math.abs(y2-y1));
			var xcolor = lastColor;
			if (disableTrans){ context.globalAlpha=1;
			context.fillStyle = 'white';
			context.fillRect(x1,y1,x2-x1,y2-y1);}
			/*context.globalAlpha=xalpha;
			context.fillStyle = backgroundColor;
			context.fillRect(x1,y1,x2-x1,y2-y1)*/
			reloadBackground(x1,y1,x2-x1,y2-y1);
			context.fillStyle = xcolor;
			context.globalAlpha = alpha;
		}
}
function copySelection(/*imgData, int, int,int,int*/){
		var x4;
		var y4;
		canvas.removeEventListener('dblclick', onDoubleClick, false);
		canvas.addEventListener('dblclick', onDoubleClick, false);
			function onDoubleClick(e) {	
			startQCurve = false;
			if	(drawQCurve == true){return;}
			
				if (drawQCurve == true){return;}
			if (!e) var e = window.event;
			if (e.pageX || e.pageY) 	{
				x4 = e.pageX - ffxoffset;
				y4 = e.pageY - ffyoffset;
				}
			else if (e.clientX || ev.clientY) 	{
				x4 = e.clientX + document.body.scrollLeft
				+ document.documentElement.scrollLeft - ffxoffset;
				y4 = e.clientY + document.body.scrollTop
				+ document.documentElement.scrollTop - ffyoffset;
			}
			/*	if (e.layerX >=0) {
					x4 = e.layerX - wkxoffset;
					y4 = e.layerY - wkyoffset;
				}
				else if (e.offsetX >= 0) {
					x4 = e.offsetX - ffxoffset;
					y4 = e.offsetY - ffyoffset;
				}*/
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
function deleteSelection(/*imgData, int, int,int,int*/) {
	w= x2-x1;
	h = y2-y1;
	context.clearRect(x1,y1,x2-x1,y2-y1);
	// var xcolor = lastColor;
	if (disableTrans){ context.globalAlpha=1;
	context.fillStyle = 'white';
	context.fillRect(x1,y1,x2-x1,y2-y1);}
	/*context.globalAlpha=xalpha;
	context.fillStyle = backgroundColor;
	context.fillRect(x1,y1,x2-x1,y2-y1);*/
	reloadBackground(x1,y1,w,h);
	
	context.globalAlpha = alpha;
	context.fillStyle = lastColor;
	 
}

function qCurveTool (int,int,int,int) {

	if (drawQCurve){
				//var x3;
		//var y3;
	//canvas.removeEventListener('dblclick', onDoubleClick, false);
	canvas.addEventListener('dblclick', onDoubleClick, false);
	function onDoubleClick(e) {
	context.closePath();
	startQCurve = true;
	
	if (!e) var e = window.event;
			if (e.pageX || e.pageY) 	{
				x3 = e.pageX - ffxoffset;
				y3 = e.pageY - ffyoffset;
				}
			else if (e.clientX || ev.clientY) 	{
				x3 = e.clientX + document.body.scrollLeft
				+ document.documentElement.scrollLeft - ffxoffset;
				y3 = e.clientY + document.body.scrollTop
				+ document.documentElement.scrollTop - ffyoffset;
			}
	/*if (e.layerX >=0) {
		x3 = e.layerX - wkxoffset;
		y3 = e.layerY - wkyoffset;
	}
	else if (e.offsetX >= 0) {
		x3 = e.offsetX - ffxoffset;
		y3 = e.offsetY - ffyoffset;
	}*/
	console.log("double",x3,y3);
	
	return startQCurve, x3,y3;
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
	//}
}
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
  
 /* var canvas  = document.getElementById("imageView");
var dataUrl = canvas.toDataURL();

console.log(dataUrl);

window.open(dataUrl, "toDataURL() image", "width=" + canvas.width +", height=" + canvas.height);*/
  var imageDl = canvas.toDataURL('image/png');
   imageDl = imageDl.replace(/^data:image\/[^;]*/, 'data:application/octet-stream'); 
  imageDl = imageDl.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');

  this.href = imageDl;
}



