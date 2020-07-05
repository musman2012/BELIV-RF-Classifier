document.getElementById("run_RF_button").addEventListener("click", call_RF, false);
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

document.getElementById("details_tab").style.display = "block";
document.getElementById("details_tab_button").className += " active";
document.getElementsByClassName("outcome")[0].className += " active";

var outcomes = document.querySelectorAll(".outcome");
outcomes.forEach(
	function(element)
	{
		element.addEventListener("click",
			function()
			{
				toggle_active_outcome(element);
			}
		);
	}
);


function toggle_active_outcome(outcome)
{
	var contents = document.getElementsByClassName("outcome");
	for(var i = 0; i < contents.length; i++)
	{
		contents[i].className = contents[i].className.replace(" active", "");
	}
	outcome.className += " active";
}

var container = null;
var container_0 = null;

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
	
	document.getElementById(tab).style.display = "flex"
	event.currentTarget.className += " active";
	
	if(tab === "vis_tab")
	{
		if(container === null)
		{
container = new Muuri('#vis_tab',
{
	layoutDuration: 400,
	dragEnabled: true,
	dragSortInterval: 0
}
);
		}
		if(container_0 === null)
		{
container_0 = new Muuri('#details_tab',
{
	layoutDuration: 400,
	dragEnabled: true,
	dragSortInterval: 0
}
);
		}
	}
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
			console.log(data);
			get_importances();
		},
		error: function(request, status, error)
		{
			console.log("ERROR:");
			console.log(status);
			console.log(error);
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
			var importances_list = document.getElementById("importances_list")
			for([key, value] of Object.entries(data))
			{
				var list_node = document.createElement("li");
				var text_node = document.createTextNode(`${key}:${value}`);
				list_node.appendChild(text_node);
				importances_list.appendChild(list_node);
			}
		},
		error: function(request, status, error)
		{
			console.log("ERROR:")
			console.log(status)
			console.log(error)
		}
	});
}