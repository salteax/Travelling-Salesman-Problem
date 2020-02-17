class Punkt {
  constructor(name, x, y, distanz = 0) {
    this.name = name;
    this.x = x; //Längengrad
    this.y = y; //Breitengrad
    this.distanz = distanz;
  }
}

function getDistanz(x1, y1, x2, y2) {
  var y = 111.3 * (y1 - y2); //111.3 = Abstand zwischen zwei Breitenkreisen in km
  var x = 71.5 * (x1 - x2); //71.5 = Abstand zwischen zwei Längenkreisen in km
  return (Math.sqrt(((x * x) + (y * y))));
}

function compare(a, b) {
  if (a < b) {
    return true;
  }
}

function nearestNeighbour(bundesland_auswahl) {

  var laenge_route = 0;
  var array_route = new Array();

  const CSV = `Stuttgart,9.182932,48.775846
München,11.581981,48.135125
Berlin,13.404954,52.520007
Potsdam,13.064473,52.390569
Bremen,8.801694,53.079296
Hamburg,9.993682,53.551085
Wiesbaden,8.239761,50.078218
Schwerin,11.401250,53.635502
Hannover,9.732010,52.375892
Düsseldorf,6.773456,51.227741
Mainz,8.247253,49.992862
Saarbrücken,6.996933,49.240157
Dresden,13.7372621,51.0504088
Magdeburg,11.627624,52.120533
Kiel,10.122765,54.323293
Erfurt,11.029880,50.984768`

  const array = CSV.split('\n').map(line => {
    const [city, x, y] = line.split(',');
    return new Punkt(city, +x, +y);
  });

 for (var i = 0; i < array.length; i++) {
   if (array[i].name === bundesland_auswahl) {
     var A_punkt = array[i];
     var E_punkt = array[i];
   }
 }

 var Aktueller_punkt = new Punkt("", 0, 0, 0);

 while (array.length > 1) {
   var min = 9999999999999999999999999999;

   for (var i = 0; i < array.length; i++) {
       array[i].distanz = this.getDistanz(A_punkt.x, A_punkt.y, array[i].x, array[i].y);

       if (array[i].distanz != 0) {
         if (compare(array[i].distanz, min)) {
           min = array[i].distanz;
           Aktueller_punkt = array[i];
         }
       }
     }

     array_route.push(A_punkt.name + " → " + Aktueller_punkt.name);
     A_punkt = Aktueller_punkt;
     laenge_route = laenge_route + A_punkt.distanz;

     for (var i = 0; i < array.length; i++) {
       if (array[i].distanz == 0) {
         array.splice(i, 1); //entfernt den Punkt der dem aktuellen AE_punkt entspricht
       }
     }
   }

   array[0].distanz = this.getDistanz(E_punkt.x, A_punkt.y, array[0].x, array[0].y);
   laenge_route = laenge_route + E_punkt.distanz;
   array_route.push((array[0].name + " → " + E_punkt.name))

   updateStats(array_route, laenge_route);
}

function updateStats(array_route, laenge_route) {

  try {
    var ele1 = document.getElementById('tabelle');
    ele1.parentNode.removeChild(ele1);
    var ele2 = document.getElementById('p_distanz');
    ele2.parentNode.removeChild(ele2);
  } catch (e) {
    console.log("Elemente existieren nicht!");
  }

  var myTableDiv = document.getElementById("route_tabelle");

  var table = document.createElement('TABLE');
  table.setAttribute("id", "tabelle", 0);

  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  for (var i = 0; i < 16; i++) {
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);

    for (var j = 0; j < 1; j++) {
      var td = document.createElement('TD');
      td.appendChild(document.createTextNode(array_route[i]));
      tr.appendChild(td);
    }
  }
  myTableDiv.appendChild(table);

  var myDistanzDiv = document.getElementById('route_distanz');
  var p = document.createElement('p');
  p.setAttribute("id", "p_distanz", 0);
  p.appendChild(document.createTextNode(laenge_route + " km"));
  myDistanzDiv.appendChild(p);
}
