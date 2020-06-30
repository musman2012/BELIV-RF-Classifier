document.getElementById("run_RF_button").addEventListener("click", call_RF, false);
document.getElementById("importances_button").addEventListener("click", get_importances, false);
document.getElementById("details_tab_button").addEventListener("click", 
function(event)
{
	open_tab(event, "details_tab");
},
false);

document.getElementById("vis_tab_button").addEventListener("click",
function(event)
{
	open_tab(event, "vis_tab");
},
false);


var grid = new Muuri('.grid');


function open_tab(event, tab)
{
	var tab_contents = document.getElementsByClassName("tab_content");
	for(var i = 0; i < tab_contents.length; i++)
	{
		tab_contents[i].style.display = "none";
	}
	
	var tab_links = document.getElementsByClassName("tab_link");
	for(i = 0; i < tab_links.length; i++)
	{
		tab_links[i].className = tab_links[i].className.replace(" active", "");
	}
	
	document.getElementById(tab).style.display = "block"
	event.currentTarget.className += " active";
}

function call_RF()
{
	$.ajax(
	{
		type: "POST",
		url: "/run_RF",
		dataType: "json",
		success: function(data)
		{
			console.log(data)
		},
		error: function(request, status, error)
		{
			console.log("ERROR:")
			console.log(status)
			console.log(error)
		}
	});
}

function get_importances()
{
	$.ajax(
	{
		type: "POST",
		url: "/importances",
		dataType: "json",
		success: function(data)
		{
			console.log(data)
		},
		error: function(request, status, error)
		{
			console.log("ERROR:")
			console.log(status)
			console.log(error)
		}
	});
}