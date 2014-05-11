<?php

class DatabaseController{
	private static $dbh = "";
	private static $hostname = "fullyawesome-166006.mysql.binero.se";
	private static $localhost = "127.0.0.1";
	private static $dbname = "166006-fullyawesome";
	private static $user = "166006_jh40220";
	private static $pass = "kakalaxus75x";
	private static $session = "";
	
	
	public function createConnection(){	
		try {
		    self::$dbh = new PDO("mysql:host=" . self::$localhost . ";dbname=" . self::$dbname . "", self::$user, self::$pass);
			self::$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);		
			
			return self::$dbh;
		} 
		catch (PDOException $e) {
			throw $e;
		}
	}
	
	public function insertNewUser($username, $password){		
		try{
			if($username == "" || $password == ""){
				throw new PDOException("Du måste ange både användarnamn och lösenord!");
			}
			
			$this->createConnection();	
			
			$sql = "INSERT INTO Users (Username,Password) VALUES (:username,:password)";	
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username);
		  	$query->bindParam(":password", $password);
			$query->execute();
							  
			self::$dbh = null;
							  
			return "Databasqueryn lyckades";
		}
		catch (PDOException $e){
			return "Databasqueryn misslyckades. " . $e->getMessage();
		}
	}
	
	public function updateUser(){
		//TODO: Fix update functionality
	}
	
	public function deleteUser($username){
		try{
			$this->createConnection();	
			$sql = "DELETE FROM Users WHERE Username = :username";	
			$query = self::$dbh->prepare($sql);
			$query->execute(array(":username"=>$username));
								  
			self::$dbh = null;
								  
			return "Databasqueryn lyckades";
		}
		catch (PDOException $e){
			return "Databasqueryn misslyckades." . $e->getMessage();
		}
	}
	
	public function doesUserExist(){
		//TODO: Fix functionality to check if user exists
	}
	
	public function insertNewBlogpost($title, $blogpost){
		try{
			if($title == "" || $blogpost == ""){
				throw new PDOException("Du måste ange både en titel och en löptext!");
			}
			
			$this->createConnection();	
			
			$sql = "INSERT INTO Blogpost (Title,Blogpost) VALUES (:title,:blogpost)";	
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":title", $title);
		  	$query->bindParam(":blogpost", $blogpost);
			$query->execute();
							  
			self::$dbh = null;
							  
			return "Databasqueryn lyckades";
		}
		catch (PDOException $e){
			return "Databasqueryn misslyckades. " . $e->getMessage();
		}
	}
	
	public function updateBlogpost(){
		// TODO: Fix update func
	}
	
	public function deleteBlogPost(){
		// TODO: FIx delete func
	}
	
	public function loginUser($username, $password){
		// TODO: Fix check for online user by session cookies.
	}
	
	public function isUserLoggedIn(){
		if($_SESSION[self::$session] != ""){
			//TODO: Send information to show page for logged in user.
		}
	}
}



$dbc = new DatabaseController();

//Login is requested
if(isset($_POST["loginusername"]) && isset($_POST["loginpassword"])){
	echo $dbc->loginUser($username)
}

// Creation of new user is requested
if(isset($_POST["registerusername"]) && isset($_POST["registerpassword"])){
	echo $dbc->insertNewUser($_POST["registerusername"], $_POST["registerpassword"]);
}

// Creation of new blog post is requested
if(isset($_POST["title"]) && isset($_POST["blogpost"])){
	echo "Post av blogginlägg funkar.";
}




