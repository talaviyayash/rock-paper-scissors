const choiceElement = document.getElementById("pick-your-choice");
const totalRoundElement = document.getElementById("total-round");
const choiceRoundElement = document.getElementById("Choice-Howmany-Round");
const totalRoundWindElement = document.getElementById("total-round-win");
const currentRoundElement = document.getElementById("current-round");
const imgContainerElement = document.getElementById("img-container");
const restartAllThingElement = document.getElementById("restartAllThing");
const getRoundElement = document.getElementById("round-get");
const btnChoiceElement = document.getElementById("choice");
const containerElement = document.getElementById("container");
const tbodyElement = document.getElementById("tbody");
const tableElement = document.getElementById("table-container");
const goToNextRoundElement = document.getElementById("next-round");
const arrayPosssiblity = ["rock", "paper", "scissors"];
arrayPosssiblity.forEach((val) => {
  btnChoiceElement.innerHTML =
    btnChoiceElement.innerHTML +
    `<button id="${val}" onclick="choiceClick(event)">${val}</button>`;
});
const stateManage = {
  currentRound: 0,
  selectedBySystem: "",
  selectedByUser: "",
  totalRound: 0,
  totalRoundWin: 0,
  totalRoundDraw: 0,
  totalRoundlosses: 0,
};
const history = [];
containerElement.style.display = "none";
function choiceClick(event) {
  // goToNextRoundElement.disabled = false;
  arrayPosssiblity.forEach((val) => {
    document.getElementById(val).disabled = true;
  });
  restartAllThingElement.disabled = true;
  stateManage.selectedByUser = event.target.innerHTML;
  let img = document.createElement("img");
  img.src = `img/blue-${event.target.id}.png`;
  imgContainerElement.innerHTML = "";
  imgContainerElement.appendChild(img);
  choiceElement.innerHTML =
    "Please wait for sometime while other player is chossing...";
  setTimeout(() => {
    whoWinThisRound(Math.floor(Math.random() * 3));
  }, 1000);
}

function whoWinThisRound(selected) {
  stateManage.selectedBySystem = arrayPosssiblity[selected];
  let img = document.createElement("img");
  img.src = `img/red-${stateManage.selectedBySystem}.png`;
  imgContainerElement.appendChild(img);
  if (stateManage.selectedBySystem == stateManage.selectedByUser) {
    choiceElement.innerHTML = `Round is draw because your opponent choose :- 
    ${stateManage.selectedBySystem}.`;
    ++stateManage.totalRoundDraw;
    addToHistory("draw");
  } else if (
    (stateManage.selectedByUser == "rock" &&
      stateManage.selectedBySystem == "scissors") ||
    (stateManage.selectedByUser == "paper" &&
      stateManage.selectedBySystem == "rock") ||
    (stateManage.selectedByUser == "scissors" &&
      stateManage.selectedBySystem == "paper")
  ) {
    choiceElement.innerHTML = `You win this round because your opponent choose :- ${stateManage.selectedBySystem}.`;
    ++stateManage.totalRoundWin;
    addToHistory("win");
  } else {
    ++stateManage.totalRoundlosses;
    choiceElement.innerHTML = `You losse this round because your opponent choose :- ${stateManage.selectedBySystem}.`;
    addToHistory("loss");
  }
  totalRoundWindElement.innerHTML = `Total round win :- ${stateManage.totalRoundWin}. <br/> Total round draw :-  ${stateManage.totalRoundDraw}. <br/>
     Total round loss :-  ${stateManage.totalRoundlosses}.`;
  matchOverOrNot();
}

function matchOverOrNot() {
  const ismatchOver =
    stateManage.totalRoundlosses +
      stateManage.totalRoundDraw +
      stateManage.totalRoundWin ==
    stateManage.totalRound;
  if (ismatchOver) {
    let alertString = "";
    if (stateManage.totalRoundWin < stateManage.totalRoundlosses) {
      alertString = `Match is end. You loss by ${
        stateManage.totalRoundlosses - stateManage.totalRoundWin
      } point.`;
    } else if (stateManage.totalRoundWin > stateManage.totalRoundlosses) {
      alertString = `Match is end. You win by ${
        stateManage.totalRoundWin - stateManage.totalRoundlosses
      } point.`;
    } else {
      alertString = `Match is end. Your match is draw.`;
    }
    setTimeout(() => {
      restartAllThingElement.disabled = false;
      alert(alertString);
      choiceElement.innerHTML = alertString;
    }, 500);
    return 0;
  }
  ++stateManage.currentRound;
  stateManage.selectedByUser = "";
  restartAllThingElement.disabled = false;
  goToNextRoundElement.disabled = false;
}

function getTheRoundFromUser() {
  const round = getRoundElement.value;
  if (confirm(`You selected the ${round} round.`)) {
    ++stateManage.currentRound;
    stateManage.totalRound = Number(round);
    containerElement.style.display = "block";
    totalRoundElement.innerHTML = `Total round  :- ${stateManage.totalRound}.`;
    choiceRoundElement.style.display = "none";
    currentRoundElement.innerHTML = `Current round :- ${stateManage.currentRound}.`;
    totalRoundWindElement.innerHTML = `Total round win :- ${stateManage.totalRoundWin} <br/> Total round draw :-  ${stateManage.totalRoundDraw} <br/>
     Total round loss :-  ${stateManage.totalRoundlosses}`;
    tableElement.style.display = "none";
    tbodyElement.innerHTML = "";
    history.length = 0;
  }
}

function restartAllThing() {
  if (confirm("Are you sure you want to restart game ?")) {
    stateManage.currentRound = 0;
    stateManage.selectedByUser = "";
    stateManage.totalRound = 0;
    stateManage.totalRoundWin = 0;
    stateManage.totalRoundDraw = 0;
    stateManage.totalRoundlosses = 0;
    containerElement.style.display = "none";
    choiceRoundElement.style.display = "flex";
    totalRoundWindElement.innerHTML = "";
    imgContainerElement.innerHTML = "";
    arrayPosssiblity.forEach((val) => {
      document.getElementById(val).disabled = false;
    });
    choiceElement.innerHTML = `Pick your choice`;
  }
}

function addToHistory(winOrNot) {
  history.push({
    round: stateManage.currentRound,
    yourChoice: stateManage.selectedByUser,
    opponentChoice: stateManage.selectedBySystem,
    winOrNot,
  });
  if (stateManage.currentRound == 1) {
    tableElement.style.display = "flex";
  }
  tbodyElement.innerHTML = "";
  history.forEach(({ round, yourChoice, opponentChoice, winOrNot }) => {
    tbodyElement.innerHTML =
      tbodyElement.innerHTML +
      `<tr>
            <td>${round}</td>
            <td>${yourChoice}</td>
            <td>${opponentChoice}</td>
            <td>${winOrNot}</td>
          </tr>`;
  });
}

function goToNextRound() {
  choiceElement.innerHTML = "Pick your choice ";
  currentRoundElement.innerHTML = `Current round :-  ${stateManage.currentRound}`;
  arrayPosssiblity.forEach((val) => {
    document.getElementById(val).disabled = false;
  });
  imgContainerElement.innerHTML = "";
  goToNextRoundElement.disabled = true;
}
