// var email = document.querySelector('#username_field'), 
// password = document.querySelector('#password_field'), 
var email = document.getElementsByName('username')[0],
password = document.getElementsByName('password')[0],
mySVG = document.querySelector('.svg-container'), 
ear_L_1_ = document.querySelector('#ear_L_1_'),
ear_R_1_ = document.querySelector('#ear_R_1_'),
face_1_ = document.querySelector('#face_1_'),
head = document.querySelector('#head'),
nose_1_ = document.querySelector('#nose_1_'),
philtrum_1_ = document.querySelector('#philtrum_1_'),
mouth_1_ = document.querySelector('#mouth_1_'),
Eye_Line_L = document.querySelector('#Eye_Line_L'),
Eye_Line_R = document.querySelector('#Eye_Line_R'),
open_eyes_L = document.querySelector('#open_eyes_L'),
open_eyes_R = document.querySelector('#open_eyes_R'),
sub_eye_L = document.querySelector('#sub_eye_L'),
sub_eye_R = document.querySelector('#sub_eye_R'),
closed_eyes_L = document.querySelector('#closed_eyes_L'),
closed_eyes_R = document.querySelector('#closed_eyes_R'),
foot_L = document.querySelector('#foot_L'),
foot_R = document.querySelector('#foot_R'),
cheek_L_1_ = document.querySelector('#cheek_L_1_'),
cheek_R_1_ = document.querySelector('#cheek_R_1_'),
hand_L = document.querySelector('#hand_L'),
arm_L_1_ = document.querySelector('#arm_L_1_'),
hand_R = document.querySelector('#hand_R'),
arm_R_1_ = document.querySelector('#arm_R_1_'),
arm_L_4_ = document.querySelector('#arm_L_4_'),
arm_R_4_ = document.querySelector('#arm_R_4_'),
eyeL = document.querySelector('.eyeL'), 
eyeR = document.querySelector('.eyeR');

var activeElement, curEmailIndex, screenCenter, svgCoords, emailCoords, emailScrollMax, chinMin = .5, dFromC, mouthStatus = "small", blinking, eyeScale = 1, eyesCovered = false, showPasswordClicked = false;
var eyeLCoords, eyeRCoords, noseCoords, mouthCoords, eyeLAngle, eyeLX, eyeLY, eyeRAngle, eyeRX, eyeRY, noseAngle, noseX, noseY, mouthAngle, mouthX, mouthY, mouthR, chinX, chinY, chinS, faceX, faceY, faceSkew, eyebrowSkew, outerEarX, outerEarY, hairX, hairS;
var isNosePing = false;

function calculateFaceMove(e) {
	var 	
		carPos = email.selectionEnd,
		div = document.createElement('div'),
		span = document.createElement('span'),
		copyStyle = getComputedStyle(email),
		caretCoords = {}
	;
	if(carPos == null || carPos == 0) {
		// if browser doesn't support 'selectionEnd' property on input[type="email"], use 'value.length' property instead
		carPos = email.value.length;
	}
	[].forEach.call(copyStyle, function(prop){
		div.style[prop] = copyStyle[prop];
	});
	div.style.position = 'absolute';
	div.className = "calc-div";
	document.body.appendChild(div);
	div.textContent = email.value.substr(0, carPos);
	span.textContent = email.value.substr(carPos) || '.';
	div.appendChild(span);
	
	if(email.scrollWidth <= emailScrollMax) {
		caretCoords = getPosition(span);
		dFromC = screenCenter - (caretCoords.x + emailCoords.x);
		
		eyeLAngle = getAngle(eyeLCoords.x + 400, eyeLCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 15);
		eyeRAngle = getAngle(eyeRCoords.x + 400, eyeRCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 15);
		noseAngle = getAngle(noseCoords.x, noseCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 15);
		mouthAngle = getAngle(mouthCoords.x, mouthCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 15);
	} else {
		eyeLAngle = getAngle(eyeLCoords.x, eyeLCoords.y, emailCoords.x + emailScrollMax, emailCoords.y + 15);
		eyeRAngle = getAngle(eyeRCoords.x, eyeRCoords.y, emailCoords.x + emailScrollMax, emailCoords.y + 15);
		noseAngle = getAngle(noseCoords.x, noseCoords.y, emailCoords.x + emailScrollMax, emailCoords.y + 15);
		mouthAngle = getAngle(mouthCoords.x, mouthCoords.y, emailCoords.x + emailScrollMax, emailCoords.y + 15);
	}
	// eyeLAngle += 1;
	// eyeRAngle += 1;
	
	eyeLX = Math.cos(eyeLAngle) * 6;
	eyeLY = Math.sin(eyeLAngle) * 2;
	eyeRX = Math.cos(eyeRAngle) * 6;
	eyeRY = Math.sin(eyeRAngle) * 2;
	noseX = Math.cos(noseAngle) * 23;
	noseY = Math.sin(noseAngle) * 2;
	mouthX = Math.cos(mouthAngle) * 18;
	mouthY = Math.sin(mouthAngle) * 2;
	mouthR = Math.cos(mouthAngle) * 6;
    
	faceX = mouthX * .2;
	faceY = mouthY * .3;
	faceSkew = Math.cos(mouthAngle) * 5;
	// eyebrowSkew = Math.cos(mouthAngle) * 25;
	outerEarX = Math.cos(mouthAngle) * 4;
	outerEarY = Math.cos(mouthAngle) * 5;
	hairX = Math.cos(mouthAngle) * 6;
    hairS = 1.2;

    TweenMax.to(open_eyes_L, 1, {x: -eyeLX , y: -eyeLY + 4, ease: Expo.easeOut});
    TweenMax.to(open_eyes_R, 1, {x: -eyeRX , y: -eyeRY + 4, ease: Expo.easeOut});
    TweenMax.to(sub_eye_L, 1, {x: -eyeLX+1, y: -eyeLY + 3, ease: Expo.easeOut});
	TweenMax.to(sub_eye_R, 1, {x: -eyeRX+1, y: -eyeRY + 3, ease: Expo.easeOut});
		
	document.body.removeChild(div);
};

function onEmailInput(e) {
	calculateFaceMove(e);
	var value = email.value;
	curEmailIndex = value.length;
    TweenMax.to(head, 1, {y: 34, ease: Expo.easeOut});
    TweenMax.to(philtrum_1_, 0.5, { scaleY: 2, ease: Expo.easeOut});
    TweenMax.to(mouth_1_, 0.5, {y: 10, autoAlpha: 0, ease: Expo.easeOut});
    TweenMax.to(cheek_L_1_, 0.8, {autoAlpha: 1, ease: Expo.easeOut});
    TweenMax.to(cheek_R_1_, 0.8, {autoAlpha: 1, ease: Expo.easeOut});
    
}

function onEmailFocus(e) {
	activeElement = "email";
	e.target.parentElement.classList.add("focusWithText");
	onEmailInput();
}

function onEmailBlur(e) {
	activeElement = null;
	setTimeout(function() {
		if(activeElement == "email") {
		} else {
			if(e.target.value == "") {
				e.target.parentElement.classList.remove("focusWithText");
			}
			//startBlinking();
			isNosePing = false;
			resetFace();
		}
	}, 100);
}

function onEmailClick(e) {
	nosePing();
}

function onPasswordFocus(e) {
	activeElement = "password";
	if(!eyesCovered) {
		coverEyes();
	}
}

function onPasswordBlur(e) {
	activeElement = null;
	setTimeout(function() {
		if(activeElement == "toggle" || activeElement == "password") {
		} else {
			uncoverEyes();
		}
	}, 100);
}

function onPasswordToggleFocus(e) {
	activeElement = "toggle";
	if(!eyesCovered) {
		coverEyes();
	}
}

function onPasswordToggleBlur(e) {
	activeElement = null;
	if(!showPasswordClicked) {
		setTimeout(function() {
			if(activeElement == "password" || activeElement == "toggle") {
			} else {
				uncoverEyes();
			}
		}, 100);
	}
}

function onPasswordToggleMouseDown(e) {
	showPasswordClicked = true;
}

function onPasswordToggleMouseUp(e) {
	showPasswordClicked = false;
}

function onPasswordToggleChange(e) {
	setTimeout(function() {
		// if checkbox is checked, show password
		if(e.target.checked) {
			password.type = "text";
			spreadFingers();

		// if checkbox is off, hide password
		} else {
			password.type = "password";
			closeFingers();
		}	
	}, 100);
}

function onPasswordToggleClick(e) {
	//console.log("click: " + e.target.id);
	e.target.focus();
}

function spreadFingers() {
	TweenMax.to(arm_L_4_, .45, {y: 15, ease: Expo.easeOut});
	TweenMax.to(arm_R_4_, .45, {y: 15, ease: Expo.easeOut});
}

function closeFingers() {
	TweenMax.to(arm_L_4_, .45, {y: 0, ease: Expo.easeOut});
	TweenMax.to(arm_R_4_, .45, {y: 0, ease: Expo.easeOut});
}

function coverEyes() {
    TweenMax.to(head, 1, {y: 34, ease: Expo.easeOut});
    TweenMax.to(philtrum_1_, 0.5, { scaleY: 1, ease: Expo.easeOut});
    TweenMax.to(mouth_1_, 0.5, {y: 0, autoAlpha: 1, ease: Expo.easeOut});
    TweenMax.to(cheek_L_1_, 0.8, {autoAlpha: 1, ease: Expo.easeOut});
    TweenMax.to(cheek_R_1_, 0.8, {autoAlpha: 1, ease: Expo.easeOut});
    
    TweenMax.set([hand_L, hand_R, arm_L_4_, arm_R_4_], {autoAlpha: 1});
    TweenMax.to(arm_L_4_,1,{x:0,y:0, ease: Expo.easeOut});
    TweenMax.to(arm_R_4_,1,{x:0,y:0, ease: Expo.easeOut});
    TweenMax.to(hand_L,1,{x:0,y:0,rotation: 0, transformOrigin: "center center", ease: Expo.easeOut});
    TweenMax.to(hand_R,1,{x:0,y:0,rotation: 0, transformOrigin: "center center", ease: Expo.easeOut});

    TweenMax.to([foot_L, foot_R], 0.5, {autoAlpha: 0, ease: Expo.easeOut});
    TweenMax.to([hand_L, hand_R], 0.5, {autoAlpha: 1, ease: Expo.easeOut});
	eyesCovered = true;
}

function uncoverEyes() {
    TweenMax.to(head, 1, {y: 0, ease: Expo.easeOut});
    TweenMax.to(philtrum_1_, 0.5, { scaleY: 1, ease: Expo.easeOut});
    TweenMax.to(mouth_1_, 0.5, {y: 0, autoAlpha: 1, ease: Expo.easeOut});
    TweenMax.to(cheek_L_1_, 0.8, {autoAlpha: 0, ease: Expo.easeOut});
    TweenMax.to(cheek_R_1_, 0.8, {autoAlpha: 0, ease: Expo.easeOut});

    TweenMax.to([hand_L, hand_R, arm_L_4_, arm_R_4_], 0.4, {autoAlpha: 0});
    TweenMax.to(arm_L_4_,1,{x:-8,y:30, ease: Expo.easeOut});
    TweenMax.to(arm_R_4_,1,{x:8,y:30, ease: Expo.easeOut});
    TweenMax.to(hand_L,1,{x:0,y:0,rotation: 140, transformOrigin: "center center", ease: Expo.easeOut});
    TweenMax.to(hand_R,1,{x:0,y:0,rotation: -140, transformOrigin: "center center", ease: Expo.easeOut});
    
    TweenMax.to([foot_L, foot_R], 0.5, {autoAlpha: 1, ease: Expo.easeOut});
	eyesCovered = false;
}

function resetFace() {
    if(activeElement != "password") {
        TweenMax.to(head, 1, {y: 0, ease: Expo.easeOut});
    }
    
	TweenMax.to([open_eyes_L, open_eyes_R, Eye_Line_L, Eye_Line_R], 1, {x: 0, y: 0, ease: Expo.easeOut});
	TweenMax.to([sub_eye_L, sub_eye_R], 1, {x: 0, y: 0, ease: Expo.easeOut});
	
    TweenMax.to(philtrum_1_, 0.5, { scaleY: 1, ease: Expo.easeOut});
    TweenMax.to(mouth_1_, 0.5, {y: 0, autoAlpha: 1, ease: Expo.easeOut});
    TweenMax.to(cheek_L_1_, 0.8, {autoAlpha: 0, ease: Expo.easeOut});
    TweenMax.to(cheek_R_1_, 0.8, {autoAlpha: 0, ease: Expo.easeOut});
}

function startBlinking(delay) {
	if(delay) {
		delay = getRandomInt(delay);
	} else {
		delay = 1;
	}
	blinking = TweenMax.to([eyeL, eyeR], .1, {delay: delay, scaleY: 0, yoyo: true, repeat: 1, transformOrigin: "center center", onComplete: function() {
		startBlinking(12);
	}});
}

function nosePing(type = 1.2, time = 200)
{
	isNosePing = true;
	setTimeout(() => {
		var _p = isNosePing;
		if(_p) {
			//
		} else {
			type = 1;
		}

		TweenMax.to(nose_1_, 1, {scaleX: type, scaleY: type, transformOrigin: "center center",  ease: Expo.easeOut, onComplete: function(){
			if(isNosePing == false) {
				TweenMax.to(nose_1_, 0.2, {scaleX: 1, scaleY: 1, transformOrigin: "center center", ease: Expo.easeOut});
			}
		}});
		
		if(type == 1) {
			type = 1.2;
		} else {
			type = 1;
		}
		if(_p) {
			nosePing(type);	
		}
	}, time);
}

function stopBlinking() {
	blinking.kill();
	blinking = null;
	TweenMax.set([eyeL, eyeR], {scaleY: eyeScale});
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function getAngle(x1, y1, x2, y2) {
	var angle = Math.atan2(y1 - y2, x1 - x2);
	return angle;
}

function getPosition(el) {
	var xPos = 0;
	var yPos = 0;

	while (el) {
		if (el.tagName == "BODY") {
			// deal with browser quirks with body/window/document and page scroll
			var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
			var yScroll = el.scrollTop || document.documentElement.scrollTop;

			xPos += (el.offsetLeft - xScroll + el.clientLeft);
			yPos += (el.offsetTop - yScroll + el.clientTop);
		} else {
			// for all other non-BODY elements
			xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
			yPos += (el.offsetTop - el.scrollTop + el.clientTop);
		}

		el = el.offsetParent;
	}
	//console.log("xPos: " + xPos + ", yPos: " + yPos);
	return {
		x: xPos,
		y: yPos
	};
}

function isMobileDevice() {
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
};

function initSVGAnimation() {
	email = document.getElementsByName('username')[0];
	password = document.getElementsByName('password')[0];
	mySVG = document.querySelector('.svg-container'); 
	ear_L_1_ = document.querySelector('#ear_L_1_');
	ear_R_1_ = document.querySelector('#ear_R_1_');
	face_1_ = document.querySelector('#face_1_');
	head = document.querySelector('#head');
	nose_1_ = document.querySelector('#nose_1_');
	philtrum_1_ = document.querySelector('#philtrum_1_');
	mouth_1_ = document.querySelector('#mouth_1_');
	Eye_Line_L = document.querySelector('#Eye_Line_L');
	Eye_Line_R = document.querySelector('#Eye_Line_R');
	open_eyes_L = document.querySelector('#open_eyes_L');
	open_eyes_R = document.querySelector('#open_eyes_R');
	sub_eye_L = document.querySelector('#sub_eye_L');
	sub_eye_R = document.querySelector('#sub_eye_R');
	closed_eyes_L = document.querySelector('#closed_eyes_L');
	closed_eyes_R = document.querySelector('#closed_eyes_R');
	foot_L = document.querySelector('#foot_L');
	foot_R = document.querySelector('#foot_R');
	cheek_L_1_ = document.querySelector('#cheek_L_1_');
	cheek_R_1_ = document.querySelector('#cheek_R_1_');
	hand_L = document.querySelector('#hand_L');
	arm_L_1_ = document.querySelector('#arm_L_1_');
	hand_R = document.querySelector('#hand_R');
	arm_R_1_ = document.querySelector('#arm_R_1_');
	arm_L_4_ = document.querySelector('#arm_L_4_');
	arm_R_4_ = document.querySelector('#arm_R_4_');
	eyeL = document.querySelector('.eyeL'); 
	eyeR = document.querySelector('.eyeR');
	initLoginForm();
}
function initLoginForm() {
	// some measurements for the svg's elements
	svgCoords = getPosition(mySVG);
	emailCoords = getPosition(email);
	screenCenter = svgCoords.x + (mySVG.offsetWidth / 2);
	eyeLCoords = {x: svgCoords.x + 100, y: svgCoords.y + 38};
	eyeRCoords = {x: svgCoords.x + 130, y: svgCoords.y + 38};
	noseCoords = {x: svgCoords.x + 97, y: svgCoords.y + 81};
	mouthCoords = {x: svgCoords.x + 100, y: svgCoords.y + 100};
	
	// handle events for email input
	email.addEventListener('focus', onEmailFocus);
	email.addEventListener('blur', onEmailBlur);
	email.addEventListener('input', onEmailInput);
	email.addEventListener('click', onEmailClick);
	
	// handle events for password input
	password.addEventListener('focus', onPasswordFocus);
	password.addEventListener('blur', onPasswordBlur);
	
    TweenMax.set([hand_L, hand_R, arm_L_4_, arm_R_4_], {autoAlpha: 0});
    TweenMax.to(arm_L_4_,1,{x:-8,y:30, ease: Expo.easeOut});
    TweenMax.to(arm_R_4_,1,{x:8,y:30, ease: Expo.easeOut});
    TweenMax.to(hand_L,1,{x:0,y:0,rotation: 140, transformOrigin: "center center", ease: Expo.easeOut});
    TweenMax.to(hand_R,1,{x:0,y:0,rotation: -140, transformOrigin: "center center", ease: Expo.easeOut});
    
	// set initial mouth property (fixes positioning bug)
	
	// activate blinking
	startBlinking(5);
	
	// determine how far email input can go before scrolling occurs
	// will be used as the furthest point avatar will look to the right
	emailScrollMax = email.scrollWidth;
}
$(document).ready(function(){
	setTimeout(() => {
		initSVGAnimation();
		setTimeout(() => {
			resetFace();
		}, 1000);	
	}, 1000);
});
