var level, shown, solution;
var size;

function getLevel() {
	// URL used to check level and size
	level = document.location.search.replace("?", "").replace("=", "");
	var tempSize = level.substring(6);
	level = level.substring(0, 6);
	if (tempSize == "9") {
		size = 81;
	} else {
		size = 16;
	}
	if (!document.location.search || !level || level == "level1") {
		// Easy, 4x4 by default
		document.write("<div class='title'><h1>Easy</h1></div>");
		if (size == 81) {
			shown = "800500614300000002169074050045020000903000040621008900008100000400060000000039800";
			solution = "872593614354681792169274358745926783983715246621348975238157469497862531516439827";
		} else {
			shown = "0034000202004320";
			solution = "2134341212434321";
		}
	} else if (level == "level2") {
		document.write("<div class='title'><h1>Medium</h1></div>");
		if (size == 81) {
			shown = "309072060050600000060300090805190640007020509006400780091740000000000020008063001";
			solution = "389572164154689237762314895825197643437826519916435782291748356673951428548263971";
		} else {
			shown = "0003020042300020";
			solution = "1423324142311324";
		}
	} else {
		document.write("<div class='title'><h1>Hard</h1></div>");
		if (size == 81) {
			shown = "900001050765000000100300008000006040000218000090400000600004002000000837030100005";
			solution = "983721654765849321124365798817956243346218579592473186678534912451692837239187465";
		} else {
			shown = "0201000024000340";
			solution = "4231312424131342";
		}
	}
}

function initBoard() {
	var board = document.getElementById("board");
	var mainUl = document.createElement("ul");
	var id = 1;
	var n=3;
	if (size == 16) {
		n = 2;
	}
	for (var i=0; i<n; i++) {
		var mainLi = document.createElement("li");
		for (var j=0; j<n; j++) {
			var gridDiv = document.createElement("div");
			gridDiv.className = "grid";
			var innerUl = document.createElement("ul");
			for (var k=0; k<n; k++) {
				var innerLi = document.createElement("li");
				for (var l=0; l<n+1; l++) {
					if (l==n && n==3) continue;
					var box = document.createElement("div");
					box.className = "box";
					var input = document.createElement("input");
					input.type = "hidden";
					if (l!=n) {
						input.type = "text";
						input.id = "input"+id;
						id++;
					}
					input.value = "";
					input.setAttribute("maxlength", "1");
					input.setAttribute("onblur", "invalid(this)");
					box.appendChild(input);
					innerLi.appendChild(box);
				}
				innerUl.appendChild(innerLi);
				gridDiv.appendChild(innerUl);
			}
			mainLi.appendChild(gridDiv);
		}
		mainUl.appendChild(mainLi);
		board.appendChild(mainUl);
	}
	var finalDiv = document.createElement("div");
	finalDiv.style = "clear:both;";
	board.appendChild(finalDiv);
}

function reset() {
	for (var i=1; i<=size; i++) {
		var answer = document.getElementById("input"+i);
		var currNumber = shown[i-1];
		if (currNumber == "0") {
			answer.value = "";
		} else {
			answer.value = currNumber;
		}
	}
}

function solve() {
	for (var i=1; i<=size; i++) {
		var answer = document.getElementById("input"+i);
		var correct = solution[i-1];
		answer.value = correct;
	}
}

function check() {
	// Getting user's answers
	// as string to check against the solution
	var userInput="";
	for (var i=1; i<=size; i++) {
		var temp = document.getElementById("input"+i).value;
		if (temp == "") {
			userInput += "0";
		} else {
			userInput += temp;
		}
	}
	if (userInput == solution) {
		alert("Congrats! Solved!");
	} else {
		alert("Sorry! Not yet...");
	}
}

// Check if the input is from 1 to 9
function invalid(current) {
	var regexp = new RegExp("[1-9]");
	if (current.value != "" && !regexp.test(current.value)) {
		current.value = "";
		alert("Sorry, you can only use numbers from 1 to 9.");
	}
}
