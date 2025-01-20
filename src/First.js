import React, { useState } from 'react';
import "./style.css";
import { useEffect } from 'react';
export const First = () => {
  const [player, setPlayer] = useState(null);
  // const [currentPlayer, setCurrentPlayer] = useState("x");
  let currentPlayer;
  const [comp, setcomp] = useState(null)
  const [result, setresult] = useState(null)
  const [winCount, setWinCount] = useState(0);
  const [lossCount, setLossCount] = useState(0);
  let list = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  let winnerFound = false
  let removeElement = [];
  let addElement = [];
  useEffect(() => {

    const storedWins = localStorage.getItem('winCount');
    const storedLosses = localStorage.getItem('lossCount');
    console.log("Wins:", storedWins);
    console.log(localStorage.getItem("tenuu le"));


    if (storedWins != null) {
      setWinCount(parseInt(storedWins))
    }
    else {
      let storedWins = localStorage.setItem('winCount', 0);
      setWinCount(storedWins)

    }
    if (storedLosses != null) {
      setLossCount(parseInt(storedLosses))
    }
    else {

      let storedLosses = localStorage.setItem("lossCount", 0)
      setLossCount(storedLosses)

    }

  }, []);

  // useEffect(() => {
  //   localStorage.setItem('winCount', winCount);
  // }, [winCount]);

  // useEffect(() => {
  //   localStorage.setItem('lossCount', lossCount);
  // }, [lossCount]);

  const handlePlayerChoice = (choice) => {
    if (choice == "x") {
      setcomp("o")
      setPlayer("x")


    }
    else {
      setcomp("x")
      setPlayer("o")
    }


  };

  let playerWin = null;





  const compFunc = (id) => {
    const possibleResult = [

      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2]

    ]

    let matchFound = true;


    for (let index = 0; index < possibleResult.length; index++) {
      let arr = possibleResult[index]
      console.log(document.getElementById(arr[0]).innerHTML);
      console.log(document.getElementById(arr[1]).innerHTML);
      console.log(document.getElementById(arr[2]).innerHTML);

      if ((document.getElementById(arr[0]).innerHTML == player && document.getElementById(arr[1]).innerHTML == player && document.getElementById(arr[2]).innerHTML == "")) {

        let a = document.getElementsByClassName("box")[arr[2]].innerHTML = comp
        let removeIndex = Number(arr[2])
        let numbers = list.filter((list) => list != removeIndex)
        list = numbers
        matchFound = false
        break;
      }
      else if (document.getElementById(arr[0]).innerHTML == "" && document.getElementById(arr[1]).innerHTML === player && document.getElementById(arr[2]).innerHTML === player) {
        document.getElementById(arr[0].toString()).innerHTML = comp

        let removeIndex = arr[0]
        let numbers = list.filter((list) => list != removeIndex)
        list = numbers
        matchFound = false
        break;
      }
      else if (document.getElementById(arr[0]).innerHTML === player && document.getElementById(arr[1]).innerHTML == "" && document.getElementById(arr[2]).innerHTML === player) {
        document.getElementById(arr[1]).innerHTML = comp

        let removeIndex = arr[1]
        let numbers = list.filter((list) => list != removeIndex)
        list = numbers
        matchFound = false

        break;
      }

    }
    if (matchFound) {

      let randomIndex = Math.floor(Math.random() * list.length);

      let i = Number(list[randomIndex])
      let divs = document.getElementsByClassName("box")[i].innerHTML = comp
      let removeIndex1 = Number(list[randomIndex])
      let numbers = list.filter((list) => list != removeIndex1)
      list = numbers
      console.log("random no:", list[randomIndex])

    }
  }


  const handleGame = (id) => {
    if (id.target.innerHTML == "") {
    

    let a = Number(id.target.id)

    let numbers = list.filter((list) => list != a)
    list = numbers
    //Removing element from list
    const possibleResult = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2]


    ]
    if (!winnerFound) {




      currentPlayer = player

      id.target.innerHTML = currentPlayer




      for (let index = 0; index < possibleResult.length; index++) {
        let divs = document.getElementsByClassName("firstDiv")


        let a = possibleResult[index]
        if (document.getElementById(a[0]).innerHTML == player && document.getElementById(a[1]).innerHTML == player && document.getElementById(a[2]).innerHTML == player) {
          // setCurrentPlayer(player)

          currentPlayer = player
          playerWin = currentPlayer;
          winnerFound = true
          showResult(player)
          break;

        }

      }
    }
    if (!winnerFound) {



      currentPlayer = comp
      if (list.length > 1) {

        compFunc(id)
      }

      for (let index = 0; index < possibleResult.length; index++) {
        let divs = document.getElementsByClassName("firstDiv")

        let a = possibleResult[index]
        if (document.getElementById(a[0]).innerHTML == comp && document.getElementById(a[1]).innerHTML == comp && document.getElementById(a[2]).innerHTML == comp) {
          // setCurrentPlayer(player)

          currentPlayer = comp
          playerWin = currentPlayer;
          winnerFound = true
          let c = localStorage.getItem('lossCount')
          let a = parseInt(c) + 1
          localStorage.setItem("lossCount", a)
          setLossCount(a);
          showResult()
          break;

        }

      }
    }
    console.log("list:" + list.length);

    if (!winnerFound && list.length == 0) {

      setTimeout(() => {
        let m = document.getElementsByClassName("firstDiv")[0]
        m.style.filter = 'blur(1px)';
      }, 2000);

      setresult("Match Tie")
      let finalResult = document.getElementsByClassName("finalResult")[0]
      finalResult.style.animationPlayState = 'running';
      setTimeout(() => {
        restartGame()
      }, 7000);

    }

  }
  }

  const showResult = () => {
    let m = document.getElementsByClassName("firstDiv")[0]
    m.style.filter = 'blur(1px)';

    setresult(currentPlayer + " Winner!")
    let c = localStorage.getItem('winCount')
    let a = parseInt(c) + 1
    localStorage.setItem("winCount", a)
    setWinCount(a);
    let finalResult = document.getElementsByClassName("finalResult")[0]
    finalResult.style.animationPlayState = 'running';
    setTimeout(() => {
      restartGame()
    }, 6000);
  }

  const restartGame = () => {

    // Reset the board (if you have a state for the board, reset it here)
    window.location.reload();
  };
  return (
    <div className='mainDiv'>
      <div className='title'>Tic Tac Toe</div>
      {!player ? (
        <div className='playerChoice'>
          <button onClick={() => handlePlayerChoice("x")}>Choose X</button>
          <button onClick={() => handlePlayerChoice("o")}>Choose O</button>
        </div>
      ) : (
        <>
          <div className='finalResult'>
            <h1>{result}</h1>
          </div>
          <div className='firstDiv'>
            <div className='box' id="0" key={0} onClick={(id) => { handleGame(id) }}></div>
            <div className='box' id="1" key={1} onClick={(id) => { handleGame(id) }}></div>
            <div className='box' id="2" key={2} onClick={(id) => { handleGame(id) }}></div>
            <div className='box' id="3" key={3} onClick={(id) => { handleGame(id) }}></div>
            <div className='box' id="4" key={4} onClick={(id) => { handleGame(id) }}></div>
            <div className='box' id="5" key={5} onClick={(id) => { handleGame(id) }}></div>
            <div className='box ' id="6" key={6} onClick={(id) => { handleGame(id) }}></div>
            <div className='box' id="7" key={7} onClick={(id) => { handleGame(id) }}></div>
            <div className='box' id="8" key={8} onClick={(id) => { handleGame(id) }}></div>
          </div>

          <button className='restartButton' onClick={restartGame}>Restart</button>

          <div className='score'>
            <h1>Win :<span>{winCount}</span></h1>
            <h1>Loss :<span>{lossCount}</span></h1>
          </div>
        </>
      )}
    </div>
  );
}
  ;