<!DOCTYPE html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Mastermind</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, user-scalable=no">

    <link rel="icon" type="image/png" href="img/icon.png" />

    <link type="text/css" rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
        integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">

    <link rel="stylesheet" href="css/main.css">

    <!-- EFFETS SONORES -->
    <audio src="sound/blop.mp3" volume="0.5" id="blop"></audio>
    <audio src="sound/win1.mp3" volume="0.5" id="win1"></audio>
    <audio src="sound/win2.mp3" volume="0.5" id="win2"></audio>
    <audio src="sound/lose1.mp3" volume="0.5" id="lose1"></audio>
    <audio src="sound/lose2.mp3" volume="0.5" id="lose2"></audio>
</head>

<body>
    <div class="container text-center mt-3" id="level">
    <form action="#" method="get">
        <button type="submit" class="btn btn-light text-success mx-2" name="level" value="easy">Easy</button>
        <button type="submit" class="btn btn-light text-secondary mx-2" name="level" value="normal">Normal</button>
        <button type="submit" class="btn btn-light text-danger mx-2" name="level" value="hard">Hard</button>
    </form>
    <hr>
</div>
    <?php 
    if(isset($_GET['level'])){
        if($_GET['level'] == "easy" || $_GET['level'] == "normal" || $_GET['level'] == "hard"){
    ?>
    <div class="row mx-auto" id="main">
        <div class="col-lg-4 d-flex flex-column justify-content-center align-items-center text-center">
            
                <p><u> Point par niveau : </u><br>
                <small><ul class="list-group my-1">
                    <li class="list-group-item">Easy : x0.5</li>
                    <li class="list-group-item">Normal : x1</li>
                    <li class="list-group-item">Hard : x2</li>
        </ul></small><br>
                <i>Réinitialisation des points lors d'un changement de niveau</i>
        </p>



        </div>
        <div class="col">
            <div class="text-center">
                <!-- Restart game -->
                <button id="newGame" class="btn m-3 yellow font-weight-bold shadow">Restart</button>
                <h4>Score : <strong><span id="score">0</span></strong></h4>

                <div class="d-flex flex-row justify-content-center ">
                    <!-- //////////////////////////////////////
                    /////           ETAT DU JEU
                    /////////////////////////////////////// -->
                    <div id="status" class="d-flex flex-column justify-content-end pb-3 shadow">
                        <?php
                            for($i = 0 ; $i < 8 ; $i++){
                                echo '<div class="stat mx-2">
                                    <div class="d-flex justify-content-around mb-1">
                                        <div class="stat-circle circle"></div>
                                        <div class="stat-circle circle"></div>
                                    </div>
                                    <div class="d-flex justify-content-around mt-1">
                                        <div class="stat-circle circle"></div>
                                        <div class="stat-circle circle"></div>
                                    </div>
                                </div>';
                            }
                        ?>
                    </div>

                    <!-- //////////////////////////////////////
                    /////           TABLE DU JEU
                    /////////////////////////////////////// -->
                    <div id="choices" class="shadow">
                        <!-- Resultat -->
                        <div class="pb-2 result">
                            <div class="secret circle shadow m-1">?</div>
                            <div class="secret circle shadow m-1">?</div>
                            <div class="secret circle shadow m-1">?</div>
                            <div class="secret circle shadow m-1">?</div>
                        </div>
                        <!-- Choix joueur -->
                        <?php 
                            for($i = 0 ; $i < 8 ; $i++){
                                echo '
                                <div class="choice">
                                <div class="circle shadow m-1"></div>
                                <div class="circle shadow m-1"></div>
                                <div class="circle shadow m-1"></div>
                                <div class="circle shadow m-1"></div>
                                </div>';
                            }
                        ?>
                    </div>
                </div>

                <!-- //////////////////////////////////////
                /////         CHOIX DU JOUEURS
                /////////////////////////////////////// -->
                <div id="options" class="container py-2 my-0 text-center">
                    <button value="1" id="green" class="btn mx-1 shadow option green"></button>
                    <button value="2" id="purple" class="btn mx-1 shadow option purple"></button>
                    <button value="3" id="red" class="btn mx-1 shadow option red"></button>
                    <button value="4" id="yellow" class="btn mx-1 shadow option yellow"></button>
                    <?php 
                    if($_GET['level'] == "normal" || $_GET['level'] == "hard")
                        echo '<button value="5" id="blue" class="btn mx-1 shadow option blue"></button>';
                    if($_GET['level'] == "hard")
                        echo '<button value="6" id="brown" class="btn mx-1 shadow option brown"></button>';
                    ?>
                    <br><button id="delete" class="btn my-2 shadow"><i class="fas fa-reply"></i></button>
                </div>

                <!-- //////////////////////////////////////
                /////             RESULTAT
                /////////////////////////////////////// -->
                <div id="modalOverlay">
                    <div id="modalMessage" class="p-2">
                        <button class="large">OK</button>
                        <button class="large primary">Restart</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4 d-flex justify-content-center align-items-center">
            <!-- //////////////////////////////////////
            /////          REGLES DU JEU
            /////////////////////////////////////// -->
            <div class="m-2 bg-light text-center p-3 rules">
                <p class="">
                    <h2>Regle du jeu</h2>
                    Le but du jeu est de deviner le code secret en plusieurs étapes. <br>
                    Il faut placer les bonnes couleurs à la bonne position. <br><br>
                    Signifie qu'un pion est de la bonne couleur et bien placé.<br>
                    <img src="./img/hit.png" class="rounded-circle"><br><br>
                    Signifie qu'un pion est de la bonne couleur mais mal placé.<br>
                    <img src="./img/almost.png" class="rounded-circle"><br><br>
                    <small>Il n'y a aucun indice sur la position du pion.</small>
                </p>
            </div>
        </div>
    </div>
    <?php 
        }else{
            echo '<div class="text-center"><img src="./img/404.gif" class="img-fluid"></div>';
        }
    } ?>

    <!-- //////////////////////////////////////
    /////     DECLARATION DES SCRIPTS
    /////////////////////////////////////// -->
    <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
    </script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>

</body>

</html>