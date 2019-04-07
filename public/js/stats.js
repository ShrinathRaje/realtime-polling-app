const socket = io();

const URL = getModifiedUrl(window.location.href);

const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        const poll = JSON.parse(this.responseText);
        const dataPts = [];
        for(let i in poll.options) {
            dataPts.push({y: poll.votes[i], name: poll.options[i]});
        }

		var chart = new CanvasJS.Chart("chartContainer", {
            exportEnabled: true,
            animationEnabled: true,
            title:{
                text: poll.title,
                fontColor: "#006400"
            },
            legend:{
                cursor: "pointer",
                itemclick: explodePie
            },
            data: [{
                type: "pie",
                showInLegend: true,
                startAngle: 0,
                yValueFormatString: "##0",
                toolTipContent: "{name}: <strong>{y}</strong>",
                indexLabel: "{name} - {y}",
                dataPoints: dataPts
            }]
        });

        chart.render();

        socket.on('voted', option => {
            const n = parseInt(option);
            ++dataPts[n].y;
            chart.render();
        });
	}
};

xhr.open('GET', `${URL}/statistics`, true);
xhr.send();

function explodePie (e) {
	if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
	} else {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
	}
	e.chart.render();

}

function getModifiedUrl(url) {
    const arr = url.split('/');
    arr.pop();
    return arr.join('/');
}