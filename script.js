var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

// function SudokuSolver(board,i,j,n)
// {
//     let n = sudoku[0].size();

//     for(let i =0; i < n ;i++)
//     {
//         for( let j = 0; j < n;j++)
//         {
//             if(sudoku[i][j] == 0)
//             {
//                 for(let val = 1; val <= 9 ; val++)
//                 {
//                     if(isSafe(i,j,sudoku,val,n))
//                     {
//                          sudoku[i][j] = val;
//                          let aagesolpossible = solve(board,i,j,n);
//                          if(aagesolpossible)
//                          {  
//                             FillBoard(board);
//                              return true;
//                          }
//                          else
//                          {
//                             sudoku[i][j] = 0;
//                          }
//                     }
//                 }
//                 return false;
//             }
//         }
//     }
//     return true;
// }

function isValid(board,i,j,num,n) {
    for(let x=0;x<n;x++)
    {
        if(board[i][x] == num || board[x][j] == num)
        {
            return false;
        }
        if(board[3*(i/3)+a/3][3*(j/3)+a%3] == num)
        {
            return false;
        }
    }
    
}
function SudokuSolver(board,i,j,n)
{
     if(i == n)
     {
        FillBoard(board);
        return true;
     }

     if(j == n)
     {
        return SudokuSolver(board,i+1,0,n);
     }

     if (board[i][j] != 0)
     {
        return SudokuSolver(board,i,j+1,n);
     }

     for(let num =1; num <= 9;num++)
     {
        if(isValid(board,i,j,num,n)) {
            board[i][j] = num;
            let subAns = SudokuSolver(board,i,j+1,n);
            if(subAns) {
                return true;
            }
            board[i][j] = 0;
        }
     }
     return false;

}

// function isSafe(i, j,sudoku, val, n)
// {
//     for(let a = 0;a < n;a++)
//     {
//         if(sudoku[i][a] == val || sudoku[a][j] == val)
//         {
//             return false;
//         }
        
//         if(sudoku[3*(i/3)+a/3][3*(j/3)+a%3] == val)
//         {
//             return false;
//         }
//     }
//     return true;
// } 

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};

// function SudokuSolver(board, i, j, n) {
// 	// Write your Code here
// }

