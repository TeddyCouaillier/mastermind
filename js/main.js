function launch(){
  var preload = document.getElementById('preload');
  preload.style.display = "none";
  document.getElementById('main').style.visibility = "visible";
}
  
  /* *************************************************
  *************         INDEX
  ************************************************* */
  /* ------------------------------------------------- 
   * ---------- INITIALISATION DES VAR ---------------
   * ---------- INITIALISATION DU JEU  ---------------
   * ---------- INSERTION DES COULEURS ---------------
   * ---------- COMPARAISON COULEURS   ---------------
   * ---------- TRAITEMENT DES CERCLES ---------------
   * ---------- NEW GAME               ---------------
   * ---------- CLEARS                 ---------------
   * ---------- END GAME               ---------------
   * -------------------------------------------------
   */

(function () {
  'use strict';

  /* **************************************
  *******    INITIALISATION DES VAR
  ************************************** */
  /* Initialisation des choix
   * Recuperation de les class/id
   * Initialisation des couleurs */

  var result = [],
    choice = [], 
    options = document.getElementsByClassName('option'),
    inputRows = document.getElementsByClassName('choice'),
    statContainer = document.getElementsByClassName('stat'),
    secretCercles = document.getElementsByClassName('secret circle'),
    modalOverlay = document.getElementById('modalOverlay'),
    modalMessage = document.getElementById('modalMessage'),
    rowIncrement = 1,
    statIncrement = 1,
    pion = {
      1: 'green',
      2: 'purple',
      3: 'red',
      4: 'yellow',
      5: 'blue',
      6: 'brown'
    };

  /* **************************************
  *******    INITIALISATION DU JEU
  ************************************** */
   /* Generation du resultat secret
    * Animation de l'ajout de couleurs
    * Autres options onclic */

  function gameSetup() {
    generateSecretResult(1, 4);

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
    var slots = inputRows[inputRows.length - rowIncrement].getElementsByClassName('circle');

    slots[choice.length].className = slots[choice.length].className + ' pion ' + self.id; // Insert node into page

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
    var resultCopy = result.slice(0);

    for (var i = 0; i < result.length; i++) {
      if (choice[i] === result[i]) {
        insertPion('hit');
        resultCopy[i] = 0;
        choice[i] = -1;
      } else
        isMatch = false;
    }

    for (var j = 0; j < result.length; j++) {
      if (resultCopy.indexOf(choice[j]) !== -1) {
        insertPion('almost');
        resultCopy[resultCopy.indexOf(choice[j])] = 0;
      }
    }

    statIncrement += 1;
    choice = []; 

    return isMatch;
  }

  /* **************************************
  *******  TRAITEMENT DES CERCLES
  ************************************** */
  /* Insertion
   * Suppression du dernier element
   */
  
  function insertPion(type) {
    var circles = statContainer[statContainer.length - statIncrement].getElementsByClassName('stat-circle');
    circles[0].className = 'circle ' + type;
  }

  function deleteLast() {
    if (choice.length !== 0) {
      var slots = inputRows[inputRows.length - rowIncrement].getElementsByClassName('circle');
      slots[choice.length - 1].className = 'm-1 shadow circle';
      choice.pop();
    }
  }

  /* **************************************
  *******         NEW GAME
  ************************************** */
  /* Clear/Reset des choix
   * Clear/Reset du jeu
   * Replacement au début
   * Cache le modal de victoire/défaite
   * Initialise le nouveau jeu
   * */

  function newGame() {
    choice = [];
    clearBoard();
    rowIncrement = 1; 
    statIncrement = 1; 
    hideModal();
    gameSetup();
  }

  /* **************************************
  *******          CLEARS
  ************************************** */
  /* Function cache du modal de victoire/défaite
   * Function du clear/reset du jeu
   * -> Nettoie le jeu
   * -> Nettoie les cercles
   * -> Reset le resultat
   * -> Changement du background
   * */
  
  function hideModal() {
    modalOverlay.className = '';
  }

  function clearBoard() {
    for (var i = 0; i < inputRows.length; i++) {
      inputRows[i].innerHTML = '';
      for (var j = 0; j < 4; j++) {
        var circle = document.createElement('div');
        circle.className = 'circle shadow m-1';
        inputRows[i].appendChild(circle);
      }
    }

    for (var i = 0; i < statContainer.length; i++) {
      var circleCollection = statContainer[i].getElementsByClassName('circle');
      for (var j = 0; j < 4; j++) {
        circleCollection[j].className = 'stat-circle circle';
      }
    }

    for (var i = 0; i < secretCercles.length; i++) {
      secretCercles[i].className = 'secret circle shadow m-1';
      secretCercles[i].innerHTML = '?';
    }

    document.getElementsByTagName('body')[0].className = '';
  }

  /* **************************************
  *******          END GAME
  ************************************** */
  /* Creation du resultat
   * Revelation du resultat
   * Fin du jeu
   * Etat du jeu
   *  -> Affichage des modals win || lose 
   * */

  function generateSecretResult(min, max) {
    for (var i = 0; i < 4; i++)
    result[i] = Math.floor(Math.random() * (max - min)) + min;
    console.log(result);
  }

  function revealResult() {
    for (var i = 0; i < secretCercles.length; i++) {
      secretCercles[i].className += ' ' + pion[result[i]];
      secretCercles[i].innerHTML = '';
    }
  }

  function gameOver() {
    for (var i = 0; i < options.length; i++)
      options[i].removeEventListener('click', insertChoice, false);

    revealResult();
  }

  function modalStatus(stat){
    var n = Math.floor(Math.random() * 4 + 1);
    console.log(n);
    var lose_html = '<h2>PERDU</h2><img src="./img/lose'+n+'.gif" class="rounded shadow"><br><br> <button class="btn btn-light" id="hideModal">OK</button> <button id="restartGame" class="btn btn-light">Restart</button>';
    var win_html = '<h2>GAGNE</h2><img src="./img/win'+n+'.gif" class="rounded shadow"><br><br> <button class="btn btn-light" id="hideModal">OK</button> <button id="restartGame" class="btn btn-light">Restart</button>';

    return (stat ? win_html : lose_html);
  }

  function gameState(state) {
    gameOver();
    document.getElementsByTagName('body')[0].className = state;
    modalOverlay.className = state;

    if (state === 'won') {
      modalMessage.innerHTML = modalStatus(true);
      document.getElementById('restartGame').onclick = newGame;
      document.getElementById('hideModal').onclick = hideModal;
    } else
      modalMessage.innerHTML = modalStatus(false);
      document.getElementById('restartGame').onclick = newGame;
      document.getElementById('hideModal').onclick = hideModal;
  }

  gameSetup(); 
}());

