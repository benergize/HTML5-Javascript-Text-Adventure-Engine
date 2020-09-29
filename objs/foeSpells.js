

/*__________________________________________________________________________________
//
//	FILENAME: foeSpells.js
//	AUTHOR: Ben Ehrlich
//	PURPOSE: Stores a list of foe spells for use by foes in combat. See below.
//
//
*/


/*
**
** Let's talk about ability implementation.
** Abilities come in an array, formatted as follows:
** 0: Name
** 1: MP Cost
** 2: Priority
** 3: Function
**
** This is all pretty self explanatory, except for
** priority. The higher the priority, the more likely
** the CPU is to cast it. A priority of 1 means that
** if the CPU has mana, they're going to cast this ability
** whenever they meet casting conditions (see parseCombat.js
** for those conditions). 
**
*/

var spell_manaSteal = {
	name:"Mana Steal",
	mp:15,
	priority:.5,
	func:function(){
		echo("The " + foe.name + " casts Mana Steal!");
		mp -= 15;
		foe.mp -= 15;
	}
};

var spell_fireBall = {
	name:"Fireball",
	mp:20,
	priority:.6,
	func:function(){
		echo("The " + foe.name + " casts Fireball!");
		hp -= 15;
		playerCombatStatus = "on fire";
		playerCombatStatusTime = 5;
		foe.mp -= 20;
	}
};

var spell_frostBreath = {
	name:"Frost Breath",
	mp:10,
	priority:1,
	func:function(){
		echo("The " + foe.name + " casts Frost Breath. You're frozen solid!");
		hp -= 5;
		playerCombatStatus = "frozen";
		playerCombatStatusTime = 2;
		foe.mp -= 10;
	}
};


var spell_steamAttack = {
	name:"Steam Attack",
	mp:10,
	priority:1,
	func:function(){
		echo("The " + foe.name + " uses Steam Attack");
		hp -= 5;
		playerCombatStatus = "on fire";
		playerCombatStatusTime = 3;
		foe.mp -= 10;
	}
};