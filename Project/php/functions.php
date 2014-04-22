<?php

require("medoo.php");

class DatabaseController{
	public function insertNewUser(){
		//TODO: Fix insert functionality	
	}
	
	public function updateUser(){
		//TODO: Fix update functionality
	}
	
	public function deleteUser(){
		//TODO: Fix delete functionality
	}
}

$databaseHandler = new DatabaseController();
$database = new medoo(array(
    'database_type' => 'mysql',
    'database_name' => 'fullyawesome-166006.mysql.binero.se',
    'server' => 'localhost',
    'username' => '166006_jh40220',
    'password' => 'kakalaxus75x'


));

if(isset($_POST["username"]) && isset($_POST["password"])){
	
	
	//TODO: It seems the connection to the DB is not working, maybe check into other options rather than Medoo
		
	$database->insert("Users", array(
	"Username" => $_POST["username"],
	"Password" => $_POST["password"]
	));
}