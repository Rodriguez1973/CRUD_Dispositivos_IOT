/*
Proyecto realizado por: José A. Rodríguez López
Fecha: 10/12/2022
*/

//--------------------------------------------------------------------------------------------------
//Solicita un registro a la base de datos.
async function solicitarRegistro(datosRequeridos) {
  //Proporciona una forma fácil de obtener información de una URL sin tener que recargar la página completa. XMLHttpRequest es ampliamente usado en la programación AJAX.
  //A pesar de su nombre, XMLHttpRequest puede ser usado para recibir cualquier tipo de dato, no solo XML, y admite otros formatos además de HTTP (incluyendo file y ftp).
  var ajaxrequest = new XMLHttpRequest()

  ajaxrequest.open(
    'POST',
    'https://www.informaticasc.com/curso22_23/Rodriguez/Dispositivos_IOT/php/consultarRegistro.php',
    true,
  )
  ajaxrequest.setRequestHeader(
    'Content-type',
    'application/x-www-form-urlencoded',
  )
  ajaxrequest.onreadystatechange = async function () {
    //alert(ajaxrequest.readyState + "--" + ajaxrequest.status);
    if (ajaxrequest.readyState === 4 && ajaxrequest.status === 200) {
      let datosLeidos = ajaxrequest.responseText
      if (datosLeidos) {
        mostrarConsulta(datosLeidos)
        habilitarBotones();
      }
    }
  }
  let envio = 'Envio=' + datosRequeridos
  
  ajaxrequest.setRequestHeader(
    'Content-type',
    'application/x-www-form-urlencoded',
  )
  ajaxrequest.send(envio)
}

//--------------------------------------------------------------------------------------------------
//Función que graba o modifica un registro en la base de datos.
function grabarRegistro(nuevoRegistro) {
  let dispositivoIOTJSON =
    '{"' +
    'tipo' +
    '":' +
    '"' +
    sTipo.value +
    '",' +
    '"' +
    'cantidad' +
    '":' +
    '"' +
    iCantidad.value +
    '",' +
    '"' +
    'hora' +
    '":' +
    '"' +
    iHora.value +
    '",' +
    '"' +
    'fecha' +
    '":' +
    '"' +
    iFecha.value +
    '",' +
    '"' +
    'latitud' +
    '":' +
    '"' +
    iLatitud.value +
    '",' +
    '"' +
    'longitud' +
    '":' +
    '"' +
    iLongitud.value +
    '",' +
    '"' +
    'direccion' +
    '":' +
    '"' +
    iDireccion.value +
    '",' +
    '"' +
    'descripcion' +
    '":' +
    '"' +
    iDescripcion.value +
    '"}'

  //Proporciona una forma fácil de obtener información de una URL sin tener que recargar la página completa. XMLHttpRequest es ampliamente usado en la programación AJAX.
  //A pesar de su nombre, XMLHttpRequest puede ser usado para recibir cualquier tipo de dato, no solo XML, y admite otros formatos además de HTTP (incluyendo file y ftp).
  let ajaxrequest = new XMLHttpRequest()

  //Es un nuevo registro.
  if (nuevoRegistro) {
    //Inicializa una solicitud recién creada o reinicializa una existente.
    ajaxrequest.open(
      'POST',
      'https://www.informaticasc.com/curso22_23/Rodriguez/Dispositivos_IOT/php/grabarRegistro.php',
      true,
    )
    //Es una modificación.
  } else {
    //Existe registro a modificar.
    if (iId.value != '') {
      dispositivoIOTJSON =
        '{"' +
        'id' +
        '":' +
        '"' +
        iId.value +
        '",' +
        dispositivoIOTJSON.replace('{', '')

      //Inicializa una solicitud recién creada o reinicializa una existente.
      ajaxrequest.open(
        'POST',
        'https://www.informaticasc.com/curso22_23/Rodriguez/Dispositivos_IOT/php/modificarRegistro.php',
        true,
      )
    }
  }

  if (nuevoRegistro || iId.value != '') {
    //Establece el valor encabezado de una solicitud HTTP. Al usarse, debe llamarse después de llamar a open(), pero antes de llamar a send(). Si se llama a este método varias veces con el mismo encabezado, los valores se combinan en un único encabezado de solicitud.setRequestHeader()
    ajaxrequest.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded',
    )
    //Cambio de estado a listo,
    ajaxrequest.onreadystatechange = function () {
      //alert(ajaxrequest.readyState + '--' + ajaxrequest.status)
      if (ajaxrequest.readyState === 4 && ajaxrequest.status === 200) {
        let respuesta = ajaxrequest.responseText.split('*/*');
        if (respuesta[0] === 'Registro modificado correctamente.') {
          mostrarVentanaEmergente(respuesta[0], 'success')
        } else if(respuesta[0]==='Registro grabado correctamente.'){
          iId.value=respuesta[1]
          mostrarVentanaEmergente(respuesta[0], 'success') 
        } else {
          mostrarVentanaEmergente(respuesta[0], 'error')
        }
      }
    }

    ajaxrequest.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded',
    )

    //Envía la solicitud al servidor.
    let envio = 'Todo=' + dispositivoIOTJSON
    ajaxrequest.send(envio)
  }else{
    mostrarVentanaEmergente("No hay un registro seleccionado para modificar.",'info')
  }
}

//--------------------------------------------------------------------------------------------------
//Función que graba o modifica un registro en la base de datos.
function borrarRegistro() {
  if (iId.value != '') {
    //Proporciona una forma fácil de obtener información de una URL sin tener que recargar la página completa. XMLHttpRequest es ampliamente usado en la programación AJAX.
    //A pesar de su nombre, XMLHttpRequest puede ser usado para recibir cualquier tipo de dato, no solo XML, y admite otros formatos además de HTTP (incluyendo file y ftp).
    let ajaxrequest = new XMLHttpRequest()

    //Inicializa una solicitud recién creada o reinicializa una existente.
    ajaxrequest.open(
      'POST',
      'https://www.informaticasc.com/curso22_23/Rodriguez/Dispositivos_IOT/php/borrarRegistro.php',
      true,
    )
    //Cambio de estado a listo,
    ajaxrequest.onreadystatechange = async function () {
      //alert(ajaxrequest.readyState + '--' + ajaxrequest.status)
      if (ajaxrequest.readyState === 4 && ajaxrequest.status === 200) {
        let respuesta = ajaxrequest.responseText
        if (respuesta === 'Registro borrado correctamente.') {
          borrado=true
          primerRegistro();
          mostrarVentanaEmergente(respuesta, 'success')
        } else {
          mostrarVentanaEmergente(respuesta, 'error')
        }
      }
    }

    ajaxrequest.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded',
    )
    //Envía la solicitud al servidor.
    let envio = 'Id=' + iId.value
    ajaxrequest.send(envio)
    
  }else{
    mostrarVentanaEmergente("No hay un registro seleccionado para borrar.","info")
  }
}