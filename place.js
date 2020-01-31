const Locations = [
  {
    placename: "LC",
    latitude: 25.260708,
    longitude: 82.986878
  },
  {
  	placename: "NANDA",
  	latitude: 25.258503,
  	longitude: 82.987808
  }
];

var centre = new L.LatLng(25.260644, 82.986878); //25.260644, 82.986878
    var polygon = [{
      	placeArea: "lc",
      	/*color:"#d09f5f",*/
      	area: "lc",
      	points: [
	      	new L.LatLng(25.260010, 82.984468),
	      	new L.LatLng(25.260090, 82.984446),
	      	new L.LatLng(25.260609, 82.986391),
	      	new L.LatLng(25.261060, 82.986753),
	      	new L.LatLng(25.262606, 82.986494),
	      	new L.LatLng(25.262613, 82.986639),
	      	new L.LatLng(25.261356, 82.986819),
	      	new L.LatLng(25.260883, 82.987518),
	      	new L.LatLng(25.261260, 82.989204),
	      	new L.LatLng(25.261130, 82.989282),
	      	new L.LatLng(25.260681, 82.987215),
	      	new L.LatLng(25.260251, 82.987063),
	      	new L.LatLng(25.259020, 82.987606),
	      	new L.LatLng(25.258964, 82.987503),
	      	new L.LatLng(25.260396, 82.986903),
	      	new L.LatLng(25.260505, 82.986483)
    		]
    	},
     	{ 
     		placeArea: "nanda",
	      	color:"#92AA83",
	      	area: "nanda",
	      	points: [
        	new L.LatLng(25.258341, 82.987868),
			new L.LatLng(25.258363, 82.987940),
			new L.LatLng(25.258513, 82.987921),
			new L.LatLng(25.259732, 82.990583),
			new L.LatLng(25.259800, 82.990553),
			new L.LatLng(25.258578, 82.987883),
			new L.LatLng(25.258609, 82.987796),
			new L.LatLng(25.260582, 82.986930),
			new L.LatLng(25.260568, 82.986871),
			new L.LatLng(25.258589, 82.987721),
			new L.LatLng(25.258499, 82.987715),
			new L.LatLng(25.257222, 82.985022),
			new L.LatLng(25.257171, 82.985048),
			new L.LatLng(25.258428, 82.987746)
			]
  		},
	];

window.onload = () => {
	function isPointInLayer(userL, layer) {
        var within = false;
        var x = userL.latitude, y = userL.longitude;
        for (var ii = 0; ii < layer.getLatLngs().length; ii++) {
            var polyPoints = layer.getLatLngs()[ii];
            for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
                var xi = polyPoints[i].lat, yi = polyPoints[i].lng;
                var xj = polyPoints[j].lat, yj = polyPoints[j].lng;

                var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect)
                    within = !within;
            }
        }
        return within;
    };

    /*function createPolygon(area,index) {
        area.placeArea = new L.polygon(area.points,{color: area.color});
        map.addLayer(area.placeArea);      
    }*/

    polygon.forEach((area)=>{
       	area.placeArea = new L.polygon(area.points,{color: area.color});
       	map.addLayer(area.placeArea);
    });
      
      function watchuser(){
      	var posi = [];
        navigator.geolocation.getCurrentPosition((pos)=>{
          	polygon.forEach((area)=>{
            	if(isPointInLayer(pos.coords,area.placeArea)){

              		const scene = document.querySelector('a-scene');

				    // first get current user location
				    return navigator.geolocation.getCurrentPosition(function (position) {

				        // than use it to load from remote APIs some places nearby
				        Locations.forEach((place) => {
				        	if(place.placename == area.area){
					            const latitude = place.latitude;
					            const longitude = place.longitude;

					            const icon = document.createElement('a-entity');
					            icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
					            icon.setAttribute('name', place.placename);
					            icon.setAttribute('gltf-model', './assets/technextext1.gltf');
					            icon.setAttribute('rotation', '0 180 0');
					            //icon.setAttribute('animation-mixer', '');
					            icon.setAttribute('scale', '15 15 15');
					            icon.addEventListener('loaded', () => {
					                window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
					            });
					            const clickListener = function(ev) {
					                ev.stopPropagation();
					                ev.preventDefault();

					                const name = ev.target.getAttribute('name');

					                const el = ev.detail.intersection && ev.detail.intersection.object.el;

					                if (el && el === ev.target) {
					                    const label = document.createElement('span');
					                    const container = document.createElement('div');
					                    container.setAttribute('id', 'place-label');
					                    label.innerText = name;
					                    container.appendChild(label);
					                    document.body.appendChild(container);

					                    setTimeout(() => {
					                        container.parentElement.removeChild(container);
					                    }, 1500);
					                };
					            };

					            icon.addEventListener('click', clickListener);

					            scene.appendChild(icon);
					            break;
				        	}
				        });
				        /*loadPlaces(position.coords)
				            .then((places) => {
				                places.forEach((place) => {
				                    const latitude = place.location.lat;
				                    const longitude = place.location.lng;
				                    // add place name
				                    const placeText = document.createElement('a-link');
				                    placeText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
				                    placeText.setAttribute('title', place.name);
				                    placeText.setAttribute('scale', '15 15 15');
				                    
				                    placeText.addEventListener('loaded', () => {
				                        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
				                    });
				                    scene.appendChild(placeText);
				                });
				            })*/
				    };/*,
				        (err) => console.error('Error in retrieving position', err),
				        {
				            enableHighAccuracy: true,
				            maximumAge: 0,
				            timeout: 27000,
				        }
				    );*/
            	} else {
              		/*alert("not in area " + area.area);*/
            	}
          	});
        });
    };

    watchuser();

}


