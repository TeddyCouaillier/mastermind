<!DOCTYPE html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Mastermind</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, user-scalable=no">

    <link type="text/css" rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">


    <link rel="stylesheet" href="css/main.css">
</head>

<body>
            <div class="text-center">
            <button id="newGame" class="btn m-3 yellow font-weight-bold shadow">Restart</button>

        <div class="d-flex flex-row justify-content-center ">
            <!-- ||||||||||||||||||||||||||||||||||||||
            ||||||||||      ETAT DU JEU
            ||||||||||||||||||||||||||||||||||||||| -->
            <div id="hints" class="d-flex flex-column justify-content-end pb-3 shadow">
                <?php
                    for($i = 0 ; $i < 8 ; $i++){
                        echo '<div class="hint mx-2">
                        <div class="d-flex justify-content-around mb-1">
                            <div class="js-hint-socket socket"></div>
                            <div class="js-hint-socket socket ml-1"></div>
                        </div>
                        <div class="d-flex justify-content-around mt-1">
                            <div class="js-hint-socket socket "></div>
                            <div class="js-hint-socket socket ml-1"></div>
                        </div>
                    </div>';
                    }
                ?>
            </div>

            <!-- ||||||||||||||||||||||||||||||||||||||
            ||||||||||      TABLE DU JEU
            ||||||||||||||||||||||||||||||||||||||| -->
            <div id="guesses" class="shadow">
                <!-- Resultat -->
                <div class="pb-2 code">
                    <div class="secret socket shadow m-1">?</div>
                    <div class="secret socket shadow m-1">?</div>
                    <div class="secret socket shadow m-1">?</div>
                    <div class="secret socket shadow m-1">?</div>
                </div>
                <!-- Choix joueur -->
                <?php 
                for($i = 0 ; $i < 8 ; $i++){
                    echo '
                    <div class="guess">
                      <div class="socket shadow m-1"></div>
                      <div class="socket shadow m-1"></div>
                      <div class="socket shadow m-1"></div>
                      <div class="socket shadow m-1"></div>
                    </div>';
                }
            ?>
            </div>
        </div>



        <div id="options" class="container py-2 my-0 text-center">
            <button value="1" id="green" class="btn mx-1 shadow option green"></button>
            <button value="2" id="purple" class="btn mx-1 shadow option purple"></button>
            <button value="3" id="red" class="btn mx-1 shadow option red"></button>
            <button value="4" id="yellow" class="btn mx-1 shadow option yellow"></button>
            <button value="5" id="blue" class="btn mx-1 shadow option blue"></button>
            <button value="6" id="brown" class="btn mx-1 shadow option brown"></button><br>
            <button id="delete" class="btn my-2 shadow"><i class="fas fa-reply"></i></button>
        </div>
    

    <div id="modalOverlay">
        <div id="modalMessage" class="p-2">
            <button class="large">OK</button>
            <button class="large primary">Restart</button>
        </div>
    </div>

    <!-- ||||||||||||||||||||||||||||||||||||||
    |||||     DECLARATION DES SCRIPTS
    ||||||||||||||||||||||||||||||||||||||| -->
    <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" 
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>

</body>

</html>