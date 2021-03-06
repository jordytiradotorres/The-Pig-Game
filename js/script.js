let scores,
	roundScore,
	activePlayer,
	gamePlaying = true;

init();

let lastDice;

let dice, diceTwo;

document.querySelector(".btn--roll").addEventListener("click", () => {
	if (gamePlaying) {
		// numero aleatorio
		dice = Math.floor(Math.random() * 6) + 1;
		diceTwo = Math.floor(Math.random() * 6) + 1;

		// mostrar el resultado
		let diceDOM = document.querySelector(".dice");
		let diceDOMTwo = document.querySelector(".dice-two");

		diceDOM.style.display = "block";
		diceDOM.src = `images/dice-${dice}.png`;

		diceDOMTwo.style.display = "block";
		diceDOMTwo.src = `images/dice-${diceTwo}.png`;

		// si el dado tira 2 veces seguidas 6, el jugador pierde la puntuacion total
		if (dice === 6 && lastDice === 6) {
			scores[activePlayer] = 0;

			document.getElementById("score--" + activePlayer).textContent = "0";

			message(dice);

			nextPlayer();
		}
		// si el dado tira diferente de 1 suma la puntuacion de lo contrario es turno del siguiente jugador
		else if (dice !== 1 && diceTwo !== 1) {
			// add score
			roundScore += dice + diceTwo;

			document.querySelector(
				"#current--" + activePlayer
			).textContent = roundScore;
		} else if (dice === 1 || diceTwo === 1) {
			scores[activePlayer] = 0;
			document.getElementById("score--" + activePlayer).textContent = "0";

			message();

			nextPlayer();
		} else {
			// next player
			nextPlayer();
		}

		lastDice = dice;
	}
});

// button hold
document.querySelector(".btn--hold").addEventListener("click", () => {
	if (gamePlaying) {
		// agregamos la puntuacion actual a la global
		scores[activePlayer] += roundScore;

		// actualizamos la UI
		document.getElementById("score--" + activePlayer).textContent =
			scores[activePlayer];

		let inputScore = document.getElementById("input-score").value;

		let winningScore;
		if (inputScore) {
			winningScore = inputScore;
		} else {
			winningScore = 100;
		}

		// comprobamos si el jugador gano el juego
		if (scores[activePlayer] >= winningScore) {
			document.getElementById("name--" + activePlayer).textContent =
				"Winner";

			// ocultamos el dado nuevamente
			document.querySelector(".dice").style.display = "none";

			// agregamos la clase winner
			document
				.querySelector(".player--" + activePlayer)
				.classList.add("player--winner");
			// eliminamos la clase active
			document
				.querySelector(".player--" + activePlayer)
				.classList.remove("player--active");

			gamePlaying = false;
		} else {
			// siguiente jugador
			nextPlayer();
		}
	}
});

function message() {
	let p = document.querySelector(".number-dice");
	p.textContent = `You rolled 1 or 2 times 6`;
	p.style.transform = "translateX(0px)";

	setTimeout(() => {
		p.style.transform = "translateX(-300px)";
	}, 700);
}

function nextPlayer() {
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

	roundScore = 0;

	document.getElementById("current--0").textContent = 0;
	document.getElementById("current--1").textContent = 0;

	document.querySelector(".player--0").classList.toggle("player--active");
	document.querySelector(".player--1").classList.toggle("player--active");

	// ocultamos el dado cuando salga 1
	document.querySelector(".dice").style.display = "none";
	document.querySelector(".dice-two").style.display = "none";
}

// function init
function init() {
	gamePlaying = true;

	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;

	document.querySelector(".dice").style.display = "none";
	document.querySelector(".dice-two").style.display = "none";

	document.getElementById("score--0").textContent = "0";
	document.getElementById("score--1").textContent = "0";

	document.getElementById("current--0").textContent = "0";
	document.getElementById("current--1").textContent = "0";

	document.getElementById("name--0").textContent = "Player 1";
	document.getElementById("name--1").textContent = "Player 2";

	document.querySelector(".player--0").classList.remove("player--winner");
	document.querySelector(".player--1").classList.remove("player--winner");

	document.querySelector(".player--0").classList.remove("player--active");
	document.querySelector(".player--1").classList.remove("player--active");

	document.querySelector(".player--0").classList.add("player--active");
}

// btn-new
document.querySelector(".btn--new").addEventListener("click", init);
