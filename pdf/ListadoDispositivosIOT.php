<?php
require('fpdf.php');
class PDF extends FPDF
{
   //Cabecera de página
	function Header()
	{
		//Logotipo
		$this->Image("../images/JARL_Logo.jpg", 5, 5, 30, 30, "JPG");
    	//Arial bold 24
	    $this->SetFont('Arial', 'B', 24);
		// Posición: a 1,5 cm del final
    	$this->SetX(75);
  		$this->Cell(160,10,utf8_decode('Listado Dispositivos IOT'),0,0,'C');
		$this->Ln();
		$this->Cell(70);
		$this->SetFillColor(255,255,255);
		$this->SetX(55);
		$this->Cell(160,10,utf8_decode('¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯'),0,0,'C',True);
      	//Salto de línea
		$this->Ln(15);
	}

	// Pie de página
	function Footer()
	{
    	// Posición: a 1,5 cm del final
    	$this->SetY(-15);
    	// Arial italic 8
    	$this->SetFont('Arial','I',12);
    	// Número de página
    	$this->Cell(0,10,'Dispositivos IOT' ,0,0,'C');
	   	$this->SetFont('Arial','I',8);
	   	$this->Cell(0,10,'  Pg.: '.$this->PageNo() ,0,0,'C');
	}
}

$w=array(15,27,20,37,37,140);	//Ancho de las celdas de la tabla.
$alturafila=8;	//Altura de la fila.
 
//Creación del objeto de la clase heredada
$pdf=new PDF('L');
$pdf->SetMargins(10, 15 , 20);
$pdf->AddPage();
$pdf->SetFillColor(250,176,231);
$pdf->Ln(5);
$pdf->SetFont('Arial','B',10);
$pdf->SetDrawColor(0,80,180);
$pdf->SetTextColor(0,143,7);
//Ancho del borde (1mm)
$pdf->SetLineWidth(1);

$pdf->Cell($w[0],$alturafila,utf8_decode('Id'),1,0,'C',True);
$pdf->Cell($w[1],$alturafila,utf8_decode('Tipo'),1,0,'C',True);
$pdf->Cell($w[2],$alturafila,utf8_decode('Cantidad'),1,0,'C',True);
$pdf->Cell($w[3],$alturafila,utf8_decode('Latitud'),1,0,'C',True);
$pdf->Cell($w[4],$alturafila,utf8_decode('Longitud'),1,0,'C',True);
$pdf->Cell($w[5],$alturafila,utf8_decode('Dirección'),1,1,'C',True);

$pdf->SetFont('Arial','',10);
$pdf->SetDrawColor(0,80,180);
$pdf->SetFillColor(230,230,0);
$pdf->SetTextColor(0,0,0);
//Ancho del borde (0.2mm)
$pdf->SetLineWidth(0.2);

function cabecera($pdf){
	$pdf->SetMargins(10, 15 , 20);
	$pdf->SetFillColor(250,176,231);
	$pdf->Ln(5);
	$pdf->SetFont('Arial','B',10);
	$pdf->SetDrawColor(0,80,180);
	$pdf->SetTextColor(0,143,7);
	// Ancho del borde (1mm)
	$pdf->SetLineWidth(1);
	$w=array(15,27,20,37,37,140);	//Ancho de las celdas de la tabla.
	$alturafila=8;	//Altura de la fila.
	
	$pdf->Cell($w[0],$alturafila,utf8_decode('Id'),1,0,'C',True);
	$pdf->Cell($w[1],$alturafila,utf8_decode('Tipo'),1,0,'C',True);
	$pdf->Cell($w[2],$alturafila,utf8_decode('Cantidad'),1,0,'C',True);
	$pdf->Cell($w[3],$alturafila,utf8_decode('Latitud'),1,0,'C',True);
	$pdf->Cell($w[4],$alturafila,utf8_decode('Longitud'),1,0,'C',True);
	$pdf->Cell($w[5],$alturafila,utf8_decode('Direccion'),1,1,'C',True);
	
	$pdf->SetFont('Arial','',10);
	$pdf->SetDrawColor(0,80,180);
	$pdf->SetFillColor(157,165,243);
	$pdf->SetTextColor(0,0,0);
	//Ancho del borde (0.2mm)
	$pdf->SetLineWidth(0.2);
}

include '../php/conexionBd.php';
if ($connect->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
} else {
    $sql = "select * from IOT_JoseantonioR order by id";
    $resultado = mysqli_query($connect, $sql);

    if (!$resultado) {
        echo "Error";
    } else {
		$pintaFondo='True';
		$nlinea=0;
		$pdf->SetFillColor(157,165,243);
        while ($fila = mysqli_fetch_row($resultado)) {
			$pdf->Cell($w[0],$alturafila,utf8_decode($fila[0]),1,0,'L',$pintaFondo);
			$pdf->Cell($w[1],$alturafila,utf8_decode($fila[1]),1,0,'L',$pintaFondo);
			$pdf->Cell($w[2],$alturafila,utf8_decode($fila[2]),1,0,'L',$pintaFondo);
			$pdf->SetFont('Arial','B',10);
			$pdf->Cell($w[3],$alturafila,utf8_decode($fila[5]),1,0,'L',$pintaFondo);
			$pdf->Cell($w[4],$alturafila,utf8_decode($fila[6]),1,0,'L',$pintaFondo);
			$pdf->SetFont('Arial','',10);
			$pdf->Cell($w[5],$alturafila,utf8_decode($fila[7]),1,0,'L',$pintaFondo);
			$pdf->Ln();
			if(	$pintaFondo=='True'){	$pintaFondo='';}else{$pintaFondo='True';}
			$nlinea=$nlinea+1;
			//Añadir página
			if($nlinea>16){$nlinea=0;$pdf->AddPage();
				cabecera($pdf);
			}
	     }
	} 

	mysqli_free_result($resultado);
	$pdf->Ln();
	$filename="Dispositivos_IOT.pdf";
	$pdf->Output($filename,"D");
}
?>