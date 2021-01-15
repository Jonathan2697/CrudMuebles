<?php namespace App\Controllers;

	use App\Models\Muebles;

class Muebleria extends BaseController
{
	public function agregarMuebles() {

		$data = array("nombre" => $_POST['mueble'],
					  "tipo" => $_POST['tipo'],
					  "costov" => $_POST['costov'],
					  "costoc" => $_POST['costoc'],
					  "fecha" => $_POST['fecha'],
					);
		$model =  new Muebles();
		echo $exito = $model->agregarMueble($data);
	}

	public function obtenerTodosLosMuebles(){
		$model =  new Muebles();
		$datos = $model->obtenerTodosLosMueblesModel();

		echo json_encode($datos);
	}

	public function eliminaMueble(){
		$model =  new Muebles();
		$datos = array("id_mueble" => $_POST['idMueble']);
		echo $model->eliminaMueble($datos);

	}

	public function obtenerDatosUpdate() {
		$model =  new Muebles();
		$data = array('id_mueble' => $_POST['idMueble']);
		echo $model->obtenerDatosUpdate($data);
	}

	public function actualizarMueble() {
		$model =  new Muebles();
		$data = array('id_mueble' => $_POST['idMueble'],
					  'nombre' => $_POST['muebleu'],
					  'tipo' => $_POST['tipou'],
					  'costov' => $_POST['costovu'],
					  'costoc' => $_POST['costocu'],
					  'fecha' => $_POST['fechau']
					);
		echo $model->actualizarMueble($data);
	}
	//--------------------------------------------------------------------

}
