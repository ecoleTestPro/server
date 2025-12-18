import { ApexOptions } from 'apexcharts';
import React, { Suspense, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

export interface AreaChartProps {
    title?: string;
    series: { name: string; data: number[] }[];
    categories: string[];
}

const EnrollmentRateAreaChart: React.FC<AreaChartProps> = ({ title = 'Chart', series, categories }) => {
    // Chart
    const [isChartLoaded, setChartLoaded] = useState(false);

    useEffect(() => {
        setChartLoaded(true);
    }, []);

    const options: ApexOptions = {
        chart: {
            toolbar: {
                show: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        colors: ['#605DFF', '#0f79f3'],
        xaxis: {
            type: 'category',
            categories,
            axisTicks: {
                show: false,
                color: '#ECEEF2',
            },
            axisBorder: {
                show: false,
                color: '#ECEEF2',
            },
            labels: {
                show: true,
                style: {
                    colors: '#8695AA',
                    fontSize: '12px',
                },
            },
        },
        tooltip: {},
        yaxis: {
            tickAmount: 5,
            max: 110,
            min: 0,
            labels: {
                show: true,
                style: {
                    colors: '#64748B',
                    fontSize: '12px',
                },
            },
            axisBorder: {
                show: false,
                color: '#ECEEF2',
            },
            axisTicks: {
                show: false,
                color: '#ECEEF2',
            },
        },
        legend: {
            show: true,
            position: 'top',
            fontSize: '12px',
            horizontalAlign: 'left',
            itemMargin: {
                horizontal: 8,
                vertical: 0,
            },
            labels: {
                colors: '#64748B',
            },
            markers: {
                size: 6,
                offsetX: -2,
                offsetY: -0.5,
                shape: 'circle',
            },
        },
        grid: {
            show: true,
            borderColor: '#ECEEF2',
        },
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="trezo-card bg-white dark:bg-[#0c1427] p-[20px] md:p-[25px] rounded-md">
                <div className="trezo-card-header mb-[20px] md:mb-[25px] flex items-center justify-between">
                    <div className="trezo-card-title">
                        <h5 className="!mb-0">{title}</h5>
                    </div>
                </div>
                <div className="trezo-card-content">
                    {isChartLoaded && <Chart options={options} series={series} type="area" height={350} width={'100%'} />}
                </div>
            </div>
        </Suspense>
    );
};

export default EnrollmentRateAreaChart;
