

/*__________________________________________________________________________________
//
//	FILENAME: preParse.js
//	AUTHOR: Ben Ehrlich
//	PURPOSE: Handles initiation and parsing of combat. Good luck with this.
//
//
*/


//TODO: Clean this up somehow

var sk = [];

for(var v = 0; v < 100; v++) { sk[v] = []; }

var combatMode = "";
var combatSelect = "";

//Show player combat status only once a turn
notShownThisTurn = true;

var foe = {
	hp: 0,
	sprite:"", 
	mp: 0,
	dmg: 0,
	num:0,
	victoryCondition:function(){},
	status:"none",
	sTurns:0
}


function checkHp(message) {
	if(hp < 1) {
	
		cls();
		echo(message);
	
		enterContinues(
			function() {
				var write = "";
				write += "<br />";
				write += "You score this game is " + score + ".";
				write += "<br /><br />";
				write += "RANK: " + ranks[getRank()][1] + "</u><br/><br/>" + ranks[getRank()][2];
				write += "<br /><br/>";
				write += "Would you like to play again? (Y/N)";
				
				echo(write);
				
				askQuestion(
					function() {
						location.reload();
					},
					function() { 
						gameOver = true; 
						echo("Oh, cool, whatever.");
						echo("shutdown -s -t 2000 -c Shutting Down.");
						$( "body" ).fadeOut( 2000, function(){})
					}
				);
			}
		);
		
	} 
}

function combatDraw(draw) {
	echo("<div align = 'center' style = 'margin:0px;padding:0px;font-size:.25em;'><pre style = 'margin:0px;padding:0px;font-family:green_screenregular'>" + draw + "</pre></div>");
}

function showCombatChoices() {
	
	//Create foe ascii drawing from array
	var rop = "";
	
	//Draw foe above combat choices
	echo("<div align = 'center' style = 'margin:0px;padding:0px;'><pre style = 'margin:0px;padding:0px;font-family:green_screenregular;font-size:1.35px;line-height:1em;'>" + foe.sprite + "</pre></div>");
	
	
	if(phase == 0) {
		
		//Draw options
		if(playerCombatStatus != "frozen") {
		
			if(userAgent != "mobile") {
				var options = [
					"Status: "+hp+"/"+maxhp+"hp"+" | " + mp +"mp",
					" ______________________________ ",
					"|           Choose:            |",
					"|                              |",
					"|  1. Attack                   |",
					"|  2. Item                     |",
					"|  3. Magic                    |",
					"|  4. Flee                     |",
					"|______________________________|",
				
				];
			} else {
			
				//As though this script wasn't already messy enough...
				var options = [
					"Status: "+hp+"/"+maxhp+"hp"+" | " + mp +"mp",
					" ______________________________ ",
					"|           Choose:            |",
					"|                              |",
					"|  <a href = '#' onclick = 'preParse(\"1\")'>1. Attack</a>                   |",
					"|  <a href = '#' onclick = 'preParse(\"2\")'>2. Item</a>                     |",
					"|  <a href = '#' onclick = 'preParse(\"3\")'>3. Magic</a>                    |",
					"|  <a href = '#' onclick = 'preParse(\"4\")'>4. Flee</a>                     |",
					"|______________________________|",
				
				];
			}
		} else {
			//Draw options
			
			var frznTxt = "Press Enter";
			if(userAgent == "mobile") { frznTxt = "<a href = '#' onclick = 'preParse(\"\")'>Press Enter</a>" }
			
			var options = [
				"Status: "+hp+"/"+maxhp+"hp"+" | " + mp +"mp",
				" ______________________________ ",
				"|           Frozen!            |",
				"|                              |",
				"|         "+frznTxt+"          |",
				"|                              |",
				"|                              |",
				"|                              |",
				"|______________________________|",
				
			];
		}
	}
	else {
		var options = [
			"" + foe.name + "'s Turn",
			" ______________________________ ",
			"|                              |",
			"|                              |",
			"|                              |",
			"|                              |",
			"|                              |",
			"|                              |",
			"|______________________________|"
		];
	}
	
	//Really hacky way to do this (the <pre> tags that is)
	rop = "<div align = 'center'><pre style = 'margin:0px;padding:0px;font-family:green_screenregular'>";
	
	for(var v = 0; v < options.length; v++) {
		rop += options[v] + "<br />";
	}
	
	echo("<div align = 'center'>" + rop + "</pre></div>");
}

//Even turn is player, odd turn is foe.
phase = 0;

function startCombat(foes, victory) {
	//if(typeof foes !== Array) {
		foe = foes;
		foes.victoryCondition = victory;
	//}
	status = 1;
	showCombatChoices();
}

var pause = false;

//Do battle

function parseCombat(input) {
	

	
	cls();

	//Are we alive?
	if(hp < 0) { checkHp("The " + foe.name + " killed you!"); return; }
	
	//Is the foe alive?
	if(foe.hp < 1) {
		echo("Sick dude, you obliterated the " + foe.name + "."); 
			
			var getGold = Math.floor(Math.random()*9001);
			echo("You found " + getGold + " gold.<br/><br/>");
			
			playerCombatStatus = "none";
			
			//Always start with player's turn
			phase = 0;
			
			foe.victoryCondition();
			status = 0;
			
			if(typeof roomList[currentRoom].intro === "string") { echo(roomList[currentRoom].intro); }
			else if(typeof roomList[currentRoom].intro === "function") { roomList[currentRoom].intro(); }
			
			return; 
	}
	
	//echo("<br/><br/><br/>");
	
	
	showCombatChoices();
	
	//PLAYER'S TURN
	if(phase == 0) {
		
		if(playerCombatStatus == "frozen") { phase++; return; }
		
		//Show combat status once
		if(notShownThisTurn && playerCombatStatus != "none") { echo("You're " + playerCombatStatus + " for " + playerCombatStatusTime + " turns."); notShownThisTurn = false; }
		
		//We're selecting something
		if(combatMode == "select") {
			
			//The variable we use to compile a formatted item list
			var useList = "";
			
			for(var v = 0; v < inventory.length; v++) {
				if(inventory[v].combatReady != null && inventory[v].type != null) {
					if(inventory[v].combatReady && inventory[v].type == combatSelect) {
						
						if(input == v && input != "") {
							
							//Do whatever the item tells us to do
							if(inventory[v].combatUse() != "error") {
							
								//inventory[v]
								combatMode = "";
								useList = "";
								phase++;
							
								echoM("PRESS ENTER TO CONTINUE.",""); 
								
								return;
								}
						}
						
						//Spells don't have pNames so that they don't show up in the inventory list. HACK.
						if(combatSelect == "item") { useList += "" + v + ". " + inventory[v].pName + "<br/>"; }
						if(combatSelect == "spell") { useList += "" + v + ". " + inventory[v].name + " (" + inventory[v].mp + "mp)<br/>"; }
					}
				}
			}
			
			//Cancel
			if(input == "c") { useList = ""; combatMode = ""; }
			
			//If the user hasn't entered a valid option, show the item list again.
			//If useList eqquals "", that means it never got filled and either we have no combat items
			//or we've cancelled the mode
			if(useList != "") { 
			
				//Keep us in item select mode
				combatMode = "select";
				
				useList = "Select " + combatSelect + ":<br/><br/>" + useList;
				
				useList += "" + "c" + ". Cancel";
				echo(useList);
			}
		}
		
		else if(input == "1") {
			var hit = Math.floor((dmg / 2) + (Math.random() * (dmg / 2))); 
			foe.hp -= hit;
			echo("You hit the " + foe.name + " for " + hit);
			echoM("PRESS ENTER TO CONTINUE.",""); 
			phase++;
			return;
			
		}
		
		//Show all combat items
		else if(input == "2" || input == "3") {
			
			if(input == "2") { combatSelect = "item"; }
			if(input == "3") { combatSelect = "spell"; }
			
			//Variable used to compile combat item list
			var useList = "";
			
			//Go through inventory and see what can and can't be used in combat
			for(var v = 0; v < inventory.length; v++) {
				if(inventory[v].combatReady != null && inventory[v].type != null) {
					if(inventory[v].combatReady && inventory[v].type == combatSelect) {
						
						//Add item/spell to combat list
						if(combatSelect == "item") { useList += "" + v + ". " + inventory[v].pName + "<br/>"; }
						if(combatSelect == "spell") { useList += "" + v + ". " + inventory[v].name + " (" + inventory[v].mp + "mp)<br/>"; }
					}
				}
			}
			
			//Show (or don't show) combat items)
			if(useList == "") { echo("You have no combat " + combatSelect + "s."); combatSelect = ""; }
			else {
				
				//If we have combat items to show, then put us into itemSelect mode,
				//which makes the user either pick an item or cancel
				combatMode = "select";
				
				//Print list
				useList = "Select " + combatSelect + ":<br/><br/>" + useList;
				useList += "" + "c" + ". Cancel";
				echo(useList);
			}
		}
		
		else if(input == "4") {
			if(foe.canFlee) {
				if(Math.random() * 100 > 60) {
					echo("You successfully flee combat. Yikes!");
					
					//Print the after-combat text or execute the after-combat function
					if(typeof foe.flee === "string") { echo(foe.flee); }
					else if(typeof foe.flee === "function") { foe.flee(); }
					
					//Print or execute room description
					if(typeof roomList[currentRoom].intro === "string") { echo(roomList[currentRoom].intro); }
					else if(typeof roomList[currentRoom].intro === "function") { roomList[currentRoom].intro(); }
					
					status = 0;
					return; 
					
				} else {
					echo("You fail to flee!");
					echoM("PRESS ENTER TO CONTINUE.",""); 
					phase++;
					return;
				}
			} else { echo("You can't flee this fight!"); }
		}
	}
	
	//Foe's turn
	else if(phase == 1) {
		
		
		
		//A little player stuff below
		
		//Restore player mp
		mp += 5;
		
		//Sanity checks
		if(mp > maxmp) { mp = maxmp; }
		if(hp > maxhp) { hp = maxhp; }
		if(mp < 0) { mp = 0; }
		
		//Show player combat status again next turn
		notShownThisTurn = true;
		
		//Decrement status time
		if(playerCombatStatus != "none") {
			playerCombatStatusTime--;
			if(playerCombatStatusTime == 0) { playerCombatStatus = "none"; }
		}
		
		
		
		//Foe is not frozen, and therefor can attack
		if(foe.status != "frozen") {		
			
			//Are we planning on just doing a regular attack?
			var isAttacking = false;
			
			//Stores spell with highest priority that we have enough mp to cast
			var abilityToCast = -1;
			
			//If we actually have abilities
			if(foe.abilities != null) {
				
				//We have a 45% chance to even try and select an ability
				if(Math.random() > .55) {
					
					//Go through the foe's abilities
					for(var v = 0; v < foe.abilities.length; v++) {
						
						//Check if we have enough mana to cast it and if its priority is highest
						if(foe.abilities[v].mp <= foe.mp && foe.abilities[v].priority >= abilityToCast) {
							
							//If it's a tie, do a coin toss
							if(foe.abilities[v].priority == abilityToCast) {  
								if(Math.random() > .5) { abilityToCast = v; }
							
							} else { abilityToCast = v; }
							
						}
					}
					
					//We defined an ability to use
					if(abilityToCast != -1) {
						
						//So use it
						foe.abilities[abilityToCast].func();
					
					} else { isAttacking = true; }
					
				} else { isAttacking = true; }
				
			} else { isAttacking = true; }

			//Just do a dice roll attack
			if(isAttacking) {
				var done = Math.floor((Math.random()*foe.dmg) / 2) + Math.round(foe.dmg / 2);
				hp -= done;
				echo("The " + foe.name + " hits you for " + done + " damage.");
			}
			
		} else { echo("The " + foe.name + " is frozen!"); }
		
		
		//The foe is burning and is taking damage over time
		if(foe.status == "burn") {
			foe.hp -= 5;
			echo("The " + foe.name + " is on fire, and takes 5 fire damage!");
		
		}
		
		//The foe has a status which should go away after a certain number of turns
		if(foe.status != "none") {
			foe.sTurns--;
			if(foe.sTurns == 0) { foe.status = "none"; }
		}
		
		foe.mp += 5;
		if(foe.mp > foe.maxMp) { foe.mp = foe.maxMp; }
		
		//Move on
		echoM("PRESS ENTER TO CONTINUE.",""); 
		phase = 0;
		return;
	}
	
	
}