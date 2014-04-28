<?php

class DatabaseController{
	private static $dbh = "";
	private static $hostname = "fullyawesome-166006.mysql.binero.se";
	private static $dbname = "166006-fullyawesome";
	private static $user = "166006_jh40220";
	private static $pass = "kakalaxus75x";
	
	
	public function createConnection(){	
		try {
		    self::$dbh = new PDO("mysql:host=" . self::$hostname . ";dbname=" . self::$dbname . "", self::$user, self::$pass);
			self::$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);		
			
			return $dbh;
		} 
		catch (PDOException $e) {
			throw $e;
		}
	}
	
	public function insertNewUser($username, $password){
		try{
			$this->createConnection();	
		}
		catch (PDOException $e){
			return "Ett fel uppstog i databashanteringen." . $e->getMessage();
		}
		
		$sql = "INSERT INTO Users (Username,Password) VALUES (:username,:password)";	
		$query = self::$dbh->prepare($sql);
		$query->execute(array(":username"=>$username,
							  ":password"=>$password));
							  
		self::$dbh = null;
							  
		return "Databasqueryn verkar ha lyckats!";
	}
	
	public function updateUser(){
		//TODO: Fix update functionality
	}
	
	public function deleteUser(){
		//TODO: Fix delete functionality
	}
}



$dbc = new DatabaseController();

if(isset($_POST["username"]) && isset($_POST["password"])){
	echo $dbc->insertNewUser($_POST["username"], $_POST["password"]);
}

if(isset($_POST["title"]) && isset($_POST["blogpost"])){
	echo "Post av blogginlägg funkar.";
}



