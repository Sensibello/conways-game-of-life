// Conways Game of Life in Pure JS - no library //

// Create grid - make two dimensional array for grid of cells to be stored. Vanilla JS doesn't support multi dimensional arrays so to get around this I can use an element, because each element in an array can be any kind of variable (including an array); ex - an array of 50 elements where each of those would have another 50 elements, which would result in a 50 x 50 cell grid I can work with //

var gridHeight = 400;
var gridWidth = 400;
var theGrid = createArray(gridWidth);
var mirrorGrid = createArray(gridWidth);
var c = document.getElementById("karliCanvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "#FF0000";


//Step 1 - this function creates array with n elements and places empty array in each using a FOR loop

function createArray(rows) { 
    var arr=[];
    for(var i=0; i < rows;i++){
        arr[i]=[]
    }
    return arr;
}

//step 1.5 - call to this function and assigning its output with a variable 

var theGrid = creatArray(gridWidth);
// gridWidth is variable defined above, this states how big I want grid to be 

//step 2 - putting stuff in the grid. theGrid is a global variable. Using math.random() we return a floating point number in between 0-1. Convert this to a 1 or 0 to fill the cells with.

function fillRandom() { // fills grid randomly
    for(var j=0;j<gridHeight;j++) {//iterate through rows
    for(var k=0;k<gridWidth;k++){ //iterate through columns
    var rawRandom = Math.random();//gets random raw number
    var improvedNUm = (rawRandom*2);//converting it into an int
    var randomBinary = Math.floor(improvedNum);
    if(randomBinary === 1) {
        theGrid[j][k]=1;
    } else {
        theGrid[j][k] = 0;
}
}
}
}

// step 3 - drawing grid on screen. Dawing a single pixel on a Canvas, make it work with drawGrid function

function drawGrid() { //drawing contents of grid and putting on canvas
var c = document.getElementById("karliCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(0,0,400,400); //clear canvas before each redraw
for (var j = 1; j < gridHeight;j++){ //iterate through rows
for (var k = 1; k < gridWidth;k++){ //iterate through columns
if (theGrid[j][k] === 1) {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(j,k,1,1);
}
}
}
}

// step 4 - updating the grid; apply game rules to current grid state, switch cells on or off aka game logic. Read current state of the grid from the Canvas, update theGrid array while referencing game-grid on the screen. Update entire array. Redraw the Canvas. Repeat. 

function updateGrid() { //perform one iteration of grid update

    for (var j = 1; j < gridHeight – 1; j++) { //iterate through rows    
    for (var k = 1; k < gridWidth – 1; k++) { //iterate through columns    
    var totalCells = 0;
    
    //adding of total values for the surrounding cells
    
    totalCells += theGrid[j – 1][k – 1]; //top left    
    totalCells += theGrid[j – 1][k]; //top center    
    totalCells += theGrid[j – 1][k + 1]; //top right    
    totalCells += theGrid[j][k – 1]; //middle left    
    totalCells += theGrid[j][k + 1]; //middle right    
    totalCells += theGrid[j + 1][k – 1]; //bottom left    
    totalCells += theGrid[j + 1][k]; //bottom center    
    totalCells += theGrid[j + 1][k + 1]; //bottom right
    
    //make the rules apply to each cell. We don't break the law here.
    
    if (theGrid[j][k] === 0) {    
    switch (totalCells) {    
    case 3:    
    mirrorGrid[j][k] = 1; //if cell is dead and has 3 buddies, switch it on    
    break;    
    default:    
    mirrorGrid[j][k] = 0; //otherwise leave it dead and gone *sad face*    
    }
    
    } else if (theGrid[j][k] === 1) { //apply these rules to living cells    
    switch (totalCells) {    
    case 0:    
    case 1:    
    mirrorGrid[j][k] = 0; //die from being alone    
    break;    
    case 2:    
    case 3:    
    mirrorGrid[j][k] = 1; //carry on with life    
    break;    
    case 4:    
    case 5:    
    case 6:    
    case 7:    
    case 8:    
    mirrorGrid[j][k] = 0; //die of over population     
    break;    
    default:    
    mirrorGrid[j][k] = 0; //    
    }    
    }    
    }    
    }    
    //copying mirrorGrid to theGrid
    
    for (var j = 0; j < gridHeight; j++) { //iterate through rows    
    for (var k = 0; k < gridWidth; k++) { //iterate through columns    
    theGrid[j][k] = mirrorGrid[j][k];
    
    }    
    }    
    }

// step 5 - making the game loop. sweet. we're almost done! Goal is to run the updateGrid() and drawGrid() functions in a loop so the game board will keep updating forever and ever. We're going to use requestAnimationFrame() because it makes browser screen update whenever called upon. This makes function run the game loop infinitely. 


function tick() { //main loop
    drawGrid();    
    updateGrid();    
    requestAnimationFrame(tick);
    
}
// when tick function called, it draws current state, then updates, then tells browser to update the screen, and then calls again on itself to repeat the loop. 

