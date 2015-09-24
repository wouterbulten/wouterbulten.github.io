var Y = [-63, -66, -64, -63, -63, -63, -66, -65, -67, -58, -62, -63, -62, -62, -64, -60, -63, -64, -64, -64, -63, -64, -70, -61, -62, -62, -63, -65, -62, -86, -75, -62, -66, -65, -61, -61, -60, -66, -60, -64];

var Y30 = [-46, -50, -45, -47, -44, -47, -44, -50, -50, -50, -47, -50, -46, -44, -44, -43, -50, -46, -44, -50, -50, -50, -46, -50, -50, -50, -48, -44, -44, -47, -44, -43, -44, -47, -47, -44, -44, -46, -50, -46];
var Yroom = [-79, -74, -73, -75, -67, -60, -73, -82, -73, -80, -73, -81, -74, -75, -74, -72, -70, -78, -70, -72, -74, -71, -73, -75, -76, -74, -74, -72, -77, -76, -70, -73, -75, -77, -77, -72, -70, -74, -73, -75];
var Y60 = [-48, -48, -48, -48, -49, -49, -49, -43, -47, -47, -45, -48, -45, -49, -48, -45, -52, -45, -48, -45, -49, -48, -49, -45, -45, -49, -45, -46, -48, -45, -51, -48, -46, -44, -50, -44, -46, -45, -48, -49];
var Y100 = [-63, -66, -64, -63, -63, -63, -66, -65, -67, -58, -62, -63, -62, -62, -64, -60, -63, -64, -64, -64, -63, -64, -70, -61, -62, -62, -63, -65, -62, -86, -75, -62, -66, -65, -61, -61, -60, -66, -60, -64];
var Y300 = [-69, -71, -71, -67, -67, -70, -65, -72, -71, -73, -69, -64, -73, -73, -66, -72, -68, -69, -73, -71, -66, -66, -72, -70, -72, -66, -71, -72, -67, -74, -65, -71, -75, -66, -64, -69, -66, -72, -69, -71];

var multiRssiData = {
	labels: Y.map(function(y, i) {
		return i;
	}),
	datasets: [
		{
			label: '30cm',
      fill: false,
			backgroundColor: 'rgba(220,220,220,0)',
			borderColor: 'rgba(201,48,119,0.4)',
			pointBorderColor: 'rgba(201,48,119,1.0)',
			pointBackgroundColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			data: Y30
		},
		{
			label: '60cm',
      fill: false,
			backgroundColor: 'rgba(220,220,220,0)',
			borderColor: 'rgba(233,209,9,0.4)',
			pointBorderColor: 'rgba(233,209,9,1.0)',
			pointBackgroundColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			data: Y60
		},
		{
			label: '1m',
      fill: false,
			backgroundColor: 'rgba(220,220,220,0)',
			borderColor: 'rgba(26,167,190,0.4)',
			pointBorderColor: 'rgba(26,167,190,1.0)',
			pointBackgroundColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			data: Y100
		},
		{
			label: '3m',
      fill: false,
			backgroundColor: 'rgba(220,220,220,0)',
			borderColor: 'rgba(0,237,27,0.4)',
			pointBorderColor: 'rgba(0,237,27,1)',
			pointBackgroundColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			data: Y300
		},
		{
			label: 'Different room',
      fill: false,
			backgroundColor: 'rgba(220,220,220,0)',
			borderColor: 'rgba(55,14,156,0.4)',
			pointBorderColor: 'rgba(55,14,156,1)',
			pointBackgroundColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			data: Yroom
		}
	]
};

$(window).ready(function() {
	var ctx = $('#chart-kalman-1').get(0).getContext('2d');
	var rssiLine = new Chart(ctx, {
    type: 'line',
    data: multiRssiData,
    options: {
      scaleShowGridLines: true,
  		scaleShowHorizontalLines: true,
  		scaleShowVerticalLines: false,
  		datasetStrokeWidth: 5,
  		pointDotRadius: 6,
  		scaleFontSize: 20,
  		legendTemplate: "<% for (var i=0; i<datasets.length; i++){%><span style=\"color:<%=datasets[i].borderColor%>\">&nbsp;&nbsp;&FilledSmallSquare;</span><%if(datasets[i].label){%><%=datasets[i].label%><%}%><%}%>"
    }
  });

	$('#chart-kalman-1-legend').html(rssiLine.generateLegend());
});
