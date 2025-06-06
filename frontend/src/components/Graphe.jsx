import React from 'react'
import ReactApexChart from 'react-apexcharts';


function Graphe({invites=[]}) {
    const presents = invites.filter(invite => invite.status === 'P').length; // Count of presents
    const absents = invites.filter(invite => invite.status === 'A').length; // Count of absent
    

    const [state, setState] = React.useState({
        series: [presents, absents],
        options: {
          chart: {
            type: 'donut',
          },
          tooltip: {
            enabled: true,
            y: {
                formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
                  return value
                }
              }
          },
          labels: [`Presents (<b>${presents}</b>)`, `Absents (<b>${absents}</b>)`],         
          colors: [
            "#11B141",
            "#FF0000",
          ],
          legend: {
            position: 'bottom',
            fontSize: '15px',
            itemMargin: {
                horizontal: 20,
                vertical: 0
            },
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    show: true
                  },
                  value: {
                    show: true
                  },
                  total: {
                    show: true,
                    showAlways: true,
                    label: 'Total',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#373d3f',
                    formatter: function (w) {
                      return w.globals.seriesTotals.reduce((a, b) => a + b, 0)
                    }
                  }
                }
              }
            }
          },
          dataLabels: {
            enabled: true
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: '100%'
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
      });





    
  return (

    <div className="p-4">
      <div id="chart" className='w-[300px] h-[300px] border-2'>
        <ReactApexChart options={state.options} series={state.series} type="donut" />
      </div>
      <div id="html-dist"></div>
    </div>

  )

}export default Graphe