/* * * * * * * * * * * * * CONSTANTS * * * * * * * * * * * * */


const slotValues = [
	{ name: 'angel', image: 'images/angel.png' },
	{ name: 'cherries', image: 'images/cherries.png' },
	{ name: 'devil', image: 'images/devil.png' },
	{ name: 'dollar', image: 'images/dollar.png' },
	{ name: 'mv', image: 'images/mv.png' },
	{ name: 'of', image: 'images/of.png' },
	{ name: 'pleaser', image: 'images/pleaser.png' },
	{ name: 'trainingkit', image: 'images/trainingkit.png' }
];

// const highlightIds = [a, b, c, d, e, f, g, h, j, k];


/* * * * * * * * * * APP'S STATE VARIABLES * * * * * * * * * */


let tkns;
let spinResults = [];


/* * * * * * * * * CACHED ELEMENT REFERENCES * * * * * * * * */


let cashIn = document.querySelector('#cashin');
let placeBet = document.querySelector('#placebet');
let spinner = document.querySelector('#spinner');
let spinSound = document.querySelector('#spinsound');
let winSound = document.querySelector('#winsound');
let cashOut = document.querySelector('#cashout');


/* * * * * * * * * * * EVENT LISTENERS * * * * * * * * * * * */


placeBet.addEventListener('click', payMe);
cashOut.addEventListener('click', initialize);
spinner.addEventListener('click', function (evt) {

	if (tkns >= 5) {
		spin(evt);
	} else {
		cashIn.style.color = 'red';
		cashIn.style.borderColor = 'black';
		cashIn.value = "IF YOU'RE STROKIN', TIP A TOKEN";
	}
});


/* * * * * * * * * * * * * FUNCTIONS * * * * * * * * * * * * */


initialize();

function initialize() {

	tkns = 0;
	tokens.innerText = '000000';
	// removeHighlight();
	for (let i = 0; i < 3; i++) {
		document.getElementById(`${i}`).src = `${slotValues[Math.floor(Math.random() * slotValues.length)].image}`;
		// document.getElementById(`${i}`).style.width = '120px';
	}
}

function payMe(evt) {

	if (!isNaN(cashIn.value)) {
		tkns += Math.floor(cashIn.value / 0.05);
		tokens.innerText = leadingZeros(tkns, 6);
		cashIn.value = '0.00';
		cashIn.style = null;
	} else {
		cashIn.style.color = 'red';
		cashIn.value = 'ENTER A VALID CASH AMOUNT';
	}
}

function spin(evt) {

	spinSound.play();
	// removeHighlight();
	tkns -= 5;
	tokens.innerText = leadingZeros(tkns, 6);
	for (let i = 0; i < 3; i++) {
		spinResults[i] = slotValues[Math.floor(Math.random() * slotValues.length)];
	}
	setSlotImage(spinResults);
}

function setSlotImage(objArr) {

	setTimeout(function () {
		document.getElementById('0').src = objArr[0].image;
	}, 300);
	setTimeout(function () {
		document.getElementById('1').src = objArr[1].image;
	}, 600);
	setTimeout(function () {
		document.getElementById('2').src = objArr[2].image;
		matchTally(spinResults);
	}, 900);
}

function matchTally(objArr) {

	let slotCount = spinResults.reduce(function (acc, slot) {
		acc[slot.name] = acc[slot.name] ? acc[slot.name] + 1 : 1;
		return acc;
	}, {});
	updateTokens(slotCount);
}

function updateTokens(obj) {

	for (let key in obj) {
		if (obj[key] === 3) {
			if (key === 'dollar') {
				document.getElementById('wall').innerHTML += "<p style='background: yellow; width: 100%;'>SOMEONE TIPPED 500 TOKENS!</p>";
				winSound.play();
				tkns += 500;
			} else if (key === 'devil') {
				document.getElementById('wall').innerHTML += "<p>Demons have stolen 666 of your tokens</p>";
				tkns -= 666;
			} else if (key === 'of') {
				document.getElementById('wall').innerHTML += "<p>Onlyfans has taken 40% of your earnings</p>";
				tkns -= Math.floor(tkns * .20);
			} else if (key === 'mv') {
				document.getElementById('wall').innerHTML += "<p>Manyvids has taken 40% of your earnings</p>";
				tkns -= Math.floor(tkns * .40);
			} else if (key === 'trainingkit') {
				document.getElementById('wall').innerHTML += "<p style='background: yellow; width: 100%'>NICE GAPE! SOMEONE TIPPED 420 TOKENS!</p>";
				tkns += 420;
			} else {
				document.getElementById('wall').innerHTML += "<p style='background: yellow; width: 100%'>SOMEONE TIPPED 100 TOKENS!</p>";
				winSound.play();
				tkns += 100;
			}
		}
		
		if (obj[key] === 2) {
			if (key === 'devil') {
				document.getElementById('wall').innerHTML += "<p>Demons have stolen 100 of your tokens</p>";
				tkns -= 100;
			} else if (key === 'of') {
				document.getElementById('wall').innerHTML += "<p>Onlyfans has taken 20% of your earnings</p>";
				tkns -= Math.floor(tkns * .20);
			} else if (key === 'mv') {
				document.getElementById('wall').innerHTML += "<p>Manyvids has taken 40% of your earnings</p>";
				tkns -= Math.floor(tkns * .40);
			} else {
				document.getElementById('wall').innerHTML += "<p style='background: yellow; width: 100%'>SOMEONE TIPPED 50 TOKENS!</p>";
				winSound.play();
				tkns += 50
			}
		}

		if (obj[key] === 1 && key === 'dollar') {
			document.getElementById('wall').innerHTML += "<p style='background: yellow; width: 100%'>SOMEONE TIPPED 20 TOKENS!</p>";
			winSound.play();
			tkns += 20;
		}
	}

	if (tkns > 0) {
		tokens.innerText = leadingZeros(tkns, 6);
	} else {
		tkns = 0;
		tokens.innerText = '000000'
	}
}

// function removeHighlight() {

// 	for (i = 0; i < highlightIds.length; i++) {
// 		highlightIds[i].style = null;
// 	}
// }

function leadingZeros(n, width, z) {

	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}