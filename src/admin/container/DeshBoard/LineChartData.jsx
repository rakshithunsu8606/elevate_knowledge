import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';
import React from 'react';

const Fruits = [
    4000, 3000, 2000, 2780, 1890, 2390, 3490, 2400, 1398, 9800, 3908, 4800,
    3800,
];
const Vegitables = [
    2400, 1398, 9800, 3908, 4800, 3800, 4300, 4000, 3000, 2000, 2780, 1890,
    2390,
];
const DayFruits = [
    4000, 3000, 2000, 2780, 1890, 2390, 3490, 2400, 1398, 9800, 3908, 4800,
    3800,
];
const OrganicItems = [
    2400, 1398, 9800, 3908, 4800, 3800, 4300, 4000, 3000, 2000, 2780, 1890,
    2390,
];
const xLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const margin = { right: 24 };

// const data = [
//     { label: "Fruits", value: 400, color: 'black' },
//     { label: "Vegitables", value: 300, color: 'black' },
//     { label: "DayFruits", value: 300, color: 'black' },
//     { label: "OrganicItems", value: 200, color: 'black' },
// ];

// const config = {
//     height: 350,
//     // margin: { left: 0 },
//     yAxis: [{ width: 50 }],
//     // hideLegend: true,
// };

function LineChartData(props) {
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: 450 }}>
            <Typography variant='h6'>
                Order Trend Over Time
            </Typography>
            <Typography variant='subtitle' sx={{ color: 'grey' }}>
                (+42%)than last year
            </Typography>

            <LineChart
                sx={{ pb: 4 }}
                series={[
                    { data: Fruits, label: "Fruits" },
                    { data: Vegitables, label: "Vegetables" },
                    { data: DayFruits, label: "Dry Fruits" },
                    { data: OrganicItems, label: "Organic Items" }
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels, height: 28 }]}
                yAxis={[{ width: 50 }]}
                margin={margin}
            />
        </Paper>
    );
}

export default LineChartData;