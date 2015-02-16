//Created by Ming Lei
//Date 12/15/2015
//A simple HTML/JS tic tac toe web site. 

//functions
function drawPlayer(index) // I think this was originally supposed to draw the pieces
{
	var coords = getCoord(index);
	var locX = coords[0];
	var locY = coords[1];
}

//getCoord() returns the upper left location of the square based on the index received
// I think this might be totally useless?
function getBoxIndex(mouseCoords)
{
	var rawX = mouseCoords[0]; // Raw input, coords for the whole screen
	var rawY = mouseCoords[1];
	var mouseX = (rawX - canvas.offsetLeft); //offset-ed input. X,Y relative to top left corner of the canvas object;
	var mouseY = (rawY - canvas.offsetTop);
	if (mouseX < 0 || mouseY < 0)
	{
		return 0;
	}
	else if (mouseX < 100 && mouseY < 100)
	{
		return 1;
	}
	else if (mouseX < 200 && mouseY < 100)
	{
		return 2;
	}
	else if (mouseX < 300 && mouseY < 100)
	{
		return 3;
	}
	else if (mouseX < 100 && mouseY < 200)
	{
		return 4;
	}
	else if (mouseX < 200 && mouseY < 200)
	{
		return 5;
	}	
	else if (mouseX < 300 && mouseY < 200)
	{
		return 6;
	}
	else if (mouseX < 100 && mouseY < 300)
	{
		return 7;
	}
	else if (mouseX < 200 && mouseY < 300)
	{
		return 8;
	}
	else if (mouseX < 300 && mouseY < 300)
	{
		return 9;
	}
	else
	{
		return 0;
	}
}

function getUpperLeft(boxIndex)
{
	var ULC = []; //Upper Left Corner
	switch(boxIndex)
	{
		case 1:
			ULC = [0,0];
			return ULC;
		case 2:
			ULC = [100,0];
			return ULC;
		case 3:
			ULC = [200,0];
			return ULC;
		case 4:
			ULC = [0,100];
			return ULC;
		case 5:
			ULC = [100,100];
			return ULC;
		case 6:
			ULC = [200,100];
			return ULC;
		case 7:
			ULC = [0,200];
			return ULC;
		case 8:
			ULC = [100,200];
			return ULC;
		case 9:
			ULC = [200,200];
			return ULC;

	}
}

function drawPieces()
{
	for(var i = 0; i < boardPiece.length; i++)
	{
		var loc = getUpperLeft(i+1); //Find the coords of the upper left. Must add 1 because index starts at 0 but box start at 1
		
		var locX = loc[0]; // get the X and Y coords out. This will let us know the upper left coord of where to draw rectangles
		var locY = loc[1];

		if (boardPiece[i] === 0) // What player does the piece belong to? 0 = no one, white; 1 = p1, red; 2 = p2, blue
		{
			board.fillStyle = "#FFFFFF";
			board.fillRect(locX,locY,100,100);
		}
		else if (boardPiece[i] === 1)
		{
			board.fillStyle = "#FF0000";
			board.fillRect(locX,locY,100,100);
		}
		else
		{
			board.fillStyle = "#0000FF";
			board.fillRect(locX,locY,100,100);		
		}


	}
	drawBoard(); // To make sure that the black lines and drawn on top of colored boxes
}

function drawBoard()
{
	board.lineWidth = 5;
	board.strokeRect(0, 0, 300, 300);
	board.strokeRect(100, 0, 100, 300);
	board.strokeRect(0, 100, 300, 100);
	board.stroke();
}

function checkWin(boxIndex) //Index of the latest move
{ // We are only going to check all cols/rows/diags related to the latest move to see if it was a win.
	//It's wasteful to check the entire box over and over again since only the latest move can determine victory

	//check all for P1
	if (checkRows(1) + checkCols(1) + checkDiags(1) > 0)
	{
		return 1;
	}
	else if (checkRows(2) + checkCols(2) + checkDiags(2) > 0)
	{
		return 2;
	}
	else if (noMoreMoves())
	{
		return 3; //3 means draw.
	}
	else
	{
		return 0;
	}
}
function noMoreMoves()
{
	var sumOfAllPieces = 0;
	for (var i = 0; i < boardPiece.length; i++)
	{
		sumOfAllPieces = boardPiece[i] + sumOfAllPieces;
	}
	if (sumOfAllPieces === 13)
	{
		return true;
	}
	else
	{
		return false;
	}

}

function checkRows(player)
{
	if (boardPiece[0] == player && boardPiece[1] == player && boardPiece[2] == player)
	{
		console.log("Player " + player + " won!");
		return player;
	}
	else if (boardPiece[3] == player && boardPiece[4] == player && boardPiece[5] == player)
	{
		console.log("Player " + player + " won!");
		return player;
	}
	else if (boardPiece[6] == player && boardPiece[7] == player && boardPiece[8] == player)
	{
		console.log("Player " + player + " won!");
		return player;
	}
	else
	{
		return 0;
	}
}

function checkCols(player)
{
	if (boardPiece[0] == player && boardPiece[3] == player && boardPiece[6] == player)
	{
		console.log("Player " + player + " won!");
		return player;
	}
	else if (boardPiece[1] == player && boardPiece[4] == player && boardPiece[7] == player)
	{
		console.log("Player " + player + " won!");
		return player;
	}
	else if (boardPiece[2] == player && boardPiece[5] == player && boardPiece[8] == player)
	{
		console.log("Player " + player + " won!");
		return player;
	}
	else
	{
		return 0;
	}
}

function checkDiags(player)
{
	if (boardPiece[0] == player && boardPiece[4] == player && boardPiece[8] == player)
	{
		console.log("Player " + player + " won with 1,5,9 diag");
		return player;
	}
	else if (boardPiece[2] == player && boardPiece[4] == player && boardPiece[6] == player)
	{
		console.log("Player " + player + " won with 3,5,7 diag");
		return player;
	}
	else
	{
		return 0;
	}
}
function restartGame()
{
	boardPiece = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	gameTurn = 0;
	gameWin = 0; // 0 = no one win, 1 = p1 wins, 2 = p2 wins. 
	breakCycle = false;
	$("#replayButton").remove();//Remove the replay button and the victory message
	$("#victoryMessage").remove();
	drawPieces(); //redraw the board with all blanks now
}

//This is where game starts. Everything read linearly down here will create the game.
var canvas = document.getElementById("board");
var board = canvas.getContext("2d");
drawBoard();
var boardPiece = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var gameTurn = 0;
var gameWin = 0; // 0 = no one win, 1 = p1 wins, 2 = p2 wins. 
var breakCycle = false; 
// A jury rig to make sure that if game has been won,
//nothing else will be drawn until this breakCycle is false again.
restartGame();

drawPieces(); //Do this once before game starts to clear board. Really just for debug if I want prefilled board pieces


//GAME BEGINS HERE
function mouseClick(mouse) // does everything go in here?
{
	var playerTurn = gameTurn % 2; // 0 = p1's turn, 1 = p2's turn.
	var cursorX = mouse.clientX;
	var cursorY = mouse.clientY;
	var boxIndex = getBoxIndex([cursorX,cursorY]); // Turn the coords of where mouse clicks into an array to be passed into getBoxIndex()

	if (boardPiece[boxIndex-1] === 0 && gameWin === 0) // You can only click on boxes that have not been selected
	{
		// Change the array to the player's color/number. 
		//Since player turn is always 0(p1) or 1(p2), we have to add 1 in order for it to correspond with 1(p1) and 2(p2).
		boardPiece[boxIndex-1] = (playerTurn+1); 

		gameWin = checkWin(boxIndex); // Checks to see if this latest move was a winning move
		gameTurn++;
		//Once you're done with all the checking, 
		//it's time to draw the final image of the board 
		//(especially if this last move was a winning move)
		drawPieces(); 

	}

	//$("#main").append(' ' + boxIndex + ' '); // Draw the box number in the bottom. For debug purposes
	if(breakCycle === false)
	{
		if (gameWin === 0) // No one won? Keep drawing pieces.
		{
			//yeah this is bad code, but I think I'll add something here eventually.
		}
		else if (gameWin === 1)
		{
			$("#main").append("<div id='victoryMessage'><center>Player 1 won!</center></div>");
			breakCycle = true;
			$("#main").append("<center><button id='replayButton' type='button' onclick='restartGame()'>Play Again?</button></center>");
		}
		else if (gameWin === 2)
		{
			$("#main").append("<div id='victoryMessage'><center>Player 2 won!</center></div>");
			breakCycle = true;
			$("#main").append("<center><button id='replayButton' type='button' onclick='restartGame()'>Play Again?</button></center>");
		}	
		else if (gameWin === 3)
		{
			$("#main").append("<div id='victoryMessage'><center>It's a DRAW!</center></div>");
			breakCycle = true;
			$("#main").append("<center><button id='replayButton' type='button' onclick='restartGame()'>Play Again?</button></center>");
		}	
	}
}

document.addEventListener("click", mouseClick); // Listens for mouse click, then executes mouseClick()


