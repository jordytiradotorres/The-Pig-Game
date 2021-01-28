let scores,
	roundScore,
	activePlayer,
	gamePlaying = true;

init();

let lastDice;

document.querySelector(".btn--roll").addEventListener("click", () => {
	if (gamePlaying) {
		// numero aleatorio
		let dice = Math.floor(Math.random() * 6) + 1;

		// mostrar el resultado
		let diceDOM = document.querySelector(".dice");

		diceDOM.style.display = "block";
		diceDOM.src = `images/dice-${dice}.png`;

		// si el dado tira 2 veces seguidas 6, el jugador pierde la puntuacion total
		if (dice === 6 && lastDice === 6) {
			scores[activePlayer] = 0;

			document.getElementById("score--" + activePlayer).textContent = "0";
			nextPlayer();
		}
		// si el dado tira diferente de 1 suma la puntuacion de lo contrario es turno del siguiente jugador
		else if (dice !== 1) {
			// add score
			roundScore += dice;

			document.querySelector(
				"#current--" + activePlayer
			).textContent = roundScore;
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

		// comprobamos si el jugador gano el juego
		if (scores[activePlayer] >= 100) {
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

function nextPlayer() {
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

	roundScore = 0;

	document.getElementById("current--0").textContent = 0;
	document.getElementById("current--1").textContent = 0;

	document.querySelector(".player--0").classList.toggle("player--active");
	document.querySelector(".player--1").classList.toggle("player--active");

	// ocultamos el dado cuando salga 1
	document.querySelector(".dice").style.display = "none";
}

// function init
function init() {
	gamePlaying = true;

	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;

	document.querySelector(".dice").style.display = "none";

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
