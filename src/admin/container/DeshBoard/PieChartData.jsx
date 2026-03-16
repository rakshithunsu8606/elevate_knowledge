import { PieChart } from '@mui/x-charts/PieChart';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
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

const orderDistribution = [
    { label: "Delivered", value: 70, color: 'green' },
    { label: "Padding", value: 20, color: 'lightgreen' },
    { label: "Cancelled", value: 10, color: '#808000' },
];

const settings = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    // hideLegend: true,
};

function PieChartData(props) {
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: 450 }}>
            <Typography variant='h6'>
                Order Status Distribution
            </Typography>
            <Typography variant='subtitle' sx={{ color: 'grey' }}>
                (+43%)than last year
            </Typography>

            <PieChart
                sx={{ pt: 4 }}
                series={[{ innerRadius: 40, outerRadius: 100, data:orderDistribution, arcLabel: 'value' }]}
                {...settings}
            />
        </Paper>
    );
}

export default PieChartData;