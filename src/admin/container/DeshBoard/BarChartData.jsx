import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';



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
//     { label: "Fruits", value: 400, color: colors.primary[300] },
//     { label: "Vegitables", value: 300, color: colors.primary[500] },
//     { label: "DayFruits", value: 300, color: colors.secondary[300] },
//     { label: "OrganicItems", value: 200, color: colors.secondary[300] },
// ];



const config = {
    height: 350,
    // margin: { left: 0 },
    yAxis: [{ width: 50 }],
    // hideLegend: true,
};

function BarChartData(props) {
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant='h6'>
                Sells of diffrent Category
            </Typography>
            <Typography variant='subtitle' sx={{ color: 'grey' }}>
                (+43%)than last year
            </Typography>


            <BarChart
                // {...data}
                xAxis={[{ data: xLabels }]}
                series={[
                    { data: Fruits, label: "Fruits", stack: "total" },
                    { data: Vegitables, label: "Vegetables", stack: "total" },
                    { data: DayFruits, label: "Dry Fruits", stack: "total" },
                    { data: OrganicItems, label: "Organic Items", stack: "total" }
                ]}
                {...config}
                {...margin}
            />

        </Paper>
    );
}

export default BarChartData;