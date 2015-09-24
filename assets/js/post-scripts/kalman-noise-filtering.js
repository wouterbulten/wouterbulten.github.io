var Y = [-63, -66, -64, -63, -63, -63, -66, -65, -67, -58, -62, -63, -62, -62, -64, -60, -63, -64, -64, -64, -63, -64, -70, -61, -62, -62, -63, -65, -62, -86, -75, -62, -66, -65, -61, -61, -60, -66, -60, -64];

var Y30 = [-46, -50, -45, -47, -44, -47, -44, -50, -50, -50, -47, -50, -46, -44, -44, -43, -50, -46, -44, -50, -50, -50, -46, -50, -50, -50, -48, -44, -44, -47, -44, -43, -44, -47, -47, -44, -44, -46, -50, -46];
var Yroom = [-79, -74, -73, -75, -67, -60, -73, -82, -73, -80, -73, -81, -74, -75, -74, -72, -70, -78, -70, -72, -74, -71, -73, -75, -76, -74, -74, -72, -77, -76, -70, -73, -75, -77, -77, -72, -70, -74, -73, -75];
var Y60 = [-48, -48, -48, -48, -49, -49, -49, -43, -47, -47, -45, -48, -45, -49, -48, -45, -52, -45, -48, -45, -49, -48, -49, -45, -45, -49, -45, -46, -48, -45, -51, -48, -46, -44, -50, -44, -46, -45, -48, -49];
var Y100 = [-63, -66, -64, -63, -63, -63, -66, -65, -67, -58, -62, -63, -62, -62, -64, -60, -63, -64, -64, -64, -63, -64, -70, -61, -62, -62, -63, -65, -62, -86, -75, -62, -66, -65, -61, -61, -60, -66, -60, -64];
var Y300 = [-69, -71, -71, -67, -67, -70, -65, -72, -71, -73, -69, -64, -73, -73, -66, -72, -68, -69, -73, -71, -66, -66, -72, -70, -72, -66, -71, -72, -67, -74, -65, -71, -75, -66, -64, -69, -66, -72, -69, -71];

var rssi = [-63, -66, -64, -63, -63, -63, -66, -65, -67, -58, -62, -63, -62, -62, -64, -60, -63, -64, -64, -64, -63, -64, -70, -61, -62, -62, -63, -65, -62, -86, -75, -62, -66, -65, -61, -61, -60, -66, -60, -64];
var filtered = [-63, -64.5014985014985, -64.33377615189342, -63.99800498504884, -63.796019262584124, -63.66093175631507, -64.00370348525949, -64.13255543261918, -64.46542367905813, -63.78258520209969, -63.6093922577094, -63.55441719248509, -63.42318145127931, -63.309964352411306, -63.361995010642005, -63.12046231681456, -63.1121788014722, -63.170852875497914, -63.22370877116938, -63.27159916400582, -63.25533646023412, -63.298729396133346, -63.67966763744755, -63.53074428532079, -63.44740925294806, -63.37008072141169, -63.35064599921501, -63.43591197519457, -63.362737613573074, -64.50131241077843, -65.02307077102219, -64.87446800675337, -64.92924385513285, -64.93265595109995, -64.74459021179138, -64.56688256117405, -64.35166169326264, -64.42884683792019, -64.22267058287112, -64.21235986713583];

var dist30 = Y30.map(function(rssi) {
	return Math.pow(10, (rssi + 62) / (-10 * 2));
});
var dist60 = Y60.map(function(rssi) {
	return Math.pow(10, (rssi + 62) / (-10 * 2));
});
var dist100 = Y100.map(function(rssi) {
	return Math.pow(10, (rssi + 62) / (-10 * 2));
});
var dist300 = Y300.map(function(rssi) {
	return Math.pow(10, (rssi + 62) / (-10 * 2));
});
var distroom = Yroom.map(function(rssi) {
	return Math.pow(10, (rssi + 62) / (-10 * 2));
});

var distDataSpike = {
	labels: dist30.map(function(y, i) {
		return i;
	}),
	datasets: [
		{
			label: '1m',
			fill: false,
      backgroundColor: 'rgba(220,220,220,0)',
			borderColor: 'rgba(26,167,190,0.4)',
			pointBorderColor: 'rgba(26,167,190,1.0)',
			pointBackgroundColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			data: dist100
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
			data: dist300
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
			data: distroom
		}
	]
};

var filteredData = {
	labels: rssi.map(function(y, i) {
		return i;
	}),
	datasets: [
		{
			label: 'RSSI at 1m',
      fill: false,
      backgroundColor: 'rgba(220,220,220,0)',
			borderColor: 'rgba(26,167,190,0.4)',
			pointBorderColor: 'rgba(26,167,190,1.0)',
			pointBackgroundColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			data: rssi
		},
		{
			label: 'Filtered RSSI',
      fill: false,
      backgroundColor: 'rgba(220,220,220,0)',
			borderColor: 'rgba(201,48,119,0.4)',
			pointBorderColor: 'rgba(201,48,119,1.0)',
			pointBackgroundColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			data: filtered
		}
	]
};

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
      legendTemplate: '<% for (var i = 0; i < data.datasets.length; i++){%><span style="color:<%=data.datasets[i].pointBorderColor%>">&nbsp;&nbsp;&FilledSmallSquare;</span><%if(data.datasets[i].label){%><%=data.datasets[i].label%><%}%><%}%>'
    }
  });
	$('#chart-kalman-1-legend').html(rssiLine.generateLegend());

  var ctx = $('#chart-kalman-2').get(0).getContext('2d');
	var kalmanLine = new Chart(ctx, {
    type: 'line',
    data: filteredData,
    options: {
      scaleShowGridLines: true,
  		scaleShowHorizontalLines: true,
  		scaleShowVerticalLines: false,
  		datasetStrokeWidth: 5,
  		pointDotRadius: 6,
  		scaleFontSize: 20,
      legendTemplate: '<% for (var i = 0; i < data.datasets.length; i++){%><span style="color:<%=data.datasets[i].pointBorderColor%>">&nbsp;&nbsp;&FilledSmallSquare;</span><%if(data.datasets[i].label){%><%=data.datasets[i].label%><%}%><%}%>'
    }
  });
	$('#chart-kalman-2-legend').html(kalmanLine.generateLegend());

	var ctx = $('#chart-kalman-3').get(0).getContext('2d');
	var distLine = new Chart(ctx, {
    type: 'line',
    data: distDataSpike,
    options: {
      scaleShowGridLines: true,
  		scaleShowHorizontalLines: true,
  		scaleShowVerticalLines: false,
  		datasetStrokeWidth: 5,
  		pointDotRadius: 6,
  		scaleFontSize: 20,
      legendTemplate: '<% for (var i = 0; i < data.datasets.length; i++){%><span style="color:<%=data.datasets[i].pointBorderColor%>">&nbsp;&nbsp;&FilledSmallSquare;</span><%if(data.datasets[i].label){%><%=data.datasets[i].label%><%}%><%}%>'
    }
  });

	$('#chart-kalman-3-legend').html(distLine.generateLegend());
});
