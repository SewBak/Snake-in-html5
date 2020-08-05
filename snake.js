var c = document.getElementById("c");
var score = 0;
var w = c.width;
var h = c.height;
var d = c.getContext("2d");
var dir = 1;
var len = 10;
var freq = 250;
var change = 10;
var x = 10;
var y = 10;
var px,py;
var s = 10;
var tail = [];
d.fillStyle = "#1eff00";
d.fillRect(x*s,y*s,s,s);
generateFood();
var movestart = setInterval(move,freq);
function move(){
	borderAndPointCrash();
	tail.push(new part(x,y));
	if(tail.length >= len){
		d.clearRect(0,0,w,h);
		tail.shift();
	}
	switch(dir){
		case 0:
		y--;
		break;
		case 1:
		x++;
		break;
		case 2:
		y++;
		break;
		case 3:
		x--;
		break;
	}
	tailCrash();
	d.fillRect(x*s,y*s,s,s);
	d.fillRect(px*s,py*s,s,s);
	for(i = 0; i < tail.length; i++){
		d.fillRect(tail[i].x*s, tail[i].y*s,s,s);
	}
}
function keyDown(key){
	switch(key){
		case "w":
		dir = 0;
		break;
		case "a":
		dir = 3;
		break;
		case "s":
		dir = 2;
		break;
		case "d":
		dir = 1;
		break;
	}
}
function borderAndPointCrash(){
	if(x*s < 0 || y*s < 0 || x*s > w || y*s > h){
		window.clearInterval(movestart);
	}
	if(x == px && y == py){
		len+=3;
		score++;
		freq-= 5;
		document.getElementById("sc").innerHTML = "Score:" + score;
		generateFood();
		clearInterval(movestart);
		movestart = window.setInterval(move,freq);
	}
}
function part(x,y){
	this.x = x;
	this.y = y;
}
function tailCrash(){
	alen = tail.length;
	for(i = 0; i < alen - 1; i++){
		if(x == tail[i].x && y == tail[i].y){
			clearInterval(movestart);
		}
	}
}
function generateFood(){
	posx = Math.floor(Math.random() * 60);
	posy = Math.floor(Math.random() * 60);
	if(posx == x && posy == y){
		generateFood();
	}
	for(i = 0; i < tail.length; i++){
		if(tail[i].x == posx && tail[i].y == posy){
			generateFood();
		}
	}
	px = posx;
	py = posy;
	d.fillRect(px*s,py*s,s,s);
}
function debug(){
	console.log(x + " and " + y);
	for(i = 0; i < tail.length; i++){
		console.log(tail[i].x + " and " + tail[i].y);
	}
}