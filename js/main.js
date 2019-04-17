(function () {
  'use strict';

  /* **************************************
  *******    INITILISATION DU JEU
  ************************************** */
  /* Initialisation des choix
   * Recuperation de les class/id
   * Initialisation des couleurs */

  var code = [], // Les couleurs disponibles
    choice = [], // Les couleurs choisies
    options = document.getElementsByClassName('option'),
    inputRows = document.getElementsByClassName('choice'),
    hintContainer = document.getElementsByClassName('hint'),
    secretSockets = document.getElementsByClassName('secret socket'),
    modalOverlay = document.getElementById('modalOverlay'),
    modalMessage = document.getElementById('modalMessage'),
    rowIncrement = 1,
    hintIncrement = 1,
    pegs = {
      1: 'green',
      2: 'purple',
      3: 'red',
      4: 'yellow',
      5: 'blue',
      6: 'brown'
    };

  /* **************************************
  *******    INITILISATION DU JEU
  ************************************** */
   /* Generation du code secret
    * Animation de l'ajout de couleurs
    * Autres options onclic */

  function gameSetup() {
    generateSecretCode(1, 7);

    for (var i = 0; i < options.length; i++) {
      options[i].addEventListener('click', insertChoice, false);
    }

    document.getElementById('newGame').onclick = newGame;
    document.getElementById('delete').onclick = deleteLast;
  }

  /* **************************************
  *******    INSERTION DES COULEURS
  ************************************** */
  /* Ajout de la couleur dans l'emplacement choisi
   * Comparaison avec le resultat :
   * win -> affichage du modal gagnant
   * lose -> deplacement aux choix suivants 
   * lose -> affichage du modal perdant */

  function insertChoice() {
    var self = this;
    var slots = inputRows[inputRows.length - rowIncrement].getElementsByClassName('socket');

    slots[choice.length].className = slots[choice.length].className + ' peg ' + self.id; // Insert node into page

    choice.push(+(self.value));

    if (choice.length === 4) {
      if (compare())
        gameState('won');
      else
        rowIncrement += 1;
    }

    if (rowIncrement === inputRows.length + 1 && !compare())
      gameState('lost');
  }

  /* **************************************
  *******  COMPARAISON DES COULEURS
  ************************************** */
  /* Test de la bonne place des couleurs
   * Test de la presence des couleurs
   * return vrai si c'est exact, faux sinon */

  function compare() {
    var isMatch = true;
    var codeCopy = code.slice(0);

    for (var i = 0; i < code.length; i++) {
      if (choice[i] === code[i]) {
        insertPeg('hit');
        codeCopy[i] = 0;
        choice[i] = -1;
      } else
        isMatch = false;
    }

    for (var j = 0; j < code.length; j++) {
      if (codeCopy.indexOf(choice[j]) !== -1) {
        insertPeg('almost');
        codeCopy[codeCopy.indexOf(choice[j])] = 0;
      }
    }

    hintIncrement += 1;
    choice = []; 

    return isMatch;
  }

  /* **************************************
  *******  COMPARAISON DES COULEURS
  ************************************** */
  /* Test de la bonne place des couleurs
   * Test de la presence des couleurs
   * return vrai si c'est exact, faux sinon */
  
  function insertPeg(type) {
    var sockets = hintContainer[hintContainer.length - hintIncrement].getElementsByClassName('js-hint-socket');
    sockets[0].className = 'socket ' + type;
  }

  function deleteLast() {
    if (choice.length !== 0) {
      var slots = inputRows[inputRows.length - rowIncrement].getElementsByClassName('socket');
      slots[choice.length - 1].className = 'socket'; // Insertion du socket dans la page
      choice.pop();
    }
  }

  function newGame() {
    choice = []; // Reset des choix
    clearBoard();
    rowIncrement = 1; // Retour à la ligne 1
    hintIncrement = 1; // Retour à la case 1
    hideModal();
    gameSetup(); // Initialise le jeu
  }

  function hideModal() {
    modalOverlay.className = '';
  }

  function clearBoard() {
    // Nettoie le jeu
    for (var i = 0; i < inputRows.length; i++) {
      inputRows[i].innerHTML = '';
      for (var j = 0; j < 4; j++) {
        var socket = document.createElement('div');
        socket.className = 'socket';
        inputRows[i].appendChild(socket);
      }
    }

    // Nettoie les sockets
    for (var i = 0; i < hintContainer.length; i++) {
      var socketCollection = hintContainer[i].getElementsByClassName('socket');
      for (var j = 0; j < 4; j++) {
        socketCollection[j].className = 'js-hint-socket socket';
      }
    }

    // Reset le code secret
    for (var i = 0; i < secretSockets.length; i++) {
      secretSockets[i].className = 'secret socket';
      secretSockets[i].innerHTML = '?';
    }

    document.getElementsByTagName('body')[0].className = '';
  }

  function generateSecretCode(min, max) {
    for (var i = 0; i < 4; i++)
      code[i] = Math.floor(Math.random() * (max - min)) + min;
  }

  function revealCode() {
    for (var i = 0; i < secretSockets.length; i++) {
      secretSockets[i].className += ' ' + pegs[code[i]];
      secretSockets[i].innerHTML = ''; // Remove "?" from the socket
    }
  }

  function gameOver() {
    for (var i = 0; i < options.length; i++)
      options[i].removeEventListener('click', insertChoice, false);

    revealCode();
  }

  function gameState(state) {
    gameOver();
    document.getElementsByTagName('body')[0].className = state;
    modalOverlay.className = state;

    if (state === 'won') {
      modalMessage.innerHTML = '<h2>You win</h2> <button class="large" id="hideModal">OK</button> <button id="restartGame" class="large primary">Restart</button>';
      document.getElementById('restartGame').onclick = newGame;
      document.getElementById('hideModal').onclick = hideModal;
    } else

      modalMessage.innerHTML = '<img src="./img/lose1.gif"><br><br> <button class="large" id="hideModal">OK</button> <button id="restartGame" class="large primary">Restart</button>';
    document.getElementById('restartGame').onclick = newGame;
    document.getElementById('hideModal').onclick = hideModal;
  }

  gameSetup(); 
}());