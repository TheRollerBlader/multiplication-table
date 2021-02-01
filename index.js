let input = document.querySelector("input");
let button = document.querySelector("button");
let label = document.querySelector("label");
let h1 = document.querySelector("h1");
let ul = document.querySelector("ul");
let total = document.querySelector(".total");
let corans = document.querySelector(".corAns");
let r, ran1, ran2;
let ans = [];
let count = 0;
let body = document.querySelector("body");
let done = document.querySelector(".youaredone");
let grey = document.querySelector("#grey");
let congrats = document.querySelector(".congrats");
let btn1 = document.querySelector("#btn1");
let btn2 = document.querySelector("#btn2");
let btn3 = document.querySelector("#btn3");
let btns = document.querySelectorAll(".buttons");
let numberOfProblems = 50;
let isDone = false;
let percent;
let labelNumPb = document.querySelector("#label");
let clickInput = false;
let time = 0;
let timer = document.querySelector(".timer");
let npd = 0;

btn1.addEventListener("click", function () {
  numberProblemButton(25);
  clickInput = true;
});

btn2.addEventListener("click", function () {
  numberProblemButton(50);
  clickInput = true;
});

btn3.addEventListener("click", function () {
  numberProblemButton(100);
  clickInput = true;
});

input.addEventListener("click", function () {
  if (!clickInput) numberProblemButton(25);
});

function numberProblemButton(number) {
  numberOfProblems = number;
  btn3.setAttribute("style", "display:none;");
  btn1.setAttribute("style", "display:none;");
  btn2.setAttribute("style", "display:none;");
  let string = `Number of problems: ${numberOfProblems}`;
  labelNumPb.innerHTML = string;
  tenSec();
}

button.addEventListener("click", () => {
  time = 0;
  if (!isDone) {
    if (input.value === "") {
      input.value = "(not answered)";
    }
    checkAnswer();
    input.value = "";
    count++;
    if (count === numberOfProblems) {
      youAreDone();
    }
    if (!isDone) newQuestion(isDone);
  }
});

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    button.click();
  }
});

function newQuestion(flag) {
  ran1 = Math.round(Math.random() * 8) + 2;
  ran2 = Math.round(Math.random() * 9) + 1;
  r = ran1 * ran2;
  label.innerHTML = `What is ${ran1} x ${ran2}`;
}

function tenSec(num) {
  setInterval(() => {
    time++;
    timer.innerHTML = time;
    if (time === 10) {
      time = 0;
      button.click();
    }
  }, 1000);
}

function checkAnswer() {
  if (parseInt(input.value) === r) {
    ans.push({
      question: `What is ${ran1} x ${ran2}`,
      answer: input.value,
      isCorrect: true,
    });
  } else {
    ans.push({
      question: `What is ${ran1} x ${ran2}`,
      answer: input.value,
      isCorrect: false,
    });
  }
  drawResponse(ans);
}

function drawResponse(ans) {
  ul.innerHTML = "";
  ans.forEach((element) => {
    ul.innerHTML += `<li class="quest" >${element.question}. Your answer is  
        <span class="${element.isCorrect ? "correct" : "incorrect"}">${
      element.answer
    } </span> 
        </li>`;
  });
  totalScore(ans);
}

function totalScore(ans) {
  let correctAns = ans.filter((e) => e.isCorrect === true);
  let score = { total: ans.length, correct: correctAns.length };

  total.innerHTML = score.correct + " / " + score.total;
  percent = Math.round((score.correct / score.total) * 100);
  corans.innerHTML = percent + "%";
}

newQuestion();

function youAreDone() {
  isDone = true;
  done.innerHTML = ` <h1 style="color:#00ff00; position:absolute; top:60%; left:70%; font-size:50px; background-color: grey;" >YOU ARE DONE</h1>`;
  label.innerHTML = "";

  if (percent === 100) {
    congrats.innerHTML = "";
  }
}
