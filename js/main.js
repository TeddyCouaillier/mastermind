  /* *************************************************
  *************         INDEX
  ************************************************* */
  /* ------------------------------------------------- 
   * ---------- 1.INITIALISATION DES VAR -------------
   * ---------- 2.INITIALISATION DU JEU  -------------
   * ---------- 3.INSERTION DES COULEURS -------------
   * ---------- 4.COMPARAISON COULEURS   -------------
   * ---------- 5.TRAITEMENT DES CERCLES -------------
   * ---------- 6.NEW GAME               -------------
   * ---------- 7.CLEARS                 -------------
   * ---------- 8.END GAME               -------------
   * -------------------------------------------------
   */


var score = 0;
(function () {
  'use strict';

  /* **************************************
  *******    1.INITIALISATION DES VAR
  ************************************** */
  /* Initialisation des choix
   * Recuperation des class/id
   * Initialisation des couleurs */

  var result = [],
    choice = [], 
    options = document.getElementsByClassName('option'),
    inputRows = document.getElementsByClassName('choice'),
    statContainer = document.getElementsByClassName('stat'),
    secretCercles = document.getElementsByClassName('secret circle'),
    modalOverlay = document.getElementById('modalOverlay'),
    modalMessage = document.getElementById('modalMessage'),
    blop = document.getElementById('blop'),
    win1 = document.getElementById('win1'),
    win2 = document.getElementById('win2'),
    lose1 = document.getElementById('lose1'),
    lose2 = document.getElementById('lose2'),
    scoreSpan = document.getElementById('score'),score = 0,
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
  *******    2.INITIALISATION DU JEU
  ************************************** */
   /* Generation du resultat secret
    * Animation de l'ajout de couleurs
    * Autres options onclic */

  function gameSetup() {
    generateSecretResult(1, options.length+1);

    for (var i = 0; i < options.length; i++) {
      options[i].addEventListener('click', insertChoice, false);
    }

    document.getElementById('newGame').onclick = newGame;
    document.getElementById('delete').onclick = deleteLast;
  }

  /* **************************************
  *******    3.INSERTION DES COULEURS
  ************************************** */
  /* Ajout de la couleur dans l'emplacement choisi
   * Comparaison avec le resultat :
   * win -> affichage du modal gagnant
   * lose -> deplacement aux choix suivants 
   * lose -> affichage du modal perdant */

  function insertChoice() {
    var self = this;
    var slots = inputRows[inputRows.length - rowIncrement].getElementsByClassName('circle');

    slots[choice.length].className = slots[choice.length].className + ' pion ' + self.id;

    choice.push(+(self.value));
    setTimeout(function(){
      blop.play();
    },300);
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
  *******  4.COMPARAISON DES COULEURS
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
  *******  5.TRAITEMENT DES CERCLES
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
  *******         6.NEW GAME
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
  *******         7.CLEARS
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
  *******          8.END GAME
  ************************************** */
  /* Creation du resultat
   * Revelation du resultat
   * Fin du jeu
   * Etat du jeu
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

  //Affichage du résultat win-lose (choix aléatoire du GIF)
  function modalStatus(stat){
    var n = Math.floor(Math.random() * 4 + 1);
    var lose_html = '<h2>PERDU</h2><img src="./img/lose'+n+'.gif" class="rounded shadow"><br><br> <button class="btn btn-light" id="hideModal">OK</button> <button id="restartGame" class="btn btn-light">Restart</button>';
    var win_html = '<h2>GAGNE</h2><img src="./img/win'+n+'.gif" class="rounded shadow"><br><br> <button class="btn btn-light" id="hideModal">OK</button> <button id="restartGame" class="btn btn-light">Restart</button>';
    return (stat ? win_html : lose_html);
  }

  //Animations sonores (choix aléatoire du son)
  function playSound(test_state,alea_sound){
    if(test_state === true)
      return alea_sound === 1 ? win1.play() : win2.play();
    else
      return alea_sound === 1 ? lose1.play() : lose2.play();
  }

  //Calcul du score par partie gagnée
  function scoreFinal(score,row,level){
    switch(level){
      case 4:
        score += 45 - row*5;
        break;
      case 5:
        score += 90 - row*10;
        break;
      case 6:
        score += 180 - row*20;
        break;
      default:
        score += 0;
    }
    return score;
  }

  //Etat du jeu (Affichage du modal, animation sonore,traitement du score)
  function gameState(state) {
    gameOver();
    document.getElementsByTagName('body')[0].className = state;
    modalOverlay.className = state;
    var sound_state = Math.floor(Math.random()*2)+1;
    if (state === 'won') {
      //Traitement et affichage du score
      score = scoreFinal(score,rowIncrement,options.length);
      scoreSpan.innerHTML = score;
      //Animation du son
      playSound(true, sound_state);
      //Affichage du message
      modalMessage.innerHTML = modalStatus(true);
      document.getElementById('restartGame').onclick = newGame;
      document.getElementById('hideModal').onclick = hideModal;
      
    } else{
      //Traitement et affichage du score
      score -= 25;
      scoreSpan.innerHTML = score;
      //Animation du son
      playSound(false, sound_state);
      //Affichage du message
      modalMessage.innerHTML = modalStatus(false);
      document.getElementById('restartGame').onclick = newGame;
      document.getElementById('hideModal').onclick = hideModal;
    }
  }

  gameSetup(); 
}());

