import React from 'react';
import { Bar, Line, Area, Doughnut } from 'react-chartjs-2';

export const BarChart = ({ ref, labels, datasets, aspectRatio, onClick,title }) => {
  return (
    <Bar
      height={null}
      width={null}
      ref
      data={{
        labels,
        datasets,
      }}
      options={{
        responsive: true,
        aspectRatio,
        legend: {
          display: true,
          onClick: (e, i, l) => {
            onClick(e, i, l);
          },
        },
        title: {
          display: true,
          text: title||'Revenue in hotel by month',
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                offsetGridLines: true,
              },
            },
          ],
        },
      }}
    />
  );
};

export const LineChart = ({ ref, labels, datasets, aspectRatio,title }) => {
  return (
    <Line
      height={null}
      width={null}
      ref={ref}
      data={{
        labels,
        datasets,
      }}
      options={{
        responsive: true,
        aspectRatio,
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: title||'Revenue in hotel by month',
        },
      }}
    />
  );
};
export const DoughnutChart = ({ ref, labels, datasets, aspectRatio,onClick }) => {
  datasets = datasets.map((v, i) => {
    return {
      hoverOffset: 10,
      ...v,
    };
  });
  console.log(datasets);
  return (
    <Doughnut
      height={null}
      width={null}
      ref={ref}
      data={{
        labels,
        datasets,
      }}
      options={{
        responsive: true,
        aspectRatio,
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: 'Revenue in hotel by year',
        },
        tooltips: {
          callbacks: {
            label: function (context) {
              let index = context.index;
              let dataIndex = context.datasetIndex;
              let lable = `${datasets[dataIndex].label[index]}: ${datasets[dataIndex].data[index]}`||'';
              return lable;
            },
          },
        },
      }}
    />
  );
};
