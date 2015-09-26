/*!
 * Kalmanjs
 * http://github.com/wouterbulten/kalmanjs
 * Version: 1.0.0-beta
 *
 * Copyright 2015 Wouter Bulten
 * Released under the GNU LESSER GENERAL PUBLIC LICENSE v3
 */
function _classCallCheck(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,i){for(var s=0;s<i.length;s++){var e=i[s];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(i,s,e){return s&&t(i.prototype,s),e&&t(i,e),i}}(),KalmanFilter=function(){function t(){var i=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],s=i.R,e=void 0===s?1:s,n=i.Q,a=void 0===n?1:n,r=i.A,h=void 0===r?1:r,o=i.B,u=void 0===o?0:o,c=i.C,l=void 0===c?1:c;_classCallCheck(this,t),this.R=e,this.Q=a,this.A=h,this.C=l,this.B=u,this.cov=0/0,this.x=0/0}return _createClass(t,[{key:"filter",value:function(t){var i=arguments.length<=1||void 0===arguments[1]?0:arguments[1];if(isNaN(this.x))this.x=1/this.C*t,this.cov=1/this.C*this.Q*(1/this.C);else{var s=this.A*this.x+this.B*i,e=this.A*this.cov*this.A+this.R,n=e*this.C*(1/(this.C*e*this.C+this.Q));this.x=s+n*(t-this.C*s),this.cov=e-n*this.C*e}return this.x}},{key:"lastMeasurement",value:function(){return this.x}},{key:"setMeasurementNoise",value:function(t){this.Q=t}},{key:"setProcessNoise",value:function(t){this.R=t}}]),t}();

function randn(mean, sd) {

	//Retrieved from jStat
	var u;
	var v;
	var x;
	var y;
	var q;

	do {
		u = Math.random();
		v = 1.7156 * (Math.random() - 0.5);
		x = u - 0.449871;
		y = Math.abs(v) + 0.386595;
		q = x * x + y * (0.19600 * y - 0.25472 * x);
	} while (q > 0.27597 && (q > 0.27846 || v * v > -4 * Math.log(u) * u * u));

	return (v / u) * sd + mean;
}

var dataSetSize = 50;

//Generate two data sets
var dataConstant = Array.apply(null, {length: dataSetSize}).map(function() {
  return 4;
});
var dataLinear = Array.apply(null, {length: dataSetSize}).map(function(e, i, data) {
  return Math.pow(1.1, i);
});

//Add noise to data
var noisyDataConstant = dataConstant.map(function(v) {
  return v + randn(0, 3);
});
var noisyDataLinear = dataLinear.map(function(v) {
  return v + randn(0, 20);
});

//Apply kalman filter
var constantFilter = new KalmanFilter({R: 0.01, Q: 3});
var dataConstantKalman = noisyDataConstant.map(function(v) {
  return constantFilter.filter(v);
});

var linearFilter = new KalmanFilter({R: 0.01, Q: 20});
var dataLinearKalman = noisyDataLinear.map(function(v) {
  return linearFilter.filter(v);
});

var growthFilter = new KalmanFilter({R: 0.01, Q: 20, A: 1.1});
var dataGrowthKalman = noisyDataLinear.map(function(v) {
  return growthFilter.filter(v);
});

//Create plot data for constant data set
var plotDataConstant = {
	labels: noisyDataConstant.map(function(y, i) {
		return i;
	}),
	datasets: [
		/*{
			label: 'Original data without noise',
			fill: false,
      backgroundColor: 'rgba(220,220,220,0)',
			borderColor: 'rgba(26,167,190,0.4)',
			pointBorderColor: 'rgba(26,167,190,1.0)',
			pointBackgroundColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			data: dataConstant
		},*/
		{
			label: 'Noisy data',
			fill: false,
      backgroundColor: 'rgba(220,220,220,0)',
			borderColor: 'rgba(201,48,119,0)',
			pointBorderColor: 'rgba(201,48,119,1.0)',
			pointBackgroundColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			data: noisyDataConstant
		}
	]
};

//Create plot data for constant data set with filtered result
var plotDataConstantKalman = {
	labels: noisyDataConstant.map(function(y, i) {
		return i;
	}),
	datasets: [
    {
      label: 'Original data without noise',
      fill: false,
      backgroundColor: 'rgba(220,220,220,0)',
      borderColor: 'rgba(26,167,190,0.4)',
      pointBorderColor: 'rgba(26,167,190,1.0)',
      pointBackgroundColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      data: dataConstant
    },
		{
			label: 'Kalman estimate',
			fill: false,
      backgroundColor: 'rgba(220,220,220,0)',
			borderColor: 'rgba(55,14,156,0.4)',
			pointBorderColor: 'rgba(55,14,156,1)',
			pointBackgroundColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			data: dataConstantKalman
		},
		{
			label: 'Noisy data',
			fill: false,
      backgroundColor: 'rgba(220,220,220,0)',
			borderColor: 'rgba(201,48,119,0)',
			pointBorderColor: 'rgba(201,48,119,1.0)',
			pointBackgroundColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointBorderWidth: 0,
			data: noisyDataConstant
		}
	]
};

//Create plot data for linear data set
var plotDataLinear = {
	labels: noisyDataLinear.map(function(y, i) {
		return i;
	}),
	datasets: [
		/*{
			label: 'Original data without noise',
			fill: false,
      backgroundColor: 'rgba(220,220,220,0)',
			borderColor: 'rgba(26,167,190,0.4)',
			pointBorderColor: 'rgba(26,167,190,1.0)',
			pointBackgroundColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			data: dataLinear
		},*/
		{
			label: 'Noisy data',
			fill: false,
      backgroundColor: 'rgba(220,220,220,0)',
			borderColor: 'rgba(201,48,119,0)',
			pointBorderColor: 'rgba(201,48,119,1.0)',
			pointBackgroundColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			data: noisyDataLinear
		}
	]
};
//Create plot data for linear with kalman
var plotDataLinearKalman = {
	labels: noisyDataLinear.map(function(y, i) {
		return i;
	}),
	datasets: [
    {
      label: 'Original data without noise',
      fill: false,
      backgroundColor: 'rgba(220,220,220,0)',
      borderColor: 'rgba(26,167,190,0.4)',
      pointBorderColor: 'rgba(26,167,190,1.0)',
      pointBackgroundColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      data: dataLinear
    },
		{
			label: 'Kalman estimate',
			fill: false,
      backgroundColor: 'rgba(220,220,220,0)',
			borderColor: 'rgba(55,14,156,0.4)',
			pointBorderColor: 'rgba(55,14,156,1)',
			pointBackgroundColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			data: dataLinearKalman
		},
		{
			label: 'Noisy data',
			fill: false,
      backgroundColor: 'rgba(220,220,220,0)',
			borderColor: 'rgba(201,48,119,0)',
			pointBorderColor: 'rgba(201,48,119,1.0)',
			pointBackgroundColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			data: noisyDataLinear
		}
	]
};

//Create plot data for linear with better kalman
var plotDataGrowthKalman = {
	labels: noisyDataLinear.map(function(y, i) {
		return i;
	}),
	datasets: [
    {
      label: 'Original data without noise',
      fill: false,
      backgroundColor: 'rgba(220,220,220,0)',
      borderColor: 'rgba(26,167,190,0.4)',
      pointBorderColor: 'rgba(26,167,190,1.0)',
      pointBackgroundColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      data: dataLinear
    },
		{
			label: 'Kalman estimate with A=1.1',
			fill: false,
      backgroundColor: 'rgba(220,220,220,0)',
			borderColor: 'rgba(55,14,156,0.4)',
			pointBorderColor: 'rgba(55,14,156,1)',
			pointBackgroundColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			data: dataGrowthKalman
		},
		{
			label: 'Noisy data',
			fill: false,
      backgroundColor: 'rgba(220,220,220,0)',
			borderColor: 'rgba(201,48,119,0)',
			pointBorderColor: 'rgba(201,48,119,1.0)',
			pointBackgroundColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			data: noisyDataLinear
		}
	]
};

$(window).ready(function() {
	var ctx = $('#chart-constant-data').get(0).getContext('2d');
	var constantDataChart = new Chart(ctx, {
    type: 'line',
    data: plotDataConstant,
    options: {
      legendTemplate: '<% for (var i = 0; i < data.datasets.length; i++){%><span style="color:<%=data.datasets[i].pointBorderColor%>">&nbsp;&nbsp;&FilledSmallSquare;</span><%if(data.datasets[i].label){%><%=data.datasets[i].label%><%}%><%}%>'
    }
  });
	$('#chart-constant-data-legend').html(constantDataChart.generateLegend());

  var ctx = $('#chart-linear-data').get(0).getContext('2d');
  var linearDataChart = new Chart(ctx, {
    type: 'line',
    data: plotDataLinear,
    options: {
      legendTemplate: '<% for (var i = 0; i < data.datasets.length; i++){%><span style="color:<%=data.datasets[i].pointBorderColor%>">&nbsp;&nbsp;&FilledSmallSquare;</span><%if(data.datasets[i].label){%><%=data.datasets[i].label%><%}%><%}%>'
    }
  });
  $('#chart-linear-data-legend').html(linearDataChart.generateLegend());

  var ctx = $('#chart-constant-kalman-data').get(0).getContext('2d');
  var constantkalmanDataChart = new Chart(ctx, {
    type: 'line',
    data: plotDataConstantKalman,
    options: {
      legendTemplate: '<% for (var i = 0; i < data.datasets.length; i++){%><span style="color:<%=data.datasets[i].pointBorderColor%>">&nbsp;&nbsp;&FilledSmallSquare;</span><%if(data.datasets[i].label){%><%=data.datasets[i].label%><%}%><%}%>'
    }
  });
  $('#chart-constant-kalman-data-legend').html(constantkalmanDataChart.generateLegend());

  var ctx = $('#chart-linear-kalman-data').get(0).getContext('2d');
  var linearkalmanDataChart = new Chart(ctx, {
    type: 'line',
    data: plotDataLinearKalman,
    options: {
      legendTemplate: '<% for (var i = 0; i < data.datasets.length; i++){%><span style="color:<%=data.datasets[i].pointBorderColor%>">&nbsp;&nbsp;&FilledSmallSquare;</span><%if(data.datasets[i].label){%><%=data.datasets[i].label%><%}%><%}%>'
    }
  });
  $('#chart-linear-kalman-data-legend').html(linearkalmanDataChart.generateLegend());

  var ctx = $('#chart-growth-kalman-data').get(0).getContext('2d');
  var growthKalmanChart = new Chart(ctx, {
    type: 'line',
    data: plotDataGrowthKalman,
    options: {
      legendTemplate: '<% for (var i = 0; i < data.datasets.length; i++){%><span style="color:<%=data.datasets[i].pointBorderColor%>">&nbsp;&nbsp;&FilledSmallSquare;</span><%if(data.datasets[i].label){%><%=data.datasets[i].label%><%}%><%}%>'
    }
  });
  $('#chart-growth-kalman-data-legend').html(growthKalmanChart.generateLegend());
});
