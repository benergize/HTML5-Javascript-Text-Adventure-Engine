<?php
	#Welcome to hell.
	
	
	
		//Below is the SQL command to create the saves table
		/*
		CREATE TABLE IF NOT EXISTS `saves` (
		  `pos` int(11) NOT NULL AUTO_INCREMENT,
		  `hash` text NOT NULL,
		  `tstamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
		  `data` longtext NOT NULL,
		  PRIMARY KEY (`pos`),
		  UNIQUE KEY `pos` (`pos`)
		) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=71 ;
		*/
		
	
	//A save is being requested
	if($_GET['action'] == "save") {
		
		//Attempt to connect to database or print error on failure
		if(!$con = mysqli_connect("SERVER NAME","USER NAME","PASSWORD","DATABASE")){ echo "Couldn't connect to the database!"; }
		
		//Make sure we actually have save data to save
		if(!isset($_POST['data'])) { die("Didn't recieve any data from client!"); }
		
		//Get the position for this coming save the save array
		if($result = mysqli_query($con,"SELECT * FROM saves")) { $position = mysqli_num_rows($result) + 1; }
		else { die("Couldn't connect to the database!"); }
		
		//The query as a string... insert 
		$query = "
			INSERT INTO saves (data) VALUES (?)
		";
		
		//Prepare the query
		if($stmt = $con->prepare($query)) {
			
			//Bind the string as a parameter
			$stmt->bind_param("s", $data);
			
			//Do the substitutions
			$data = $_POST['data'];

			//DO IT
			if($stmt->execute())  {
				
				//Create a filename, which is really just the first five letters of a random MD5, followed by our position in the save array
				$fileName = substr(md5(rand(0,999)),0,5) . $position;

				echo("Saved. Your file ID is " . $fileName . ". Don't lose it!");
					
				//Mission complete, let's go home
				$stmt->close();
				
			} else { echo($stmt->error); }
			
		} else { echo($stmt->error . " <br/><br/>" . $con->error); }
	}
	
	//A load is being requested ;)
	else if($_GET['action'] == "load") {
		
		//Attempt to connect to database or return a database error on failure
		if(!$con = mysqli_connect("SERVER NAME","USER NAME","PASSWORD","DATABASE")){ echo "dbe"; }
		
		//If we don't have a save filen, return a no data error
		if(!isset($_GET['position'])) { die("ncd"); }
		
		//Drop the first five letters of the save file to just get the position
		//in the save array
		$pos = substr($_GET['position'],5);
		
		//And make sure it's just a number
		$pos = filter_var($pos,FILTER_SANITIZE_NUMBER_INT);
		
		//Query the database for all data where the 'pos' is equal to our save position
		if($result = mysqli_query($con,"SELECT * FROM saves WHERE pos=$pos")) {
			
			//If there's no data, return a file not found error
			if(mysqli_num_rows($result) < 1) { die("fnf"); }
			
			//If all's good, return the save data.
			//The rest is client side.
			while($row = mysqli_fetch_array($result)) {
				echo($row['data']);
			}
		} else { die("fnf"); }
	}
?>