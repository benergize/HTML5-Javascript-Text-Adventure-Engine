

/*__________________________________________________________________________________
//
//	FILENAME: scr_actions.js
//	AUTHOR: Ben Ehrlich
//	PURPOSE: A list of verbs a player can enter to interact with the world and their
//	(cont.) inventory. You can add more to this list, but to make them take effect
//	(cont.) you need to add them to parseInput.js and parseInventory.js, following
//	(cont.) the format laid out there. When I have more time, I'll make this system
//	(cont.) less janky,  but for now this works fine.
//
//
*/

var interactWords = 
	[
	
		/* 0: Touch */
		[
			"touch",
			"feel",
			"rub",
			"hold",
			"poke"
		],
		
		/* 1: Taste */
		[
			"taste",
			"lick",
			"mouth",
			"drink",
			"eat"
		],
		
		/* 2: Sight */
		[
			"sight",
			"view",
			"look",
			"inspect",
			"examine",
			"check",
			"peek"
		],
		
		/* 3: Smell */
		[
			"smell",
			"waft",
			"nose"
		],
		
		/* 4: Hear */
		[
			"hear",
			"listen"
		],
		
		/* 5: Read */
		[
			"read"
		],
		
		/* 6: Attack */
		[
			"attack",
			"punch",
			"kick",
			"kill",
			"fight",
			"beat",
			"stab",
			"barrage",
			"prod",
			"smash",
			"break"
		],
		
		/* 7: Talk */
		[
			"talk",
			"speak",
			"mention",
			"tell",
			"say",
			"hello",
			"hi",
			"yell"
		],
		
		/* 8: Sex */
		[
			"sex",
			"teabag",
			"fuck",
			"sex",
			"oral sex",
			"fellate",
			"orgasm",
			"cum",
			"masturbate",
			"skeet",
			"rape",
			"love"
		],
		
		/* 9: Use */
		[
			"use",
			"activate",
			"enable",
			"turn on",
			"press"
		],
		
		/* 10: Open */
		[
			"open"
		],
		
		/* 11: Enter*/
		[
			"enter",
			"go",
			"cross",
			"walk",
			"run", 
			"travel",
			"jump",
			"swim"
		],
		
		/* 12: Take */
		[
			"take",
			"steal",
			"pick",
			"harvest",
			"get",
			"grab",
			"capture"
		],
		
		/*
		** Down has bee replaced in favor of
		** parseFunc_goDir(). See below. 
		** DELETEME?
		*/
		
		/* 13: Down */
		[
			"UNUSED"
		],
		
		/* 14: Turn */
		[
			"turn",
			"flip",
			"reverse"
		],
		
		/* 15: Give */
		[
			"give",
			"pass",
			"hand",
			"feed"
		],
		
		/* 16: Drop */
		[
			"drop"
		],
		
		/* 17: Move */
		[
			"move",
			"push",
			"pull"
		],
		
		/* 18: Search */
		[
			"search"
		],
		
		/*
		** I'm removing the 'up' action on 3/12/16.
		** In recent tests, players opt for 'pick up'
		** instead of 'take,' and since the cardinal
		** direction 'up' should be handled by 
		** parseFunc_goDir() anyway, having a dedicated
		** up action is just causing problems. This 
		** might however break some ladder or staircase
		** somewhere in the dungeon. If that happens,
		** this is why. DELETEME?
		*/
		
		/* 19: Up */
		[
			"UNUSED"
		],
		
		/* 20: Close */
		[
			"close",
			"seal",
			"tighten"
		],
		
		/* 21: Fill */
		[
			"fill"
		],
		
		/* 22: Cast */
		[
			"cast"
		],
		
		/* 23: Light */
		[
			"light",
			"ignite",
			"combust",
			"burn"
		],
		
		/* 24: Throw */
		[
			"toss",
			"throw"
		]
		
	];
	