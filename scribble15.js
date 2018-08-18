var enableDraw = false;
var brushSelect = "pencil";
var otherTools = "noTool";
var pencilDraw = true;
var started = false;
var canvas, context;
var lastColor = 'black';
var thickness = 2;
var alpha = 1;
var scatRect = false;
var scatCirc = false;
var sprayPaint = false;
var spray2Paint = false;
var density = 5;
var x,y;
var x1 = 0;
var y1=0;
var x2 = 0;
var y2=0;
var x3 = 0;
var y3 = 0;
copyCount = 0;
//var x4 = 0;
//var y4 = 0;
var ffxoffset/*= 40*/;
var ffyoffset/*= 39*/;
//var wkxoffset = 38;
//var wkyoffset = 39;
drawRect = false;
drawCirc = false;
drawLine = false;
drawQCurve = false;
startQCurve = false;
calPen = false;
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
var bzPoints = [];
var mM = window.matchMedia("all and (min-width:700px)");

function init() {
	canvas = $('#imageView').get(0);
	context = canvas.getContext('2d');
	//var mM = window.matchMedia('min-width:700)');
	//canvas.width = window.innerWidth - 75;
	//canvas.height = window.innerHeight - 75;
	matchMed(mM);
	mM.addListener(matchMed);
	context.fillStyle = 'white';
	context.fillRect(0,0,context.canvas.width, context.canvas.height);
	context.fillStyle = 'black';
	//context.lineJoin = context.lineCap = 'round';
	canvas.addEventListener('mousemove', onMouseMove, false);	
	canvas.addEventListener('click', onClick, false);		
	canvas.addEventListener('mousedown', function(e) { onMouseDown(e);enableDraw = true;}, false);
	canvas.addEventListener('mouseup', function(e) { onMouseUp(e); enableDraw = false; started = false;}, false);
	canvas.addEventListener('mouseleave', function(e) { enableDraw = false; started = false;}, false);
	canvas.addEventListener('touchmove', function(e) {  e.preventDefault();}, { passive: false });
	
	//canvas.addEventListener('touchmove', onTouchMove, false);
	canvas.addEventListener('touchstart', function(e) {onTouchStart(e); enableDraw = true;}, false);
	canvas.addEventListener('touchend', function(e) { onTouchEnd(e); enableDraw = false; started = false;}, false);
	
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
//	$('#eTrans').get(0).addEventListener('click', function(e) { enableTranparency();}, false);
//	$('#dTrans').get(0).addEventListener('click', function(e) { disableTranparency();}, false);
	/*$('#narrow').get(0).addEventListener('click', function(e) { narrowLine();}, false);
	$('#rAlpha').get(0).addEventListener('click', function(e) { raiseOpacity();}, false);
	$('#lAlpha').get(0).addEventListener('click', function(e) { lowerOpacity();}, false);*/
	$('#fill').get(0).addEventListener('click', function(e) { fill = true;}, false);
	document.getElementById("save").addEventListener('click', onSave, false);
	$('#stroke').get(0).addEventListener('click', function(e) { fill = false;}, false);
	$('#bc').get(0).addEventListener('click', function(e) { changeBackground = true;}, false);
	$('#scatRect').get(0).addEventListener('click', function(e) { brushSelect = "squareBrush"; otherTools = "noTool";/*pencilDraw = false; scatRect = true; drawRect = false; spray2Paint = false; drawLine = false;  drawCirc = false; drawSelect = false;/* rectTool();*/}, false);
	$('#scatCirc').get(0).addEventListener('click', function(e) { brushSelect = "circleBrush"; otherTools = "noTool";/*pencilDraw = false; scatRect = false; scatCirc = true; spray2Paint = false; drawRect = false; drawLine = false; drawCirc = false; drawSelect = false;/* rectTool();*/}, false);
	$('#paint').get(0).addEventListener('click', function(e) { brushSelect = "pencil"; otherTools = "noTool";/*pencilDraw = true; scatRect = false; drawLine = false; spray2Paint = false; scatCirc = false; drawCirc = false; drawSelect = false;*/}, false);
	//$('#spray').get(0).addEventListener('click', function(e) { pencilDraw = false; scatRect = false; scatCirc = false; sprayPaint = true; drawRect = false; drawLine = false; drawCirc = false; drawSelect = false;/* rectTool();*/}, false);
	$('#spray2').get(0).addEventListener('click', function(e) { brushSelect = "spray2"; otherTools = "noTool";/*pencilDraw = false; scatRect = false; scatCirc = false; sprayPaint = false; spray2Paint = true; drawRect = false; drawLine = false; drawCirc = false; drawSelect = false;/* rectTool();*/}, false);
	$('#lBrush').get(0).addEventListener('click', function(e) { brushSelect = "lineBrush"; otherTools = "noTool";/*enableDraw = false;/*pencilDraw = false; scatRect = false; scatCirc = false; sprayPaint = false; spray2Paint = false; calPen=true; drawRect = false; drawLine = false; drawCirc = false; drawSelect = false;/* rectTool();*/}, false);
	$('#cHatch').get(0).addEventListener('click', function(e) { brushSelect = "crossHatch"; otherTools = "noTool";}, false);
	$('#fPen').get(0).addEventListener('click', function(e) { brushSelect = "fountainPen"; otherTools = "noTool";}, false);
	$('#pen3').get(0).addEventListener('click', function(e) { brushSelect = "pen3"; otherTools = "noTool";}, false);
	$('#NP1').get(0).addEventListener('click', function(e) { brushSelect = "NP1"; otherTools = "noTool";}, false);
	$('#NP2').get(0).addEventListener('click', function(e) { brushSelect = "NP2"; otherTools = "noTool";}, false);
	$('#rect').get(0).addEventListener('click', function(e) { brushSelect = "noBrush"; otherTools = "rect";/*rectTool(); *//*pencilDraw = false; sprayPaint = false; spray2Paint = false; scatRect = false; scatCirc = false; drawRect = true; drawSelect = false; moveTool = false; copyTool = false; deleteTool = false;*/}, false);
	$('#circ').get(0).addEventListener('click', function(e) { brushSelect = "noBrush"; otherTools = "circ";/*rectTool(); pencilDraw = false; enableDraw == false; sprayPaint = false; spray2Paint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = true; drawSelect = false; moveTool = false; copyTool = false; deleteTool = false;*/}, false);
	$('#line').get(0).addEventListener('click', function(e) { brushSelect = "noBrush"; otherTools = "line";/*rectTool(); pencilDraw = false; sprayPaint = false; spray2Paint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = true; drawSelect = false; moveTool = false; copyTool = false; deleteTool = false;*/}, false);
	$('#qCurve').get(0).addEventListener('click', function(e) { brushSelect = "noBrush"; otherTools = "qCurve";/*rectTool(); pencilDraw = false; sprayPaint = false; spray2Paint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = false; drawQCurve = true; drawSelect = true; moveTool = false; copyTool = false; deleteTool = false;*/}, false);
	//$('#select').get(0).addEventListener('click', function(e) { /*rectTool(); */pencilDraw = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = false; drawQCurve = false; drawSelect = true;}, false);
	$('#move').get(0).addEventListener('click', function(e) { brushSelect = "noBrush"; otherTools = "move";/*moveSelection(); rectTool(); pencilDraw = false; spray2Paint = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = false; drawQCurve = false; drawSelect = false; copyTool = false; deleteTool = false; moveTool = true; drawSelect = true;*/}, false);
	$('#copy').get(0).addEventListener('click', function(e) { brushSelect = "noBrush"; otherTools = "copy";/*copySelection(); rectTool(); pencilDraw = false;  spray2Paint = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = false; drawQCurve = false; drawSelect = false; copyTool = true; deleteTool = false; moveTool = false; drawSelect = true;*/}, false);
	$('#delete').get(0).addEventListener('click', function(e) { brushSelect = "noBrush"; otherTools = "delete"; /*deleteSelection();rectTool(); pencilDraw = false; spray2Paint = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = false; drawQCurve = false; drawSelect = false; copyTool = false; deleteTool = true; moveTool = false; drawSelect = true;*/}, false);
	//$('#move').get(0).addEventListener('click', function(e) { moveSelection(); moveTool = true;}, false);  
}
function matchMed(mM){
	console.log(mM);
	if(mM.matches){
		canvas.width = window.innerWidth - 75;
		canvas.height = window.innerHeight - 75;
		ffxoffset= 40;
		ffyoffset= 39;
	} else {
		canvas.width = window.innerWidth - 75;
		canvas.height = window.innerHeight - 175;
		ffxoffset= 40;
		ffyoffset= 69;
		
	}
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
	context.clearRect(0,0,context.canvas.width, context.canvas.height);
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
		x = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - ffxoffset;
		y = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop - ffyoffset;
	}
	// posx and posy contain the mouse position relative to the document
	// Do something with this information
	selectBrush(x,y);
}
function getTouchCoords(e){
	if (!e) var e = window.event;
	if(e.touches){
	if(e.touches.length == 1){
		var touch = e.touches[0];
		x = touch.pageX - touch.target.offsetLeft;
		y = touch.pageY - touch.target.ffyoffTop;
	}
} return x,y
}

function onTouchMove (ev) {
	//var x,y;
	getTouchCoords(e)
	selectBrush(x,y);
	event.preventDefault();
}

function selectBrush(x,y){	
	if (enableDraw  ){
		if (brushSelect == "pencil"){
			if (!started) {
				started = true;
		
				context.beginPath();
				context.moveTo(x, y);		
			} else {
				context.lineTo(x, y);
				context.lineCap = "round";
				context.lineJoin = "round";
				context.globalAlpha = alpha;
				context.lineWidth = thickness;
				if(fill) {
					context.fill();
				} else {context.stroke();}
			}
		}
		else if(brushSelect == "squareBrush") {
			context.closePath();
			context.beginPath();
			context.moveTo(x,y);
			context.globalAlpha = alpha;
			var sThickness = Number(thickness) *4 ; 
			context.rect(x,y,sThickness, sThickness);
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
		
		} else if(brushSelect == "circleBrush"){
			context.closePath();
			context.beginPath();
			context.moveTo(x,y);
			context.globalAlpha = alpha;
			var cThickness = Number(thickness) * 2;
			context.arc(x,y,cThickness,2 * Math.PI, false);
		//context.fill();
			if(fill) {
				context.fill();
			} else {context.lineWidth = 1; context.stroke();}
			context.lineWidth = thickness;
		} else if(brushSelect == "sprayPaint"){
			var spot = thickness/5;
			var dist = thickness/10;
			context.closePath();
			context.beginPath();
			context.moveTo(x,y);
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
		
		} else if(brushSelect == "spray2"){
			if(brushSelect != "spray2"){return;}
				density = thickness + 5;
				for(var i = density; i--;){
					if(brushSelect != "spray2"){break;}
			//var adjX = getRandomInt(-thickness, thickness) +x;
			//var adjY = getRandomInt(-thickness, thickness)+y;
					var adjX = Math.cos(getRandomAng()) * getRandomRad() + x;
					var adjY = Math.sin(getRandomAng()) * getRandomRad() + y;
					context.fillRect(adjX,adjY,1,1);
				}
		
		} else if(brushSelect == "lineBrush"){
			context.closePath();
			context.beginPath();
			context.globalAlpha = alpha;
			context.lineWidth = 4;
			console.log(brushSelect,x,y);
			context.moveTo(x,y);
			context.lineTo(x+Number(thickness)+5, y-Number(thickness)-5);
			context.stroke();
		/*var current = {curX:x, curY:y};
		var dist = distanceBetween(old, current);
		for(var i = 0; i < dist; i+=5){
			
			context.moveTo(current.curX,current.curY);
		
			context.lineTo(x+Number(thickness),y-Number(thickness));
			context.stroke();
			old = current;
			}*/
		} else if (brushSelect == "crossHatch"){
			context.closePath();
			context.beginPath();
			context.globalAlpha = alpha;
			context.lineWidth = 2;
			console.log(brushSelect,x,y);
			context.moveTo(x,y);
			context.lineTo(x+Number(thickness)+5, y-Number(thickness)-5);
			context.stroke();
			context.moveTo(x+(Number(thickness))/2, y);
			context.lineTo(x+(Number(thickness))/2 +5, y-Number(thickness)-5);
			context.stroke();
		} else if (brushSelect == "fountainPen"){
			context.closePath();
			//context.beginPath();/*
			/*context.globalAlpha = alpha;
			context.moveTo(x,y)
			if(y1 > y){
				context.lineWidth = Number(thickness) + 10;
			} else {
				context.lineWidth = Number(thickness);
			}
			context.lineTo(x,y);
			context.stroke();*/
			/*----------------------------
				if (!started) {
				started = true;
		
				context.beginPath();
				context.moveTo(x, y);		
			} else {
				context.lineTo(x, y);
				//context.lineCap = 'square';
				context.globalAlpha = alpha;
					if(y > y1){
						
				context.lineWidth = (Number(thickness))*2;
			} else {
				context.lineWidth = Number(thickness);
			}
				if(fill) {
					context.fill();
				} else {context.stroke();}
			}--------------------------*/
			//console.log(bzPoints);
			/*if (!started) {
				started = true;
		
				context.beginPath();
				context.moveTo(x, y);		
			} else {*/
			//train tracks effect context.lineJoin = 'miter';
			//context.lineCap = 'square';
			context.lineCap = 'round';
			context.lineJoin = 'round';
			bzPoints.push({bzX:x,bzY:y});
			var p1 = bzPoints[0];
			var p2 = bzPoints[1];
			//console.log(bzPoints);
			/*context.beginPath();
			context.moveTo(p1.bzX, p1.bzY);*/
			console.log(bzPoints);
			for( var i = 1; i< bzPoints.length; i++){
				context.beginPath();
				context.moveTo(p1.bzX, p1.bzY);
				var midPoint = midPointBtw(p1,p2);
				if (bzPoints[i].bzY > bzPoints[i-1].bzY /*&& context.lineWidth <(Number(thickness))*2*/){ context.lineWidth /*++*/ /*while (context.lineWidth <= (Number(thickness))*2) {context.lineWidth += .002;}}*/=(Number(thickness))*1.6;}
				else {context.lineWidth = Number(thickness);}
				context.quadraticCurveTo(p1.bzX,p1.bzY,midPoint.bzX,midPoint.bzY);
			//context.stroke();
				p1 = bzPoints[i];
				p2 = bzPoints[i+1];
			
				context.stroke();
				}
			context.globalAlpha = alpha;
			context.lineTo(p1.bzX, p1.bzY);
			context.stroke();
			
			//context.closePath();
			//bzPoints.length = 0;
			console.log("arrrg", p1.bzX, p1.bzY, midPoint.bzX, midPoint.bzY);
			//}
		} else if (brushSelect == "pen3"){
			
			/*var current = {curX:x,curY:y};
			var dist = distanceBetween(old,current);
			var ang = angleBetween(old,current);
			for (i=0; i< dist; i++){
				xd = old.oldX +(Math.sin(ang) * i);
				yd = old.oldY + (Math.cos(ang)*i);
				console.log(xd,yd);*/
				context.lineCap = 'round';
				context.lineJoin = 'bevel';
				context.globalAlpha = Number(alpha);//*.7;
				context.lineWidth = Number(thickness) +4;//+5;
				context.beginPath();
				context.moveTo(/*xd,yd*/old.oldX,old.oldY);
				context.lineTo(x,y);
				context.stroke();
			
				context.moveTo(/*xd-4,yd+4*/old.oldX-(Number(thickness)+2),old.oldY+(Number(thickness)+2));
				context.lineTo(x -(Number(thickness)+2),y+(Number(thickness)+2));
				context.stroke();
			
				context.moveTo(/*xd-2,yd+2*/old.oldX-(Number(thickness)+2)/2,old.oldY+(Number(thickness)+2)/2);
				context.lineTo(x-(Number(thickness)+2)/2,y+(Number(thickness)+2)/2);
				context.stroke();
			
				context.moveTo(/*xd+2,yd-2*/old.oldX+(Number(thickness)+2)/2,old.oldY-(Number(thickness)+2)/2);
				context.lineTo(x+(Number(thickness)+2)/2,y-(Number(thickness)+2)/2);
				context.stroke();
			
				context.moveTo(/*xd+4,yd-4*/old.oldX+(Number(thickness)+2),old.oldY-(Number(thickness)+2));
				context.lineTo(x+(Number(thickness)+2),y-(Number(thickness)+2));
				context.stroke();
			//}
			old = {oldX: x, oldY: y}; 
		} /*else if (brushSelect == "pen4"){
			
			
			
		}*/ else if (brushSelect == "NP1"){
			
			context.lineCap = 'round';
			context.lineJoin = 'round';
			bzPoints.push({bzX:x,bzY:y});
			//var p1 = bzPoints[0];
		//	var p2 = bzPoints[1];
			//console.log(bzPoints);
			/*context.beginPath();
			context.moveTo(p1.bzX, p1.bzY);*/
			//console.log(bzPoints);
			context.beginPath();
			context.globalAlpha = alpha;
			context.moveTo(bzPoints[bzPoints.length-2].bzX,bzPoints[bzPoints.length-2].bzY);
			context.lineWidth = Number(thickness);
			context.lineTo(bzPoints[bzPoints.length-1].bzX,bzPoints[bzPoints.length-1].bzY);
			context.stroke();
			
			for( var i = 1; i< bzPoints.length; i++){
				dx = bzPoints[i].bzX-bzPoints[bzPoints.length-1].bzX;
				dy = bzPoints[i].bzY-bzPoints[bzPoints.length-1].bzY;
				d = dx *dx + dy * dy;
				
				if (d</*1000*/ 500* Number(thickness)) {
					console.log("np");
				context.beginPath();
				if(Number(thickness) < 10){
				context.lineWidth = Number(thickness) * 0.8;}
				else{
				context.lineWidth =Number(thickness)*0.4;}
				//context.strokeStyle = 'rgba(0,0,0,0.3)';
				context.globalAlpha = alpha* 0.1;
				context.moveTo(bzPoints[bzPoints.length -1].bzX + (dx*0.2),bzPoints[bzPoints.length -1].bzY + (dy*0.2));
				context.lineTo(bzPoints[i].bzX - (dx*0.2), bzPoints[i].bzY - (dy*0.2));
				context.stroke();
				}
				/*context.moveTo(p1.bzX, p1.bzY);
				var midPoint = midPointBtw(p1,p2);
				if (bzPoints[i].bzY > bzPoints[i-1].bzY){ context.lineWidth = (Number(thickness))*2;}
				else {context.lineWidth = Number(thickness);}
				context.quadraticCurveTo(p1.bzX,p1.bzY,midPoint.bzX,midPoint.bzY);
			//context.stroke();
				p1 = bzPoints[i];
				p2 = bzPoints[i+1];
			
				context.stroke();
				}
			context.globalAlpha = alpha;
			//context.lineTo(p1.bzX, p1.bzY);
			
			context.closePath();*/
		}
	} else if (brushSelect == "NP2"){
		//context.lineCap = 'round';
			//context.lineJoin = 'round';
			bzPoints.push({bzX:x,bzY:y});
		context.beginPath();
			context.globalAlpha = alpha* 0.5;
			context.moveTo(bzPoints[bzPoints.length-2].bzX,bzPoints[bzPoints.length-2].bzY);
			context.lineWidth = Number(thickness)*0.5;
			context.lineTo(bzPoints[bzPoints.length-1].bzX,bzPoints[bzPoints.length-1].bzY);
			context.stroke();
			context.globalAlpha = alpha*0.1;
			
			for( var i = 1; i< bzPoints.length; i++){
				dx = bzPoints[i].bzX-bzPoints[bzPoints.length-1].bzX;
				dy = bzPoints[i].bzY-bzPoints[bzPoints.length-1].bzY;
				d = dx *dx + dy * dy;
				
				if (d</*1000*/ 1250* Number(thickness) && Math.random() > 0.9) {
					console.log("np");
				context.beginPath();
				/*if(Number(thickness) < 10){
				context.lineWidth = Number(thickness) * .8;}
				else{
				context.lineWidth =Number(thickness)*.4;}*/
				//context.strokeStyle = 'rgba(0,0,0,.3)';
				//context.globalAlpha = alpha* .1;
				context.lineWidth = Number(thickness) * 0.3;
				context.moveTo(bzPoints[bzPoints.length -1].bzX /*+ (dx*.2)*/,bzPoints[bzPoints.length -1].bzY /*+ (dy*.2)*/);
				context.lineTo(bzPoints[i].bzX /*- (dx*.2)*/, bzPoints[i].bzY /*- (dy*.2)*/);
				context.stroke();
				}
	}
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
    alpha = Number((document.querySelector('#opacity').value))/10;
    console.log(alpha);
}
function strokeWidthSlider(SWS) {
    document.querySelector('#lineThickness').value = SWS;
    thickness = document.querySelector('#lineThickness').value;
    console.log(thickness);
}
function enableTranparencySlider(ETS) {
    document.querySelector('#ET').value = ETS;
    trans1 = document.querySelector('#ET').value;
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
	var chooseTrans = confirm('Changing transparency settings will erase existing artwork. Do you wish to proceed?');
	if (chooseTrans && checkVal){
		console.log("enenen");
		enableTranparency();}
	else if(checkVal && !chooseTrans){
		document.getElementById("transCheck").checked = false;
	} else if (chooseTrans && !checkVal){
		disableTranparency();
	} else if(!chooseTrans && !checkVal){document.getElementById("transCheck").checked = true;}
	/*if (checkVal){
		enableTranparency();
		
	} else {
		disableTranparency();
	}*/
}
function distanceBetween(point1, point2) {
  return Math.sqrt(Math.pow(point2.curX - point1.oldX, 2) + Math.pow(point2.curY - point1.oldY, 2));
}
function angleBetween(point1, point2){
	return Math.atan2(point2.curX - point1.oldX, point2.curY - point1.oldY);
}

function midPointBtw(p1, p2) {
  return {
    bzX: p1.bzX + (p2.bzX - p1.bzX) / 2,
    bzY: p1.bzY + (p2.bzY - p1.bzY) / 2
  };
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
	//enableTrans = confirm('Changing transparency settings will erase existing artwork. Do you wish to proceed?');
//	if(enableTrans){
		backgroundAlphaLayers.length = 0;
		backgroundLayers.length = 0;
		disableTrans = false;
		backgroundColor = 'white';
		clearPage();
		//clearTrans();
		$('#eTrans').css("background-color:", "azure;" );
		$('#dTrans').css("background-color:", "aliceblue;" );
		
		disableTrans = false;
		pencilDraw = true;
		console.log("en",enableTrans,disableTrans);
//	}// else {document.getElementById(transCheck).checked = false;}
}
function disableTranparency(){
	//disableTrans = confirm('Changing transparency settings will erase existing artwork. Do you wish to proceed?');
	//if(disableTrans){
		backgroundAlphaLayers.length = 0;
		backgroundLayers.length = 0;
		backgroundColor = 'white';
		clearPage();
		$('#dTrans').css("background-color:", "azure;" );
		$('#eTrans').css("background-color:", "aliceblue;" );
		enableTrans = false;
		pencilDraw = true;
		console.log("dis",enableTrans,disableTrans);
	//}
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
		context.fillRect(0,0,context.canvas.width, context.canvas.height);
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
	//var xalpha = alpha;
	//var ycolor = lastColor;
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
		x1 = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - ffxoffset;
		y1 = e.clientY + document.body.scrollTop + document.documentElement.scrollTop - ffyoffset;
	}
	console.log("yo",x1,y1);
	if (brushSelect == "fountainPen" || "NP1"){bzPoints.push({bzX:x1,bzY:y1});}
	old = {oldX: x1,oldY: y1};
	return x1,y1;
}
function onTouchStart(e){
	getTouchCoords();
	if (brushSelect == "fountainPen" || "NP1"){bzPoints.push({bzX:x1,bzY:y1});}
	old = {oldX: x1,oldY: y1};
	event.preventDefault();
	return x1,y1;
}
function onTouchEnd(e){
	getTouchCoords();
	if(brushSelect == "noBrush" && (otherTools == "move" || otherTools == "copy" || otherTools == "delete" || otherTools == "rect" || otherTools == "circ" || otherTools == "line" )){
		selectTool(x1,y1,x2,y2,x3,y3);
	} else if(brushSelect == "noBrush" && otherTools == "qCurve"){
		qCurveTool(x1, y1,x2,y2, x3,y3); 
	}
	bzPoints.length = 0;
	return x2,y2;
	
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
		x2 = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - ffxoffset;
		y2 = e.clientY + document.body.scrollTop + document.documentElement.scrollTop - ffyoffset;
	}
	console.log("blah",x2,y2);

	/*if(brushSelect == "noBrush" && otherTools == "rect")
		{rectTool(x1,y1,x2,y2);}
	else if (brushSelect == "noBrush" && otherTools == "circ"){
		circTool(x1,y1,x2,y2);
	} else if (brushSelect == "noBrush" && otherTools == "line"){
		lineTool(x1, y1,x2,y2);
	} else if (brushSelect == "noBrush" && otherTools == "qCurve"){
		qCurveTool(x1, y1,x2,y2, x3,y3); 
	} else */if(brushSelect == "noBrush" && (otherTools == "move" || otherTools == "copy" || otherTools == "delete" || otherTools == "rect" || otherTools == "circ" || otherTools == "line" )){
		selectTool(x1,y1,x2,y2,x3,y3);
	} else if(brushSelect == "noBrush" && otherTools == "qCurve"){
		qCurveTool(x1, y1,x2,y2, x3,y3); 
	}
	bzPoints.length = 0;
	return x2,y2;
}
//function selectOtherTools
function rectTool(int, int,int,int){
	context.closePath();
	enableDraw = false;
	brushSelect = "noBrush";
	context.globalAlpha = alpha;
	
	context.lineJoin = "miter";
	if(fill) {
			context.fillRect (x1, y1, x2-x1, y2-y1);
		} else {context.strokeRect (x1, y1, x2-x1, y2-y1);}
	
	
}
function circTool(/*int,int, int, int*/){
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
function lineTool (/*int,int,int,int*/){
	context.closePath();
	context.beginPath();
	context.globalAlpha = alpha;
	context.lineCap = "butt";
	context.lineJoin = "miter";
	context.moveTo(x1,y1);
	context.lineTo(x2,y2);
	context.lineWidth = thickness;
	context.stroke();
	console.log("line");
	
}
function selectTool(/*int,int, int, int*/){
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
	if(brushSelect == "noBrush" && otherTools == "rect")
		{rectTool(x1,y1,x2,y2);}
	else if (brushSelect == "noBrush" && otherTools == "circ"){
		circTool(x1,y1,x2,y2);
	} else if (brushSelect == "noBrush" && otherTools == "line"){
		lineTool(x1, y1,x2,y2);
	}/* else if (brushSelect == "noBrush" && otherTools == "qCurve"){
		qCurveTool(x1, y1,x2,y2, x3,y3); 
	}*/ else if/*(brushSelect == "noBrush" && (otherTools == "move" || otherTools == "copy" || otherTools == "delete" )){
		selectTool(x1,y1,x2,y2);
	}
	
	if */(otherTools == "move"/*moveTool && !drawQCurve && !copyTool && !deleteTool*/){
		//context.strokeRect(x1+1,y1+1,Math.abs(x2-x1)-1,Math.abs(y2-y1)-1);
		moveSelection(imgData,x1,y1,x2,y2);
	} else if(otherTools == "copy"/*!moveTool && copyTool && !drawQCurve*/){
		copySelection(imgData,x1,y1,x2,y2);
	} else if(otherTools == "delete"/*!moveTool && !copyTool && deleteTool &&!drawQCurve*/){
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
		if (otherTools == "move") {
		console.log("um");
		var x4;
		var y4;
		canvas.removeEventListener('dblclick', onDoubleClick, false);
		canvas.addEventListener('dblclick', onDoubleClick, false);
			function onDoubleClick(e) {	
			startQCurve = false;
			if (otherTools == "qCurve"){return;}
			if (!e) var e = window.event;
			if (e.pageX || e.pageY) 	{
				x4 = e.pageX - ffxoffset;
				y4 = e.pageY - ffyoffset;
				}
			else if (e.clientX || ev.clientY) 	{
				x4 = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - ffxoffset;
				y4 = e.clientY + document.body.scrollTop + document.documentElement.scrollTop - ffyoffset;
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
			if	(otherTools == "qCurve"){return;}
			
				//if (drawQCurve == true){return;}
			if (!e) var e = window.event;
			if (e.pageX || e.pageY) 	{
				x4 = e.pageX - ffxoffset;
				y4 = e.pageY - ffyoffset;
				}
			else if (e.clientX || ev.clientY) 	{
				x4 = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - ffxoffset;
				y4 = e.clientY + document.body.scrollTop + document.documentElement.scrollTop - ffyoffset;
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

	if (otherTools == "qCurve"){
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
				x3 = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - ffxoffset;
				y3 = e.clientY + document.body.scrollTop + document.documentElement.scrollTop - ffyoffset;
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



