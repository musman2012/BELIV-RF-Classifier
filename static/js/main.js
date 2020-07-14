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

function create_vis_cards()
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
	container.refreshItems();
	container.layout(true);
}

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
		create_vis_cards();
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
			create_map_vis();
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
			create_vis_cards();
		},
		error: function(request, status, error)
		{
			console.log("ERROR:")
			console.log(status)
			console.log(error)
		}
	});
}

function create_map_vis()
{
	var width = 500;
	var height = 300;
	var projection = d3.geoAlbers()
	.center([0, 55.4])
	.rotate([4.4, 0])
	.parallels([50, 60])
	.scale(6000)
	.translate([width/2, height/2]);
	var svg = d3.select("#map_vis").append("svg").attr("width", width).attr("height", height);
	var path = d3.geoPath().projection(projection);
	var g = svg.append("g");
		
	var zoom = d3.zoom().on("zoom", do_zoom);

	function do_zoom()
	{
		g.attr('transform', d3.event.transform);
	}
	svg.call(zoom);
	
	var files = ["/data/wpc.json", "/data/mp_data.csv"];
	var promises = [];
	promises.push(d3.json("/data/wpc.json"));
	promises.push(d3.csv("/data/mp_data.csv"));
	Promise.all(promises).then(
	function(data)
	{
		var boundary_data = data[0];
		var mp_data = data[1];

		var b = path.bounds(topojson.feature(boundary_data, boundary_data.objects["wpc"]));
		
		var paths = g.selectAll("path")
		.data(topojson.feature(boundary_data, boundary_data.objects["wpc"]).features);
		paths.enter().append("path").attr("d", path);
	}
	);
}
