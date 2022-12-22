/*
Proyecto realizado por: José A. Rodríguez López
Fecha: 10/12/2022
*/

//-------------------------------------------------------------------------------------------------
//Obtiene la fecha actual.
function obtenerFechaActual() {
  let fecha = new Date() //Fecha actual
  let mes = fecha.getMonth() + 1 //Obtiene el mes
  let dia = fecha.getDate() //Obtiene el día.
  let anio = fecha.getFullYear() //Obtiene el año.
  if (dia < 10) dia = '0' + dia //Agrega cero si es menor de 10
  if (mes < 10) mes = '0' + mes //Agrega cero si es menor de 10
  return anio + '-' + mes + '-' + dia
}

//-------------------------------------------------------------------------------------------------
//Obtiene la fecha actual.
function obtenerHoraActual() {
  let fecha = new Date() //Fecha actual.
  let hora = fecha.getHours() //Obtiene la hora.
  let minutos = fecha.getMinutes() //Obtiene los minutos.
  let segundos = fecha.getSeconds() //Obtiene los segundos.
  if (hora < 10) hora = '0' + hora //Agrega cero si es menor de 10
  if (minutos < 10) minutos = '0' + minutos //Agrega cero si es menor de 10
  if (segundos < 10) segundos = '0' + segundos //Agrega cero si es menor de 10
  return hora + ':' + minutos + ':' + segundos
}

//--------------------------------------------------------------------------------------------------
//Valida los datos del dispositivo IOT.
function validarDatos(evt) {
  let mensaje = ''
  let validado = true
  //Valida el tipo.
  if (sTipo.value == 'Seleccionar') {
    mensaje = 'No existe un tipo seleccionado.'
    validado = false
  }
  //Valida la cantidad.
  if (validado) {
    if (iCantidad.value == '') {
      mensaje = 'No ha introducido ninguna cantidad.'
      validado = false
    } else if (iCantidad.value <= 0) {
      mensaje = 'La cantidad no puede ser negativa o cero.'
      validado = false
    }
  }
  //Valida la hora.
  if (validado) {
    if (iHora.value == '') {
      mensaje = 'No se ha introducido una hora.'
      validado = false
    }
  }
  //Valida la hora si es anterior o igual a la actual.
  if (validado) {
    let fecha = iFecha.value.replaceAll('-', '')
    if (
      fecha == obtenerFechaActual().replaceAll('-', '') &&
      iHora.value.replaceAll(':', '') > obtenerHoraActual().replaceAll(':', '')
    ) {
      mensaje = 'La hora no puede ser superior a la hora actual para la fecha actual.'
      validado = false
    }
  }
  //Valida la fecha.
  if (validado) {
    if (iFecha.value == '') {
      mensaje = 'No se ha introducido una fecha.'
      validado = false
    }
  }
  //Valida fecha anterior o igual a la actual.
  if (validado) {
    let fecha = iFecha.value.replaceAll('-', '')
    if (fecha > obtenerFechaActual().replaceAll('-', '')) {
      mensaje = 'La fecha introducida es posterior a la actual.'
      validado = false
    }
  }
  //Valida la latitud.
  if (validado) {
    if (iLatitud.value == '') {
      mensaje = 'Debe definir la posición del dispositivo haciendo click sobre el mapa.'
      validado = false
    }
  }
  //Valida la longitud.
  if (validado) {
    if (iLongitud.value == '') {
      mensaje = 'Debe definir la posición del dispositivo haciendo click sobre el mapa.'
      validado = false
    }
  }
  //Valida la dirección.
  if (validado) {
    if (iDireccion.value == '') {
      mensaje = 'Debe definir la posición del dispositivo haciendo click sobre el mapa.'
      validado = false
    }
  }
  //Valida la descripción.
  if (validado) {
    if (iDescripcion.value == '') {
      mensaje = 'Debe definir la posición del dispositivo haciendo click sobre el mapa.'
      validado = false
    }
  }
  //Muestra mensaje si no está validado.
  if (!validado) {
    mostrarVentanaEmergente(mensaje, 'error')
  }
  return validado
}
