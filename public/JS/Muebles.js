$(document).ready(function(){

	mostrarDatosTablaUsuarios();

	$('#btnAgregarMueble').click(function(){
		$.ajax({
			type:"POST",
			data:$('#frmAgregaMueble').serialize(),
			url:base_url + "/agregarMuebles",
			success:function(respuesta){

				console.log(respuesta);
				if (respuesta > 0) {
					mostrarDatosTablaUsuarios();
					swal("B)", "Se agrego correctamente!!", "success");
				} else {
					swal("XX", "Fallo al agregar!!", "error");
				}
			}
		});

		return false;
	});
});

function mostrarDatosTablaUsuarios() {
	$.ajax({
			url:base_url + "/todosLosMuebles",
			dataType:"JSON",
			success:function(respuesta){

				cadena = '<table class="table table-bordered" id="tablaMuebles">'+
							'<thead>'+
								'<tr align="center">'+
									'<th>Mueble</th>' +
									'<th>Tipo de madera</th>' +
									'<th>Costo de venta</th>' +
									'<th>Costo de Compra</th>' +
									'<th>Fecha</th>' +
									'<th>Editar</th>' +
									'<th>Eliminar</th>' +
								'</tr>'+
							'</thead>'+
							'<tbody>';
				$.each(respuesta, function(i, item) {
					cadena = cadena + "<tr align ='center'>"+
											"<td>" + item.nombre + "</td>" +
											"<td>" + item.tipo + "</td>" +
											"<td>" + item.costov + "</td>" +
											"<td>" + item.costoc + "</td>" +
											"<td>" + item.fecha + "</td>" +
											'<td>'+
												'<span class="btn btn-warning btn-sm" data-toggle="modal" data-target="#modalActualizarMueble" '+
												' onclick="obtenerIdMueble(' + item.id_mueble + ')">'+
													'<span class="fas fa-edit"></span>'+
												'<span>'+
											'</td>' +
											'<td>'+
												'<span class="btn btn-danger btn-sm" onclick="eliminarMueble(' + item.id_mueble + ')">'+
													'<span class="fas fa-trash-alt"></span>'+
												'</span></td>' +
									  "</tr>";
				});
				cadena = cadena + "</tbody></table>";
				$('#tablaCargadaMuebles').html(cadena);
				$("#tablaMuebles").DataTable();
			}
	});

	return false;
}

function eliminarMueble(idMueble) {

	swal({
		title: "¿Estas completamente seguro de realizar esta acción?",
		text: "¡Una vez eliminado no podra ser recuperado!",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	})
	.then((willDelete) => {
		if (willDelete) {
			$.ajax({
				type:"POST",
				dataType:"JSON",
				data:"idMueble=" + idMueble,
				url:base_url + "/eliminarMueble",
				success:function(respuesta) {
					if (respuesta['status']) {
						mostrarDatosTablaUsuarios();
						swal("m¬m", "Se agrego satisfctoriamente!!", "success");
					} else {

						swal("XXX", "No se elimino correctamente!!", "error");
					}
				}
			});
		}
	});

}

function obtenerIdMueble(idMueble) {
	$.ajax({
		type:"POST",
		data:"idMueble=" + idMueble,
		dataType:"JSON",
		url:base_url + "/obtenerMuebleId",
		success:function(respuesta) {
			console.log(respuesta);
			$.each(respuesta, function(i, item) {
				$('#idMueble').val(item.id_mueble);
				$('#muebleu').val(item.nombre);
				$('#tipou').val(item.tipo);
				$('#costovu').val(item.costov);
				$('#costocu').val(item.costoc);
				$('#fechau').val(item.fecha);
			});
		}
	});
}

function actualizarMueble(){
	$.ajax({
			type:"POST",
			data:$('#frmAgregaMuebleu').serialize(),
			url:base_url + "/actualizarMueble",
			success:function(respuesta){

				console.log(respuesta);
				if (respuesta) {
					mostrarDatosTablaUsuarios();
					swal("°U°", "Se actualizo correctamente!!", "success");
				} else {
					swal("XX", "Error al actualizar!!", "error");
				}
			}
		});

		return false;
}
