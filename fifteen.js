/* 								Extra Feature Added
	
	User Alert
	-When the game is finished/user wins a message is deliered to the user that they have won. Along with 
	the color of the page changes.
*/


"use strict";
var div;
var emptySpaceY;
var emptySpaceX;
var shufflebutton;

window.onload = function ()
{
	var puzzlearea = document.getElementById('puzzlearea');
	
	div = puzzlearea.getElementsByTagName('div');

	for (var i=0; i<div.length; i++)
	{
		div[i].className = 'puzzlepiece';
		div[i].style.left = (i%4*100)+'px';
		div[i].style.top = (parseInt(i/4)*100) + 'px';
		div[i].style.backgroundPosition= '-' + div[i].style.left + ' ' + '-' + div[i].style.top;
		div[i].onmouseover = function()
		{
			if (checkMove(parseInt(this.innerHTML)))
			{
				this.style.border = "2px solid red";
				this.style.color = "#0000";
			}
		};
	

		div[i].onclick = function()
		{
			if (checkMove(parseInt(this.innerHTML)))
			{
				move(this.innerHTML-1);
				if (checkWin())
				{
					winalert();
					
					
				}
				return;
			}
		};
	}

	emptySpaceX = '300px';/*Empty values assigned*/
	emptySpaceY = '300px';

	/* Shuffle button- On click the puzzle will randomly arrange the titles on the board.*/

	shufflebutton = document.getElementById('shufflebutton');
	shufflebutton.onclick = function()
	{

		for (var i=0; i<250; i++)
		{
			var rand = parseInt(Math.random()* 100) %4;
			if (rand == 0)
			{
				var tmp = checkUp(emptySpaceX, emptySpaceY);
				if ( tmp != -1)
				{
					move(tmp);
				}
			}
			if (rand == 1)
			{
				var tmp = checkDown(emptySpaceX, emptySpaceY);
				if ( tmp != -1) 
				{
					move(tmp);
				}
			}

			if (rand == 2)
			{
				var tmp = checkLeft(emptySpaceX, emptySpaceY);
				if ( tmp != -1)
				{
					move(tmp);
				}
			}

			if (rand == 3)
			{
				var tmp = checkRight(emptySpaceX, emptySpaceY);
				if (tmp != -1)
				{
					move(tmp);
				}
			}
		}
	};
};

function move (pos) {
	/*Y Position*/
	var temp = div[pos].style.top;
	div[pos].style.top = emptySpaceY;
	emptySpaceY = temp;
	/* X Position*/
	temp = div[pos].style.left;
	div[pos].style.left = emptySpaceX;
	emptySpaceX = temp;
}

/*Checks to see location on an empty space in relation to the tile*/
function checkMove(pos)
{
	if (checkLeft(emptySpaceX, emptySpaceY) == (pos-1))
	{
		return true;
	}

	if (checkDown(emptySpaceX, emptySpaceY) == (pos-1))
	{
		return true;
	}

	if (checkUp(emptySpaceX, emptySpaceY) == (pos-1))
	{
		return true;
	}

	if (checkRight(emptySpaceX, emptySpaceY) == (pos-1))
	{
		return true;
	}
}
/*With the alert and color ackground the user will be notified of his/her win.*/
function winalert()
{
	setbgcolor();
	window.setTimeout(youWin,2000);
}

/*Create flashing screen animation to help congratulate the winner*/
function setbgcolor()
{
	var body = document.getElementsByTagName('body');
	body[0].style.backgroundColor = "yellow";
	window.setTimeout(bgcolor,300);

}
function bgcolor()
{
	var body = document.getElementsByTagName('body');
	body[0].style.backgroundColor = "blue";
	window.setTimeout(bgcolor1,400);

}
function bgcolor1()
{
	var body = document.getElementsByTagName('body');
	body[0].style.backgroundColor = "red";
	window.setTimeout(setbgcolor,500);

}
/*This will prompt the user with a message to let them know they have one the puzle*/
function youWin()
{
	alert('CONGRATULATION, YOU WIN!!!');
}


function checkWin()
{
	var win = true;
	for (var i = 0; i < div.length; i++) {
		var y = parseInt(div[i].style.top);
		var x = parseInt(div[i].style.left);

		if (x != (i%4*100) || y != parseInt(i/4)*100)
		{
			win = false;
			break;
		}
	}
	return win;

	if(win)
	{
		youWin();
		winalert();
	}
}

/* Below the program uses each check to determine if a moe may be carried out*/

function checkLeft(x, y)
{
	var tilex = parseInt(x);
	var tiley = parseInt(y);

	if (tilex > 0)
	{
		for (var i = 0; i < div.length; i++) 
		{
			if (parseInt(div[i].style.left) + 100 == tilex && parseInt(div[i].style.top) == tiley)
			{
				return i;
			} 
		}
	}
	else 
	{
		return -1;
	}
}

function checkRight (x, y) {
	var tilex = parseInt(x);
	var tiley = parseInt(y);
	if (tilex < 300)
	{
		for (var i =0; i<div.length; i++){
			if (parseInt(div[i].style.left) - 100 == tilex && parseInt(div[i].style.top) == tiley) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}
function checkUp (x, y) {
	var tilex = parseInt(x);
	var tiley = parseInt(y);
	if (tiley > 0)
	{
		for (var i=0; i<div.length; i++)
		{
			if (parseInt(div[i].style.top) + 100 == tiley && parseInt(div[i].style.left) == tilex) 
			{
				return i;
			}
		} 
	}
	else 
	{
		return -1;
	}
}

function checkDown (x, y)
{
	var tilex = parseInt(x);
	var tiley = parseInt(y);
	if (tiley < 300)
	{
		for (var i=0; i<div.length; i++)
		{
			if (parseInt(div[i].style.top) - 100 == tiley && parseInt(div[i].style.left) == tilex) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 

}

