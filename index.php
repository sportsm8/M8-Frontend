<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">

        <!-- CSS-Styles -->
        <link rel="stylesheet" type="text/css" href="css/main.css">

        <!-- Javascript -->
        <script src="js/main.js"></script>

        <title>M8 Web-App</title>
    </head>


    <body>

        <h1>Hello World.</h1>
        blablabla<br>blablabla
        <?php echo date('l, F jS, Y'); ?>
        <?php for($i=1;$i<=5;$i++){ ?>
        <li>Menu Item <?php echo $i; ?></li> 
        <?php } ?>

    </body>

</html>
