/*
Project 101

Program button notes:
	Each button performs a different movement.  Hit reset after each button finalizes or play them in order from 1 to 4 when they finish their movements for a small story.
*/

"use strict";

var canvas;
var gl;
var program;

var projectionMatrix;
var modelViewMatrix;
var instanceMatrix;
var modelViewMatrixLoc;

var vertices = [
    vec4( -0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5,  0.5,  0.5, 1.0 ),
    vec4(  0.5,  0.5,  0.5, 1.0 ),
    vec4(  0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5, -0.5, -0.5, 1.0 ),
    vec4( -0.5,  0.5, -0.5, 1.0 ),
    vec4(  0.5,  0.5, -0.5, 1.0 ),
    vec4(  0.5, -0.5, -0.5, 1.0 )
];

var lightPosition = vec4(2.0, 1.0, 3.0, 1.0 );
var lightAmbient = vec4(0.5, 0.5, 0.5, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 0.5, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var lightPosition2 = vec4(-1.0, -1.0, 3.0, 0.0 );
var lightAmbient2 = vec4(0.9, 0.9, 0.9, 1.0 );
var lightDiffuse2 = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular2 = vec4( 1.0, 1.0, 0.0, 1.0 );

//colors
var materialAmbient = vec4( 0.24725, 0.1995, 0.0745, 1.0 );
var materialDiffuse = vec4( 0.75164, 0.60648, 0.22648, 1.0);
var materialSpecular = vec4( 0.628281, 0.555802, 0.366065, 1.0 );

var materialShininess = 10.0;


var torsoId = 0;
var headId  = 1;
var head1Id = 1;
var head2Id = 10;
var leftUpperArmId = 2;
var leftLowerArmId = 3;
var rightUpperArmId = 4;
var rightLowerArmId = 5;
var leftUpperLegId = 6;
var leftLowerLegId = 7;
var rightUpperLegId = 8;
var rightLowerLegId = 9;

var torsoId2 = 11;
var headId2  = 12;
var head1Id2 = 12;
var head2Id2 = 13;
var leftUpperArmId2 = 14;
var leftLowerArmId2 = 15;
var rightUpperArmId2 = 16;
var rightLowerArmId2 = 17;
var leftUpperLegId2 = 18;
var leftLowerLegId2= 19;
var rightUpperLegId2 = 20;
var rightLowerLegId2 = 21;

var headId3 = 22;
var head1Id3 = 23;
var head2Id3 = 24;

var torsoHeight = 5.0;
var torsoWidth  = 2.0;
var upperArmHeight = 2.0;
var lowerArmHeight = 2.0;
var upperArmWidth  = 0.7;
var lowerArmWidth  = 0.5;
var upperLegWidth  = 0.7;
var lowerLegWidth  = 0.5;
var lowerLegHeight = 2.0;
var upperLegHeight = 3.0;
var headHeight = 1.5;
var headWidth  = 1.0;

var colorSwitch = false;
var colorSwitch2 = false;

//numNodes = theta - 1 nodes = 10 per figure
//number of nodes = last id added
var numNodes = 24;
var numAngles = 11;

var theta = [0, 170, 180, 0, 180, 0, 180, 0, 180, 0, 0];
var theta2 =[0, 170, 180, 180, 180, 180, 180, 0, 0, 0, 0];
var theta3 = [0, 170, 0];

var stack = [];

var figure = [];

var x = 1.5*headHeight;

//start trans at -12 -> 12
var trans = [-12,0]
var trans2 = [12, 0];
var trans3 = [-9.5, 1.5*headHeight];
var trans4 = [x];

for( var i=0; i<numNodes; i++){
	figure[i] = createNode(null, null, null, null);
}	


var vBuffer, nBuffer, vColor, cBuffer;

var pointsArray = [];
var colorsArray = [];
var normalsArray = [];

//toggles ----------------------------------------------------------------------------
var headToggle = false;
var walkToggle = false;
var legSwitch = false;

var initialToggle = true;
var wave1Toggle = false;
var waveSwitchToggle = false;
var jumpToggle = false;

var walk2Toggle = false;
var legSwitch2 = false;

var handShakeToggle = false;
var head3Toggle = false;

var shakeUp = false;
var shakeDown = false;
var shakeUp2 = false;
var shakeDown2 = false;

var armReset = false;
var armReset2 = false;
var handShakeReset = false

var randomToggle = true;
var randomToggle2 = false;
var randomToggle3 = false;
var randomToggle4 = false;
var randomToggle5 = false;
var randomToggle6 = false;
var randomToggle7 = false;
var randomToggle9 = false;

var button3Toggle = false;
var robotHandToggle = false;
var button3Toggle2 = false;
var button3Toggle3 = false;

var walk3Toggle = false;
var legSwitch3 = false;
var rightArmSwitch = false;

var button3Toggle4 = false;
var button3Toggle5 = false;
var button3Toggle6 = false;
var button3Toggle7 = false;
var button3ToggleFinish2 = false;

var head3Toggle = false;

var headPass = false;
var button3ToggleFinish = false;


var randomToggle8 = false
var legSwitch4 = false;
var walk4Toggle = false;

var button4Toggle = false;
var button4Toggle2 = false;
var button4Toggle3 = false;
var button4Toggle4 = false;
var button4Toggle5 = false;
var button4Toggle6 = false;
var button4Toggle7 = false;
var button4Toggle8 = false;
var button4Toggle9 = false;
var button4Toggle10 = false;

var torsoRotate = false;
var torsoRotate2 = false;
var torsoRotate3 = false;
var torsoRotate4 = false;
var torsoRotate5 = false;
var torsoRotate6 = false;

var wave2Toggle = false;
var waveSwitchToggle2 = false;

var wave3Toggle = false;
var waveSwitchToggle3 = false;
var waveSwitchToggle4 = false;

var walk5Toggle = false;
var legSwitch5 = false;

var jumpUpDown = false;
var jumpUpDown1 = false;
var jumpUpDown2 = false;
var jumpUpDown3 = false;
//-------------------------------------------
function scale4(a, b, c) {
   var result = mat4();
   result[0][0] = a;
   result[1][1] = b;
   result[2][2] = c;
   return result;
}
//--------------------------------------------

function createNode(transform, render, sibling, child){
    var node = {
    transform: transform,
    render: render,
    sibling: sibling,
    child: child,
    }
    return node;
}


function initNodes(Id) {

    var m = mat4();

    switch(Id) {

    case torsoId:
	
	if(torsoRotate == false)
	{
		m = translate(trans[torsoId], 0, 0);
		m = mult(m, rotate(80, 0, 1, 0))
		figure[torsoId] = createNode( m, torso, null, headId );
	}
	else{
		
		if(torsoRotate2 == false)
		{
			if(torsoRotate5 == false){
				m = translate(trans[torsoId], 0, 0);
				m = mult(m, rotate(270, 0, 1, 0))
				figure[torsoId] = createNode( m, torso, null, headId );
			}
			else {
				m = translate(-2.8, trans[1], 0);
				m = mult(m, rotate(80, 0, 1, 0))
				figure[torsoId] = createNode( m, torso, null, headId );
			}
		}
		else{
			m = translate(-2.8, 0, 0.0);
			m = translate(trans[torsoId], 0, 0);
			m = mult(m, rotate(270, 0, 1, 0))
			figure[torsoId] = createNode( m, torso, null, headId );
		}
	}

    break;

	case headId:
    case head1Id:
    case head2Id:
	if(headToggle == false)
	{
		m = translate(0.0, torsoHeight+0.5*headHeight, 0.0);
		m = mult(m, rotate(theta[head1Id], 1, 0, 0))
		m = mult(m, rotate(theta[head2Id], 0, 1, 0));
		m = mult(m, translate(0.0, -0.5*headHeight, 0.0));
		figure[headId] = createNode( m, head, leftUpperArmId, null);
	}
	break;
   
    case leftUpperArmId:
		if(wave1Toggle == true){
			m = translate(-(torsoWidth/1.75), 0.95*torsoHeight, 0.0);
			m = mult(m, rotate(theta[leftUpperArmId], 0, 0, 1));
			figure[leftUpperArmId] = createNode( m, leftUpperArm, rightUpperArmId, leftLowerArmId );
		}
		else{
			m = translate(-(torsoWidth/1.75), 0.95*torsoHeight, 0.0);
			m = mult(m, rotate(theta[leftUpperArmId], 1, 0, 0));
			figure[leftUpperArmId] = createNode( m, leftUpperArm, rightUpperArmId, leftLowerArmId );
		}
    break;

    case rightUpperArmId:
		m = translate(torsoWidth/1.75, 0.95*torsoHeight, 0.0);
		m = mult(m, rotate(theta[rightUpperArmId], 1, 0, 0));
		figure[rightUpperArmId] = createNode( m, rightUpperArm, leftUpperLegId, rightLowerArmId );
    break;

    case leftUpperLegId:
		m = translate(-(torsoWidth/2.0), 0.1*upperLegHeight, 0.0);
		m = mult(m , rotate(theta[leftUpperLegId], 1, 0, 0));
		figure[leftUpperLegId] = createNode( m, leftUpperLeg, rightUpperLegId, leftLowerLegId );
    break;

    case rightUpperLegId:
		m = translate(torsoWidth/2.0, 0.1*upperLegHeight, 0.0);
		m = mult(m, rotate(theta[rightUpperLegId], 1, 0, 0));
		figure[rightUpperLegId] = createNode( m, rightUpperLeg, null, rightLowerLegId );
    break;

    case leftLowerArmId:
		m = translate(0.0, upperArmHeight, 0.0);
		m = mult(m, rotate(theta[leftLowerArmId], 1, 0, 0));
		figure[leftLowerArmId] = createNode( m, leftLowerArm, null, null );
    break;

    case rightLowerArmId:
		m = translate(0.0, upperArmHeight, 0.0);
		m = mult(m, rotate(theta[rightLowerArmId], 1, 0, 0));
		figure[rightLowerArmId] = createNode( m, rightLowerArm, null, null );
    break;

    case leftLowerLegId:
		m = translate(0.0, upperLegHeight, 0.0);
		m = mult(m, rotate(theta[leftLowerLegId], 1, 0, 0));
		figure[leftLowerLegId] = createNode( m, leftLowerLeg, null, null );
    break;

    case rightLowerLegId:
		m = translate(0.0, upperLegHeight, 0.0);
		m = mult(m, rotate(theta[rightLowerLegId], 1, 0, 0));
		figure[rightLowerLegId] = createNode( m, rightLowerLeg, null, null);
    break;
	
    }
}
//-------------------------------------------------------------------------------------------------

function initNodes2(Id) {
	//transform, render, sibling, child
    var m = mat4();

    switch(Id) {

    case torsoId2:
	
	if(headToggle == false)
	{
		if(torsoRotate3 == false)
		{
			if(torsoRotate6 == false)
			{
				m = translate(trans2[0], 0, 0);
				m = mult(m, rotate(280, 0, 1, 0))
				figure[torsoId2] = createNode( m, torso2, null, leftUpperArmId2 );
			}
			else{
				m = translate(2.8, trans2[1], 0);
				m = mult(m, rotate(280, 0, 1, 0))
				figure[torsoId2] = createNode( m, torso2, null, headId2 );
			}
		}
		else{
			if(torsoRotate4 == true)
			{
				m = translate(trans2[0], 0, 0);
				m = mult(m, rotate(90, 0, 1, 0))
				figure[torsoId2] = createNode( m, torso2, null, headId2 );
			}
			else{
				m = translate(-2.8, 0, 0.0);
				m = translate(trans2[0], 0, 0);
				m = mult(m, rotate(90, 0, 1, 0))
				figure[torsoId2] = createNode( m, torso2, null, headId2 );
			}
		}
	}
	else{
		//m = rotate(theta2[0], 0, 1, 0 );
		m = translate(trans2[0], 0, 0);
		m = mult(m, rotate(280, 0, 1, 0))
		figure[torsoId2] = createNode( m, torso2, null, headId2 );
	}
	
    break;
	
	case headId2:
    case head1Id2:
    case head2Id2:
	
	
		m = translate(0.0, torsoHeight+0.5*headHeight, 0.0);
		m = mult(m, rotate(theta2[1], 1, 0, 0))
		m = mult(m, rotate(theta2[2], 0, 1, 0));
		m = mult(m, translate(0.0, -0.5*headHeight, 0.0));
		figure[headId2] = createNode( m, head2, leftUpperArmId2, null);
	break;
	
	case leftUpperArmId2:
	
	if(handShakeToggle == false)
	{
		m = translate(-(torsoWidth/1.75), 0.95*torsoHeight, 0.0);
		m = mult(m, rotate(theta2[3], 0, 0, 1));
		figure[leftUpperArmId2] = createNode( m, leftUpperArm2, rightUpperArmId2, leftLowerArmId2 );
	}
	else{
		m = translate(-(torsoWidth/1.75), 0.95*torsoHeight, 0.0);
		m = mult(m, rotate(theta2[3], 1, 0, 0));
		figure[leftUpperArmId2] = createNode( m, leftUpperArm2, rightUpperArmId2, leftLowerArmId2 );
	}

	
	break;
	
	case rightUpperArmId2:
		if(robotHandToggle == false){
			m = translate(torsoWidth/1.75, 0.95*torsoHeight, 0.0);
			m = mult(m, rotate(theta2[4], 0, 0, 1));
			figure[rightUpperArmId2] = createNode( m, rightUpperArm2, leftUpperLegId2, rightLowerArmId2 );
		}
		else
		{
			m = translate(torsoWidth/1.75, 0.95*torsoHeight, 0.0);
			m = mult(m, rotate(theta2[4], 1, 0, 0));
			figure[rightUpperArmId2] = createNode( m, rightUpperArm2, leftUpperLegId2, rightLowerArmId2 );
		}
    break;

    case leftUpperLegId2:
		m = translate(-(torsoWidth/2.0), 0.1*upperLegHeight, 0.0);
		m = mult(m , rotate(theta2[5], 1, 0, 0));
		figure[leftUpperLegId2] = createNode( m, leftUpperLeg2, rightUpperLegId2, leftLowerLegId2 );
    break;

    case rightUpperLegId2:
		m = translate(torsoWidth/2.0, 0.1*upperLegHeight, 0.0);
		m = mult(m, rotate(theta2[6], 1, 0, 0));
		figure[rightUpperLegId2] = createNode( m, rightUpperLeg2, null, rightLowerLegId2 );
    break;

    case leftLowerArmId2:
		m = translate(0.0, upperArmHeight, 0.0);
		m = mult(m, rotate(theta2[7], 1, 0, 0));
		figure[leftLowerArmId2] = createNode( m, leftLowerArm2, null, null );
    break;

    case rightLowerArmId2:
		m = translate(0.0, upperArmHeight, 0.0);
		m = mult(m, rotate(theta2[8], 1, 0, 0));
		figure[rightLowerArmId2] = createNode( m, rightLowerArm2, null, null );
    break;

    case leftLowerLegId2:
		m = translate(0.0, upperLegHeight, 0.0);
		m = mult(m, rotate(theta2[9], 1, 0, 0));
		figure[leftLowerLegId2] = createNode( m, leftLowerLeg2, null, null );
    break;

    case rightLowerLegId2:
		m = translate(0.0, upperLegHeight, 0.0);
		m = mult(m, rotate(theta2[10], 1, 0, 0));
		figure[rightLowerLegId2] = createNode( m, rightLowerLeg2, null, null );
    break;
	
	}
	
}

//-------------------------------------------------------------------------------------------------

function initNodes3(Id) {
    var m = mat4();

    switch(Id) {

    case headId3:
	
		if(head3Toggle == false)
		{
			if(headToggle == false){
				m = translate(trans3[0], trans4[0], 1.0);
				m = mult(m, rotate(theta3[0], 1, 0, 0))
				m = mult(m, rotate(theta3[1], 0, 1, 0));
				//m = mult(m, translate(0.0, -0.5*headHeight, 0.0));
				figure[headId3] = createNode( m, head3, null, null);
			}
			else{
				m = translate(100, trans3[0], 1.0);
				m = mult(m, rotate(theta3[0], 1, 0, 0))
				m = mult(m, rotate(theta3[1], 0, 1, 0));
				//m = mult(m, translate(0.0, -0.5*headHeight, 0.0));
				figure[headId3] = createNode( m, head3, null, null);
			}
	
		}
		else{
			m = translate(-0.5, trans4[0], 1.0);
			m = mult(m, rotate(theta3[0], 1, 0, 0))
			m = mult(m, rotate(theta3[1], 0, 1, 0));
			//m = mult(m, translate(0.0, -0.5*headHeight, 0.0));
			figure[headId3] = createNode( m, head3, null, null);
		}
	
	break;
	}
}

function traverse(Id) {

   if(Id == null) return;
   stack.push(modelViewMatrix);
   modelViewMatrix = mult(modelViewMatrix, figure[Id].transform);
   figure[Id].render();
   if(figure[Id].child != null) traverse(figure[Id].child);
   modelViewMatrix = stack.pop();
   if(figure[Id].sibling != null) traverse(figure[Id].sibling);
}


function torso() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5*torsoHeight, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4( torsoWidth, torsoHeight, torsoWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function head() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * headHeight, 0.0 ));
	instanceMatrix = mult(instanceMatrix, scale4(headWidth, headHeight, headWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function leftUpperArm() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperArmWidth, upperArmHeight, upperArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function leftLowerArm() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerArmWidth, lowerArmHeight, lowerArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightUpperArm() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperArmWidth, upperArmHeight, upperArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightLowerArm() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerArmWidth, lowerArmHeight, lowerArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function  leftUpperLeg() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function leftLowerLeg() {

    instanceMatrix = mult(modelViewMatrix, translate( 0.0, 0.5 * lowerLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightUpperLeg() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightLowerLeg() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth) )
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}
//------------------------------------------------------------------------------------------------------------
//figure 2 functions
function torso2() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5*torsoHeight, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4( torsoWidth, torsoHeight, torsoWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function head2() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * headHeight, 0.0 ));
	instanceMatrix = mult(instanceMatrix, scale4(headWidth, headHeight, headWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function leftUpperArm2() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperArmWidth, upperArmHeight, upperArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function leftLowerArm2() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerArmWidth, lowerArmHeight, lowerArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightUpperArm2() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperArmWidth, upperArmHeight, upperArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightLowerArm2() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerArmWidth, lowerArmHeight, lowerArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function  leftUpperLeg2() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function leftLowerLeg2() {

    instanceMatrix = mult(modelViewMatrix, translate( 0.0, 0.5 * lowerLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightUpperLeg2() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightLowerLeg2() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth) )
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function head3() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * headHeight, 0.0 ));
	instanceMatrix = mult(instanceMatrix, scale4(headWidth, headHeight, headWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}


function quad(a, b, c, d) {
	var t1 = subtract(vertices[b], vertices[a]);
	var t2 = subtract(vertices[c], vertices[b]);
	var normal = cross(t1, t2);
	var normal = vec3(normal);
	
	var vertexColors = [
        [ 1.0, 0.0, 0.0, 1.0 ],  
        [ .5, .2, 0.1, 1.0 ], 
        [ .3, 0.3, 0.0, 1.0 ],  
        [ 0.0, .3, .3, 1.0 ],  
        [ .3, 0.0, .3, 1.0 ],  
        [ .9, 0.0, .6, 1.0 ],  
        [ 0.0, .9, .5, 1.0 ],  
        [ 0.0, 1.0, 1.0, 1.0 ]   
    ];
	
	if(colorSwitch == false)
	{
		colorsArray = [];
		normalsArray = [];
		
		colorsArray.push(vertexColors[0]);
		pointsArray.push(vertices[a]);
		normalsArray.push(normal);
		 
		colorsArray.push(vertexColors[0]);
		pointsArray.push(vertices[b]);
		normalsArray.push(normal);
		 
		colorsArray.push(vertexColors[0]);
		pointsArray.push(vertices[c]);
		normalsArray.push(normal);
		 
		colorsArray.push(vertexColors[0]);
		pointsArray.push(vertices[d]);
		normalsArray.push(normal);
		
		
	}
	else{
		
		colorsArray = [];
		normalsArray = [];
		
		pointsArray.push(vertices[a]);
		normalsArray.push(normal);
		 
		pointsArray.push(vertices[b]);
		normalsArray.push(normal);
		 
		pointsArray.push(vertices[c]);
		normalsArray.push(normal);
		 
		pointsArray.push(vertices[d]);
		normalsArray.push(normal);
		
	}
}

function cube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}


window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.6, 0.6, 0.6, 1.0 );

	gl.enable(gl.DEPTH_TEST);
    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader");

    gl.useProgram( program);

    instanceMatrix = mat4();

    projectionMatrix = ortho(-10.0,10.0,-10.0, 10.0,-10.0,10.0);
	
	
    modelViewMatrix = mat4();

    gl.uniformMatrix4fv(gl.getUniformLocation( program, "modelViewMatrix"), false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( gl.getUniformLocation( program, "projectionMatrix"), false, flatten(projectionMatrix) );
    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");

    cube();
	
	cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW );

    vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

	nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );
	
	
    vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);
	
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

	var vNormal = gl.getAttribLocation( program, "vNormal" );
	gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vNormal );
	
	// Buttons here
	document.getElementById("Button1").onclick = function(){
		//walk, head toggle
		if(walkToggle == false)
		{
			walkToggle = true;
		}
		else{
			
			walkToggle = false;
		}
	};
	
	document.getElementById("Button2").onclick = function(){
		//walk, head toggle
		if(walk2Toggle == false)
		{
			walk2Toggle = true;
		}
		else{
			walk2Toggle = false;
			randomToggle3 = false;
		}
	};
	
	document.getElementById("Button3").onclick = function(){
		if(walk3Toggle == false)
		{
			walk3Toggle = true;
			
			if(button3Toggle6 == true)
			{
				button3ToggleFinish = true;
			}
		}
		else{
			walk3Toggle = false;			
			
			if(button3Toggle6 == true)
			{
				button3ToggleFinish = true;
			}
		}
	};
	document.getElementById("Button4").onclick = function(){
		if(walk4Toggle == false)
		{
			walk4Toggle = true;
			
		}
		else{
			walk4Toggle = false;
			
		}
	};
	
	document.getElementById("Button5").onclick = function(){
		//reset button
		headToggle = false;
		walkToggle = false;
		legSwitch = false;

		initialToggle = true;
		wave1Toggle = false;
		waveSwitchToggle = false;
		jumpToggle = false;

		walk2Toggle = false;
		legSwitch2 = false;

		handShakeToggle = false;
		head3Toggle = false;

		shakeUp = false;
		shakeDown = false;
		shakeUp2 = false;
		shakeDown2 = false;

		armReset = false;
		armReset2 = false;
		handShakeReset = false

		randomToggle = true;
		randomToggle2 = false;
		randomToggle3 = false;
		randomToggle4 = false;
		randomToggle5 = false;
		randomToggle6 = false;
		randomToggle7 = false;
		randomToggle9 = false;

		button3Toggle = false;
		robotHandToggle = false;
		button3Toggle2 = false;
		button3Toggle3 = false;

		walk3Toggle = false;
		legSwitch3 = false;
		rightArmSwitch = false;

		button3Toggle4 = false;
		button3Toggle5 = false;
		button3Toggle6 = false;
		button3Toggle7 = false;
		button3ToggleFinish2 = false;

		head3Toggle = false;

		headPass = false;
		button3ToggleFinish = false;


		randomToggle8 = false
		legSwitch4 = false;
		walk4Toggle = false;

		button4Toggle = false;
		button4Toggle2 = false;
		button4Toggle3 = false;
		button4Toggle4 = false;
		button4Toggle5 = false;
		button4Toggle6 = false;
		button4Toggle7 = false;
		button4Toggle8 = false;
		button4Toggle9 = false;
		button4Toggle10 = false;

		torsoRotate = false;
		torsoRotate2 = false;
		
		torsoRotate3 = false;
		torsoRotate4 = false;

		wave2Toggle = false;
		waveSwitchToggle2 = false;
		
		wave3Toggle = false;
		waveSwitchToggle3 = false;
		waveSwitchToggle4 = false;

		walk5Toggle = false;
		legSwitch5 = false;
		
		jumpUpDown = false;
		jumpUpDown1 = false;
		jumpUpDown2 = false;
		jumpUpDown3 = false;
		torsoRotate4 = false;
		torsoRotate5 = false;
		torsoRotate6 = false;
		
		
		if(trans[0] != -12)
		{
			//reset locations
			trans[0] = -12;
			initNodes(torsoId);
			trans2[0] = 12;
			initNodes2(torsoId2);
			
			trans3[0] = -9.5;
			initNodes3(headId3);
			trans3[1] = 1.5*headHeight;
			initNodes3(headId3);
			
			trans4[0] = 1.5*headHeight;
			initNodes3(headId3);
			
			trans
			
			theta[leftUpperLegId] = 180;
			initNodes(leftUpperLegId);
			theta[rightUpperLegId] = 180;
			initNodes(rightUpperLegId);
			
			theta2[5] = 180.0;
			initNodes2(leftUpperLegId2);
			theta2[6] = 180.0;
			initNodes2(rightUpperLegId2);
			
		}
	};

	
	
	
		var ambientProduct = mult(lightAmbient, materialAmbient);
		var diffuseProduct = mult(lightDiffuse, materialDiffuse);
		var specularProduct = mult(lightSpecular, materialSpecular);
		
		
		gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),flatten(ambientProduct));
		gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),flatten(diffuseProduct));
		gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),flatten(specularProduct));
		gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),flatten(lightPosition));
		gl.uniform1f(gl.getUniformLocation(program, "shininess"),materialShininess);
		

	
		
	
    for(i=0; i<numNodes; i++){
		initNodes(i);
	}	
	for(i=11; i < 22; i++){
		initNodes2(i);
	}	
	for(i=22; i < 25; i++){
		initNodes3(i);
	}


	render();
}

var render = function() {

        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		

			traverse(torsoId);

			traverse(torsoId2);

			traverse(headId3);
		

		if(headToggle == true){
			initNodes2(torsoId2);
		}
		else{
			initNodes2(torsoId2);
		}
		
		//initial hand configurations figure 1
		if(initialToggle == true){
			theta[leftUpperArmId] = 140;
			initNodes(leftUpperArmId);
			theta[leftLowerArmId] = 320.0;
			initNodes(leftLowerArmId);
			
			theta[rightUpperArmId] = 140;
			initNodes(rightUpperArmId);
			theta[rightLowerArmId] = 320.0;
			initNodes(rightLowerArmId);
			
			theta2[3] = 180.0;
			initNodes2(leftUpperArmId2);
			theta2[4] = 180.0;
			initNodes2(rightUpperArmId2);
			theta2[7] = 0.0;
			initNodes2(leftLowerArmId2);
			theta2[8] = 0.0;
			initNodes2(rightLowerArmId2);

		}

		//walk 1
		////////////////////////////////
		if(walkToggle == true && randomToggle2 == false){
			trans[torsoId] += 0.03;
			initNodes(torsoId);
			
			trans2[0] -= 0.03;
			initNodes2(torsoId2);
			
			trans3[0] += 0.03;
			initNodes3(headId3);
			
			//figure 1 walk
			////////////////////////////////////////////////////////////////////
			if(walkToggle == true && legSwitch == false){
				theta[leftUpperLegId] += 1.0;
				initNodes(leftUpperLegId);
				theta[rightUpperLegId] -= 1.0;
				initNodes(rightUpperLegId);
				
				
				theta2[5] += 1.0;
				initNodes2(leftUpperLegId2);
				theta2[6] -= 1.0;
				initNodes2(rightUpperLegId2);
				if(theta[leftUpperLegId] >= 219.0)
				{
					legSwitch = true;
				}
			}
			if(walkToggle == true && legSwitch == true){
				theta[leftUpperLegId] -= 1.0;
				initNodes(leftUpperLegId);
				theta[rightUpperLegId] += 1.0;
				initNodes(rightUpperLegId);
				
				theta2[5] -= 1.0;
				initNodes2(leftUpperLegId2);
				theta2[6] += 1.0;
				initNodes2(rightUpperLegId2);
				if(theta[rightUpperLegId] >= 210.0)
				{
					legSwitch = false;
				}
			}
			if(trans[torsoId] >= -7.0){
				walkToggle = false;
				
				
				theta[leftUpperLegId] = 180;
				initNodes(leftUpperLegId);
				theta[rightUpperLegId] = 180;
				initNodes(rightUpperLegId);
				
				
				theta2[5] = 180.0;
				initNodes2(leftUpperLegId2);
				theta2[6] = 180.0;
				initNodes2(rightUpperLegId2);
				
				//after walking for figure1, wave with right hand
				randomToggle2 = true;
				wave1Toggle = true;
				initialToggle = false;
			}
		}	
	
		if(wave1Toggle == true && waveSwitchToggle == false && walkToggle == false) {
			initialToggle = false;
			theta[leftUpperArmId] -= 3.0;
			initNodes(leftUpperArmId);
			
			theta[leftLowerArmId] = 0;
			initNodes(leftLowerArmId);
			
			//wave1 for figure 2
			theta2[3] -= 4.0;
			initNodes2(leftUpperArmId2);
			theta2[4] += 4.0;
			initNodes2(rightUpperArmId2);
			
			jumpToggle = true;
			theta2[0] += 4.0;
			initNodes2(torsoId2);
			if(theta[leftUpperArmId] <= 10.0)
			{
				waveSwitchToggle = true;
			}
		}
		
		
		if(wave1Toggle == true && waveSwitchToggle == true && walkToggle == false){
			initialToggle = false;
			theta[leftUpperArmId] += 3.0;
			initNodes(leftUpperArmId);
			
			theta2[3] += 4.0;
			initNodes2(leftUpperArmId2);
			theta2[4] -= 4.0;
			initNodes2(rightUpperArmId2);
			if(theta[leftUpperArmId] >= 140.0)
			{
				waveSwitchToggle = false;
				//wave1Toggle = false;
				//initialToggle = true;
			}
		}
		
		
		if(wave1Toggle == true && walkToggle == true && randomToggle2 == true && randomToggle9 == false)
		{
			//wave1Toggle = false;
			//initialToggle = true;
			
			headToggle = false;
			walkToggle = false;
			legSwitch = false;

			initialToggle = true;
			wave1Toggle = false;
			waveSwitchToggle = false;
			jumpToggle = false;

			walk2Toggle = false;
			legSwitch2 = false;

			handShakeToggle = false;
			head3Toggle = false;

			shakeUp = false;
			shakeDown = false;
			shakeUp2 = false;
			shakeDown2 = false;

			armReset = false;
			armReset2 = false;
			handShakeReset = false

			randomToggle = true;
			randomToggle2 = false;
			randomToggle3 = false;
			randomToggle4 = false;
			randomToggle5 = false;
			randomToggle6 = false;
			randomToggle7 = false;
			randomToggle9 = false;

			button3Toggle = false;
			robotHandToggle = false;
			button3Toggle2 = false;
			button3Toggle3 = false;

			walk3Toggle = false;
			legSwitch3 = false;
			rightArmSwitch = false;

			button3Toggle4 = false;
			button3Toggle5 = false;
			button3Toggle6 = false;
			button3Toggle7 = false;
			button3ToggleFinish2 = false;

			head3Toggle = false;

			headPass = false;
			button3ToggleFinish = false;


			randomToggle8 = false
			legSwitch4 = false;
			walk4Toggle = false;

			button4Toggle = false;
			button4Toggle2 = false;
			button4Toggle3 = false;
			button4Toggle4 = false;
			button4Toggle5 = false;
			button4Toggle6 = false;
			button4Toggle7 = false;
			button4Toggle8 = false;
			button4Toggle9 = false;
			button4Toggle10 = false;

			torsoRotate = false;
			torsoRotate2 = false;
			
			torsoRotate3 = false;
			torsoRotate4 = false;

			wave2Toggle = false;
			waveSwitchToggle2 = false;
		}
		
		/////////////////////////////////////////////////----------------------------------------- end of button 1
		
		if(walk2Toggle == true && randomToggle3 == false)
		{
		
			
			trans[torsoId] += 0.03;
			initNodes(torsoId);
			
			trans2[0] -= 0.03;
			initNodes2(torsoId2);
			
			trans3[0] += 0.03;
			initNodes3(headId3);
			
			if(walk2Toggle == true && legSwitch2 == false){
				theta[leftUpperLegId] += 1.0;
				initNodes(leftUpperLegId);
				theta[rightUpperLegId] -= 1.0;
				initNodes(rightUpperLegId);
				
				
				theta2[5] += 1.0;
				initNodes2(leftUpperLegId2);
				theta2[6] -= 1.0;
				initNodes2(rightUpperLegId2);
				if(theta[leftUpperLegId] >= 200.0)
				{
					legSwitch2 = true;
				}
			}
		}
		if(walk2Toggle == true && legSwitch2 == true && randomToggle3 == false){
			
			theta[leftUpperLegId] -= 1.0;
			initNodes(leftUpperLegId);
			theta[rightUpperLegId] += 1.0;
			initNodes(rightUpperLegId);
			
			theta2[5] -= 1.0;
			initNodes2(leftUpperLegId2);
			theta2[6] += 1.0;
			initNodes2(rightUpperLegId2);
			
			if(theta[rightUpperLegId] >= 200.0)
			{
				legSwitch2 = false;
			}
			
		}
		if(trans[torsoId] >= -2.8 && randomToggle3 == false){
			
			walk2Toggle = false;
			
			theta[leftUpperLegId] = 180;
			initNodes(leftUpperLegId);
			theta[rightUpperLegId] = 180;
			initNodes(rightUpperLegId);
			
			
			theta2[5] = 180.0;
			initNodes2(leftUpperLegId2);
			theta2[6] = 180.0;
			initNodes2(rightUpperLegId2);
			
			//after walking for figure1 + 2, stop, turn and adjust box, and shake hands 
			initialToggle = false;
			head3Toggle = true;
			
			if(trans4[0] >= 0.5 && walk2Toggle == false)
			{
				theta[rightUpperArmId] += 0.7;
				initNodes(rightUpperArmId);
				
				trans4[0] -= 0.05;
				initNodes3(headId3);
			}
			else{
				randomToggle3 = true;
				handShakeToggle = true;
			}
		}
		//button 2 handshake
		if(handShakeToggle == true && handShakeReset == false && walk2Toggle == false)
		{		
			if(theta2[3] >= 140)
			{
				theta2[3] -= 3.0;
				initNodes2(leftUpperArmId2);
				
				theta2[7] = 320.0;
				initNodes2(leftLowerArmId2);
			}
			else{
				shakeUp = true;
				handShakeToggle = false;
			}
		}
		if(shakeUp == true && walk2Toggle == false)
		{
			initialToggle = false;
			if(theta[leftLowerArmId] >= 300)
			{
				theta[leftLowerArmId] -= 2.0;
				initNodes(leftLowerArmId);
				
				theta2[7] -= 2.0;
				initNodes2(leftLowerArmId2);
			}
			else{
				shakeUp = false;
				shakeDown = true;
			}
		}
		if(shakeDown == true && walk2Toggle == false)
		{
			initialToggle = false;
			if(theta[leftLowerArmId] <= 320)
			{
				theta2[7] += 2.0;
				initNodes2(leftLowerArmId2);
				
				theta[leftLowerArmId] += 2.0;
				initNodes(leftLowerArmId);
			}
			else{
				shakeDown = false;
				shakeUp = true;
			}
		}
		
		if(shakeUp == true && walk2Toggle == true)
		{
			shakeUp = false;
			initialToggle = true;
			
			trans4[0] = 2.5;
			initNodes3(headId3);
		}
		if(shakeDown == true && walk2Toggle == true)
		{
			shakeDown = false;		
			initialToggle = true;
			
			trans4[0] = 2.5;
			initNodes3(headId3);
		}
	
		///////////////////////////////////////////////////////--------------------------------/end of button 2
		
		if(walk3Toggle == true && randomToggle5 == false)
		{
			randomToggle3 = true;
			
			initialToggle = false;
			shakeDown = false;
			shakeUp = false;
			
			trans[torsoId] += 0.03;
			initNodes(torsoId);
			
			trans2[0] -= 0.03;
			initNodes2(torsoId2);
			
			trans3[0] += 0.03;
			initNodes3(headId3);
			
			if(walk3Toggle == true && legSwitch3 == false){
				theta[leftUpperLegId] += 1.0;
				initNodes(leftUpperLegId);
				theta[rightUpperLegId] -= 1.0;
				initNodes(rightUpperLegId);
				
				
				theta2[5] += 1.0;
				initNodes2(leftUpperLegId2);
				theta2[6] -= 1.0;
				initNodes2(rightUpperLegId2);
				if(theta[leftUpperLegId] >= 200.0)
				{
					legSwitch3 = true;
				}
			}
		}
		
		if(walk3Toggle == true && legSwitch3 == true){
			randomToggle3 = true;
			
			theta[leftUpperLegId] -= 1.0;
			initNodes(leftUpperLegId);
			theta[rightUpperLegId] += 1.0;
			initNodes(rightUpperLegId);
			
			theta2[5] -= 1.0;
			initNodes2(leftUpperLegId2);
			theta2[6] += 1.0;
			initNodes2(rightUpperLegId2);
			
			if(theta[rightUpperLegId] >= 200.0)
			{
				legSwitch3 = false;
			}
			
		}
		if(trans[torsoId] >= -2.8 && randomToggle5 == false && walk3Toggle == true){
			randomToggle3 = true;
			
			theta[leftUpperLegId] = 180;
			initNodes(leftUpperLegId);
			theta[rightUpperLegId] = 180;
			initNodes(rightUpperLegId);
			
			
			theta2[5] = 180.0;
			initNodes2(leftUpperLegId2);
			theta2[6] = 180.0;
			initNodes2(rightUpperLegId2);
			

			initialToggle = false;
			
			head3Toggle = true;
			
			if(theta2[5] == 180.0)
			{
				randomToggle5 = true;
				button3Toggle = true;
				
				initialToggle = true;
			}
		}
		
		if(button3Toggle == true && walk3Toggle == true)
		{
			initialToggle = false;
			robotHandToggle = true;
			
			handShakeToggle = true;
			handShakeReset = true;
			
			if(theta2[4] >= 135)
			{
				theta2[4] -= 1.0;
				initNodes2(rightUpperArmId2);
				theta2[8] -= 1.0;
				initNodes2(rightLowerArmId2);
				
				theta2[3] -= 1.0;
				initNodes2(leftUpperArmId2);
				theta2[7] -= 1.0;
				initNodes2(leftLowerArmId2);
			}
			else{
				button3Toggle = false;
				button3Toggle2 = true;
			}
		}
	
		if(button3Toggle2 == true && walk3Toggle == true)
		{
			
			trans[0] = -2.8;
			initNodes(torsoId);
			trans2[0] = 2.8;
			initNodes2(torsoId2);
			//lower robot1's arms back to side, raise robot 2's arms up to its own torso level while moving head up and stop
			
			if(theta[leftUpperArmId] <= 180 && walk3Toggle == true)
			{
				theta[rightUpperArmId] += 1.0;
				initNodes(rightUpperArmId);
				theta[leftUpperArmId] += 1.0;
				initNodes(leftUpperArmId);
				
				theta[rightLowerArmId] += 1.0;
				initNodes(rightLowerArmId);
				
				theta[leftLowerArmId] += 1.0;
				initNodes(leftLowerArmId);
			}
			else{
				theta[rightLowerArmId] = 0.0;
				initNodes(rightLowerArmId);
				
				theta[leftLowerArmId] = 0.0;
				initNodes(leftLowerArmId);
				
				button3Toggle2 = false;
				button3Toggle3 = true;
			}
		}
		
		
		if(button3Toggle3 == true && walk3Toggle == true)
		{
			trans[0] = -2.8;
			initNodes(torsoId);
			trans2[0] = 2.8;
			initNodes2(torsoId2);
			
			//raise both upper arms and raise head
			if(theta2[4] >= 105 && button3Toggle7 == false && walk3Toggle == true)
			{
				theta2[4] -= 1.0;
				initNodes2(rightUpperArmId2);
				theta2[8] -= 0.6;
				initNodes2(rightLowerArmId2);
				
				theta2[3] -= 1.0;
				initNodes2(leftUpperArmId2);
				theta2[7] -= 0.6;
				initNodes2(leftLowerArmId2);
				
				trans4[0] += 0.095;
				initNodes3(headId3);
			}
			else
			{
				button3Toggle3 = false;
				button3Toggle4 = true;
				
				head3Toggle = false;
			}
		}
		if(button3Toggle4 == true && walk3Toggle == true)
		{
			trans[0] = -2.8;
			initNodes(torsoId);
			trans2[0] = 2.8;
			initNodes2(torsoId2);
			
			if(theta2[4] >= 60 && walk3Toggle == true)
			{
				theta2[4] -= 0.8;
				initNodes2(rightUpperArmId2);
				theta2[8] -= 1.0;
				initNodes2(rightLowerArmId2);
				
				theta2[3] -= 0.8;
				initNodes2(leftUpperArmId2);
				theta2[7] -= 1.0;
				initNodes2(leftLowerArmId2);
				
				trans3[0] += 0.055;
				initNodes3(headId3);
				
			}
			else{
				headToggle = true;
				initNodes3(headId3);
				
				button3Toggle4 = false;
				button3Toggle5 = true;
				
			}
		}
		if(button3Toggle5 == true && walk3Toggle == true )
		{
			if(theta2[4]<= 180 && walk3Toggle == true)
			{
				theta2[4] += 2.0;
				initNodes2(rightUpperArmId2);
				theta2[8] += 2.0;
				initNodes2(rightLowerArmId2);
				
				theta2[3] += 2.0;
				initNodes2(leftUpperArmId2);
				theta2[7] += 2.0;
				initNodes2(leftLowerArmId2);		
			}
			else{
				button3Toggle5 = false;
				
				//headPass = true;
				//call jump up and down thing
				
				jumpUpDown = true;

			}
		}
		
		if(jumpUpDown == true && walk3Toggle == true)
		{
			//change toggles so they move vertically
			torsoRotate = true;
			initNodes(torsoId);
			
			torsoRotate2 = false;
			initNodes(torsoId);
			
			torsoRotate5 = true;
			initNodes(torsoId);
			
			//figure2 
			headToggle = false;
			initNodes2(torsoId2);
				
			torsoRotate3 = false;
			initNodes2(torsoId2);
				
			torsoRotate6 = true;
			initNodes2(torsoId2);
			
			
			//set arms to 0 
			theta[leftUpperArmId] = 0;
			initNodes(leftUpperArmId);
			theta[rightUpperArmId] = 0;
			initNodes(rightUpperArmId);
			
			theta2[3] = 0.0;
			initNodes2(leftUpperArmId2);
			theta2[4] = .0;
			initNodes2(rightUpperArmId2);
			
				
			//move both figures 
			trans[1] += 0.05;
			initNodes(torsoId);
			
			trans2[1] += 0.05;
			initNodes2(torsoId2);
			
			if(trans[1] >= 1.8)
			{
				jumpUpDown = false;
				jumpUpDown1 = true;
			}			
			//raise arms up			
		}
		
		if(jumpUpDown1 == true && walk3Toggle == true)
		{
			torsoRotate = true;
			initNodes(torsoId);
			
			torsoRotate2 = false;
			initNodes(torsoId);
			
			torsoRotate5 = true;
			initNodes(torsoId);
			
			
			trans[1] -= 0.05;
			initNodes(torsoId);
			
			trans2[1] -= 0.05;
			initNodes2(torsoId2);
			
			if(trans[1] <= 0.0)
			{
				jumpUpDown1 = false;
				jumpUpDown2 = true;
			}			
		}
		
		if(jumpUpDown2 == true && walk3Toggle == true)
		{
			torsoRotate = true;
			initNodes(torsoId);
			
			torsoRotate2 = false;
			initNodes(torsoId);
			
			torsoRotate5 = true;
			initNodes(torsoId);
			
			
			trans[1] += 0.05;
			initNodes(torsoId);
			
			trans2[1] += 0.05;
			initNodes2(torsoId2);
			
			if(trans[1] >= 1.8)
			{
				jumpUpDown2 = false;
				jumpUpDown3 = true;
			}			
		}
		
		if(jumpUpDown3 == true && walk3Toggle == true)
		{
			torsoRotate = true;
			initNodes(torsoId);
			
			torsoRotate2 = false;
			initNodes(torsoId);
			
			torsoRotate5 = true;
			initNodes(torsoId);
			
			
			trans[1] -= 0.05;
			initNodes(torsoId);
			
			trans2[1] -= 0.05;
			initNodes2(torsoId2);
			
			if(trans[1] >= 0.0)
			{
				theta[leftUpperArmId] = 180;
				initNodes(leftUpperArmId);
				theta[rightUpperArmId] = 180;
				initNodes(rightUpperArmId);
				
				theta2[3] = 180.0;
				initNodes2(leftUpperArmId2);
				theta2[4] = 180.0;
				initNodes2(rightUpperArmId2);
				
				torsoRotate = false;
				initNodes(torsoId);
				
				torsoRotate2 = false;
				initNodes(torsoId);
				
				torsoRotate5 = false;
				initNodes(torsoId);
				
				headToggle = true;
				initNodes2(torsoId2);
					
				torsoRotate3 = false;
				initNodes2(torsoId2);
					
				torsoRotate6 = false;
				initNodes2(torsoId2);
				
				jumpUpDown3 = false;
				
				
				
				button3Toggle6 = true;
			}			
		}
		
		//button 3 reset
		if(button3ToggleFinish == true && button3Toggle6 == true) 
		{
			//reset to right before head transplant
			
			theta[leftUpperArmId] = 140;
			initNodes(leftUpperArmId);
			theta[leftLowerArmId] = 320.0;
			initNodes(leftLowerArmId);
			
			theta[rightUpperArmId] = 140;
			initNodes(rightUpperArmId);
			theta[rightLowerArmId] = 320.0;
			initNodes(rightLowerArmId);
			
			theta2[3] = 180.0;
			initNodes2(leftUpperArmId2);
			theta2[4] = 180.0;
			initNodes2(rightUpperArmId2);
			theta2[7] = 0.0;
			initNodes2(leftLowerArmId2);
			theta2[8] = 0.0;
			initNodes2(rightLowerArmId2);
			
			theta[leftUpperLegId] = 180;
			initNodes(leftUpperLegId);
			theta[rightUpperLegId] = 180;
			initNodes(rightUpperLegId);
			
			theta2[5] = 180.0;
			initNodes2(leftUpperLegId2);
			theta2[6] = 180.0;
			initNodes2(rightUpperLegId2);
			
			trans4[0] = 2.2;
			initNodes3(headId3);
			
			head3Toggle = false;
			initNodes3(headId3);
			headToggle = false;
			initNodes(headId);
			
			trans3[0] = -0.4;
			initNodes3(headId3);
			
			
			trans[0] = -2.8;
			initNodes(torsoId);
			trans2[0] = 2.8;
			initNodes2(torsoId2);
			
			
			//button 1
			handShakeToggle = false;
			initNodes2(leftUpperArmId2);
			robotHandToggle = false;
			initNodes2(rightUpperArmId2);
			
			
	
			button3ToggleFinish = false;
			button3Toggle6 = false;
			button3Toggle = true;
			
			//headPass = false;
			//walk4Toggle = true;
		}
		/////////////////////////////////////////////////////-----------------------------------------------------------------------end of button 3
		if(walk4Toggle == true && randomToggle8 == false)
		{
			//make head appear
			head3Toggle = false;
			initNodes3(headId3);
			headToggle = true;
			initNodes3(headId3);
			
			
			theta[leftUpperArmId] = 180;
			initNodes(leftUpperArmId);
			theta[rightUpperArmId] = 180;
			initNodes(rightUpperArmId);
			
			theta[leftLowerArmId] = 0;
			initNodes(leftLowerArmId);
			theta[rightLowerArmId] = 0;
			initNodes(rightLowerArmId);
			
			randomToggle5 = true;
			randomToggle3 = true;
			
			initialToggle = false;
			
			trans[torsoId] += 0.03;
			initNodes(torsoId);
			
			trans2[0] -= 0.03;
			initNodes2(torsoId2);
			
			trans3[0] += 0.03;
			initNodes3(headId3);
			
			if(walk4Toggle == true && legSwitch4 == false){
				theta[leftUpperLegId] += 1.0;
				initNodes(leftUpperLegId);
				theta[rightUpperLegId] -= 1.0;
				initNodes(rightUpperLegId);
				
				
				theta2[5] += 1.0;
				initNodes2(leftUpperLegId2);
				theta2[6] -= 1.0;
				initNodes2(rightUpperLegId2);
				if(theta[leftUpperLegId] >= 200.0)
				{
					legSwitch4 = true;
				}
			}
		}
	
		if(walk4Toggle == true && legSwitch4 == true && randomToggle8 == false){
			randomToggle5 = true;
			randomToggle3 = true;
			
			theta[leftUpperLegId] -= 1.0;
			initNodes(leftUpperLegId);
			theta[rightUpperLegId] += 1.0;
			initNodes(rightUpperLegId);
			
			theta2[5] -= 1.0;
			initNodes2(leftUpperLegId2);
			theta2[6] += 1.0;
			initNodes2(rightUpperLegId2);
			
			if(theta[rightUpperLegId] >= 200.0)
			{
				legSwitch4 = false;
			}
			
		}
		
		if(trans[torsoId] >= -2.8 && walk4Toggle == true && randomToggle8 == false){
			
			theta[leftUpperLegId] = 180;
			initNodes(leftUpperLegId);
			theta[rightUpperLegId] = 180;
			initNodes(rightUpperLegId);
			
			
			theta2[5] = 180.0;
			initNodes2(leftUpperLegId2);
			theta2[6] = 180.0;
			initNodes2(rightUpperLegId2);
			

			initialToggle = false;
			
			if(theta2[5] >= 180.0)
			{
				//randomToggle5 = true;
				
				randomToggle8 = true;
				button4Toggle = true;
			}
		}
	
		if(button4Toggle == true && walk4Toggle == true)
		{
			
			//"left" hand of robot 1
			handShakeToggle = true;
			handShakeReset = true;
			
			//"left" hand of robot 2
			robotHandToggle = true;
			
			//wave1Toggle = false;
			
			
			if(theta2[4] >= 80.0)
			{
				initialToggle = false;
				
				trans[0] = -2.8;
				initNodes(torsoId);
				trans2[0] = 2.8;
				initNodes2(torsoId2);
				
				theta[leftUpperArmId] -= 1.4;
				initNodes(leftUpperArmId);
				
				theta[leftLowerArmId] -= 1.0;
				initNodes(leftLowerArmId);
									
				theta2[4] -= 1.4;
				initNodes2(rightUpperArmId2);
				
				theta2[8] -= 1.0;
				initNodes2(rightLowerArmId2);
				//wave2Toggle = true; 
			}
			else{
				button4Toggle = false;
				button4Toggle2 = true;
			}
		}
		if(button4Toggle2 == true && walk4Toggle == true)
		{
			if(theta2[8] <= -45.0 && walk4Toggle == true)
			{
				//initialToggle = false;
				
				trans[0] = -2.8;
				initNodes(torsoId);
				trans2[0] = 2.8;
				initNodes2(torsoId2);
				
				theta[leftLowerArmId] += 2.7;
				initNodes(leftLowerArmId);
														
				theta2[8] += 2.7;
				initNodes2(rightLowerArmId2);
				
			}
			else{
				button4Toggle2 = false;
				button4Toggle3 = true;
			}
		}
		if(button4Toggle3 == true && walk4Toggle == true)
		{
			if(theta2[8] >= -85.0 && walk4Toggle == true)
			{
				//initialToggle = false;
				
				trans[0] = -2.8;
				initNodes(torsoId);
				trans2[0] = 2.8;
				initNodes2(torsoId2);
				
				theta[leftLowerArmId] -= 2.5;
				initNodes(leftLowerArmId);
														
				theta2[8] -= 2.5;
				initNodes2(rightLowerArmId2);
				//wave2Toggle = true; 
				
				
			}
			else{
				button4Toggle3 = false;
				button4Toggle4 = true;
			}
		}
		if(button4Toggle4 == true && walk4Toggle == true)
		{
			//lower arms then turn around and walk away
			if(theta[leftUpperArmId] <= 180.0 && walk4Toggle == true)
			{
				//initialToggle = false;
				
				trans[0] = -2.8;
				initNodes(torsoId);
				trans2[0] = 2.8;
				initNodes2(torsoId2);
				
				
				theta[leftUpperArmId] += 2.3;
				initNodes(leftUpperArmId);
				
				theta[leftLowerArmId] += 0.9;
				initNodes(leftLowerArmId);
				
				theta2[4] += 2.3;
				initNodes2(rightUpperArmId2);
														
				theta2[8] += 0.9;
				initNodes2(rightLowerArmId2);
			}
			else{
				button4Toggle4 = false;
				button4Toggle5 = true;
			}
		}
		if(button4Toggle5 == true && walk4Toggle == true)
		{

			//wave here -> then turn around in next button then just keep walking off the screen
			walkToggle = true;
			trans[0] = -2.8;
			initNodes(torsoId);
			trans2[0] = 2.8;
			initNodes2(torsoId2);
			
			
			randomToggle9 = true;
			robotHandToggle = false;
			handShakeToggle = false;
			
			theta2[8] = 0;
			initNodes2(rightLowerArmId2);
			theta[leftLowerArmId] = 0;
			initNodes(leftLowerArmId);
				
			trans[0] = -2.8;
			initNodes(torsoId);
			trans2[0] = 2.8;
			initNodes2(torsoId2);	
			
			
			if(theta[leftUpperArmId] >= 20 && walk4Toggle == true)
			{
				initNodes(leftUpperArmId);
				initNodes2(rightUpperArmId2);
				
				
				theta[leftUpperArmId] -= 2.9;
				initNodes(leftUpperArmId);
					
				theta2[4] += 2.9;
				initNodes2(rightUpperArmId2);	
				theta2[3] -= 2.9;
				initNodes2(leftUpperArmId2);
						
			}
			else{
				button4Toggle5 = false;
				button4Toggle6 = true;
				
				wave1Toggle = true;
				initNodes(leftUpperArmId);
			}

		}
			// wave now
		if(button4Toggle6 == true && walk4Toggle == true)
		{
			
			if(theta2[4] >= 180)
			{
				theta2[4] -= 3.9;
				initNodes2(rightUpperArmId2);	
				theta2[3] += 3.9;
				initNodes2(leftUpperArmId2);
				
				theta[leftUpperArmId] += 3.9;
				initNodes(leftUpperArmId);
			}
			else{
				button4Toggle6 = false;
				//button4Toggle7 = true;
				
				theta2[3] = 180.0;
				initNodes2(leftUpperArmId2);
				theta2[4] = 180.0;
				initNodes2(rightUpperArmId2);
				theta2[7] = 0.0;
				initNodes2(leftLowerArmId2);
				theta2[8] = 0.0;
				initNodes2(rightLowerArmId2);
				
				wave3Toggle = true;
				
				//var waveSwitchToggle3 = false;
				//var waveSwitchToggle4 = false;
			}
		}
		
		if(wave3Toggle == true && walk4Toggle == true)
		{
			
			if(theta2[3] >= 0)
			{
				theta2[4] += 3.9;
				initNodes2(rightUpperArmId2);	
				theta2[3] -= 3.9;
				initNodes2(leftUpperArmId2);
				
				theta[leftUpperArmId] -= 3.9;
				initNodes(leftUpperArmId);
			}
			else{				
				wave3Toggle = false;
				waveSwitchToggle3 = true;
			}
		}
		
		if(waveSwitchToggle3 == true && walk4Toggle == true)
		{
			
			if(theta2[3] <= 180)
			{
				theta2[4] -= 3.9;
				initNodes2(rightUpperArmId2);	
				theta2[3] += 3.9;
				initNodes2(leftUpperArmId2);
				
				theta[leftUpperArmId] += 3.9;
				initNodes(leftUpperArmId);
			}
			else{	
				waveSwitchToggle3 = false;
			
				theta2[3] = 180.0;
				initNodes2(leftUpperArmId2);
				theta2[4] = 180.0;
				initNodes2(rightUpperArmId2);
				theta2[7] = 0.0;
				initNodes2(leftLowerArmId2);
				theta2[8] = 0.0;
				initNodes2(rightLowerArmId2);
			
				
				button4Toggle7 = true;
			}
		}
		
		if(button4Toggle7 == true && walk4Toggle == true)
		{
			//turn around
			
			torsoRotate = true;
			initNodes(torsoId);
			
			//rotate figure 2
			
			
			headToggle = false;
			initNodes2(torsoId2);
			
			torsoRotate3 = true;
			initNodes2(torsoId2);
			
			torsoRotate4 = true;
			initNodes2(torsoId2);
			
						
			if(theta[torsoId] >= -90)
			{
				theta[torsoId] -= 1.0;
				initNodes(torsoId);	
				
				//theta2[0] = 90.0;
				//initNodes2(torsoId2);
			}
			else{
				
				button4Toggle7 = false;
				button4Toggle8 = true;
			}
		}
		if(button4Toggle8 == true && walk4Toggle == true)
		{
			
			//move figure 1 off the screen
			walk5Toggle = true;
			
			torsoRotate2 = true;
			initNodes(torsoId);
			trans[0] -= 0.05;
			initNodes(torsoId);	
			
			//move figure 2 off the screen
		
			torsoRotate4 = false;
			initNodes2(torsoId2);
			trans2[0] += 0.05;
			initNodes2(torsoId2);
			
			if(trans[0] <= -12)
			{
				button4Toggle8 = false;
				walk5Toggle = false;
			}
		}
		if(walk5Toggle == true && walk4Toggle == true)
		{			
			theta[leftUpperArmId] = 180;
			initNodes(leftUpperArmId);
			theta[rightUpperArmId] = 180;
			initNodes(rightUpperArmId);
			
			theta[leftLowerArmId] = 0;
			initNodes(leftLowerArmId);
			theta[rightLowerArmId] = 0;
			initNodes(rightLowerArmId);
			
			initialToggle = false;
						
			if(walk5Toggle == true && legSwitch5 == false && walk4Toggle == true){
				theta[leftUpperLegId] += 1.0;
				initNodes(leftUpperLegId);
				theta[rightUpperLegId] -= 1.0;
				initNodes(rightUpperLegId);
				
				
				theta2[5] += 1.0;
				initNodes2(leftUpperLegId2);
				theta2[6] -= 1.0;
				initNodes2(rightUpperLegId2);
				if(theta[leftUpperLegId] >= 200.0)
				{
					legSwitch5 = true;
				}
			}
		}
	
		if(walk5Toggle == true && legSwitch5 == true && walk4Toggle == true){			
			theta[leftUpperLegId] -= 1.0;
			initNodes(leftUpperLegId);
			theta[rightUpperLegId] += 1.0;
			initNodes(rightUpperLegId);
			
			theta2[5] -= 1.0;
			initNodes2(leftUpperLegId2);
			theta2[6] += 1.0;
			initNodes2(rightUpperLegId2);
			
			if(theta[rightUpperLegId] >= 200.0)
			{
				legSwitch5 = false;
			}
			
		}

        requestAnimFrame(render);
}


