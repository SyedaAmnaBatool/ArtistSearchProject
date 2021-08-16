

	window.onload = function(){
		var artist_name;
		var img_url;
		var Fbk_url;
		var events_count;
		var events;
		const image1 = document.createElement("img");
		var btn = document.getElementById("btn1");
		var text;
		var city;
		var country;
		var date;
		var eventcard; 
		var eventdata;
		var fbk_links;
		var event_button;

		btn.onclick = function (){
			if ( document.getElementById("search_input").value != ""){
				document.getElementById("results").innerHTML = "";
				document.getElementById('result').innerHTML = "";
				call();
			}
			//check if search input is empty ot not
			else {
				alert("Please enter the artist you want to search for")
			}
			
		} ;
		
		function call(){
			//Fetch artist on the basis of search input
		 	text = document.getElementById("search_input").value;
			document.getElementById('search-result').innerHTML = "<h1>Search Results for '"+ text+"' </h1>";
		
			$.getJSON("https://rest.bandsintown.com/artists/"+ text + "?app_id=abc", function(data){
				if (data!= null){
					//if artist exists, store image and url
					img_url = data.thumb_url;
					events_count = data.upcoming_event_count;
					setTimeout(eventFunction(data,  data.facebook_page_url), 3000);
				}
				
				else {
					document.getElementById("results").innerHTML = "";
					document.getElementById('result').innerHTML = "<p> No artist found. Please try another one.</p>"
				}			
			 });
		}

		function eventFunction(data, facebook_link){

			//Display image
			document.getElementById('result').innerHTML = "";
			image1.src = data.thumb_url;
			document.getElementById('result').appendChild(image1);
			image1.setAttribute("id", "image1");
			image1.classList.add("img-fluid");

			//Display fbk Link
			fbk_link = document.createElement("h5");
			fbk_link.innerHTML = 'Visit their Facebook Page by clicking <a href = "' + facebook_link + '"> HERE </a>' ;
			document.getElementById('result').appendChild(fbk_link);

			//Display Upcoming events
			event_button = document.createElement("button");
			event_button.setAttribute('content', "Upcoming Events");
			event_button.textContent = "Upcoming Events";
			event_button.classList.add("buttons");
			event_button.setAttribute("id", "event_button");
			document.getElementById('result').appendChild(event_button);

			event_button.addEventListener('click', function(e){
				if (events_count > 0){
					$.getJSON("https://rest.bandsintown.com/artists/"+text+"/events?app_id=abc",function(data){
						document.getElementById("results").innerHTML = "";
						data.forEach(function(data){
							//Display event data for each event
							city = data.venue.city;
							country = data.venue.country;
							date = data.datetime;
							textnode = city;
							eventcard = document.createElement("div");
							eventcard.classList.add("col-sm-4");
							eventcard.classList.add('eventcard');
							eventdata = document.createElement("p");
							var mydate = new Date(date);
							eventdata.innerHTML = "<p> City: "+ city + "</p> <p>Country: "  + country + "</p> <p>Date: " + mydate.toDateString() +"</p>";
							 eventcard.appendChild(eventdata);
							 document.getElementById("results").appendChild(eventcard);
						
						});
					});
				}
				else {
					//if no events
					document.getElementById('result').innerHTML = "<p> No upcoming events. Stay tuned for updates!</p>"
				}

			});
		}
	
	}
	
	
