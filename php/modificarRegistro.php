<?php
/*
Proyecto realizado por: José A. Rodríguez López
Fecha: 10/12/2022
Modificar registro de la base de datos.
*/

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
include('conexionBd.php');

//Recibe el array con los datos JSON.
$contenido = $_POST['Todo'];
//Acondicionamiento de la cadena para ser tratada.
$contenido= str_replace("\\","", $contenido);
//Se decodifican los datos JSON.
$array = json_decode($contenido, true);
//Extracción de los datos.
$tmpArray = array();
foreach ($array as $dato){
	$tmpArray[]=$dato;
}
//Si hay error en la conexión.
if ($connect->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
//Si no hay error en la conexión.
} else{
    //Consulta de actualización en la base de datos.
    $query = "UPDATE IOT_JoseantonioR SET tipo = '$tmpArray[1]', 
    cantidad = '$tmpArray[2]', 
    hora = '$tmpArray[3]', 
    fecha = '$tmpArray[4]', 
    latitud = '$tmpArray[5]',
    longitud = '$tmpArray[6]',
    direccion = '$tmpArray[7]',
    descripcion = '$tmpArray[8]'
    WHERE id = '$tmpArray[0]'";

    //Si la consulta se ha realizado correctamente.
	if(mysqli_query($connect,$query)){
       	echo "Registro modificado correctamente.";
	//Si la consulta no se ha realizado correctamente.
    }else{
		echo "Error al modificar el registro.";
	}
    $connect->close();
}