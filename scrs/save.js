

/*__________________________________________________________________________________
//
//	FILENAME: save.js
//	AUTHOR: Ben Ehrlich
//	PURPOSE: I don't know if this is still used. If it is, it's just an AJAX
//	(cont.) request to ...nowhere?
//
//
*/




function save() {
	//Send AJAX request
	var fd = new FormData();	
	fd.append('save',file);
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '?');
	xhr.onload = function() {list();};
	xhr.send(fd);
}