<?php

session_start();

class DatabaseController{
	private static $dbh = "";
	private static $hostname = "fullyawesome-166006.mysql.binero.se";
	private static $localhost = "127.0.0.1";
	private static $dbname = "166006-fullyawesome";
	private static $user = "166006_jh40220";
	private static $pass = "Lillstrumpa1";
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
							  
			return "Din användare skapades!";
		}
		catch (PDOException $e){
			return "Det gick inte att registrera dig. " . $e->getMessage();
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
	
	public function getBlogPosts(){
		try{		
			$this->createConnection();
			
			$sql = "SELECT BlogpostID, Title, Blogpost FROM Blogposts";	
			$query = self::$dbh->prepare($sql);
			$query->execute();
		
			$blogposts = $query->fetchAll();
			
			self::$dbh = null;
			
			return json_encode($blogposts);
		}
		catch (PDOException $e){
			return "Databasqueryn misslyckades. " . $e->getMessage();
		}
	}
	
	public function insertNewBlogpost($title, $blogpost){
		try{
			if($title == "" || $blogpost == ""){
				throw new PDOException("Du måste ange både en titel och en löptext!");
			}
			
			$this->createConnection();	
			
			$sql = "INSERT INTO Blogposts (Title,Blogpost) VALUES (:title,:blogpost)";	
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":title", $title);
		  	$query->bindParam(":blogpost", $blogpost);
			$query->execute();
							  
			self::$dbh = null;
							  
			return "Ditt inlägg lades till!";
		}
		catch (PDOException $e){
			return "Det gick inte att lägga till ditt inlägg. " . $e->getMessage();
		}
	}
	
	public function updateBlogpost(){
		// TODO: Fix update func
	}
	
	public function deleteBlogPost(){
		// TODO: FIx delete func
	}
	
	public function getComments($blogpostID){
		try{		
			$this->createConnection();
			
			$sql = "SELECT BlogpostID, Comment, User FROM Comments WHERE BlogpostID = :blogpostid";	
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":blogpostid", $blogpostID);
			$query->execute();
		
			$comments = $query->fetchAll();
			
			self::$dbh = null;
			
			return json_encode($comments);
		}
		catch (PDOException $e){
			return "Databasqueryn misslyckades. " . $e->getMessage();
		}
	}
	
	public function insertNewComment($blogpostID, $comment){
		try{
			if($comment == ""){
				throw new PDOException("Du måste skriva en kommentar!");
			}
			else if(strlen($comment) > 140){
				throw new PDOException("Din kommentar får max vara 140 tecken lång!");
			}
			
			if(isset($_SESSION[self::$session])){
		
				$user = $_SESSION[self::$session];
			}
			else{
				throw new PDOException("Du måste vara inloggad för att kommentera!");
			}
			
			
			$this->createConnection();	
			
			$sql = "INSERT INTO Comments (BlogpostID, Comment, User) VALUES (:blogpostid,:comment,:user)";	
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":blogpostid", $blogpostID);
		  	$query->bindParam(":comment", $comment);
		  	$query->bindParam(":user", $user);
			$query->execute();
			
			self::$dbh = null;		
			
			return "Din kommentar lades till!";  
		}
		catch (PDOException $e){
			return "Det gick inte att lägga till din kommentar. " . $e->getMessage();
		}
	}
	
	/*
	 * @return False if there is no user, otherwise saves the session and returns the username.
	 */
	public function loginUser($username, $password){		
		$this->createConnection();	
		
		$sql = "SELECT Username FROM Users WHERE Username = :username AND Password = :password";	
		$query = self::$dbh->prepare($sql);
		$query->bindParam(":username", $username);
	  	$query->bindParam(":password", $password);
		$query->execute();
		
		self::$dbh = null;
						  
		if($query->rowCount() > 0){
			$_SESSION[self::$session] = $username;	
			
			
			return $_SESSION[self::$session];
		}	
		else{
			return false;
		}			  
	}
	
	/*
	 * @return False if user is not logged in, else returns the users session
	 */
	public function isUserLoggedIn(){
		if(isset($_SESSION[self::$session])){
		
			return $_SESSION[self::$session];
		}
		else{
			return false;
		}
	}
	
	public function checkAdminStatus(){
		if($this->isUserLoggedIn() == "admin"){
			return true;
		}
		else{
			return false;
		}
	}
	
	/*
	 * @return True if the logout was succesful, otherwise false
	 */
	public function userLogOut(){
		try{	
			unset($_SESSION[self::$session]);
			session_destroy();
			return true;
		}
		catch(Exception $e){
			//Error handling if something went wrong
			
			return false;
		}
	}
}

/*
 * This section handles all calls to the PHP-file, wether it is a GET- or POST-request.
 */

$dbc = new DatabaseController();

//GET Request on page load
if(isset($_GET["onload"])){
	echo $dbc->isUserLoggedIn();
}

//GET Request on user logout
if(isset($_GET["logout"])){
	echo $dbc->userLogOut();
}

//GET Request for getting all posts
if(isset($_GET["getblogposts"])){
	echo $dbc->getBlogPosts();
}

//GET Request for getting comments
if(isset($_GET["getcomments"])){
	echo $dbc->getComments($_GET["getcomments"]);
}

//GET Request for checking login status
if(isset($_GET["checkloginstatus"])){
	echo $dbc->checkLoginStatus();
}

//GET Request for checking admin status
if(isset($_GET["checkadminstatus"])){
	echo $dbc->checkAdminStatus();
}

//Login is requested
if(isset($_POST["loginusername"]) && isset($_POST["loginpassword"])){
	echo $dbc->loginUser($_POST["loginusername"], $_POST["loginpassword"]);
}

//Creation of new user is requested
if(isset($_POST["registerusername"]) && isset($_POST["registerpassword"])){
	echo $dbc->insertNewUser($_POST["registerusername"], $_POST["registerpassword"]);
}

//Creation of new blog post is requested
if(isset($_POST["title"]) && isset($_POST["blogpost"])){
	echo $dbc->insertNewBlogpost($_POST["title"], $_POST["blogpost"]);
}

//Adding a comment is requested
if(isset($_POST["blogpostID"]) && isset($_POST["comment"])){
	echo $dbc->insertNewComment($_POST["blogpostID"], $_POST["comment"]);
}



