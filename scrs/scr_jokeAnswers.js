

/*__________________________________________________________________________________
//
//	FILENAME: scr_jokeAnswers.js
//	AUTHOR: Ben Ehrlich
//	PURPOSE: Returns joke answers to joke queries. I found these amusing. Many
//	(cont.) references to other games and pieces nerd media esoterica.
//
//
*/


function jokeAnswers(input) {
	
	switch(input) {
		case "xyzzy":
			return "Nothing happens.";
		
		case "plover":
			return "Yeah, PLUGH while you're at it.";
		
		case "plugh":
			return "Yeah, plover while you're at it.";
		
		case "fee fie foe foo":
			return "Your plover egg is gone! Wait, you didn't have a plover egg. Huh?";
	
		case "is there a problem with the three laws?":
			return "The three laws are perfect.";
		
		case "i've got a bad feeling about this.":
			return "[wookie noise here]";
		
		case "oh no!":
			return "OH YEAH!";
			
		case "i discern north":
		case "discern north":
			return "It's that way.";
			
		case "fuck you":
			return "No dad, what about you?!?!?";
			
		case "screw this":
		case "screw this shit":
		case "bugger off":
			return "Well, mister, you can stop playing anytime you want to.";
			
		case "why?":
		case "why":
		case "why not?":
		case "why not":
			return "Because I said so!"
			
		case "narfle the garthok":
		case "gnarfle the garthok":
			return "YOU WIN! Just kidding."
			
		case "wat":
		case "what?":
			return "con * fu * sion: the state of being bewildered or unclear in one's mind about something.";
		
		case "cool":
			return "like the Fonz";
		
		case "pc load letter":
			return "What the f*** does that mean!?!?!?";
	
		case "cmd":
			return "This is as close as you're getting.";
			
		case "exit":
		case "quit":
			return "In this case, you don't need to like, terminate the batch job or anything. You can just, like, close the window or whatever.";
			
		case "ping":
			return "pong";
			
		case "emacs":
			return "This is no time for sub-par text editors!";
			
		case "vim":
			return "This is no time for text editing!";
			
		case "vi":
			return "Just go for VIM while you're at it.";
			
		case "ipconfig":
			return "Ethernet adapter NdisWan4:<br/><br/>IP Address............130.80.0.51<br/>Subnet Mask...........255.255.0.0<br/>Default Gateway.......130.80.0.51";
			
		case "mspaint.exe":
			return "I'm not programming that easter egg."
			
		case "hey g would you make me a sandwich?":
			return "NO!";
			
		case "what's a woman?":
			return "I figured it out, Will. I'm gonna get dad what he always wanted."
			
		case "abort":
		case "retry":
		case "fail":
			return "Not ready reading command. Abort, retry, fail?"
		
		case "del":
			return "Nice try.";
			
		case "print":
			return "Can't. lp0 on fire."
			
		case "typewriter":
			return "Not a typewriter."
			
		case "oops":
			return "All berries. As in, oops. All berries."
			
		case "hcf":
			return "Do you smell something burning?"
			
		case "beans on toast":
			return "Weird."
			
		case "fuck":
			return "Watch it!"
		
		case "xcopy":
			return "Copy what, pray tell?"
			
		case "the force betrays you":
			return "How about a Ruby Bliels?"
			
		case "how about a ruby bliels?":
			return "the force betrays you"
			
		case "hotdog":
		case "hotdogs":
			return "Do you have a license to sell hotdogs?"
			
		case "pong":
			return function() { window.open("other/png.html","_BLANK","height=500px,width=650px") }
		
		default:
			return "";
	}
}