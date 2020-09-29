

/*__________________________________________________________________________________
//
//	FILENAME: someEnemies.js
//	AUTHOR: Ben Ehrlich
//	PURPOSE: A sample enemy. I found it easier to store enemies in one place,
//	(cont.) especially when I was reusing them. For more info on enemy creation,
//	(cont.) see the documentation.	
//
//
*/


var com_37_boss = {
	name:"Arch-Dragon",
	hp:190,
	mp:50,
	maxMp:50,
	dmg:30,
	sprite:spr_hiroth,
	canFlee:false,
	abilities:[
		spell_manaSteal,
		spell_fireBall
	]
};