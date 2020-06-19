/*	Stuff to hook up dom elements to js functions	*/

document.getElementById("run_RF_button").addEventListener("click", call_RF, false);

/*	Global functions	*/

function shuffle(array) 
{  // Fisher Yates shuffle
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) 
	{
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

//Returns features of each object in input_data.slice(slice_begin_index, slice_end_index)
function read_input_data_slice(input_data, slice_begin_index, slice_end_index, features, target_feature)
{
	//Slice the input_data array
	var input_data_slice = input_data.slice(slice_begin_index, slice_end_index);
	var truncated_input_data_slice = []; //input_data_slice with only relevant features
	//Read only the features and target feature from each entry in the slice
	for(var i = 0; i < input_data_slice.length; i++)
	{
		var datum = {};
					
		//Assign an ID to the sample
		datum['sampleID'] = i;
		
		//Read the target feature value for the current row
		if(target_feature != null) datum[target_feature] = input_data_slice[i][target_feature];
		
		for(var j = 0; j < features.length; j++)
		{
			var feature = features[j];
			datum[feature] = input_data_slice[i][feature];
		}
		
		//Push datum object to the training data set
		truncated_input_data_slice.push(datum);
	}
	
	return truncated_input_data_slice;
}

/*	Classifier function	*/
var target_feature = "country"; //EDIT THIS TO CHANGE TARGET FEATURE

function call_RF()
{
	console.log("Running classifier");
	var fs = require('fs');
	RandomForestClassifier = require('../vendor/random-forest-classifier-master').RandomForestClassifier;
	var rf = new RandomForestClassifier(
	{
		n_estimators: 50
	});

	d3.csv("data/vatanen.csv", d3.autoType).then
	(
		function(data)
		{
			console.log("Training");
			//Get feature names to use (from selectedNodes in visrf)
			
			var shuffled_data = shuffle(data);
			var training_data = [];
			
			var learn_features = [];
			var features = [];
			//data[0] used because d3.csv doesn't specifically load column names, 
			//but stores them in each entry in the data array
			for(var key in data[0])
			{//For each variable name in the csv file
				if(key.includes('k__')) //(SPECIFIC) features list
				{
					learn_features.push(key);
				}
			}
			//10 features takes ~34s, 20 takes ~1m 32s (with 1/2 of data set for training)
			//10 features takes ~10s, 20 takes ~19s (with 1/4 of of data set for training)
			//40 features takes ~58s (with 1/4 of data set for training)
			features = shuffle(learn_features).slice(0, 40);
			
			var training_data = read_input_data_slice(shuffled_data, 0, shuffled_data.length/4, features, target_feature);
			var test_data = read_input_data_slice(shuffled_data, shuffled_data.length/2, shuffled_data.length, features, null);
			
			console.log("TRAINING DATA SET:");
			console.log(training_data);
			console.log("TEST DATA SET:");
			console.log(test_data);


			rf.fit(training_data, features, target_feature,
				function(err, trees)
				{
					//Make prediction
					var prediction = rf.predict(test_data, trees);
					
					console.log("Predicted:");
					console.log(prediction);
					
					//Gather results to produce ROC curve
				});
		}
	);
}