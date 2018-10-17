var canvasWidth, canvasHeight;
var colorLayerData;
var tempColorLayerData;
var colorLayerDotData;
var brushColorLayerData;
var brushTempColorLayerData;
var tempColorLayerDotData;
var brushColorLayerDotData;
var brushTEmpColorLayerDotData;
var colorLayerDotData;
var enableDraw = false;
var enableDrag = false;
var enableTemp = false;
var customCanvas = false;
var scatter = false;
var rotateBrush = false;
var brushPic = new Image;

var brushSelect = "noBrush";
var otherTools = "noTool";
var pencilDraw = true;
var started = false;
var canvas, context, canvas2, tempContext;
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
var xf,yf;
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
fillColor = "transparent";
strokeColor = "black";
fillChange = false;
strokeChange = true;
var fillRGBA;
drawSelect = false;
moveTool = false;
copyTool = false;
deleteTool = false;
selectStart = false;
var imgData;
var tempImgData;
backgroundColor = 'white';
changeBackground = false;
var xalpha;
var backgroundLayers = [];
var backgroundAlphaLayers = [];
//backgroundLayers[0] = 'white';
	//backgroundAlphaLayers[0] = 1;

enableTrans = false;
disableTrans = true;
var w =0;
var h =0;
var bzPoints = [];
var geoPoints = [];
//var gPoints = [];
var old;
var lastMove;
var mM = window.matchMedia("all and (min-width:765px)");
var cPushArray = new Array();
var cStep = -1;
var bPushArray = new Array();
var bStep = -1;
var lastTool = 'pencil';
var storeBack, storeBackAlpha;
var tempSelect = "draw2";
var tempPush = false;
var selectPush = false;
var movePush = false;
var dashset = false;

var selectX;
var selectY;
var selectWidth; 
var selectHeight;
var enableSelect;
var drawX, drawY;
var xSelOffset, ySelOffset;
var eyeDrop = false;
var startR ,startG,	startB, startA;

var brushOffsetX;
var brushOffsetY;
var brushTouchOffsetX;
var brushTouchOffsetY;
var brushCanvasWidth;
var dashThickness = 5;

//var floodTool = false;


function init() {
	canvas2 = $('#image2View').get(0);
	tempContext = canvas2.getContext('2d');
	canvas = $('#imageView').get(0);
	context = canvas.getContext('2d');
	canvas3 = $('#brushImage').get(0);
	canvas.width = window.innerWidth - 95;
		canvas.height = window.innerHeight - 95;
		canvas2.width = window.innerWidth - 95;
		canvas2.height = window.innerHeight - 95;
		canvasWidth = canvas.width;
		canvasHeight = canvas.height;
	brushContext = canvas3.getContext('2d');
	canvas3.width = "160";
	canvas3.height = "160";
	canvas4 = $('#brush2Image').get(0);
	brushTempContext = canvas4.getContext('2d');
	canvas4.width = "160";
	canvas4.height = "160";
	canvas5 = $('#cropView').get(0);
	cropContext = canvas5.getContext('2d');
/*	canvas5 = $('cropView').get(0);
	cropContext = canvas5.getContext('2d');*/
	//brushContext.scale(4,4);
	//var mM = window.matchMedia('min-width:700)');
	//canvas.width = window.innerWidth - 75;
	//canvas.height = window.innerHeight - 75;
	matchMed(mM);
	mM.addListener(matchMed);
	//var brushbtn = document.getElementById("clearBrush");
	context.fillStyle = 'white';
	context.fillRect(0,0,context.canvas.width, context.canvas.height);
	context.fillStyle = fillColor;//'transparent';
	context.strokeStyle = strokeColor;
	tempContext.fillStyle = fillColor;
	tempContext.strokeStyle = strokeColor;
	brushContext.fillStyle = fillColor;
	brushContext.strokeStyle = strokeColor;
	
	colorLayerData = context.getImageData(0, 0, canvasWidth, canvasHeight)/*.data*/;//'black';
	//backgroundLayers[0] = 'white';
	//backgroundAlphaLayers[0] = 1;
	//context.lineJoin = context.lineCap = 'round';
	cPush();
	bPush();
	var body = document.documentElement;
if (body.requestFullscreen) {
  body.requestFullscreen();
} else if (body.webkitrequestFullscreen) {
  body.webkitrequestFullscreen();
} else if (body.mozrequestFullscreen) {
  body.mozrequestFullscreen();
} else if (body.msrequestFullscreen) {
  body.msrequestFullscreen();
}
	//document.addEventListener("mouseup",function(e) {brushSlider.classList.remove("active"); /*shapeSlider.classList.remove("active");*/}, false);
	//document.addEventListener("touchend",function(e) {brushSlider.classList.remove("active"); /*shapeSlider.classList.remove("active");*/}, false);
	//canvas.addEventListener('mousemove', onMouseMove, false);
	canvas2.addEventListener('mousedown', function(e) {brushSlider.classList.remove("active"); shapeSlider.classList.remove("active"); onMouseDown(e);enableDraw = true;enableTemp = true;}, false);
	canvas2.addEventListener('mousemove', onMouseMove, false);
	//canvas.addEventListener('click', onClick, false);		
	canvas2.addEventListener('click', onClick, false);
	//canvas.addEventListener('mousedown', function(e) {brushSlider.classList.remove("active"); shapeSlider.classList.remove("active"); onMouseDown(e);enableDraw = true;}, false);
	
	//canvas.addEventListener('mouseup', function(e) { onMouseUp(e); enableDraw = false; started = false;}, false);
	canvas2.addEventListener('mouseup', function(e) { onMouseUp(e); enableDraw = false; started = false; enableTemp = false; enableDrag = false;}, false);
	canvas2.addEventListener('mouseleave', function(e) { onMouseLeave(); enableDraw = false; started = false; enableTemp = false; enableDrag = false;}, false);
	//document.addEventListener('touchmove', function(e) {onTouchMove();  e.preventDefault();}, { passive: false });
	canvas.addEventListener('touchmove', onTouchMove,  false );
	canvas2.addEventListener('touchmove', onTouchMove,  false );
	canvas2.addEventListener('touchstart', onTouchStart, /*enableTemp = true, enableDraw = true,*/ false);
	//canvas.addEventListener('touchstart', function(e) {onTouchStart(); enableDraw = true;}, false);
	canvas2.addEventListener('touchend', function(e) {onTouchEnd(); enableDraw = false; started = false;enableTemp = false; enableDrag = false;}, false);	
	//canvas.addEventListener('touchstart', /*function(e) {*/onTouchStart(), enableDraw = true, false);
	//canvas.addEventListener('touchend', /*function(e) { */onTouchEnd(e), enableDraw = false, started = false, false);

	//document.addEventListener('touchstart', function(e) {onTouchStart(e); enableDraw = true; e.preventDefault();}, { passive: false });
	//document.addEventListener('touchend', function(e) { onTouchEnd(e); enableDraw = false; started = false;e.preventDefault();}, { passive: false });
	canvas4.addEventListener('mousedown', function(e) {brushSlider.classList.remove("active"); shapeSlider.classList.remove("active"); onMouseDown(e);enableDraw = true;enableTemp = true;}, false);
	canvas4.addEventListener('mousemove', onMouseMove, false);
	canvas4.addEventListener('click', onClick, false);
	canvas4.addEventListener('mouseup', function(e) { onMouseUp(e); enableDraw = false; started = false; enableTemp = false; enableDrag = false;}, false);
	canvas4.addEventListener('mouseleave', function(e) { enableDraw = false; started = false; }, false);
	canvas4.addEventListener('touchmove', onTouchMove,  false );
	canvas4.addEventListener('touchstart', onTouchStart, /*enableTemp = true, enableDraw = true,*/ false);
	canvas4.addEventListener('touchend', function(e) {onTouchEnd(); enableDraw = false; started = false;enableTemp = false; enableDrag = false;}, false);	
	//brushbtn.onclick = function() {brushContext.clearRect(0,0,160,160);}
	$('canvas2').bind('touchmove', function(e){e.preventDefault()}); 
	$('canvas3').bind('touchmove', 'click','mousedown','mousemove','touchstart','touchend', function(e){e.preventDefault();e.stopPropagation();});
	window.addEventListener("keypress", keyPressHandler, false);
	//window.addEventListener("keydown", keyPressHandler, false);
/*	window.onclick = function(event) {
    if (event.target == '.brushmodal-body') {
       $('#bmodal').attr("display", "none";
    }
} */
	
	var brushSliderTrigger = document.getElementsByClassName("brush-slider-trigger")[0];
var brushSlider = document.getElementsByClassName("slider-brush-parent")[0];
	brushSliderTrigger.addEventListener( "click" , function(el){
		if(brushSlider.classList.contains("active")){
			brushSlider.classList.remove("active");
			shapeSlider.classList.remove("active");
		} else{
			brushSlider.classList.add("active");
			shapeSlider.classList.remove("active");
		}
	});
	
		var shapeSliderTrigger = document.getElementsByClassName("shape-slider-trigger")[0];
var shapeSlider = document.getElementsByClassName("slider-shape-parent")[0];
	shapeSliderTrigger.addEventListener( "click" , function(el){
		if(shapeSlider.classList.contains("active")){
			shapeSlider.classList.remove("active");
			brushSlider.classList.remove("active");
		} else{
			shapeSlider.classList.add("active");
			brushSlider.classList.remove("active");
		}
	});
	
	var tmodal = document.getElementById("TModal");
	var tbtn = document.getElementById("transformBtn");
	var span = document.getElementsByClassName("close")[0];
	tbtn.onclick = function(){ tmodal.style.display = "block"; tmodal.style.top = "100px"; tmodal.style.left = "100px";}
	span.onclick = function() {tmodal.style.display = "none";}
	
	dragElement(document.getElementById("TModal"));
	
	if(selectX == null){document.getElementById("transformBtn").disabled = true;$('#transformBtn').css("color", "lightblue"); $('#paste').css("color", "lightblue"); $('#crop').css("color", "lightblue");}
	var apBtn = document.getElementById("applyBtn");
	apBtn.onclick = function () {transformTool(); tempSelect= "tempTrans";}
	var upLoad = document.getElementById("upload");
	upLoad.addEventListener('change', onUpload, false);
	
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
	$('#transparent').get(0).addEventListener('click', function(e) {
	  onColorClick(e.target.id);}, false);
//experiment to make ie checkbox work	 
/*$(".checkbox").click(function(){
    $(this).change();
}*/
//);	 
	$('#save').get(0).addEventListener('click', function(e) { onSave(); }, false); 
//	$('#upload').get(0).addEventListener('click', function(e) { onUpload(); }, false); 	
	$('#clear').get(0).addEventListener('click', function(e) { lastTool = "notbackground"; getClear(); }, false); 
	$('#undo').get(0).addEventListener('click', function(e) { context.globalAlpha = 1; cUndo(); }, false); 	
	$('#redo').get(0).addEventListener('click', function(e) {context.globalAlpha = 1; cRedo(); }, false); 
//	$('#widen').get(0).addEventListener('click', function(e) { widenLine();}, false);
//	$('#eTrans').get(0).addEventListener('click', function(e) { enableTranparency();}, false);
//	$('#dTrans').get(0).addEventListener('click', function(e) { disableTranparency();}, false);
	/*$('#narrow').get(0).addEventListener('click', function(e) { narrowLine();}, false);
	$('#rAlpha').get(0).addEventListener('click', function(e) { raiseOpacity();}, false);
	$('#lAlpha').get(0).addEventListener('click', function(e) { lowerOpacity();}, false);*/
	//$('#fill').get(0).addEventListener('click', function(e) { fill = true;}, false);
	$('#fill').get(0).addEventListener('click', function(e) { fillChange = true;strokeChange = false;}, false);
	document.getElementById("save").addEventListener('click', onSave, false);
	//$('#stroke').get(0).addEventListener('click', function(e) { fill = false;}, false);
	$('#stroke').get(0).addEventListener('click', function(e) { fillChange = false; strokeChange = true;}, false);
	$('#bc').get(0).addEventListener('click', function(e) { changeBackground = true;}, false);
	$('#scatRect').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "squareBrush"; otherTools = "noTool";tempSelect = "noTemp";/*pencilDraw = false; scatRect = true; drawRect = false; spray2Paint = false; drawLine = false;  drawCirc = false; drawSelect = false;/* rectTool();*/}, false);
	$('#scatCirc').get(0).addEventListener('click', function(e) { lastTool = "notbackground"; brushSelect = "circleBrush"; otherTools = "noTool";tempSelect = "noTemp";/*pencilDraw = false; scatRect = false; scatCirc = true; spray2Paint = false; drawRect = false; drawLine = false; drawCirc = false; drawSelect = false;/* rectTool();*/}, false);
	$('#paint').get(0).addEventListener('click', function(e) {  lastTool = "notbackground"; brushSelect = "noBrush"; otherTools = "noTool"; tempSelect = "draw2";}, false);
	//$('#spray').get(0).addEventListener('click', function(e) { pencilDraw = false; scatRect = false; scatCirc = false; sprayPaint = true; drawRect = false; drawLine = false; drawCirc = false; drawSelect = false;/* rectTool();*/}, false);
	$('#spray2').get(0).addEventListener('click', function(e) { lastTool = "notbackground"; brushSelect = "spray2"; otherTools = "noTool";tempSelect = "noTemp";/*pencilDraw = false; scatRect = false; scatCirc = false; sprayPaint = false; spray2Paint = true; drawRect = false; drawLine = false; drawCirc = false; drawSelect = false;/* rectTool();*/}, false);
	$('#bubbles').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "bubbles"; otherTools = "noTool";tempSelect = "noTemp";}, false);
	$('#lBrush').get(0).addEventListener('click', function(e) { lastTool = "notbackground";  brushSelect = "lineBrush"; otherTools = "noTool";tempSelect = "noTemp";/*enableDraw = false;/*pencilDraw = false; scatRect = false; scatCirc = false; sprayPaint = false; spray2Paint = false; calPen=true; drawRect = false; drawLine = false; drawCirc = false; drawSelect = false;/* rectTool();*/}, false);
	$('#cHatch').get(0).addEventListener('click', function(e) { lastTool = "notbackground"; brushSelect = "crossHatch"; otherTools = "noTool";tempSelect = "noTemp";}, false);
	$('#eraser').get(0).addEventListener('click', function(e) { lastTool = "notbackground"; brushSelect = "eraser"; otherTools = "noTool";tempSelect = "noTemp";}, false);
	$('#fPen').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "fountainPen"; otherTools = "noTool";tempSelect = "noTemp";}, false);
	$('#pen3').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "pen3"; otherTools = "noTool";tempSelect = "noTemp";}, false);
	$('#pen4').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "pen4"; otherTools = "noTool";tempSelect = "noTemp";}, false);
	$('#pen5').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "pen5"; otherTools = "noTool";tempSelect = "noTemp";}, false);
	//$('#pen6').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "pen6"; otherTools = "noTool";tempSelect = "noTemp";}, false);
	$('#pen7').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "pen7"; otherTools = "noTool";tempSelect = "noTemp";}, false);
	//$('#geo2').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "geo2"; otherTools = "noTool";tempSelect = "noTemp";}, false);
	$('#geo3').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "geo3"; otherTools = "noTool";tempSelect = "noTemp";}, false);
	$('#NP1').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "NP1"; otherTools = "noTool";tempSelect = "noTemp";}, false);
	$('#NP2').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "NP2"; otherTools = "noTool";tempSelect = "noTemp";}, false);
	$('#feather').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "feather"; otherTools = "noTool";tempSelect = "noTemp";}, false);
	//	$('#rect').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "noBrush"; otherTools = "rect";tempSelect = "noTemp";/*rectTool(); *//*pencilDraw = false; sprayPaint = false; spray2Paint = false; scatRect = false; scatCirc = false; drawRect = true; drawSelect = false; moveTool = false; copyTool = false; deleteTool = false;*/}, false);
	//$('#circ').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "noBrush"; otherTools = "circ";tempSelect = "noTemp";/*rectTool(); pencilDraw = false; enableDraw == false; sprayPaint = false; spray2Paint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = true; drawSelect = false; moveTool = false; copyTool = false; deleteTool = false;*/}, false);
//	$('#line').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "noBrush"; otherTools = "line";tempSelect = "noTemp";/*rectTool(); pencilDraw = false; sprayPaint = false; spray2Paint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = true; drawSelect = false; moveTool = false; copyTool = false; deleteTool = false;*/}, false);
	$('#qCurve').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "noBrush"; otherTools = "qCurve";tempSelect = "noTemp";/*rectTool(); pencilDraw = false; sprayPaint = false; spray2Paint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = false; drawQCurve = true; drawSelect = true; moveTool = false; copyTool = false; deleteTool = false;*/}, false);
	//$('#select').get(0).addEventListener('click', function(e) { /*rectTool(); */pencilDraw = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = false; drawQCurve = false; drawSelect = true;}, false);
	//$('#move').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "noBrush"; otherTools = "move";tempSelect = "noTemp";/*moveSelection(); rectTool(); pencilDraw = false; spray2Paint = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = false; drawQCurve = false; drawSelect = false; copyTool = false; deleteTool = false; moveTool = true; drawSelect = true;*/}, false);
	//$('#copy').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "noBrush"; otherTools = "copy";tempSelect = "noTemp";/*copySelection(); rectTool(); pencilDraw = false;  spray2Paint = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = false; drawQCurve = false; drawSelect = false; copyTool = true; deleteTool = false; moveTool = false; drawSelect = true;*/}, false);
	//$('#delete').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "noBrush"; otherTools = "delete"; tempSelect = "noTemp";/*deleteSelection();rectTool(); pencilDraw = false; spray2Paint = false; sprayPaint = false; scatRect = false; scatCirc = false; drawRect = false; drawCirc = false; drawLine = false; drawQCurve = false; drawSelect = false; copyTool = false; deleteTool = true; moveTool = false; drawSelect = true;*/}, false);
	$('#line2').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "noBrush"; otherTools = "noTool"; tempSelect = "line2";}, false);
	$('#rect2').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "noBrush"; otherTools = "noTool"; tempSelect = "rect2";}, false);
	$('#circ2').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "noBrush"; otherTools = "noTool"; tempSelect = "circ2";}, false);
	//$('#draw2').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "noBrush"; otherTools = "noTool"; tempSelect = "draw2";}, false);
	$('#copy2').get(0).addEventListener('click', function(e) {lastTool = "tempCopy"; brushSelect = "noBrush"; otherTools = "noTool"; tempSelect = "tempCopy";}, false);
//	$('#move2').get(0).addEventListener('click', function(e) {/*lastTool = "notbackground";*/ brushSelect = "noBrush"; otherTools = "noTool"; tempSelect = "tempMove";}, false);
	$('#paste').get(0).addEventListener('click', function(e) {lastTool = "tempPaste"; brushSelect = "noBrush"; otherTools = "noTool"; tempSelect = "tempPaste";tempPasteTool();}, false);
	$('#select').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "noBrush"; otherTools = "noTool"; tempSelect = "tempSel";}, false);
	$('#del2').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "noBrush"; otherTools = "noTool"; tempSelect = "tempDel";}, false);
	$('#dash').get(0).addEventListener('click', function(e) {makeDashed(); /*tempSelect = "line2"*/}, false);
	$('#solid').get(0).addEventListener('click', function(e) {makeSolid(); /*tempSelect = "line2"*/}, false);
	$('#eyed').get(0).addEventListener('click', function(e) {brushSelect = "noBrush"; otherTools = "noTool"; tempSelect = "noTemp"; eyeDrop = true; /*tempSelect = "line2"*/}, false);
	$('#grad').get(0).addEventListener('click', function(e) {lastTool = "notbackground28"; brushSelect = "gradBrush"; otherTools = "noTool"; tempSelect = "noTemp";}, false);
	$('#flood').get(0).addEventListener('click', function(e) {  lastTool = "notbackground28"; brushSelect = "noBrush"; otherTools = "floodTool"; tempSelect = "noTemp";}, false);
	$('#crop').get(0).addEventListener('click', function(e) {  lastTool = "notbackground28"; brushSelect = "noBrush"; otherTools = "cropTool"; tempSelect = "noTemp";cropCanvas();}, false);
	$('#custom').get(0).addEventListener('click', function(e) {lastTool = "notbackground"; brushSelect = "customBrush"; otherTools = "noTool";tempSelect = "noTemp";}, false);
	$('#bmodal').get(0).addEventListener('click', function(e) {brushSlider.classList.remove("active"); shapeSlider.classList.remove("active");}, false);
	//$('#move').get(0).addEventListener('click', function(e) { moveSelection(); moveTool = true;}, false);  
}
function matchMed(mM){
	console.log(mM);
	if(mM.matches){
		/*canvas.width = window.innerWidth - 95;
		canvas.height = window.innerHeight - 95;
		canvas2.width = window.innerWidth - 95;
		canvas2.height = window.innerHeight - 95;
		canvasWidth = canvas.width;
		canvasHeight = canvas.height;*/
		ffxoffset= 54;
		ffyoffset= 45;
		brushOffsetX = 65;
		brushOffsetY = 78;
		//$('.enableT').css("top:","+="+canvasHeight+"px");
	//	$('.opacity').css("top:","+="+canvasHeight+"px");
	//	$('.lineThickness').css("top:","+="+canvasHeight+"px");
		//$('#imageView').html("top: 70px;");
	//	$('#imageView').css("top", 40px;");
	//	$('#image2View').css("top", 40px;");
	} else {
		/*canvas.width = window.innerWidth - 95;
		canvas.height = window.innerHeight - 185;
		canvas2.width = window.innerWidth - 95;
		canvas2.height = window.innerHeight - 185;
		canvasWidth = canvas.width;
		canvasHeight = canvas.height;*/
		ffxoffset= 54;
		ffyoffset= 75;
		brushOffsetX = 65;
		brushTouchOffsetX = 39;
		brushTouchOffsetY = 53;
		brushOffsetY = 48;
		$('#imageView').css("top", "+=30px");
		$('#image2View').css("top", "+=30px");
	}
}


 function drawDot(ctx,x,y,size) {
        // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
        r=0; g=0; b=0; a=255;

        // Select a fill style
       // ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
	 /* x out for eraser context.fillStyle = lastColor;
	context.globalAlpha = alpha;
	 context.lineWidth = thickness;*/
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
		context.beginPath();
        context.arc(x, y, Number(thickness), 0, Math.PI*2, true); 
        context.closePath();
        context.fill();
		//context.fillRect(x,y,w,h);
		
	}
        // Draw a filled circle
        
    } 
function cropCanvas(){
	//canvas5 = $('#cropView').get(0);
	//cropContext = canvas5.getContext('2d');
	canvas5.width = selectWidth;
	canvas5.height = selectHeight;
	if(tempImgData != null){
		cropContext.putImageData(tempImgData,0,0);
	//var cropImg = canvas5.toDataURL();
	//console.log(cropImg);
	//var cropWidth = cropImg.width;
		//	var cropHeight = cropImg.height;
			canvas.width = canvas5.width;
			canvas.height = canvas5.height;
			canvas2.width = canvas5.width;
			canvas2.height = canvas5.height;
		//	cropImg.onload = function(){
			
			/*if(customCanvas){
				if(upWidth>upHeight){
					if(upWidth > canvas4.width){upHeight*= canvas4.width/upWidth; upWidth = canvas4.width;}
				} else {
					if(upHeight>canvas4.height){
						upWidth *= canvas4.height/upHeight;
						upHeight = canvas4.height;
					}
				}
			
			brushContext.drawImage(upImg,0,0,upWidth,upHeight);
			
			
		} else { 
			if(upWidth>upHeight){
					if(upWidth > canvasWidth){upHeight*= canvasWidth/upWidth; upWidth = canvasWidth;}
				} else {
					if(upHeight>canvasHeight){
						upWidth *= canvasHeight/upHeight;
						upHeight = canvasHeight;
					}
				}*/
			context.drawImage(canvas5,0,0);
			
		}
	selectX = null;
			tempImgData = null;
			cPush();
			tempSelect = "tempSel";
}	
function dragElement(elmnt){
	  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	  xTotal = 0; yTotal = 0;
  if (document.getElementById(elmnt.id + "header")) {
	  
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onpointerdown = dragMouseDown;
	//document.getElementById(elmnt.id + "header").ontouchstart = dragMouseDown;
  }
  /* else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }*/

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onpointerup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onpointermove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
  //  if(xTotal <100 && xTotal > canvasWidth +200 && yTotal <100 && yTotal > canvasHeight + 100){
	pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
	xTotal += pos1;
	yTotal += pos2;
	/*if(xTotal >100 || xTotal < -1*canvasWidth +200 || yTotal >100 || yTotal < -1*(canvasHeight + 100)){
		pos1 = 0;
		pos2 = 0;
	}*/
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"; console.log(elmnt.id + "header", pos1,pos2,xTotal,yTotal,window.innerWidth,window.innerHeight,canvasWidth,canvasHeight)
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    window.onmouseleave = null;
	document.onpointerup = null;
    document.onpointermove = null;
  }
	
}
function clearPage (){
	//var chooseClear = confirm('Are you sure you wish to completely clear the canvas of art (background will remain)?');
	//if(chooseClear){
		
		context.clearRect(0,0,context.canvasWidth, context.canvas.height);
		tempContext.clearRect(0,0,context.canvasWidth, context.canvas.height);
		var xcolor = lastColor;
		xalpha = alpha;
		if(disableTrans){
		context.globalAlpha=1;
		context.fillStyle = 'white';
		context.fillRect(0,0,context.canvasWidth, context.canvas.height);
		console.log("dissuccess");}
	/*context.fillStyle = backgroundColor;
	context.globalAlpha = alpha;
	context.fillRect(0,0,context.canvas.width, context.canvas.height)*/
		w = context.canvas.width;
		h = context.canvas.height;
		reloadBackground(0,0, w, h);
		context.fillStyle = fillColor;//}
		//cPush();
		/*if(customCanvas){bPush();}else{*/cPush();//}
//} else {clearTrans();}}
}
function clearTrans(){
	context.clearRect(0,0,context.canvas.width, context.canvas.height);
	context.fillStyle = backgroundColor;
}

function getRandomAng() {
  ang = Math.random() * 2 * Math.PI;
  return ang;
  
  
}

function makeDashed(){
	//if(Number(thickness)<17){context.setLineDash([Number(thickness) +3,Number(thickness)*10]);
	if(brushSelect != "circleBrush" && brushSelect !="squareBrush" && brushSelect != "lineBrush" && brushSelect !=  "crossHatch"){dashThickness = Number(thickness);console.log("arg");} else{dashThickness = 5;}
	//}else {context.setLineDash([Number(thickness) +3,Number(thickness)*30]);}
	//context.setLineDash([Number(thickness)-10 +3,Number(thickness)*30]);
	switch(true){
		case (dashThickness<8):
			context.setLineDash([5,10]);
			tempContext.setLineDash([5,10]);
			brushContext.setLineDash([5,10]);
			brushTempContext.setLineDash([5,10]);	
			break;
		case (dashThickness>=8 && dashThickness<20):
			context.setLineDash([5,dashThickness*1.4]);
			tempContext.setLineDash([5,dashThickness*1.4]);
			brushContext.setLineDash([5,dashThickness*1.4]);
			brushTempContext.setLineDash([5,dashThickness*1.4]);
			break;			
		case (dashThickness>=20 ):
			context.setLineDash([5,dashThickness*1.6]);
			tempContext.setLineDash([5,dashThickness*1.6]);
			brushContext.setLineDash([5,dashThickness*1.6]);
			brushTempContext.setLineDash([5,dashThickness*1.6]);
			break;
		default:
			context.setLineDash([5,10]);
			tempContext.setLineDash([5,10]);
			brushContext.setLineDash([5,10]);
			brushTempContext.setLineDash([5,10]);	
	}
	
	/*context.setLineDash([/*Number(thickness) + 3, 3*Number(thickness) + 3]);*///5,10]);
	//tempContext.setLineDash([5,10]);
//	brushContext.setLineDash([5,10]);
	//brushTempContext.setLineDash([5,10]);*/
	dashset = true;
}
function makeSolid(){
	context.setLineDash([]);
	tempContext.setLineDash([]);
	brushContext.setLineDash([]);
		brushTempContext.setLineDash([]);
dashset = false;}
function getRandomRad() {
  rad = Math.random() * thickness;
  return rad;
  
  
}

function getRandomDiam() {
  diam = Math.floor(Math.random() * (thickness/4 +5));
  return diam;
  
  
}

function getMedRandomRad() {
  medrad = Math.random() * (thickness*3+4);
  return medrad;
  
  
}
function getBigRandomRad() {
  bigrad = Math.random() * thickness*10;
  return bigrad;
  
  
}
function keyPressHandler (e){
	if(!$(e.target).is(':input')){
	if(e.keyCode == 8 ||e.keyCode == 46 ||e.keyCode == 110){
		tempSelect = "tempDel";
		if(selectX != null && selectY != null ){
			
			if(customCanvas){brushContext.clearRect(selectX,selectY, selectWidth, selectHeight);
			}else{ context.clearRect(selectX,selectY, selectWidth, selectHeight); reloadBackground(selectX,selectY, selectWidth, selectHeight);}
		}
	}
}
 /*if (e.keyCode && (e.keyCode == '115' || e.keyCode == '83' ) && (e.ctrlKey || e.metaKey) && !(e.altKey))
    {
		onSave();
        e.preventDefault();
        
        return false;
    }

/*if (e.ctrlKey || e.metaKey) {
	e.preventDefault();	
        if(e.keyCode == 83 || 115){onSave();e.preventDefault(); }
	
			/*switch (String.fromCharCode(event.which).toLowerCase()) {
        case 's':
            e.preventDefault();
            onSave();
            break;
        case 'f':
            e.preventDefault();
            //alert('ctrl-f');
            break;
        case 'g':
            e.preventDefault();
           // alert('ctrl-g');
            break;
        }*/
   // }


}
function onMouseMove(/*x,y */ev) {
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
	//lastTool = "notbackground";
	if(tempSelect == "line2" ||"rect2"||"circ2"||"draw2"){
		if(customCanvas){tempTools(brushTempContext,x-brushOffsetX,y-brushOffsetY);} else {tempTools(tempContext,x,y);}
	}
	if(enableDrag){
	if(customCanvas){
		tempDragTool(brushTempContext, x,y);
	} else{tempDragTool(tempContext, x,y);}
	}
	/*if(x > selectX && x <= selectX+selectWidth && y > selectY && y < selectY+selectHeight){
		enableDrag = true;
		tempDragTool(tempContext, x,y);
	}*/
if(customCanvas){selectBrush(brushContext,x-brushOffsetX,y-brushOffsetY);}else {selectBrush(context,x,y);}
	//selectBrush(brushContext,x,y);
}

function onMouseMove2(ev) {
	//onMouseMove(ev);
	/*var x,y;
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
	onMouseMove(x,y);
	// posx and posy contain the mouse position relative to the document
	// Do something with this information
	/*lastTool = "notbackground";
	if(tempSelect == "line2"){
		tempTools(tempContext,x,y);
	}
	selectBrush(context,x,y);*/
}
function getTouchCoords(e){
	if (!e) var e = window.event;
	if(e.touches){
	if(e.touches.length == 1){
		var touch = e.touches[0];
		x = touch.pageX - touch.target.offsetLeft;
		y = touch.pageY - touch.target.offsetTop;
	}
} 
lastMove = e;
e.preventDefault();
return x,y
}

function onTouchMove (e) {
	//var x,y;
	getTouchCoords(e)
	console.log("enableDrawm",enableDraw);
	enableDraw = true;
	enableTemp = true;
	
	/*if(tempSelect == "line2"||"rect2"||"circ2"||"draw2"||"tempCopy"){
		tempTools(tempContext,x,y);
	} */
	if(customCanvas){tempTools(brushTempContext,x-brushOffsetX-brushTouchOffsetX,y-brushOffsetY-brushTouchOffsetY);} else {tempTools(tempContext,x,y);}
	//if (tempSelect =="tempMove"){
	//if(customCanvas){tempDragTool ( brushTempContext,x,y);}else {tempDragTool(tempContext,x,y);}}
	/*if(tempSelect == "line2" ||"rect2"||"circ2"||"draw2"){
		tempTools(tempContext,x,y);
	}*/
	//lastTool = "notbackground";
	if(enableDrag){//tempDragTool(tempContext, x,y);
	if(customCanvas){
             tempDragTool(brushTempContext, x,y);
       } else{tempDragTool(tempContext, x,y);} 
	}
	//selectBrush(context,x,y);
	if(customCanvas){selectBrush(brushContext,x-brushOffsetX-brushTouchOffsetX,y-brushOffsetY-brushTouchOffsetY);}else {selectBrush(context,x,y);}

       //selectBrush(brushContext,x,y);
		//}
	//drawDot(context,x,y,12);
	e.preventDefault();
	console.log(x,y);
	//lastMove = {lastX:x,lastY:y}
	//console.log(lastMove);
	//console.log(event.originalEvent.touches);
	
}


function transformTool(){	
		//tmodal.style.display = "none";
		console.log("clickkt");
		if(tempImgData!= null){
		var xCopyTran = document.getElementById("copyTran").checked;
		if(!xCopyTran){if(customCanvas){brushContext.clearRect(selectX,selectY,selectWidth,selectHeight); }else{context.clearRect(selectX,selectY,selectWidth,selectHeight); reloadBackground(selectX,selectY,selectWidth,selectHeight);}}
		var hFlip = document.getElementById("flipH").checked;
		var vFlip = document.getElementById("flipV").checked;
		var hf,vf;
		if(hFlip){hf = -1;} else{hf = 1;}
		if(vFlip){vf = -1;} else{vf = 1;}
		var xScale = document.getElementById("scaleX").value;
		var yScale = document.getElementById("scaleY").value;
		var xMove = document.getElementById("moveX").value;
		var yMove = document.getElementById("moveY").value;
		var tRotate = document.getElementById("rotateX").value;
		//var yRotate = document.getElementById("rotateY").value;
		var xSkew = document.getElementById("skewX").value;
		var ySkew = document.getElementById("skewY").value;
		
		var NumRepeat = document.getElementById("repeatNum").value;
		if(tempImgData !=null){
		if(customCanvas){
			brushTempContext.clearRect(0,0,canvas4.width,canvas4.height);
			brushTempContext.putImageData(tempImgData, drawX,drawY);
		
		
			brushContext.save()
			brushContext.translate((selectWidth/2)+drawX, (selectHeight/2)+drawY);
			for(i=0; i<Number(NumRepeat); i++){
				console.log("bttttt");
				console.log(xScale,yScale,xMove,yMove,tRotate,xSkew,ySkew,xCopyTran,NumRepeat);
				console.log("hf",hf,"vf",vf);
			
				brushContext.rotate((Number(tRotate)*Math.PI/180));
				brushContext.transform(Number(xScale)/100*hf,Number(xSkew)/*+Number(tRotate)*/*Math.PI/180,Number(ySkew)/*-Number(tRotate)*/*Math.PI/180,Number(yScale)/100*vf,Number(xMove),Number(yMove));
				brushContext.drawImage(canvas4,-1*drawX-(selectWidth/2),-1*drawY-(selectHeight/2)/*,selectWidth,selectHeight*/);
			//context.drawImage(canvas2,selectX,selectY,selectWidth,selectHeight,selectX,selectY,selectWidth,selectHeight);
			}
			brushContext.restore();
			brushTempContext.clearRect(0,0,canvas4.width,canvas4.height);
			tempImgData = null;
			bPush();
		}else{tempContext.clearRect(0,0,canvas2.width,canvas2.height);
		//tempContext.putImageData(tempImgData, drawX,drawY);
		
		
		context.save()
		context.translate((selectWidth/2)+drawX, (selectHeight/2)+drawY);
		for(i=0; i<Number(NumRepeat); i++){
			console.log("ttttt");
			console.log(xScale,yScale,xMove,yMove,tRotate,xSkew,ySkew,xCopyTran,NumRepeat);
			console.log("hf",hf,"vf",vf);
			
			
			context.rotate((Number(tRotate)*Math.PI/180));
			context.transform(Number(xScale)/100*hf,Number(xSkew)/*+Number(tRotate)*/*Math.PI/180,Number(ySkew)/*-Number(tRotate)*/*Math.PI/180,Number(yScale)/100*vf,Number(xMove),Number(yMove));
			tempContext.putImageData(tempImgData, drawX,drawY);
			context.drawImage(canvas2,-1*drawX-(selectWidth/2),-1*drawY-(selectHeight/2)/*,selectWidth,selectHeight*/);
			//context.drawImage(canvas2,selectX,selectY,selectWidth,selectHeight,selectX,selectY,selectWidth,selectHeight);
		}
		context.restore();
		tempContext.clearRect(0,0,canvas2.width,canvas2.height);}
		cPush();
		} //else{tempSelect = "tempSel";}
		tempImgData = null;
		tempSelect = "tempSel";
		}
	}
function selectBrush(context,x,y){
		 if(dashset){makeDashed();}
	if (enableDraw  ){
		lastTool = "brush";
		if (brushSelect == "pencil"){
			if (!started) {
				started = true;
		
				context.beginPath();
				context.moveTo(x, y);		
			} else {
			//	if(context.isPointInPath(x,y)){context.closePath(); context.fill();}
				context.lineTo(x, y);
				context.lineCap = "round";
				context.lineJoin = "round";
				context.globalAlpha = alpha;
				context.lineWidth = thickness;
				/*if(fill) {
					context.fill();
				} else {context.stroke();}*/
				context.fill();
				context.stroke();
			}
		}
		else if(brushSelect == "squareBrush") {
			context.closePath();
			context.beginPath();
			context.moveTo(x,y);
			context.globalAlpha = alpha;
			var sThickness = Number(thickness) *4 ; 
			context.rect(x,y,sThickness, sThickness);
			/*if(fill) {
				context.fill();
			} else {context.lineWidth = 1; context.stroke();}*/
			context.lineWidth = 1;
			context.fill();
			
				context.stroke();
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
			context.moveTo(x,y);
			context.beginPath();
			
			context.globalAlpha = alpha;
			var cThickness = Number(thickness) * 2;
			context.arc(x,y,cThickness,2 * Math.PI, false);
		//context.fill();
			/*if(fill) {
				context.fill();
			} else {context.lineWidth = 1; context.stroke();}*/
			context.lineWidth = 1;
			context.fill();
			
				context.stroke();
			context.lineWidth = thickness;
		} else if (brushSelect == "line2"){
			context.beginPath()
			//context.moveTo(old.oldX,old.oldY);
			context.clearRect(0,0,canvas.width,canvas.height);
			context.setLineDash([5,10]);
			context.strokeRect(old.oldX,old.oldY,x-old.oldX,y-old.oldY);
			//context.lineTo(x,y);
			//context.stroke();
			//context.clearRect(0,0,canvas.width,canvas.height);
			
			
			
		}else if(brushSelect == "sprayPaint"){
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
				context.globalAlpha = alpha;
				for(var i = density; i--;){
					//if(brushSelect != "spray2"){break;}
			//var adjX = getRandomInt(-thickness, thickness) +x;
			//var adjY = getRandomInt(-thickness, thickness)+y;
					var adjX = Math.cos(getRandomAng()) * getRandomRad() + x;
					var adjY = Math.sin(getRandomAng()) * getRandomRad() + y;
					//context.globalAlpha = Math.random()*alpha;
					context.fillStyle = fillColor;
					context.fillRect(adjX,adjY,1,1);
					context.lineWidth = .2
					context.strokeRect(adjX,adjY,1,1);
				}
				context.lineWidth = thickness;
		
		} else if(brushSelect == "bubbles"){
			//if(brushSelect != "spray2"){return;}
				density = Math.ceil(thickness/2);
				for(var i = density; i--;){
					//if(brushSelect != "spray2"){break;}
			//var adjX = getRandomInt(-thickness, thickness) +x;
			//var adjY = getRandomInt(-thickness, thickness)+y;
					var adjX = Math.cos(getRandomAng()) * getMedRandomRad() + x;
					var adjY = Math.sin(getRandomAng()) * getMedRandomRad() + y;
					var adjsize = getRandomDiam();
					context.globalAlpha = Math.random()*alpha;
				//	context.fillRect(adjX,adjY,adjsize,adjsize);
					context.lineWidth = .5;
					context.beginPath()
					context.arc(adjX,adjY,adjsize,2 * Math.PI, false);
			//			context.shadowBlur = 20;
			//	context.shadowColor= strokeColor;
				//context.shadowOffsetY = 20;
					context.stroke();
					context.fill();
					context.closePath()
					//context.strokeRect(adjX,adjY,adjsize,adjsize);
				}
				context.lineWidth = thickness;
				context.globalAlpha = alpha;
		}else if(brushSelect == "lineBrush"){
			context.closePath();
			context.beginPath();
			context.globalAlpha = alpha;
			context.lineWidth = 2 //+ Number(thickness)/15;
			console.log(brushSelect,x,y);
			context.moveTo(x,y);
			context.lineTo(x+Number(thickness)*5, y-Number(thickness)*5);
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
			context.lineWidth = 1;
			console.log(brushSelect,x,y);
			context.moveTo(x-5,y-5);
			context.lineTo(x+Number(thickness)*3+5/Number(thickness), y-Number(thickness)*3+5/Number(thickness));
			context.stroke();
			context.moveTo(x+(Number(thickness)-5/Number(thickness)), y-5/Number(thickness));
			context.lineTo(x+(Number(thickness)*2)+5/Number(thickness), y-Number(thickness)*3)+5/Number(thickness);
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
		} else if(brushSelect == "customBrush"){
			//console.log("custom")
			/*var cur = {curX:x,curY:y};
			var dist = distanceBetween(old,cur);
			var ang = angleBetween(old,cur);
			for(var i=0;i<dist;i++){
				var placeX = old.oldX +(Math.sin(ang)*i) - Number(thickness);
				var placeY = old.oldY +(Math.cos(ang)*i) - Number(thickness);
				//brushPic.onload = function () {context.drawImage(brushPic,placeX,placeY)}*/
				context.globalAlpha = alpha;
				var size = 5*Number(thickness)
				
				if(scatter){
					
					
					density = Math.ceil(thickness/160);
				for(var i = density; i--;){
					var adjX = Math.cos(getRandomAng()) * getBigRandomRad() + x;
					var adjY = Math.sin(getRandomAng()) * getBigRandomRad() + y;
					if(rotateBrush){
						context.save(); 
						context.translate(adjX, adjY);
						context.rotate(Math.PI * 180 / (Math.floor(Math.random() * (180 - 0 + 1)) + 0));
						//context.drawImage(canvas3,adjX,adjX,size,size);
						context.drawImage(canvas3,-1*(size/2),-1*(size/2),size,size);
						context.restore();
						}else{
						
						context.drawImage(canvas3,adjX-(size/2),adjY-(size/2),size,size);}
				
				}
				}else if(!scatter){
					if(rotateBrush){
						context.save();
						context.translate(x,y);
           
                context.rotate(Math.PI * 180 / (Math.floor(Math.random() * 181)));
               
                context.drawImage(canvas3,-1*(size/2),-1*(size/2),size,size);
                context.restore();
				}else{context.drawImage(canvas3,x-(size/2),y-(size/2),size,size);}
					
			}
			//old = {oldX: cur.curX, oldY: cur.curY};
		} else if (brushSelect == "pen3"){
			
			/*var current = {curX:x,curY:y};
			var dist = distanceBetween(old,current);
			var ang = angleBetween(old,current);
			for (i=0; i< dist; i++){
				xd = old.oldX +(Math.sin(ang) * i);
				yd = old.oldY + (Math.cos(ang)*i);
				console.log(xd,yd);*/
				context.lineCap = 'square';
				context.lineJoin = 'round';
				context.globalAlpha = Number(alpha) *.7;
				context.lineWidth = Number(thickness)/3 //+4;//+5;
				context.beginPath();
				context.moveTo(/*xd,yd*/old.oldX,old.oldY);
				context.lineTo(x,y);
				context.stroke();
				context.fill();
			
				context.moveTo(/*xd-4,yd+4*/old.oldX-(Number(thickness)+2),old.oldY+(Number(thickness)+2));
				context.lineTo(x -(Number(thickness)+2),y+(Number(thickness)+2));
				context.stroke();
				context.fill();
				
				context.moveTo(/*xd-2,yd+2*/old.oldX-(Number(thickness)+2)/2,old.oldY+(Number(thickness)+2)/2);
				context.lineTo(x-(Number(thickness)+2)/2,y+(Number(thickness)+2)/2);
				context.stroke();
				context.fill();
				
				context.moveTo(/*xd+2,yd-2*/old.oldX+(Number(thickness)+2)/2,old.oldY-(Number(thickness)+2)/2);
				context.lineTo(x+(Number(thickness)+2)/2,y-(Number(thickness)+2)/2);
				context.stroke();
				context.fill();
				
				context.moveTo(/*xd+4,yd-4*/old.oldX+(Number(thickness)+2),old.oldY-(Number(thickness)+2));
				context.lineTo(x+(Number(thickness)+2),y-(Number(thickness)+2));
				context.stroke();
				context.fill();
			//}
			old = {oldX: x, oldY: y}; 
		}else if(brushSelect == "gradBrush"){
			var cur = {curX:x, curY:y};
			//	var dist = distanceBetween(old,cur);
				///var ang = angleBetween(old,cur);
			//for (var j= 0; j < dist; j+= 5){
				//		interpX = old.oldX +(Math.sin(ang) *j);
				//		interpY = old.oldY +(Math.cos(ang) *j);
						
					
				
			 // var lingrad = context.createLinearGradient(0,0,x+Number(thickness)*2+6,y+Number(thickness)*2);
			 var lingrad = context.createLinearGradient(x-Number(thickness)*2,y-Number(thickness)*2,x+Number(thickness),y+Number(thickness));
			  context.beginPath();
			  context.lineCap = "round";
				context.moveTo(old.oldX,old.oldY);
				//lingrad.addColorStop(0, "orchid");
				
				//lingrad.addColorStop(.3, 'rgba(218,112,214,0.9)');
				console.log(strokeColor);
				//lingrad.addColorStop(1, "white");
				if(fillColor== "transparent"){lingrad.addColorStop(0.4, 'rgba(255,255,255,0)');
				}else{lingrad.addColorStop(0.4, fillColor);}
				if(strokeColor== "transparent"){
					lingrad.addColorStop(0, 'rgba(255,255,255,0)');
					lingrad.addColorStop(1, 'rgba(255,255,255,0)');
				}else {
					lingrad.addColorStop(0, strokeColor);
					lingrad.addColorStop(1, strokeColor);}
				context.strokeStyle = lingrad;
				context.globalAlpha = Number(alpha)/2;
				context.lineWidth = Number(thickness)*4+5
				context.lineTo(x,y)
				context.stroke();
				//context.fill();
				//context.fillRect( x,y,Number(thickness),Number(thickness));
				//}
				old = {oldX: cur.curX, oldY: cur.curY};
				context.strokeStyle= strokeColor;
				context.fillStyle= fillColor;
		} else if (brushSelect == "pen4"){
				context.lineCap = 'round';
				context.lineJoin = 'round';
				context.globalAlpha = Number(alpha) *.7;
				context.lineWidth =  5//Number(thickness)/2 +2// 3//+4;//+5;
				context.beginPath();
				context.moveTo(/*xd,yd*/old.oldX,old.oldY);
				context.lineTo(x,y);
				context.stroke();
				for(var i = 2; i<Number(thickness)*2+2; i+=2){
					context.moveTo(old.oldX+i, old.oldY -i);
					context.lineTo(x+i,y-i);
					context.stroke();
					
					/*context.moveTo(old.oldX-i, old.oldY -i);
					context.lineTo(x-i,y+i);
					context.stroke();*/
				}
			old = {oldX: x, oldY: y}; 
			
		} else if (brushSelect == "pen5"){
				
				context.lineCap = 'round';
				context.lineJoin = 'round';
				context.globalAlpha = Number(alpha) *.7;
				context.lineWidth = 3 //Number(thickness) //+4;//+5;
				context.beginPath();
				context.moveTo(/*xd,yd*/old.oldX,old.oldY);
				context.lineTo(x,y);
				context.lineWidth = Number(thickness);
				context.stroke();
				context.lineTo(xf,yf);
				//context.lineTo(x,y);
				//context.fillStyle = fillColor;
				context.fill()
				/*for(var i = 2; i<Number(thickness); i+=2){
					context.moveTo(old.oldX+i, old.oldY -i);
					context.lineTo(x+i,y-i);
					context.stroke();
					context.moveTo(old.oldX+i, old.oldY -i);
					context.lineTo(x+i,y-i);
					context.fill()
					/*context.moveTo(old.oldX-i, old.oldY -i);
					context.lineTo(x-i,y+i);
					context.stroke();*/
				//}
			//old = {oldX: x, oldY: y}; 
			xf = x;
			yf = y;
			//context.closePath
		} else if (brushSelect == "pen6"){
				//var axis = prompt("
				context.lineCap = 'round';
				context.lineJoin = 'round';
				context.globalAlpha = Number(alpha) *.7;
				context.lineWidth = Number(thickness);//3 //Number(thickness) //+4;//+5;
				context.beginPath();
				context.moveTo(/*xd,yd*/old.oldX,old.oldY);
				context.lineTo(x,y);
				context.stroke();
				for(var i = 2; i<Number(thickness); i+=2){
					context.moveTo(old.oldX+i, old.oldY -i);
					context.lineTo(x+i,y-i);
					context.stroke();
					
					/*context.moveTo(old.oldX-i, old.oldY -i);
					context.lineTo(x-i,y+i);
					context.stroke();*/
				}
			//old = {oldX: x, oldY: y}; 
			old.oldX = x;
		} else if (brushSelect == "pen7"){
				//ar cur = {curX:x, curY:y};
				bzPoints.push({bzX:x,bzY:y});
				context.closePath();
				context.beginPath();
				context.lineCap = 'round';
				context.lineJoin = 'miter';
				context.globalAlpha = Number(alpha); //*.7;
				context.lineWidth = Number(thickness);
				context.moveTo(old.oldX,old.oldY);
				var cur = {curX:x, curY:y};
				var dist = distanceBetween(old,cur);
				if (dist > Number(thickness)*3 + 50){
					context.lineTo(cur.curX,cur.curY);
					//var bzPoints = [];
					geoPoints.push({gX:x,gY:y});
					old = {oldX: x, oldY: y}; 
					
				}
				context.stroke();
				context.fill();
						for( var i = 1; i< geoPoints.length; i++){
					dx = geoPoints[i].gX-geoPoints[geoPoints.length-1].gX;
					dy = geoPoints[i].gY-geoPoints[geoPoints.length-1].gY;
					d = dx *dx + dy * dy;
				
					if (d</*1000*/ 1250* Number(thickness) /*&& Math.random() > 0.9*/) {
					//	console.log("np");
						context.beginPath();
				/*if(Number(thickness) < 10){
				context.lineWidth = Number(thickness) * .8;}
				else{
				context.lineWidth =Number(thickness)*.4;}*/
				//context.strokeStyle = 'rgba(0,0,0,.3)';
				//context.globalAlpha = alpha* .1;
						context.lineWidth = Number(thickness) * 0.3;
						context.globalAlpha = Number(alpha)*0.7;
						if(fillColor != "transparent") {context.strokeStyle = fillColor;}
						context.moveTo(geoPoints[geoPoints.length -1].gX /*+ (dx*.2)*/,geoPoints[geoPoints.length -1].gY /*+ (dy*.2)*/);
						context.lineTo(geoPoints[i].gX /*- (dx*.2)*/, geoPoints[i].gY /*- (dy*.2)*/);
						context.stroke();
					}
				}
				context.strokeStyle = strokeColor;
				context.fillStyle = fillColor;
			//context.closePath();
			//context.beginPath();
		/*var cur = {bzX:x,bzY:y};
				context.moveTo(x, y);		
			
				context.lineTo(x, y);
				context.lineCap = "round";
				context.lineJoin = "round";
				context.globalAlpha = alpha;
				context.lineWidth = thickness;
				context.stroke();
				/*if(fill) {
					context.fill();
				} else {context.stroke();}*/
			/*	if (bzPoints.includes(cur)){
					
					context.fill();
					
					}
					bzPoints.push({bzX:x,bzY:y});
				//context.stroke();}
			
			//	var axis = prompt("
			/*	context.lineCap = 'round';
				context.lineJoin = 'round';
				context.globalAlpha = Number(alpha) *.7;
				context.lineWidth = Number(thickness);//3 //Number(thickness) //+4;//+5;
				context.beginPath();
				context.moveTo(/*xd,yd*//*old.oldX,old.oldY);
				context.lineTo(x,y);
				context.stroke();
				for(var i = 2; i<Number(thickness); i+=2){
					context.moveTo(old.oldX+i, old.oldY -i);
					context.lineTo(x+i,y-i);
					context.stroke();				
				
				}*/
			//old = {oldX: x, oldY: y}; 
		
			//old.oldX = x;
		}  else if (brushSelect == "geo2"){
				bzPoints.push({bzX:x,bzY:y});
				context.closePath();
				context.beginPath();
				context.lineCap = 'round';
				context.lineJoin = 'miter';
				context.globalAlpha = Number(alpha); //*.7;
				context.lineWidth = Number(thickness);
				context.moveTo(old.oldX,old.oldY);
				var cur = {curX:x, curY:y};
				var dist = distanceBetween(old,cur);
				var ang = angleBetween(old,cur);
				if (dist > Number(thickness)*3 + 50){
					
					context.lineTo(cur.curX,cur.curY);
					//var bzPoints = [];
				/* interesting but wrong	for(var j=0; j<dist; j++){
					geoPoints.push({gX:(x+j),gY:(y+j)});}*/
					for (var j= 0; j < dist; j+= 5){
						interpX = old.oldX +(Math.sin(ang) *j);
						interpY = old.oldY +(Math.cos(ang) *j);
						geoPoints.push({gX:interpX,gY:interpY});
					}
					old = {oldX: cur.curX, oldY: cur.curY}; 
					geoPoints.push({gX:cur.curX,gY:cur.curY});
				}
				context.stroke();
				//context.fill();
					for( var i = 1; i< geoPoints.length; i++){
					dx = geoPoints[i].gX-geoPoints[geoPoints.length-1].gX;
					dy = geoPoints[i].gY-geoPoints[geoPoints.length-1].gY;
					d = dx *dx + dy * dy;
				
					if (d</*1000*/ 1000* Number(thickness) /*&& Math.random() > 0.9*/) {
					//	console.log("np");
						context.beginPath();
				/*if(Number(thickness) < 10){
				context.lineWidth = Number(thickness) * .8;}
				else{
				context.lineWidth =Number(thickness)*.4;}*/
				//context.strokeStyle = 'rgba(0,0,0,.3)';
				context.globalAlpha = alpha* .1;
						context.lineWidth = Number(thickness) * 0.3;
						if(fillColor != "transparent") {context.strokeStyle = fillColor;}
						context.moveTo(geoPoints[geoPoints.length -1].gX + (dx*.2),geoPoints[geoPoints.length -1].gY + (dy*.2));
						context.lineTo(geoPoints[i].gX - (dx*.2), geoPoints[i].gY - (dy*.2));
						context.stroke();
					}
				}
				context.strokeStyle = strokeColor;
				context.fillStyle = fillColor;
			
		}else if (brushSelect == "geo3"){
				//ar cur = {curX:x, curY:y};
				var sgPoints = [];
				bzPoints.push({bzX:x,bzY:y});
				context.closePath();
				context.beginPath();
				context.lineCap = 'round';
				context.lineJoin = 'miter';
				context.globalAlpha = Number(alpha); //*.7;
				context.lineWidth = Number(thickness);
				context.moveTo(old.oldX,old.oldY);
				var cur = {curX:x, curY:y};
						
				var ang = angleBetween(old,cur);
				var dist = distanceBetween(old,cur);
				if (dist > Number(thickness)*3 + 50){
					context.lineTo(cur.curX,cur.curY);
					context.stroke();
					context.moveTo(old.oldX+ Math.floor(Math.random()*5),old.oldY+ Math.floor(Math.random()*5));
					context.lineTo(cur.curX+Math.floor(Math.random()*5),cur.curY+Math.floor(Math.random()*5));
					context.stroke();
						for (var k= 0; k < dist; k+= 1){
						interpX = old.oldX +(Math.sin(ang) *k);
						interpY = old.oldY +(Math.cos(ang) *k);
						sgPoints.push({sgX:interpX,sgY:interpY});
					}
					old = {oldX: cur.curX, oldY: cur.curY}; 
					geoPoints.push({gX:cur.curX,gY:cur.curY});
					//var bzPoints = [];
					//geoPoints.push({gX:x,gY:y});
					//old = {oldX: x, oldY: y}; 
					
				}
				//context.stroke();
				context.fill();
						for( var i = 1; i< geoPoints.length; i++){
					dx = geoPoints[i].gX-geoPoints[geoPoints.length-1].gX;
					dy = geoPoints[i].gY-geoPoints[geoPoints.length-1].gY;
					d = dx *dx + dy * dy;
					
				
					if (d</*1000*/ 500* Number(thickness) /*&& Math.random() > 0.9*/) {
					//	console.log("np");
						context.beginPath();
				/*if(Number(thickness) < 10){
				context.lineWidth = Number(thickness) * .8;}
				else{
				context.lineWidth =Number(thickness)*.4;}*/
				//context.strokeStyle = 'rgba(0,0,0,.3)';
				//context.globalAlpha = alpha* .1;
						context.lineWidth = Number(thickness) * 0.3;
						if(fillColor != "transparent") {context.strokeStyle = fillColor;}
						context.moveTo(geoPoints[geoPoints.length -1].gX /*+ (dx*.2)*/,geoPoints[geoPoints.length -1].gY /*+ (dy*.2)*/);
						context.lineTo(geoPoints[i].gX /*- (dx*.2)*/, geoPoints[i].gY /*- (dy*.2)*/);
						context.stroke();
						//sgPoints.push({sgX:geoPoints[geoPoints.length -1].gX ,sgY:geoPoints[geoPoints.length -1].gY});
						//sgPoints.push({sgX:geoPoints[i].gX, sgY:geoPoints[i].gY});
						
						for(var j = 1; j< sgPoints.length; j++){
							dsgx = sgPoints[j].sgX-sgPoints[sgPoints.length-1].sgX;
							dsgy = sgPoints[j].sgY-sgPoints[sgPoints.length-1].sgY;
							d2 = dsgx *dsgx + dsgy * dsgy;
						if (d2</*1000*/ 1000* Number(thickness) && Math.random() > 0.9){
							context.lineWidth = Number(thickness) * 0.3;
							context.globalAlpha = alpha* .4;
						if(fillColor != 'transparent') {context.strokeStyle = fillColor;}
						context.moveTo(sgPoints[sgPoints.length -1].sgX + (dsgx*.2),sgPoints[sgPoints.length -1].sgY + (dsgy*.2));
						context.lineTo(geoPoints[i].gX - (dsgx*.2), geoPoints[i].gY - (dsgy*.2));
						context.stroke();
						}
					}
					}
				}
				context.strokeStyle = strokeColor;
		context.fillStyle = fillColor;
		}	else if (brushSelect == "NP1"){
			//cPush();
			context.lineCap = 'round';
			context.lineJoin = 'round';
			bzPoints.push({bzX:x,bzY:y});
			//var p1 = bzPoints[0];
		//	var p2 = bzPoints[1];
			//console.log(bzPoints);
			/*context.beginPath();
			context.moveTo(p1.bzX, p1.bzY);*/
			//console.log(bzPoints);
			context.strokeStyle = strokeColor;
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
					//console.log("np");
					if(fillColor != 'transparent') {context.strokeStyle = fillColor;}
				context.beginPath();
				if(Number(thickness) < 10){
				context.lineWidth = Number(thickness) * 0.8;}
				else{
				context.lineWidth =Number(thickness)*0.4;}
				//context.strokeStyle = 'rgba(0,0,0,0.3)';
				//context.shadowBlur = 20;
				//context.shadowColor= strokeColor;
				//context.shadowOffsetY = 20;
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
		context.strokeStyle = strokeColor;
	} else if (brushSelect == "NP2"){
		//cPush();
		context.lineCap = 'round';
			context.lineJoin = 'round';
			bzPoints.push({bzX:x,bzY:y});
		context.beginPath();
			context.globalAlpha = alpha* 0.5;
			context.strokeStyle = strokeColor;
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
					//console.log("np");
				context.beginPath();
				/*if(Number(thickness) < 10){
				context.lineWidth = Number(thickness) * .8;}
				else{
				context.lineWidth =Number(thickness)*.4;}*/
				//context.strokeStyle = 'rgba(0,0,0,.3)';
				//context.globalAlpha = alpha* .1;
				context.lineWidth = Number(thickness) * 0.3;
				if(fillColor != 'transparent') {context.strokeStyle = fillColor;}
				context.moveTo(bzPoints[bzPoints.length -1].bzX /*+ (dx*.2)*/,bzPoints[bzPoints.length -1].bzY /*+ (dy*.2)*/);
				context.lineTo(bzPoints[i].bzX /*- (dx*.2)*/, bzPoints[i].bzY /*- (dy*.2)*/);
				context.stroke();
				}
	}
	//cPush();
	context.strokeStyle = strokeColor;
	context.fillStyle = fillColor;
	} else if (brushSelect == "feather"){
		//cPush();
		context.lineCap = 'round';
			context.lineJoin = 'round';
			bzPoints.push({bzX:x,bzY:y});
		context.beginPath();
			context.globalAlpha = alpha* 0.2;
			context.strokeStyle = strokeColor;
			context.moveTo(bzPoints[bzPoints.length-2].bzX,bzPoints[bzPoints.length-2].bzY);
			context.lineWidth = (Math.floor(Number(thickness)/20))+1;
			context.lineTo(bzPoints[bzPoints.length-1].bzX,bzPoints[bzPoints.length-1].bzY);
			context.stroke();
			//context.globalAlpha = alpha*0.1;
			if (bzPoints.length>80){len = bzPoints.length -50;bzPoints.splice(0,len);}
			for( var i = 1; i< bzPoints.length; i++){
				dx = bzPoints[i].bzX-bzPoints[bzPoints.length-1].bzX;
				dy = bzPoints[i].bzY-bzPoints[bzPoints.length-1].bzY;
				d = dx *dx + dy * dy;
				
				if (d<2000 /*&& d > Number(thickness)*5*/ && Math.random() > d/2000) {
					//console.log("np");
				context.beginPath();
				/*if(Number(thickness) < 10){
				context.lineWidth = Number(thickness) * .8;}
				else{
				context.lineWidth =Number(thickness)*.4;}*/
				//context.strokeStyle = 'rgba(0,0,0,.3)';
				//context.globalAlpha = alpha* .1;
				//context.lineWidth = Number(thickness) * 0.3;
				if(fillColor != 'transparent') {context.strokeStyle = fillColor;}
				context.moveTo(bzPoints[bzPoints.length -1].bzX /*+ (dx*.2)*/,bzPoints[bzPoints.length -1].bzY /*+ (dy*.2)*/);
				context.lineTo(bzPoints[bzPoints.length -1].bzX - (dx * (Number(thickness)/10))+Math.random() * 5/*- (dx*.2)*/, bzPoints[bzPoints.length -1].bzY - (dy * (Number(thickness)/10))+Math.random() * 5/*- (dy*.2)*/);
				context.lineWidth = 1;
				context.stroke();
				}
	}
	//cPush();
	context.strokeStyle = strokeColor;
	context.fillStyle = fillColor;
	} else if (brushSelect == "eraser"){
		context.clearRect(x,y,Number(thickness), Number(thickness));
		if (disableTrans){ context.globalAlpha=1;
			context.fillStyle = 'white';
			context.fillRect(x,y,Number(thickness), Number(thickness));}
		reloadBackground(x,y,Number(thickness), Number(thickness));
		context.strokeStyle = strokeColor;
		context.fillStyle = fillColor;
		//drawDot(context, x,y);
	/*	context.closePath();
		context.lineCap = 'round';
		context.lineJoin = 'round';
		bzPoints.push({bzX:x,bzY:y});
		var p1 = bzPoints[0];
		var p2 = bzPoints[1];
		context.beginPath();
		context.moveTo(p1.bzX, p1.bzY);
		
		for( var i = 1; i< bzPoints.length; i++){
				
				var midPoint = midPointBtw(p1,p2);
				//if (bzPoints[i].bzY > bzPoints[i-1].bzY /*&& context.lineWidth <(Number(thickness))*2*///){ context.lineWidth /*++*/ /*while (context.lineWidth <= (Number(thickness))*2) {context.lineWidth += .002;}}*/=(Number(thickness))*1.6;}
				//else {context.lineWidth = Number(thickness);}
			//	lineWidth = Number(thickness);
		//		context.quadraticCurveTo(p1.bzX,p1.bzY,midPoint.bzX,midPoint.bzY);
			//context.stroke();
			//	p1 = bzPoints[i];
		//		p2 = bzPoints[i+1];
			
				//context.stroke();
			//	}
		//	for(var j=0;  j < backgroundLayers.length; j++){
	//for(let value of backgroundLayers){
	//backgroundLayers.forEach(function(value){
		//console.log(backgroundLayers);
		//var colorLayer = backgroundLayers.shift();
		//var alphaLayer = backgroundAlphaLayers.shift();
	/*	var colorLayer = backgroundLayers[j];
		var alphaLayer = backgroundAlphaLayers[j];
		context.globalAlpha = alphaLayer;
		context.strokeStyle = colorLayer;
		//context.beginPath();
		context.lineTo(p1.bzX, p1.bzY);
			context.stroke();
       // context.arc(x, y, Number(thickness), 0, Math.PI*2, true); 
       // context.closePath();
       // context.fill();
		//context.fillRect(x,y,w,h);
		
	}context.globalAlpha = alpha;
		*/	
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
   // cPush();
	document.querySelector('#opacity').value = OS;
    alpha = Number((document.querySelector('#opacity').value))/10;
	    console.log(alpha);
}
function strokeWidthSlider(SWS) {
    document.querySelector('#lineThickness').value = SWS;
    thickness = document.querySelector('#lineThickness').value;
	if(brushSelect == "scatCirc" || "scatRect" || "lBrush" || "cHatch"){dashThickness = 5;} else{dashThickness = Number(thickness);}
	if(dashset){makeDashed();}
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
function getClear(){
	if(customCanvas){
		brushContext.clearRect(0,0,160,160);
		bPush();
	}else{
	var chooseClear = confirm('Are you sure you wish to completely clear the canvas of art (background will remain)?');
	if(chooseClear){clearPage();}
	}
}

function getCustom(){
	var checkCust = document.getElementById("bmodal").checked;
	if (checkCust){customCanvas = true;} else {customCanvas = false;}
}

function getScat(){
	var checkScat = document.getElementById("scat").checked;
	if (checkScat){scatter = true;} else {scatter = false;}
	console.log("scatter",scatter)
}
function getRot(){
	var checkRot = document.getElementById("rot").checked;
	if (checkRot){rotateBrush = true;} else {rotateBrush = false;}
	console.log("rotate",rotateBrush)
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
		console.log("disdis");
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
		backgroundColor = 'transparent';
		//backgroundLayers[0] = 'transparent';
		//backgroundAlphaLayers[0] = 0;
		
		//clearTrans();
		$('#eTrans').css("background-color:", "azure;" );
		$('#dTrans').css("background-color:", "aliceblue;" );
		enableTrans = true;
		disableTrans = false;
		pencilDraw = true;
		clearPage();
		//cPush();
		if(customCanvas){bPush();}else{cPush();}
		console.log("en",enableTrans,disableTrans);
//	}// else {document.getElementById(transCheck).checked = false;}
}
function disableTranparency(){
	//disableTrans = confirm('Changing transparency settings will erase existing artwork. Do you wish to proceed?');
	//if(disableTrans){
		backgroundAlphaLayers.length = 0;
		backgroundLayers.length = 0;
		//backgroundLayers[0] = 'white';
		//backgroundAlphaLayers[0] = 1;
		backgroundColor = 'white';
		
		$('#dTrans').css("background-color:", "azure;" );
		$('#eTrans').css("background-color:", "aliceblue;" );
		disableTrans = true;
		enableTrans = false;
		pencilDraw = true;
		clearPage();
		//cPush();
		if(customCanvas){bPush();}else{cPush();}
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
		if(customCanvas){
		brushContext.fillStyle=color;
		brushContext.globalAlpha = alpha;
		brushContext.fillRect(0,0,160, 160);
		console.log("custback");
		brushContext.fillStyle=fillColor;
		
		}else{var zcolor = lastColor;
		xalpha = alpha;
		context.globalAlpha = alpha;
		backgroundAlphaLayers.push(alpha);
		
		backgroundColor = color;
		backgroundLayers.push(backgroundColor);
		if(!eyeDrop){globalAlpha = alpha;}
		context.fillStyle = backgroundColor;
		lastTool = 'background';
		console.log(backgroundLayers, backgroundAlphaLayers);
		context.fillRect(0,0,context.canvas.width, context.canvas.height);
		
		if(customCanvas){bPush();}else{cPush();}
		changeBackground = false;
		context.fillStyle = fillColor;}
//lastTool = 'background';}
}
	else if (fillChange){
		fillColor = color;
		context.closePath();
		context.beginPath();
	//context.strokeStyle = color;
		context.fillStyle = color;
		brushContext.fillStyle = color;
	/*var borderColor = 'aliceblue';
	if (color == 'white' || color == 'yellow') {
		borderColor = 'azure';
	} */
	//$('#' + lastColor).css("box-shadow", "3px 3px 5px #0ff");
	//$('#' + lastColor).css("border", "0px solid white");
	//$('#' + color).css("box-shadow", "2px 2px 5px #0ff");// + borderColor);
	//$('#' + color).css("border-top", "3px solid " + borderColor); /*+ "; border-style: " , "solid none none none;"*/
	if (fillColor == "transparent"){
		$('#showColor').css("background",'white');
		$('#showColor').text('\u00D7');
	} else {
	$('#showColor').css("background",color);
	$('#showColor').text("");}
	lastColor = color;
	}else if (strokeChange){
		strokeColor = color;
		context.closePath();
		context.beginPath();
		context.strokeStyle = color;
		brushContext.strokeStyle = color;
		if (strokeColor == "transparent"){
			$('#showColor').css("border","2px dashed red");
		}
		else {
		$('#showColor').css("border","4px solid " + color);}
	}
}
function eyeDropper(ctx,xe,ye){
	/*if(customCanvas){
		colorEyeData = ctx.getImageData(xe,ye,1,1);
	} else {*/
	colorEyeData = ctx.getImageData(xe,ye,1,1);//}
	//colorEyeDotData = 
	eyeRGBA = 'rgba('+ colorEyeData.data[0] + ',' + colorEyeData.data[1] + ',' + colorEyeData.data[2] + ',' +	colorEyeData.data[3] + ')';
	//eyeDrop = false;
	console.log(eyeRGBA);
	if(otherTools == "floodTool"){
		startR = colorEyeData.data[0];
		startG = colorEyeData.data[1];
		startB = colorEyeData.data[2];
		startA = colorEyeData.data[3];
		return;
	}
	onColorClick(eyeRGBA);
	eyeDrop = false;
}
function getFillRGBA(){
	//---for transparent layering--
	//if(customCanvas){tempContext.fillStyle = eyeRGBA;
	//tempContext.fillRect(0,0,1,1);tempContext.globalAlpha = alpha;}
	tempContext.fillStyle = fillColor;
	//
	tempContext.fillRect(0,0,1,1);
	fillRGBA= tempContext.getImageData(0,0,1,1).data;
	tempContext.clearRect(0,0,1,1);
	tempContext.globalAlpha = 1;
	//return fillRGBA;
}

/*function matchStartColor(pixelPos/*, startR,startG,startB,startA*///){
	//var r = colorLayerDotData[pixelPos];
//	var g = colorLayerDotData[pixelPos+1];
//	var b = colorLayerDotData[pixelPos+2];
//	var a = colorLayerDotData[pixelPos+3];
	//getFillRGBA();
	/*if(r === startR && g === startG && b === startB && a === startA){return true;	}
	getFillRGBA();
	if(r === fillRGBA.data[0] && g === fillRGBA.data[1] && b === fillRGBA.data[2] && a === fillRGBA.data[3]){return false;	}
	return true;*/
	//console.log(r,g,b,a,startR,startG,startB,startA);
	//console.log(pixelPos);
	//return(r == startR && g == startG && b == startB && a == startA)
//}
//function colorPixel (pixelPos/*,r,g,b,a*/){
//	colorLayerDotData[pixelPos] = fillRGBA/*.data*/[0];//r;
//	colorLayerDotData[pixelPos+1] = fillRGBA/*.data*/[1];//g;
//	colorLayerDotData[pixelPos+2] = fillRGBA/*.data*/[2];//b;
//	colorLayerDotData[pixelPos+3] = fillRGBA/*.data*/[3];//a;
	
//}
function floodFill(startX,startY,startR,startG,startB,startA){
	var newPos;
	var floodX, floodY;
	var pixelPos;
	var reachLeft;
	var reachRight;
	var pixelStack = [[startX,startY]];
	//var pixelStack = [];
	//pixelStack.push({pxX:startX,pxY:startY});
	//pixelStack.push(startX);
	//pixelStack.push(startY);
	
	while(pixelStack.length){
		//console.log("while1");
		newPos = pixelStack.pop();
		floodX = newPos[0];
		floodY = newPos[1];
		//floodX = pixelStack[0];
		//floodY = pixelStack[1];
		//console.log(newPos,pixelStack,floodX,floodY,startX,startY);
		pixelPos = (floodY *canvasWidth +floodX)*4;
		
		while (floodY>= 0 && startR == colorLayerDotData[pixelPos] && startG == colorLayerDotData[pixelPos+1] && startB == colorLayerDotData[pixelPos+2] && startA == colorLayerDotData[pixelPos+3] /*matchStartColor(pixelPos/*,startR,startG,startB,startA*//*)*/){
			//console.log("while2");
			floodY -= 1;
			pixelPos -= canvasWidth*4;
			
		}
		pixelPos += canvasWidth *4;
		floodY+=1;
		reachLeft = false;
		reachRight = false;
		
		while(floodY <= canvasHeight -1 && startR == colorLayerDotData[pixelPos] && startG == colorLayerDotData[pixelPos+1] && startB == colorLayerDotData[pixelPos+2] && startA == colorLayerDotData[pixelPos+3]/*matchStartColor(pixelPos/*,startR,startG,startB,startA*//*)*/){
		//	console.log("while3");
			floodY+=1;
			//colorPixel(pixelPos/*,fillRGBA.data[0],fillRGBA.data[1],fillRGBA.data[2],fillRGBA.data[3]*/);
		/*	colorLayerDotData[pixelPos] = fillRGBA/*.data*/[0];//r;
	//colorLayerDotData[pixelPos+1] = fillRGBA/*.data*/[1];//g;
//	colorLayerDotData[pixelPos+2] = fillRGBA/*.data*/[2];//b;
	//colorLayerDotData[pixelPos+3] = fillRGBA/*.data*/[3];//a;
			if (floodX > 0){
				if(startR == colorLayerDotData[pixelPos-4] && startG == colorLayerDotData[pixelPos-3] && startB == colorLayerDotData[pixelPos-2] && startA == colorLayerDotData[pixelPos-1]/*matchStartColor(pixelPos-4/*, startR,startG,startB,startA*//*)*/){
					if(!reachLeft){
						//pixelStack.push({pxX:floodX -1, pxY:floodY});
						var floodminus = floodX-1;
						pixelStack.push([floodminus,floodY]);
						reachLeft = true; 
						//console.log("while3if3",reachLeft);
					}
				}else if(reachLeft){
						reachLeft = false;
					}
				//}
			}	
			if(floodX< canvasWidth -1){
			//	console.log("if1");
			if(startR == colorLayerDotData[pixelPos+4] && startG == colorLayerDotData[pixelPos+5] && startB == colorLayerDotData[pixelPos+6] && startA == colorLayerDotData[pixelPos+7]/*matchStartColor(pixelPos+4/*, startR,startG,startB,startA*//*)*/){
				//console.log("if2");
				if(!reachRight){
					var floodplus = floodX + 1;
					pixelStack.push([floodplus,floodY]);
					//pixelStack.push({pxX:floodX +1, pxY:floodY});
						reachRight = true;
						//console.log("while3if6",reachRight);
				}
			}else if(reachRight){
					reachRight = false;
				//}
			}
			//pixelPos += canvasWidth * 4;
			//}
			}	
			//}
			//colorPixel(pixelPos);
			colorLayerDotData[pixelPos] = fillRGBA[0];
	colorLayerDotData[pixelPos+1] = fillRGBA[1];
	colorLayerDotData[pixelPos+2] = fillRGBA[2];
	colorLayerDotData[pixelPos+3] = fillRGBA[3];
			tempColorLayerDotData[pixelPos] = fillRGBA[0];
	tempColorLayerDotData[pixelPos+1] = fillRGBA[1];
	tempColorLayerDotData[pixelPos+2] = fillRGBA[2];
	tempColorLayerDotData[pixelPos+3] = fillRGBA[3];
			pixelPos += canvasWidth * 4;
			
		}//console.log("l",reachLeft,"r",reachRight);
	}
	
}

function floodFillCustom(startX,startY,startR,startG,startB,startA){
	var newPos;
	var floodX, floodY;
	var pixelPos;
	var reachLeft;
	var reachRight;
	var pixelStack = [[startX,startY]];
	
	
	while(pixelStack.length){
		
		newPos = pixelStack.pop();
		floodX = newPos[0];
		floodY = newPos[1];
		
		pixelPos = (floodY *160 +floodX)*4;
		
		while (floodY>= 0 && startR == brushColorLayerDotData[pixelPos] && startG == brushColorLayerDotData[pixelPos+1] && startB == brushColorLayerDotData[pixelPos+2] && startA == brushColorLayerDotData[pixelPos+3] /*matchStartColor(pixelPos/*,startR,startG,startB,startA*//*)*/){
			
			floodY -= 1;
			pixelPos -= 160*4;
			
		}
		pixelPos += 160 *4;
		floodY+=1;
		reachLeft = false;
		reachRight = false;
		
		while(floodY <= 159 && startR == brushColorLayerDotData[pixelPos] && startG == brushColorLayerDotData[pixelPos+1] && startB == brushColorLayerDotData[pixelPos+2] && startA == brushColorLayerDotData[pixelPos+3]/*matchStartColor(pixelPos/*,startR,startG,startB,startA*//*)*/){
		
			floodY+=1;
			
			if (floodX > 0){
				if(startR == brushColorLayerDotData[pixelPos-4] && startG == brushColorLayerDotData[pixelPos-3] && startB == brushColorLayerDotData[pixelPos-2] && startA == brushColorLayerDotData[pixelPos-1]/*matchStartColor(pixelPos-4/*, startR,startG,startB,startA*//*)*/){
					if(!reachLeft){
						
						var floodminus = floodX-1;
						pixelStack.push([floodminus,floodY]);
						reachLeft = true; 
						
					}
				}else if(reachLeft){
						reachLeft = false;
					}
			
			}	
			if(floodX< 159){
		
			if(startR == brushColorLayerDotData[pixelPos+4] && startG == brushColorLayerDotData[pixelPos+5] && startB == brushColorLayerDotData[pixelPos+6] && startA == brushColorLayerDotData[pixelPos+7]/*matchStartColor(pixelPos+4/*, startR,startG,startB,startA*//*)*/){
				
				if(!reachRight){
					var floodplus = floodX + 1;
					pixelStack.push([floodplus,floodY]);
					
						reachRight = true;
					
				}
			}else if(reachRight){
					reachRight = false;
				
			}
		
			}	
		
			brushColorLayerDotData[pixelPos] = fillRGBA[0];
	brushColorLayerDotData[pixelPos+1] = fillRGBA[1];
	brushColorLayerDotData[pixelPos+2] = fillRGBA[2];
	brushColorLayerDotData[pixelPos+3] = fillRGBA[3];
			brushTempColorLayerDotData[pixelPos] = fillRGBA[0];
	brushTempColorLayerDotData[pixelPos+1] = fillRGBA[1];
	brushTempColorLayerDotData[pixelPos+2] = fillRGBA[2];
	brushTempColorLayerDotData[pixelPos+3] = fillRGBA[3];
			pixelPos += 160 * 4;
			
		}//console.log("l",reachLeft,"r",reachRight);
	}
	
}
function paintAt(startX,startY){
	
	if(customCanvas){
		var pixelPos = (startY* 160 +startX)*4;
		var r = brushColorLayerDotData[pixelPos];
	var g = brushColorLayerDotData[pixelPos+1];
	var b = brushColorLayerDotData[pixelPos+2];
	var a = brushColorLayerDotData[pixelPos+3];
	getFillRGBA();
	if(r === fillRGBA/*.data*/[0] && g === fillRGBA/*.data*/[1] && b === fillRGBA/*.data*/[2] && a === fillRGBA/*.data*/[3]){return}	
	floodFillCustom(startX,startY,r,g,b,a);	
	redrawCustom();
	}else{
	var pixelPos = (startY* canvasWidth +startX)*4;
	var r = colorLayerDotData[pixelPos];
	var g = colorLayerDotData[pixelPos+1];
	var b = colorLayerDotData[pixelPos+2];
	var a = colorLayerDotData[pixelPos+3];
	getFillRGBA();
	if(r === fillRGBA/*.data*/[0] && g === fillRGBA/*.data*/[1] && b === fillRGBA/*.data*/[2] && a === fillRGBA/*.data*/[3]){return}
	//console.log(fillRGBA/*.data*/);
	floodFill(startX,startY,r,g,b,a);
	//console.log("ff",startX,startY,r,g,b,a);
	redrawColor();}
}
function redrawColor (){
	tempContext.putImageData(tempColorLayerData, 0,0);
	/*works! context.clearRect(0,0,canvasWidth,canvasHeight)
	context.putImageData(colorLayerData, 0,0);*/
	context.globalAlpha = alpha;
	context.drawImage(canvas2,0,0);
	tempContext.clearRect(0,0,canvasWidth, canvasHeight)
}
function redrawCustom(){
	//brushContext.putImageData(brushColorLayerData, 0,0);
	brushTempContext.putImageData(brushTempColorLayerData, 0,0);
	/*works! context.clearRect(0,0,canvasWidth,canvasHeight)
	context.putImageData(colorLayerData, 0,0);*/
	brushContext.globalAlpha = alpha;
	brushContext.drawImage(canvas4,0,0);
	brushTempContext.clearRect(0,0,160, 160);
	//bPush();
}
function reloadBackground(x,y,w,h){
	//var xalpha = alpha;
	//var ycolor = lastColor;
	if(disableTrans){context.globalAlpha = 1; context.fillStyle = "white";context.fillRect(x,y,w,h);}
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
	context.fillStyle = fillColor;
	context.globalAlpha = alpha;
}
function onClick(ev) {
//cPush();
//console.log( this ); // in a eventListener , this point to the element fire the event
   // console.log( ev.target );
if(selectX != null){document.getElementById("transformBtn").disabled = false;$('#transformBtn').css("color", "darkblue"); $('#paste').css("color", "darkblue");$('#crop').css("color", "darkblue");
}else if (selectX == null){document.getElementById("transformBtn").disabled = true;$('#transformBtn').css("color", "lightblue"); $('#paste').css("color", "lightblue");$('#crop').css("color", "lightblue");}
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
	if(customCanvas){old = {oldX: x1-brushOffsetX,oldY: y1-brushOffsetY};}else{
	old = {oldX: x1,oldY: y1};}
		
	if(customCanvas){
		xf = x1-brushOffsetX;
	yf = y1-brushOffsetY;
	}else{			
	xf = x1;
	yf = y1;}
	
	if (eyeDrop){if(customCanvas){eyeDropper(brushContext,x1-brushOffsetX,y1-brushOffsetY)} else {eyeDropper(context,x1,y1)}}
	if (brushSelect == "fountainPen" || "NP1" || "NP2"||"pen5"){if(customCanvas){bzPoints.push({bzX:x1-brushOffsetX,bzY:y1-brushOffsetY});}else{bzPoints.push({bzX:x1,bzY:y1});}}
	if (brushSelect == "pen7" || "geo3"){if(customCanvas){geoPoints.push({gX:x1-brushOffsetX,gY:y1-brushOffsetY});}else{geoPoints.push({gX:x1,gY:y1});}}
	
		if(tempSelect == "line2" || "rect2"||"circ2"||"draw2"||"copy2"|| "select"){
		if(customCanvas){tempTools(brushTempContext,old.oldX,old.oldY);}else{tempTools(tempContext,old.oldX,old.oldY);}
	}
	
	xSelOffset = x1 - drawX;
	ySelOffset = y1 - drawY;
	if(otherTools == "floodTool"){ 
	if(customCanvas){
		eyeDropper(brushContext,x1-brushOffsetX,y1-brushOffsetY);
		brushColorLayerData = brushContext.getImageData(0, 0, 160, 160);
		brushColorLayerDotData = brushColorLayerData.data;
		brushTempColorLayerData = brushTempContext.getImageData(0, 0, 160, 160);
		brushTempColorLayerDotData = brushTempColorLayerData.data;
		paintAt(x1-brushOffsetX,y1-brushOffsetY);
		} else{eyeDropper(context,x1,y1);
		
	colorLayerData = context.getImageData(0, 0, canvasWidth, canvasHeight)/*.data*/;
	colorLayerDotData = colorLayerData.data;
	tempColorLayerData = tempContext.getImageData(0, 0, canvasWidth, canvasHeight);
	tempColorLayerDotData = tempColorLayerData.data;
	
	paintAt(x1,y1);}}
	if(customCanvas){if(tempSelect == "noTemp" || "tempDel"|| "draw2"){brushTempContext.clearRect(0,0,canvas4.width,canvas4.height);}}else{
	if (tempSelect == "noTemp" || "tempDel" || "draw2"){tempContext.clearRect(0,0,canvas2.width,canvas2.height);}}
	//if/*(selectX < x1 +1&&selectX +selectWidth>x && selectY < y1 +1 &&selectY + selectHeight > y2 )*/ (old.oldX > drawX && old.oldX <= drawX+selectWidth && old.oldY > drawY && old.oldY < drawY+selectHeight && tempSelect == "tempCopy" ){
	//	enableDrag = true;
	//	enableSelect = false;

		//tempDragTool(tempContext, x,y);
//	} else {enableDrag = false;}
	//if(enableDrag){tempContext.clearRect(0,0,canvas2.width,canvas2.height);}
if (selectX != null){
	//enableDrag = false;
	if( old.oldX > drawX && old.oldX <= drawX+selectWidth && old.oldY > drawY && old.oldY < drawY+selectHeight){
		console.log(lastTool,"lasttool");
		if(/*lastTool != "tempCopy"&& */tempSelect != "tempCopy" /*&& tempSelect != "tempPaste"*/ &&tempSelect != "tempDel"){
			tempSelect = "tempMove";
			if(tempSelect == "tempMove" /* &&lastTool != "tempCopy"&& lastTool != "tempPaste"*/&& selectX == drawX && selectY == drawY){
			if(customCanvas){brushContext.clearRect(selectX,selectY,selectWidth,selectHeight);tempDragTool ( brushTempContext,x,y);}else {context.clearRect(selectX,selectY,selectWidth,selectHeight); reloadBackground(selectX,selectY,selectWidth,selectHeight); tempDragTool(tempContext,x,y);}
		}}
		enableDrag = true;
		
		enableSelect = false;
		console.log(enableDrag);
		
} else {
	//if(tempSelect != "tempTrans"){
	if(tempSelect == "tempMove"|| tempSelect == "tempTrans"){tempSelect = "tempSel";}
	if(customCanvas){brushTempContext.clearRect(0,0,canvas4.width,canvas4.height);
		//tempContext.drawImage(canvas,selectX,selectY, selectWidth,selectHeight,x2/* - Math.abs(x-selectX)*/,y2 /*- Math.abs(y-selectY)*/,selectWidth,selectHeight);
		if(tempImgData != null ){brushTempContext.putImageData(tempImgData, drawX,drawY/*-xSelOffset,y1-ySelOffset*/);}
		brushContext.globalAlpha = alpha;
		if(tempSelect != "tempDel"){brushContext.drawImage(canvas4,drawX,drawY/*-xSelOffset,y1-ySelOffset*/, selectWidth,selectHeight,drawX,drawY/*-xSelOffset/* - Math.abs(x-selectX)*//*,y1-ySelOffset /*- Math.abs(y-selectY)*/,selectWidth,selectHeight);}
		brushTempContext.clearRect(0,0,canvas4.width,canvas4.height);
		tempImgData = null;
		selectX = null;
		//selectPush = true;
		//tempContext.clearRect(0,0,canvas2.width,canvas2.height);
	//	drawX = x2-xSelOffset;
		//drawY = y2-ySelOffset;
		}else
		{tempContext.clearRect(0,0,canvas2.width,canvas2.height);
		//tempContext.drawImage(canvas,selectX,selectY, selectWidth,selectHeight,x2/* - Math.abs(x-selectX)*/,y2 /*- Math.abs(y-selectY)*/,selectWidth,selectHeight);
		if(tempImgData != null){tempContext.putImageData(tempImgData, drawX,drawY/*-xSelOffset,old.oldY-ySelOffset*/);}
		context.globalAlpha = alpha;
		if(tempSelect != "tempDel"){context.drawImage(canvas2,drawX,drawY/*-xSelOffset,y1-ySelOffset*/, selectWidth,selectHeight,drawX,drawY/*-xSelOffset/* - Math.abs(x-selectX)*//*,y1-ySelOffset /*- Math.abs(y-selectY)*/,selectWidth,selectHeight);}
		tempContext.clearRect(0,0,canvas2.width,canvas2.height);
		tempImgData = null;
		selectX = null;
		//selectPush = true;
		//drawX = x2-xSelOffset;
		//drawY = y2-ySelOffset;
}
//}
}
}
	return x1,y1;
}
function onMouseDown2(e) {
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
	/*console.log("yo",x1,y1);
	if (brushSelect == "fountainPen" || "NP1" || "NP2"){bzPoints.push({bzX:x1,bzY:y1});}
	if (brushSelect == "pen7"){geoPoints.push({gX:x1,gY:y1});}
	old = {oldX: x1,oldY: y1};
	return x1,y1;*/
	
	onMouseDown(context,x1,y1);
}
function onTouchStart(e){
	//brushSlider.classList.remove("active"); 
//	shapeSlider.classList.remove("active");
	getTouchCoords(e);
	//enableDraw = true;
	console.log("enableDraws",enableDraw);
	/*if (!e) var e = window.event;
	if(e.touches){
	if(e.touches.length == 1){
		var touch = lastMove.touches[0];
		x1 = touch.pageX - touch.target.offsetLeft;
		y1 = touch.pageY - touch.target.offsetTop;
	}*?
} //return x1,y1
	
	x1 = 
	console.log("enableDraws",enableDraw,x1,y1);*/
	
	/*if (brushSelect == "noBrush"){
		selectTool(context, x1,y1);
	} else {*/
	x1 = x;
	y1 = y;
/*	old = {oldX: x1,oldY: y1};
	if (eyeDrop){eyeDropper(context,x1,y1)}
	if (brushSelect == "fountainPen" || "NP1" || "NP2"){bzPoints.push({bzX:x1,bzY:y1});}
	if (brushSelect == "pen7"){geoPoints.push({gX:x1,gY:y1});}
	selectBrush(context, x1,y1);
	//selectTool(context, x1,y1);
	//drawDot(context,x,y,12);
	
	
	//event.preventDefault();
	console.log(x1,y1);*/
	lastMove = e;
	console.log(lastMove,"s");
		/*if(tempSelect == "line2" || "rect2"||"circ2"||"draw2"||"tempCopy"){
		tempTools(tempContext,old.oldX,old.oldY);
	}*/
	//xSelOffset = x1 - drawX;
	//ySelOffset = y1 - drawY;
	/*if (tempSelect == "noTemp" || "tempDel"){tempContext.clearRect(0,0,canvas2.width,canvas2.height);}*/
	//if/*(selectX < x1 +1&&selectX +selectWidth>x && selectY < y1 +1 &&selectY + selectHeight > y2 )*/ (x1 > drawX && x1 <= drawX+selectWidth && y1 > drawY && y1 < drawY+selectHeight && tempSelect == "tempCopy"){
	//	enableDrag = true;
	//	enableSelect = false;
		//tempDragTool(tempContext, x,y);
//	} else {enableDrag = false;}
	if(customCanvas){old = {oldX: x1-brushOffsetX-brushTouchOffsetX,oldY: y1-brushOffsetY-brushTouchOffsetY};}else{
	old = {oldX: x1,oldY: y1};}
	console.log("old",old.oldX, old.oldY,x1,y1,x,y);
		
	if(customCanvas){
		xf = x1-brushOffsetX-brushTouchOffsetX;
	yf = y1-brushOffsetY-brushTouchOffsetY;
	}else{			
	xf = x1;
	yf = y1;}
	
	if (eyeDrop){if(customCanvas){eyeDropper(brushContext,x1-brushOffsetX-brushTouchOffsetX,y1-brushOffsetY-brushTouchOffsetY)} else {eyeDropper(context,x1,y1)}}
	if (brushSelect == "fountainPen" || "NP1" || "NP2"||"pen5"){if(customCanvas){bzPoints.push({bzX:x1-brushOffsetX-brushTouchOffsetX,bzY:y1-brushOffsetY-brushTouchOffsetY});}else{bzPoints.push({bzX:x1,bzY:y1});}}
	if (brushSelect == "pen7" || "geo3"){if(customCanvas){geoPoints.push({gX:x1-brushOffsetX-brushTouchOffsetX,gY:y1-brushOffsetY-brushTouchOffsetY});}else{geoPoints.push({gX:x1,gY:y1});}}
	
		if(tempSelect == "line2" || "rect2"||"circ2"||"draw2"||"copy2"|| "tempSel"){
		if(customCanvas){tempTools(brushTempContext,old.oldX,old.oldY);}else{tempTools(tempContext,old.oldX,old.oldY);}
	}
	
	xSelOffset = x1 - drawX;
	ySelOffset = y1 - drawY;
	if(otherTools == "floodTool"){ 
	if(customCanvas){
		eyeDropper(brushContext,x1-brushOffsetX-brushTouchOffsetX,y1-brushOffsetY-brushTouchOffsetY);
		brushColorLayerData = brushContext.getImageData(0, 0, 160, 160);
		brushColorLayerDotData = brushColorLayerData.data;
		brushTempColorLayerData = brushTempContext.getImageData(0, 0, 160, 160);
		brushTempColorLayerDotData = brushTempColorLayerData.data;
		paintAt(x1-brushOffsetX,y1-brushOffsetY);
		} else{eyeDropper(context,x1,y1);
		
	colorLayerData = context.getImageData(0, 0, canvasWidth, canvasHeight)/*.data*/;
	colorLayerDotData = colorLayerData.data;
	tempColorLayerData = tempContext.getImageData(0, 0, canvasWidth, canvasHeight);
	tempColorLayerDotData = tempColorLayerData.data;
	
	paintAt(x1,y1);}}
	if(customCanvas){if(tempSelect == "noTemp" || "tempDel"||"draw2"){brushTempContext.clearRect(0,0,canvas4.width,canvas4.height);}}else{
	if (tempSelect == "noTemp" || "tempDel"||"draw2"){tempContext.clearRect(0,0,canvas2.width,canvas2.height);}}
	//if/*(selectX < x1 +1&&selectX +selectWidth>x && selectY < y1 +1 &&selectY + selectHeight > y2 )*/ (old.oldX > drawX && old.oldX <= drawX+selectWidth && old.oldY > drawY && old.oldY < drawY+selectHeight && tempSelect == "tempCopy" ){
	//	enableDrag = true;
	//	enableSelect = false;

		//tempDragTool(tempContext, x,y);
//	} else {enableDrag = false;}
	//if(enableDrag){tempContext.clearRect(0,0,canvas2.width,canvas2.height);}
if (selectX != null){
	//enableDrag = false;
	if( old.oldX > drawX && old.oldX <= drawX+selectWidth && old.oldY > drawY && old.oldY < drawY+selectHeight){
		console.log(lastTool,"lasttool");
		if(/*lastTool != "tempCopy"&& */tempSelect != "tempCopy" /*&& tempSelect != "tempPaste"*/ &&tempSelect != "tempDel"){
			tempSelect = "tempMove";
			if(tempSelect == "tempMove"/* &&lastTool != "tempCopy"&& lastTool != "tempPaste"*/&& selectX == drawX && selectY == drawY){
			if(customCanvas){brushContext.clearRect(selectX,selectY,selectWidth,selectHeight);tempDragTool ( brushTempContext,x,y);}else {context.clearRect(selectX,selectY,selectWidth,selectHeight); reloadBackground(selectX,selectY,selectWidth,selectHeight); tempDragTool(tempContext,x,y);}
		}}
		enableDrag = true;
		
		enableSelect = false;
		console.log(enableDrag);
		
} else {
	if(tempSelect != "tempTrans"){
	if(tempSelect == "tempMove"){tempSelect = "tempSel";}
	if(customCanvas){brushTempContext.clearRect(0,0,canvas4.width,canvas4.height);
		//tempContext.drawImage(canvas,selectX,selectY, selectWidth,selectHeight,x2/* - Math.abs(x-selectX)*/,y2 /*- Math.abs(y-selectY)*/,selectWidth,selectHeight);
		brushTempContext.putImageData(tempImgData, drawX,drawY/*-xSelOffset,y1-ySelOffset*/);
		brushContext.globalAlpha = alpha;
		if(tempSelect != "tempDel"){brushContext.drawImage(canvas4,drawX,drawY/*-xSelOffset,y1-ySelOffset*/, selectWidth,selectHeight,drawX,drawY/*-xSelOffset/* - Math.abs(x-selectX)*//*,y1-ySelOffset /*- Math.abs(y-selectY)*/,selectWidth,selectHeight);}
		brushTempContext.clearRect(0,0,canvas4.width,canvas4.height);
		tempImgData = null;
		selectX = null;
		//selectPush = true;
		//tempContext.clearRect(0,0,canvas2.width,canvas2.height);
	//	drawX = x2-xSelOffset;
		//drawY = y2-ySelOffset;
		}else
		{tempContext.clearRect(0,0,canvas2.width,canvas2.height);
		//tempContext.drawImage(canvas,selectX,selectY, selectWidth,selectHeight,x2/* - Math.abs(x-selectX)*/,y2 /*- Math.abs(y-selectY)*/,selectWidth,selectHeight);
		tempContext.putImageData(tempImgData, drawX,drawY/*-xSelOffset,old.oldY-ySelOffset*/);
		context.globalAlpha = alpha;
		if(tempSelect != "tempDel"){context.drawImage(canvas2,drawX,drawY/*-xSelOffset,y1-ySelOffset*/, selectWidth,selectHeight,drawX,drawY/*-xSelOffset/* - Math.abs(x-selectX)*//*,y1-ySelOffset /*- Math.abs(y-selectY)*/,selectWidth,selectHeight);}
		tempContext.clearRect(0,0,canvas2.width,canvas2.height);
		tempImgData = null;
		selectX = null;
		//selectPush = true;
		//drawX = x2-xSelOffset;
		//drawY = y2-ySelOffset;
}
}
}
	}

	return x1,y1;
}
function onTouchEnd(){
	//getTouchCoords();
	
	enableDraw = false; started = false;
	console.log("enableDrawe",enableDraw);
	/*if (!e) var e = window.event;
	if(e.touches){
	if(f.touches.length == 1){
		var touch = f.touches[0];
		x2 = touch.pageX - touch.target.offsetLeft;
		y2 = touch.pageY - touch.target.offsetTop;
	}
	}*/
		//var touch = lastMove;
		//x2 = lastMove.pageX - lastMove.target.offsetLeft;
	//	y2 = lastMove.pageY - lastMove.target.offsetTop;
	//x2 = lastMove[lastX];
	//y2 = lastMove[lastY];
	
	if(lastMove.touches.length == 1){
		var touch = lastMove.touches[0];
		x2 = touch.pageX - touch.target.offsetLeft;
		y2 = touch.pageY - touch.target.offsetTop;
	}
//	}
	if(selectX != null){document.getElementById("transformBtn").disabled = false;$('#transformBtn').css("color", "darkblue"); $('#paste').css("color", "darkblue");$('#crop').css("color", "darkblue");
}else if (selectX == null){document.getElementById("transformBtn").disabled = true;$('#transformBtn').css("color", "lightblue"); $('#paste').css("color", "lightblue");$('#crop').css("color", "lightblue");}
	if(brushSelect == "noBrush" && (otherTools == "move" || otherTools == "copy" || otherTools == "delete" || otherTools == "rect" || otherTools == "circ" || otherTools == "line" )){
		selectTool(context,x1,y1,x2,y2);
	} else if(brushSelect == "noBrush" && otherTools == "qCurve"){
		qCurveTool(context,x1, y1,x2,y2); 
	}
	bzPoints.length = 0;
	geoPoints.length = 0;
	//old.length = 0;
	//if(tempSelect == "tempDel"){enableDrag = false; tempPush = false; selectPush = false; if(customCanvas){deleteSelection(brushContext);} else {deleteSelection(context);}tempContext.clearRect(0,0,canvas2.width,canvas2.height);tempImgData = null;}
	//console.log(x2,y2);
	if(customCanvas){bPush();}else{cPush();}
	 if(tempSelect == "tempMove"){selectPush = false;} 
//	if(tempPush){
	//tempContext.clearRect(0,0,canvas2.width,canvas2.height);
	//tempContext.drawImage(canvas,selectX,selectY, selectWidth,selectHeight,x2/* - Math.abs(x-selectX)*/,y2 /*- Math.abs(y-selectY)*/,selectWidth,selectHeight);
//	context.drawImage(canvas2,0,0);
//	tempContext.clearRect(0,0,canvas2.width,canvas2.height);}
	
		if(tempPush){
		if(customCanvas){console.log("tempbrushrect");brushContext.globalAlpha = alpha;
		brushContext.drawImage(canvas4,0,0);
		brushTempContext.clearRect(0,0,160,160);}else{console.log("nottempbrush");context.globalAlpha = alpha;
		context.drawImage(canvas2,0,0);
		tempContext.clearRect(0,0,canvas2.width,canvas2.height);}
		}
	/*	if(selectPush){
	tempContext.clearRect(0,0,canvas2.width,canvas2.height);
	tempContext.drawImage(canvas,selectX,selectY, selectWidth,selectHeight,x2/* - Math.abs(x-selectX),y2 /*- Math.abs(y-selectY),selectWidth,selectHeight);*/
	//context.drawImage(canvas2,0,0);
	//tempContext.clearRect(0,0,canvas2.width,canvas2.height);}
		if(selectPush /*&& !enableDrag*/){
		if(customCanvas){brushTempContext.clearRect(0,0,canvas4.width,canvas4.height);
		//tempContext.drawImage(canvas,selectX,selectY, selectWidth,selectHeight,x2/* - Math.abs(x-selectX)*/,y2 /*- Math.abs(y-selectY)*/,selectWidth,selectHeight);
		brushTempContext.putImageData(tempImgData, x2-xSelOffset,y2-ySelOffset);
		brushContext.drawImage(canvas4,x2-xSelOffset,y2-ySelOffset, selectWidth,selectHeight,x2-xSelOffset/* - Math.abs(x-selectX)*/,y2-ySelOffset /*- Math.abs(y-selectY)*/,selectWidth,selectHeight);
		//tempContext.clearRect(0,0,canvas2.width,canvas2.height);
		drawX = x2-xSelOffset;
		drawY = y2-ySelOffset;
		}else
		{tempContext.clearRect(0,0,canvas2.width,canvas2.height);
		//tempContext.drawImage(canvas,selectX,selectY, selectWidth,selectHeight,x2/* - Math.abs(x-selectX)*/,y2 /*- Math.abs(y-selectY)*/,selectWidth,selectHeight);
		tempContext.putImageData(tempImgData, x2-xSelOffset,y2-ySelOffset);
		context.globalAlpha = alpha;
		context.drawImage(canvas2,x2-xSelOffset,y2-ySelOffset, selectWidth,selectHeight,x2-xSelOffset/* - Math.abs(x-selectX)*/,y2-ySelOffset /*- Math.abs(y-selectY)*/,selectWidth,selectHeight);
		//tempContext.clearRect(0,0,canvas2.width,canvas2.height);
		drawX = x2-xSelOffset;
		drawY = y2-ySelOffset;}
		
	}if(tempSelect == "tempDel"){
		enableDrag = false; tempPush = false; selectPush = false; 
		if (customCanvas){ deleteSelection(brushContext);
		}  else{deleteSelection(context);}
		tempContext.clearRect(0,0,canvas2.width,canvas2.height);}
	//if(tempSelect == "tempCopy"){tempSelectTool(tempContext,x2,y2)}
	if(/*selectX != null)*/tempSelect /*!= "noTemp")*/ == "tempMove"){
		drawX = x2-xSelOffset;
		drawY = y2-ySelOffset;
	}
	if(enableDrag){
		
		if(customCanvas){tempDragTool(brushTempContext,x2/*-brushOffsetX,y2-brushOffsetY*/,y2)}else{tempDragTool(tempContext,x2,y2)}
	}
	if(customCanvas){bPush();}else{
	cPush();}
	console.log(customCanvas);
	console.log(tempSelect);
	if(!dashset){tempContext.setLineDash([]); brushTempContext.setLineDash([]);}
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
		selectTool(context,x1,y1,x2,y2);
	} else if(brushSelect == "noBrush" && otherTools == "qCurve"){
		qCurveTool(x1, y1,x2,y2, x3,y3); 
	}
	bzPoints.length = 0;
	geoPoints.length = 0;
	//if(customCanvas){x2=x2-brushOffsetX; y2=y2-brushOffsetX;}
	if(tempSelect == "tempMove"){selectPush = false;}
	if(tempPush){
		if(customCanvas){console.log("tempbrushrect");brushContext.globalAlpha = alpha;
		brushContext.drawImage(canvas4,0,0);
		brushTempContext.clearRect(0,0,160,160);}else{console.log("nottempbrush");context.globalAlpha = alpha;
		context.drawImage(canvas2,0,0);
		tempContext.clearRect(0,0,canvas2.width,canvas2.height);}
		}
	if(selectPush /*&& !enableDrag*/){
		if(customCanvas){brushTempContext.clearRect(0,0,canvas4.width,canvas4.height);
		//tempContext.drawImage(canvas,selectX,selectY, selectWidth,selectHeight,x2/* - Math.abs(x-selectX)*/,y2 /*- Math.abs(y-selectY)*/,selectWidth,selectHeight);
		brushTempContext.putImageData(tempImgData, x2-xSelOffset,y2-ySelOffset);
		brushContext.drawImage(canvas4,x2-xSelOffset,y2-ySelOffset, selectWidth,selectHeight,x2-xSelOffset/* - Math.abs(x-selectX)*/,y2-ySelOffset /*- Math.abs(y-selectY)*/,selectWidth,selectHeight);
		//tempContext.clearRect(0,0,canvas2.width,canvas2.height);
		drawX = x2-xSelOffset;
		drawY = y2-ySelOffset;
		}else
		{tempContext.clearRect(0,0,canvas2.width,canvas2.height);
		//tempContext.drawImage(canvas,selectX,selectY, selectWidth,selectHeight,x2/* - Math.abs(x-selectX)*/,y2 /*- Math.abs(y-selectY)*/,selectWidth,selectHeight);
		tempContext.putImageData(tempImgData, x2-xSelOffset,y2-ySelOffset);
		context.globalAlpha = alpha;
		context.drawImage(canvas2,x2-xSelOffset,y2-ySelOffset, selectWidth,selectHeight,x2-xSelOffset/* - Math.abs(x-selectX)*/,y2-ySelOffset /*- Math.abs(y-selectY)*/,selectWidth,selectHeight);
		//tempContext.clearRect(0,0,canvas2.width,canvas2.height);
		drawX = x2-xSelOffset;
		drawY = y2-ySelOffset;}
		
	}if(tempSelect == "tempDel"){
		enableDrag = false; tempPush = false; selectPush = false; 
		if (customCanvas){ deleteSelection(brushContext);
		}  else{deleteSelection(context);}
		tempContext.clearRect(0,0,canvas2.width,canvas2.height);}
	//if(tempSelect == "tempCopy"){tempSelectTool(tempContext,x2,y2)}
	if(/*selectX != null)*/tempSelect /*!= "noTemp")*/ == "tempMove"){
		drawX = x2-xSelOffset;
		drawY = y2-ySelOffset;
	}
	if(enableDrag){
		
		if(customCanvas){tempDragTool(brushTempContext,x2/*-brushOffsetX,y2-brushOffsetY*/,y2)}else{tempDragTool(tempContext,x2,y2)}
	}
	if(customCanvas){bPush();}else{
	cPush();}
	console.log(customCanvas);
	console.log(tempSelect);
	if(!dashset){tempContext.setLineDash([]); brushTempContext.setLineDash([]);}
	return x2,y2;
}
function onMouseLeave(){
		if(tempPush){
		if(customCanvas){console.log("tempbrushrect");brushContext.globalAlpha = alpha;
		brushContext.drawImage(canvas4,0,0);
		brushTempContext.clearRect(0,0,160,160);}else{console.log("nottempbrush");context.globalAlpha = alpha;
		context.drawImage(canvas2,0,0);
		tempContext.clearRect(0,0,canvas2.width,canvas2.height);}
}
	if(selectPush /*&& !enableDrag*/){
		if(customCanvas){brushTempContext.clearRect(0,0,canvas4.width,canvas4.height);
		//tempContext.drawImage(canvas,selectX,selectY, selectWidth,selectHeight,x2/* - Math.abs(x-selectX)*/,y2 /*- Math.abs(y-selectY)*/,selectWidth,selectHeight);
		brushTempContext.putImageData(tempImgData, x2-xSelOffset,y2-ySelOffset);
		brushContext.drawImage(canvas4,x2-xSelOffset,y2-ySelOffset, selectWidth,selectHeight,x2-xSelOffset/* - Math.abs(x-selectX)*/,y2-ySelOffset /*- Math.abs(y-selectY)*/,selectWidth,selectHeight);
		//tempContext.clearRect(0,0,canvas2.width,canvas2.height);
		drawX = x2-xSelOffset;
		drawY = y2-ySelOffset;
		}else
		{tempContext.clearRect(0,0,canvas2.width,canvas2.height);
		//tempContext.drawImage(canvas,selectX,selectY, selectWidth,selectHeight,x2/* - Math.abs(x-selectX)*/,y2 /*- Math.abs(y-selectY)*/,selectWidth,selectHeight);
		tempContext.putImageData(tempImgData, x2-xSelOffset,y2-ySelOffset);
		context.globalAlpha = alpha;
		context.drawImage(canvas2,x2-xSelOffset,y2-ySelOffset, selectWidth,selectHeight,x2-xSelOffset/* - Math.abs(x-selectX)*/,y2-ySelOffset /*- Math.abs(y-selectY)*/,selectWidth,selectHeight);
		//tempContext.clearRect(0,0,canvas2.width,canvas2.height);
		drawX = x2-xSelOffset;
		drawY = y2-ySelOffset;}
}}
function onMouseUp2(e) {
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
	} else *//*if(brushSelect == "noBrush" && (otherTools == "move" || otherTools == "copy" || otherTools == "delete" || otherTools == "rect" || otherTools == "circ" || otherTools == "line" )){
		selectTool(context,x1,y1,x2,y2);
	} else if(brushSelect == "noBrush" && otherTools == "qCurve"){
		qCurveTool(x1, y1,x2,y2, x3,y3); 
	}
	bzPoints.length = 0;
	geoPoints.length = 0;
	cPush();
	return x2,y2;*/
	onMouseUp(x2,y2);
}
//function selectOtherTools
function tempTools(ctx, x,y){
	tempPush = false;
	selectPush = false;
	if (tempSelect == "line2"){
		if(customCanvas){tempLineTool ( brushTempContext,x,y);}else {tempLineTool ( tempContext,x,y);}
	}	else if ( tempSelect == "rect2"){
		if(customCanvas){tempRectTool ( brushTempContext,x,y);}else {tempRectTool ( tempContext,x,y);}
	}	else if (tempSelect == "circ2"){
		if(customCanvas){tempCircTool ( brushTempContext,x,y);}else {tempCircTool ( tempContext,x,y);}
	}	else if (tempSelect == "draw2"){
		if(customCanvas){tempDrawTool ( brushTempContext,x,y);}else {tempDrawTool ( tempContext,x,y);}
	}	else if (tempSelect =="tempCopy"){
		if(customCanvas){tempSelectTool ( brushTempContext,x,y);}else {tempSelectTool(tempContext,x,y);}
	}/*	else if (tempSelect =="tempMove"){
		if(customCanvas){tempDragTool ( brushTempContext,x,y);}else {tempDragTool(tempContext,x,y);}
	}*/	else if (tempSelect =="tempSel"){
		if(customCanvas){tempSelectTool ( brushTempContext,x,y);}else {tempSelectTool(tempContext,x,y);}
	}else if (tempSelect =="tempDel"){
		enableDrag = false;
		if(selectX != null){if(customCanvas){brushContext.clearRect(selectX,selectY,selectWidth,selectHeight);}else {context.clearRect(selectX,selectY,selectWidth,selectHeight); reloadBackground(selectX,selectY,selectWidth,selectHeight);}
		}
		if(customCanvas){tempSelectTool ( brushTempContext,x,y);}else {tempSelectTool(tempContext,x,y);}
	}
			/*if(enableDrag){
				
			tempContext.beginPath()
			//context.moveTo(old.oldX,old.oldY);
			tempContext.clearRect(0,0,canvas2.width,canvas2.height);
			//tempContext.setLineDash([5,10]);
			tempContext.strokeStyle= strokeColor;
			tempContext.fillStyle= fillColor;
			tempContext.strokeRect(old.oldX,old.oldY,x-old.oldX,y-old.oldY);
			tempContext.fillRect(old.oldX,old.oldY,x-old.oldX,y-old.oldY);
			console.log("temp","old"+old.oldX,"old2"+old.oldY,"x"+x,"y"+y);
			//tempContext.clearRect(0,0,canvas2.width,canvas2.height);
			//context.lineTo(x,y);
			//context.stroke();
			//context.clearRect(0,0,canvas.width,canvas.height);
			}
			/*var tempPic= - new Image;
			tempPic.src = document.getElementById('image2View').toDataURL()
			tempPic.onload = function () {context.drawImage(tempPic, 0,0);}*/
			
			//context.drawImage(canvas2,0,0);
			
		//}
	
}
function tempRectTool ( ctx,x,y){
	if(enableTemp){
			if(customCanvas){var canvas_width = 160; var canvas_height = 160;
			} else{var canvas_width = canvasWidth; var canvas_height = canvasHeight;}
		/*	brushTempContext.beginPath()
			//context.moveTo(old.oldX,old.oldY);
			brushTempContext.clearRect(0,0,160,160);
			//tempContext.setLineDash([5,10]);
			brushTempContext.lineJoin = "miter";
			brushTempContext.strokeStyle= strokeColor;
			brushTempContext.fillStyle= fillColor;
			brushTempContext.lineWidth = Number(thickness);
			
			//tempContext.globalAlpha= alpha;
			brushTempContext.strokeRect(old.oldX-brushOffsetX,old.oldY-brushOffsetY,x-(old.oldX-brushOffsetX),y-(old.oldY-brushOffsetY));
			brushTempContext.fillRect(old.oldX-brushOffsetX,old.oldY-brushOffsetY,x-(old.oldX-brushOffsetX),y-(old.oldY-brushOffsetY));
			//console.log("temp","old"+old.oldX,"old2"+old.oldY,"x"+tx,"y"+ty);
			//tempContext.clearRect(0,0,canvas2.width,canvas2.height);
			//context.lineTo(x,y);
			//context.stroke();
			//context.clearRect(0,0,canvas.width,canvas.height);
			tempPush = true;}else{	*/
			ctx.beginPath()
			//context.moveTo(old.oldX,old.oldY);
			ctx.clearRect(0,0,canvas_width,canvas_height);
			//tempContext.setLineDash([5,10]);
			ctx.lineJoin = "miter";
			ctx.strokeStyle= strokeColor;
			ctx.fillStyle= fillColor;
			ctx.lineWidth = Number(thickness);
			//tempContext.globalAlpha= alpha;
			ctx.strokeRect(old.oldX,old.oldY,x-old.oldX,y-old.oldY);
			ctx.fillRect(old.oldX,old.oldY,x-old.oldX,y-old.oldY);
			console.log("temp","old"+old.oldX,"old2"+old.oldY,"x"+x,"y"+y);
			//tempContext.clearRect(0,0,canvas2.width,canvas2.height);
			//context.lineTo(x,y);
			//context.stroke();
			//context.clearRect(0,0,canvas.width,canvas.height);
			tempPush = true;
			//}
			}
	
}
function tempLineTool(ctx,x,y){
	if(enableTemp){
		//if(customCanvas){var canvas_width = 160; var canvas_height = 160;
		//	} else{var canvas_width = canvasWidth; var canvas_height = canvasHeight;}
			ctx.beginPath()
			ctx.moveTo(old.oldX,old.oldY);
			ctx.clearRect(0,0,canvas2.width,canvas2.height);
			ctx.lineWidth = Number(thickness);
			ctx.lineCap = "butt";
				//tempContext.lineJoin = "round";
			//tempContext.globalAlpha= alpha;
			//tempContext.setLineDash([5,10]);
			ctx.strokeStyle= strokeColor;
			ctx.fillStyle= fillColor;
			ctx.lineTo(x,y);
			ctx.stroke();
			tempPush = true;
	}
}
function tempCircTool ( ctx,x,y){
	if(enableTemp){
		//tempContext.closePath()
	ctx.beginPath()
			//tempContext.moveTo(old.oldX,old.oldY);
			ctx.clearRect(0,0,canvas2.width,canvas2.height);
			//ctx.setLineDash([5,10]);
			ctx.strokeStyle= strokeColor;
			ctx.fillStyle= fillColor;
			//tempContext.strokeRect(old.oldX,old.oldY,x-old.oldX,y-old.oldY);
			//tempContext.fillRect(old.oldX,old.oldY,x-old.oldX,y-old.oldY);
			radius = (Math.max(Math.abs(y-old.oldY),Math.abs(x-old.oldX)))/2;
	
			ctx.arc((x+old.oldX)/2,(y+old.oldY)/2,radius, 2 * Math.PI, false);
			ctx.strokeStyle= strokeColor;
			ctx.fillStyle= fillColor;
			//tempContext.globalAlpha= alpha;
			ctx.stroke();
			ctx.fill();
			tempPush = true;
	}
}
function tempDrawTool ( ctx,x,y){
			//tempContext.beginPath();
			//tempContext.moveTo(x, y);
	
		if(enableTemp){
				if (!started) {
				started = true;
		
				ctx.beginPath();
				ctx.moveTo(x, y);		
			} else {
			//	if(context.isPointInPath(x,y)){context.closePath(); context.fill();}
				ctx.lineTo(x, y);
				ctx.lineCap = "round";
				ctx.lineJoin = "round";
				context.globalAlpha = alpha;
				ctx.strokeStyle= strokeColor;
			ctx.fillStyle= fillColor;
				ctx.lineWidth = thickness;
				/*if(fill) {
					context.fill();
				} else {context.stroke();}*/
				ctx.fill();
				ctx.stroke();
				//context.drawImage(canvas2,0,0);
	//tempContext.clearRect(0,0,canvas2.width,canvas2.height);
				//context.drawImage(canvas2,0,0);
	//tempContext.clearRect(0,0,canvas2.width,canvas2.height);
			}
			//tempContext.beginPath();
				//tempContext.moveTo(x, y);		
			
			//	if(context.isPointInPath(x,y)){context.closePath(); context.fill();}
			/*	tempContext.lineTo(x, y);
				tempContext.lineCap = "round";
				tempContext.lineJoin = "round";
				tempContext.globalAlpha = 1;
				tempContext.lineWidth = thickness;
				/*if(fill) {
					context.fill();
				} else {context.stroke();}*/
				/*tempContext.fill();
				tempContext.stroke();
				tempPush = true;*/
		tempPush = true;
	}
}

function tempSelectTool ( ctx,x,y){
	tempPush = false;
		selectPush = false;
	if(enableTemp &&!enableDrag){
			tempPush = false;
			selectPush = false;			
			ctx.beginPath()
			//context.moveTo(old.oldX,old.oldY);
			ctx.clearRect(0,0,canvas2.width,canvas2.height);
			//tempContext.setLineDash([5,10]);
			ctx.lineWidth = 2;
			ctx.lineJoin = "miter";
			ctx.strokeStyle= "red";
			ctx.setLineDash([5,10]);
			//tempContext.fillStyle= "transparent";
			//tempContext.lineWidth = Number(thickness);
			//tempContext.globalAlpha= alpha;
			
			//tempContext.strokeRect(old.oldX,old.oldY,x-old.oldX,y-old.oldY);
			//tempContext.fillRect(old.oldX,old.oldY,x-old.oldX,y-old.oldY);
			//console.log("temp","old"+old.oldX,"old2"+old.oldY,"x"+x,"y"+y);
			//tempContext.clearRect(0,0,canvas2.width,canvas2.height);
			//context.lineTo(x,y);
			//context.stroke();
			//context.clearRect(0,0,canvas.width,canvas.height);
			if(x >= old.oldX){
				selectX = old.oldX;
				drawX = old.oldX;
				selectWidth = x-old.oldX;}
			else if (x < old.oldX){
				selectX = x;
				drawX = x;
				selectWidth = old.oldX - x;
			}
			if(y >= old.oldY){
				selectY = old.oldY;
				drawY = old.oldY;
			selectHeight = y-old.oldY;}
			else if (y < old.oldY){
				selectY = y;
				drawY = y;
				selectHeight = old.oldY - y;
			}
			//selectY = old.oldY;
			if(tempSelect != "tempDel" && !enableDrag && selectWidth !=0 && selectHeight !=0){if(customCanvas){tempImgData=brushContext.getImageData(selectX,selectY,selectWidth,selectHeight);} else{tempImgData=context.getImageData(selectX,selectY,selectWidth,selectHeight);}}
			//selectHeight = y-old.oldY;
			ctx.strokeRect(selectX,selectY,selectWidth,selectHeight);
			tempPush = false;
			selectPush = false;
			//console.log(enableDrag);
			//console.log(tempImgData);
			
			//if(tempselect == "tempCopy"){
				//tempCopy(ctx,
			//}
			if(tempSelect == "tempDel"){selectX = null}
			if(tempSelect =="tempCopy"){lastTool = "tempCopy";}
			}
	
}
function tempPasteTool(){
	if(customCanvas){
		brushTempContext.clearRect(0,0,canvas2.width,canvas2.height);
		brushTempContext.strokeRect(0,0,selectWidth,selectHeight);
		if(tempImgData != null){brushTempContext.putImageData(tempImgData,0,0);}
	} else{
		tempContext.clearRect(0,0,canvas2.width,canvas2.height);
		tempContext.strokeRect(0,0,selectWidth,selectHeight);
		if(tempImgData != null){tempContext.putImageData(tempImgData,0,0);}
	}
	
	drawX = 0;
	drawY = 0;
	lastTool = "tempPaste";
}
function tempDragTool(ctx,x,y){
	if(tempImgData == null){enableDrag = false}
	if(enableDrag){
	//tempContext.clearRect(0,0,canvas2.width,canvas2.height);
	//tempContext.strokeRect(old.oldX,old.oldY,x2-old.oldX,y2-old.oldY);
	ctx.clearRect(0,0,canvas2.width,canvas2.height);
	//tempContext.strokeRect(selectX,selectY,selectWidth,selectHeight);
	//var xoffset = selectX-x
	//var yoffset = selectY-y;
	ctx.strokeRect(x-xSelOffset,y-ySelOffset,selectWidth,selectHeight);
	//tempContext.clearRect(0,0,canvas2.width,canvas2.height);
	
	ctx.putImageData(tempImgData, x-xSelOffset,y-ySelOffset);
	//if(tempSelect == "tempMove"){deleteSelection(context,selectX,selectY);}
	console.log("isdragging");
	//tempContext.drawImage(canvas,selectX,selectY, selectWidth,selectHeight,x/* - Math.abs(x-selectX)*/,y /*- Math.abs(y-selectY)*/,selectWidth,selectHeight);
	if(tempSelect =="tempCopy"){selectPush = true;lastTool = "tempCopy";} 
	if(tempSelect =="tempPaste"){lastTool = "tempPaste";} 
//	if(tempSelect == "tempSelect"){lastTool = "tempPaste;"}
	//if(tempSelect == "tempMove" && lastTool != "tempPaste"){lastTool = "tempMove";}else{lastTool = "tempPaste";}
		//else if (tempSelect =="tempMove"){selectPush = false; /*movePush = true;*/}
	tempPush = false;
	}
	console.log(enableDrag,"ed");
}

function rectTool(ctx,x1,y1,x2,y2){
	context.closePath();
	enableDraw = false;
	brushSelect = "noBrush";
	context.globalAlpha = alpha;
	
	context.lineJoin = "miter";
	context.lineWidth = Number(thickness);
	/*if(fill) {
			context.fillRect (x1, y1, x2-x1, y2-y1);
		} else {context.strokeRect (x1, y1, x2-x1, y2-y1);}*/
	context.fillRect (x1, y1, x2-x1, y2-y1);
	context.strokeRect (x1, y1, x2-x1, y2-y1);
console.log(x1,x2,y1,y2)	
}
function circTool(/*int,int, int, int*/){
	context.closePath();
	context.beginPath();
	context.globalAlpha = alpha;
	radius = (Math.max(Math.abs(y2-y1),Math.abs(x2-x1)))/2;
	
	context.arc((x1+x2)/2,(y1+y2)/2,radius, 2 * Math.PI, false);
	//context.fill();
	/*if(fill) {
			context.fill();
		} else {context.stroke();}*/
		context.lineWidth = Number(thickness);
		context.fill();
		context.stroke();
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
function selectTool(context,x1,y1,x2,y2){
	//imgData = null;
	lastTool = "select";
	enableDraw = false;
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
		{rectTool(context,x1,y1,x2,y2);}
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
		canvas2.addEventListener('dblclick', onDoubleClick, false);
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
		canvas2.addEventListener('dblclick', onDoubleClick, false);
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
function deleteSelection(ctx/*context, selectX, selectY, selectWidth, selectHeightimgData, int, int,int,int*/) {
	if(customCanvas){var w= x2-old.oldX-brushOffsetX;
	var h = y2-old.oldY-brushOffsetY;
	}else {
		var w= x2-old.oldX
		var h = y2-old.oldY
	}
	ctx.clearRect(/*selectX, selectY,selectWidth,selectHeight/**//*x1,y1,x2-x1,y2-y1*/old.oldX,old.oldY,w,h);
	// var xcolor = lastColor;
	if (disableTrans && !customCanvas){ context.globalAlpha=1;
	ctx.fillStyle = 'white';
	ctx.fillRect(/*selectX, selectY,selectWidth,selectHeight/**/x1,y1,x2-x1,y2-y1);}
	/*context.globalAlpha=xalpha;
	context.fillStyle = backgroundColor;
	context.fillRect(x1,y1,x2-x1,y2-y1);*/
	reloadBackground(/*selectX, selectY,selectWidth,selectHeight/*w,h*/x1,y1,w,h );
	
	ctx.globalAlpha = alpha;
	//context.fillStyle = lastColor;
	ctx.strokeStyle = strokeColor;
	ctx.fillStyle = fillColor;
	 
}

function qCurveTool (int,int,int,int) {
	
	if (otherTools == "qCurve"){
				//var x3;
		//var y3;
	//canvas.removeEventListener('dblclick', onDoubleClick, false);
	canvas.addEventListener('dblclick', onDoubleClick, false);
	canvas2.addEventListener('dblclick', onDoubleClick, false);
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
	/*if(fill) {
			context.fill();
		} else {context.stroke();}*/
	context.fill();
	context.stroke();
	context.closePath();
	console.log("dude");
	startQCurve = false;
	//}
}
}
lastTool = "qcurve";
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
/*if(customCanvas){
	$('#save').attr("download","BrushCanvas.png")
	 var brushimageDl = canvas3.toDataURL('brushimage/png');
   brushimageDl = brushimageDl.replace(/^data:image\/[^;]*///, 'data:application/octet-stream'); 
 /* brushimageDl = brushimageDl.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=BrushCanvas.png');

	this.href = brushimageDl;
}else{ 
	$('#save').attr("download","Canvas.png")
 var imageDl = canvas.toDataURL('image/png');
   imageDl = imageDl.replace(/^data:image\/[^;]*///, 'data:application/octet-stream'); 
 /* imageDl = imageDl.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');

this.href = imageDl;}*/

if(customCanvas){
	$('#save').attr("download","BrushCanvas.png")
	if(canvas3.msToBlob){
		var blob = canvas3.msToBlob();
		window.navigator.msSaveBlob(blob, 'BrushCanvas.png');
	}else{
	 var brushimageDl = canvas3.toDataURL('brushimage/png');
   brushimageDl = brushimageDl.replace(/^data:image\/[^;]*/, 'data:application/octet-stream'); 
  brushimageDl = brushimageDl.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=BrushCanvas.png');

	this.href = brushimageDl;}
}else{ 
	$('#save').attr("download","Canvas.png")
	if(canvas.msToBlob){
		var blob = canvas.msToBlob();
		window.navigator.msSaveBlob(blob, 'Canvas.png');
	}else{
	var imageDl = canvas.toDataURL('image/png');
   imageDl = imageDl.replace(/^data:image\/[^;]*/, 'data:application/octet-stream'); 
  imageDl = imageDl.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');

this.href = imageDl;}
}
}

function onUpload(e){
	var fRead = new FileReader();
	fRead.onload = function(event){
		var upImg = new Image();
		upImg.onload = function(){
			var upWidth = upImg.width;
			var upHeight = upImg.height;
			if(customCanvas){
				if(upWidth>upHeight){
					if(upWidth > canvas4.width){upHeight*= canvas4.width/upWidth; upWidth = canvas4.width;}
				} else {
					if(upHeight>canvas4.height){
						upWidth *= canvas4.height/upHeight;
						upHeight = canvas4.height;
					}
				}
			
			brushContext.drawImage(upImg,0,0,upWidth,upHeight);
			bPush();
			
		} else { 
			if(upWidth>upHeight){
					if(upWidth > canvasWidth){upHeight*= canvasWidth/upWidth; upWidth = canvasWidth;}
				} else {
					if(upHeight>canvasHeight){
						upWidth *= canvasHeight/upHeight;
						upHeight = canvasHeight;
					}
				}
			context.drawImage(upImg,0,0,upWidth,upHeight)}
			cPush();
		}
		upImg.src = event.target.result;
	}
	fRead.readAsDataURL(e.target.files[0]);
//if(customCanvas){bPush();} else { cPush();}
}

function bPush(){
	bStep++;
	if(bStep < bPushArray.length){bPushArray.length = cStep;}
	brushContext.globalAlpha = 1;
	bPushArray.push(document.getElementById('brushImage').toDataURL());
	brushContext.globalAlpha = alpha;
}

function cPush(){
	cStep++;
	if(cStep < cPushArray.length){cPushArray.length = cStep;}
	context.globalAlpha = 1;
	cPushArray.push(document.getElementById('imageView').toDataURL());
	context.globalAlpha = alpha;
}
function cUndo(){
	uAlpha = alpha;
	alpha = 1;
if(customCanvas){
	if(bStep > 0){
		
		bStep --;
		var brushCanvasPic = new Image;
		brushCanvasPic.src = bPushArray[bStep];
		//clearPage();
		brushContext.clearRect(0,0,160,160);
		brushContext.globalAlpha = 1;
		brushCanvasPic.onload = function () {brushContext.drawImage(brushCanvasPic, 0,0);}
	}
		alpha = uAlpha;
}else{
	if(cStep > 0){
		
		cStep --;
		var canvasPic = new Image;
		canvasPic.src = cPushArray[cStep];
		//clearPage();
		
		context.clearRect(0,0,context.canvas.width,context.canvas.height);
		/*context.beginPath();
		if(disableTrans){
			globalAlpha = 1;
			context.fillStyle = 'white';
			context.fillRect(0,0,canvas.width,canvas.height);
			fillChange = false;
			context.fillStyle = fillColor;
			
		}*/
		context.globalAlpha = 1;
		canvasPic.onload = function () {
			if(canvasPic.width != canvas.width || canvasPic.height != canvas.height){ 
		canvas.width = canvasPic.width;
		canvas.height = canvasPic.height;
		canvas2.width = canvasPic.width;
		canvas2.height = canvasPic.height;
		}
			
			context.drawImage(canvasPic, 0,0);}
		//context.drawImage(canvasPic,0,0);
		//document.title = cStep + ":" + cPushArray.length;
	}
	alpha = uAlpha;
	if(lastTool == 'background'){
		storeBack = backgroundLayers.pop();
		storeBackAlpha = backgroundAlphaLayers.pop();
	}
}
}

function cRedo(){
	if(customCanvas){
		if(bStep < bPushArray.length - 1){
		uAlpha = alpha;
		alpha = 1;
		brushContext.globalAlpha = 1;
		bStep ++;
		var brushCanvasPic = new Image;
		brushCanvasPic.src = bPushArray[bStep];
		//clearPage();
		brushContext.clearRect(0,0,160,160);
		brushCanvasPic.onload = function () {brushContext.drawImage(brushCanvasPic, 0,0);}
		//document.title = cStep + ":" + cPushArray.length;
		brushContext.globalAlpha = 1;
		//context.drawImage(canvasPic,0,0);
		//context.globalAlpha = alpha;
		alpha = uAlpha;
		
	}
		
	}else{
	if(cStep < cPushArray.length - 1){
		uAlpha = alpha;
	alpha = 1;
		context.globalAlpha = 1;
		cStep ++;
		var canvasPic = new Image;
		canvasPic.src = cPushArray[cStep];
		//clearPage();
		
		context.clearRect(0,0,canvas.width,canvas.height);
		canvasPic.onload = function () {
			if(canvasPic.width != canvas.width || canvasPic.height != canvas.height){ 
				canvas.width = canvasPic.width;
				canvas.height = canvasPic.height;
				canvas2.width = canvasPic.width;
				canvas2.height = canvasPic.height;
			}
			context.drawImage(canvasPic, 0,0);}
		//document.title = cStep + ":" + cPushArray.length;
		context.globalAlpha = 1;
		//context.drawImage(canvasPic,0,0);
		//context.globalAlpha = alpha;
		alpha = uAlpha;
		if(lastTool == "background"){
		backgroundLayers.push(storeBack);
		backgroundAlphaLayers.push(storeBackAlpha);
	}
	}
}
}
