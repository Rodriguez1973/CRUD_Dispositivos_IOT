<?php
/*
Proyecto realizado por: José A. Rodríguez López
Fecha: 10/12/2022
Conexión a la base de datos.
*/

$host_name = 'localhost';
$database = 's022045b_CiudadI';
$user_name = "s022045b_fer2122";
$password = "21Curso_22"; 

//Conexión a la base da datos.
$connect = mysqli_connect($host_name, $user_name, $password, $database);
//Si existe un error al conectar con la base de datos.
if (mysqli_connect_errno()) {
    echo '<p>"Error: Fallo al conectarse a MySQL debido a: ' .
        mysqli_connect_error() .
        '</p>';
}
?>