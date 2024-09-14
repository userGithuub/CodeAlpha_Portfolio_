$(document).ready(function () {
    const menu = document.querySelector('.menu-btn');
    const sidebar = document.querySelector('.sidebar');
   
    menu.addEventListener('click',function(){
        sidebar.classList.toggle('.active');
        if(window.innerWidth <=768){
            sidebar.classList.remove('active');
        }
    });
    var options = {
        series: [{
            name: 'Series 1',
            data: [101, 64, 78, 191, 42, 109, 100, 230]
        }, {
            name: 'Series 2',
            data: [41, 32, 85, 42, 124, 52, 71, 120]
        }],
        chart: {
            height: 300,
            type: 'area',
            toolbar: {
                show: false,
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#1a73e8', '#e91e63'],
        stroke: {
            curve: 'smooth'
        },
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.6,
                opacityTo: 0.8,
            }
        },
        tooltip: {
            theme: 'dark',
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
            labels: {
                style: {
                    colors: 'white'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: 'white'
                }
            }
        },
        legend: {
            labels: {
                colors: 'white'
            }
        },
    };

    var chart = new ApexCharts(document.querySelector("#chLine"), options);
    chart.render();

    //dougnut chart
    var options = {
        series: [44,55,17,34],
        labels: ['Viewers','Followers','Connections','Likes',],
        chart: {
            type: 'donut',
            height: 250,
            plotOptions: {
                pie: {
                    expandOnClick: true 
                },
            },
        },
        colors: ['#3a86ff', '#3d348b','#ff006e','#ffbe0b'],
        legend: {
            show: false
        }
    };
var chart = new ApexCharts(document.querySelector('#dougnut-chart'), options);
chart.render();
})
// Toggle Sidebar Menu
document.querySelector('.menu-btn').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('active');
});
