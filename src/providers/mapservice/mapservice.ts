import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { MapserviceInfomarkerProvider } from '../mapservice/infomarker';


/*
  Generated class for the MapserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var google;

@Injectable()
export class MapserviceProvider {

  map: any;
  data: any;
  markers =
  [{


    Pub: [{
      markerid: 1,
      name: "אבו חסן",
      cordinates: {
        lat: 32.050561,
        lng:34.750870
      }

    },
    {
      markerid: 2,
      name: "מוזיאון ארץ ישראל, תל אביב",
      cordinates: {
        lat: 32.10335,
        lng: 34.796988
      }

    }
    ]
  },
  {
    aub: [{
      markerid: 1,
      name: "זיתון",
      cordinates: {
        lat: 32.052947,
        lng: 34.790025
      }

    },
    {
      markerid: 2,
      name: "מנטה ריי",
      cordinates: {
        lat: 32.061752,
        lng: 34.759920
      }

    }
    ]
  },
  {
    hel: [{
      markerid: 1,
      name: "עריית תל אביב",
      cordinates: {
        lat: 32.081830,
        lng: 34.780823
      }

    },
    {
      markerid: 2,
      name: "ביטוח לאומי",
      cordinates: {
        lat: 32.114464,
        lng: 34.805320
      }

    }
    ]


  }
  ]

  constructor(public geolocation: Geolocation, public http: Http, public infomarker: MapserviceInfomarkerProvider) {
    console.log('Hello MapserviceProvider Provider');
  }

  mapinit(mapElement) {
    let latLng
    this.geolocation.getCurrentPosition().then((position) => {

      latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        zoom: 1,
        minZoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#263c3f' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#6b9a76' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#38414e' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#212a37' }]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9ca5b3' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#746855' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#1f2835' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#f3d19c' }]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#2f3948' }]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#17263c' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#515c6d' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#17263c' }]
          }
        ]
      }

      this.map = new google.maps.Map(mapElement.nativeElement, mapOptions);

      //this.setCenter(latLng);
      let testlang = new google.maps.LatLng(32.057473, 34.792847);
      this.setCenter(testlang);
      this.initmarker();
    }, (err) => {
      console.log(err);
    });
  }
  setCenter(latLng) {
    // let latLng=new google.maps.LatLng(32.057196,34.792841);
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
      //this.map.getCenter()
    });
    this.map.setCenter(latLng);

    let content = "<h4>Information!</h4>";
    /* var geocoder = new google.maps.Geocoder;
     let placeid ;
     //var latlng = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
      let latitude=marker.getPosition().lat();
      let longitude=marker.getPosition().lng();
      var lg= {lat:32.065823, lng:34.785942};
     geocoder.geocode({'location': lg}, function(results, status) {
         if (status === google.maps.GeocoderStatus.OK) {
           if (results[0]) {
             var request = {
               placeId: results[5].place_id
             };

             getImg(request,this.map);
           } else {
             window.alert('No results found');
           }
         } else {
           window.alert('Geocoder failed due to: ' + status);
         }
       })*/
    function getImg(request, map) {
      let service = new google.maps.places.PlacesService(map);
      service.getDetails(request, callback);

      function callback(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          var photos = place.photos;

          var img = photos[5].getUrl({ 'maxWidth': 200, 'maxHeight': 200 });
          // console.log(img);

        }
      }
    }
    this.addInfoWindow(marker, content);

  }
  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }
  initmarker() {
    for (let m of this.markers) {
      for (let key in m) {
        m[key].forEach(element => {
          let imgurl = "assets/imgs/markerIcon/";
          interface markerIcon {
            // size:string,
            url: string,
            size: any,
            origin: any
          };
          var i = "";
          let icons = <markerIcon>{
            url: imgurl + "Pubicon.png",
            size: new google.maps.Size(100, 100),
            origin: new google.maps.Point(0, 0)
          }
          if (key == "Pub") {
            icons.url = imgurl + "Pubicon.png";
            //size:new google.maps.Size(100,100),
          }
          else if (key == "aub") {
            //   markerIcon=imgurl+"Pubicon.svg";
            icons.url = imgurl + "abslicon.png"
            // size:new google.maps.Size(100,100),
          }
          else if (key == "hel") {
            // markerIcon=imgurl+"Helficon.svg";
            icons.url = imgurl + "abslicon.png"
          }
          let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: element.cordinates,
            icon: icons,
            optimized: false
            //"assets/imgs/markerIcon/Pubicon.svg"
          });
        marker.setValues({name:element.name});
          this.addInfoMarker(marker);
        });
      }

    }
    var myoverlay = new google.maps.OverlayView();
    myoverlay.draw = function () {
      this.getPanes().markerLayer.id = 'markerLayer';
    };
    myoverlay.setMap(this.map);

  }
  addInfoMarker(marker)
  {
    let lanm= marker.position.lat();
    let lngm=marker.position.lng();
    let infoWindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', () => {

      this.http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lanm + ',' +lngm + '&radius=100&name="' + marker.name + '"&key=AIzaSyCVIr8phyQ7tbxVepSOekb5pcaS2Ci4V-8').map(res => res.json()).subscribe(data => {
        this.data = data.resulte;
        infoWindow.open(this.map, marker);
      });

    });

  }

}
