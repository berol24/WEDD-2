import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

function Graphe({ invites }) {
  const [series, setSeries] = useState([0, 0]);
  useEffect(() => {
    const presents = invites.filter(invite => invite.status?.toUpperCase() === 'P').length;
    const absents = invites.filter(invite => invite.status?.toUpperCase() === 'A').length;
    setSeries([presents, absents]);
  }, [invites]);
  
  const presents = invites.filter(invite => invite.status?.toUpperCase() === 'P').length;
  const absents = invites.filter(invite => invite.status?.toUpperCase() === 'A').length;

  const options = {
    chart: {
      type: 'donut',
    },
    labels: [`Presents <b>(${presents})</b>`, `Absents <b>(${absents})</b>`],
    colors: ['#11B141', '#FF0000'],
    legend: {
      position: 'bottom',
      fontSize: '15px',
      itemMargin: { horizontal: 20, vertical: 0 },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              fontSize: '20px',
              fontWeight: 600,
              color: '#373d3f',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: '100%',
        },
        legend: {
          position: 'bottom',
        },
      },
    }],
  };



  return (
    <div className="p-4">
      <div className="w-[300px] h-[300px] border-2">
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}
export default Graphe;
