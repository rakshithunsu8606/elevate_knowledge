import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import BarChartData from './BarChartData';
import LineChartData from './LineChartData';

const stats = [
    {
        title: "Total active users",
        value: "18,765",
        change: "+2.6%",
        status: true,
        color: 'green',
        data: [1, 4, 2, 5, 7, 2, 4, 6],
        dataColor: 'black',
    },
    {
        title: "Total Products",
        value: "4,876",
        change: "+0.2%",
        status: true,
        color: 'black',
        data: [8, 5, 2, 5, 9, 2, 8, 1],
        dataColor: 'black',
    },
    {
        title: "Total Orders",
        value: "678",
        change: "-0.1%",
        status: false,
        color: 'black',
        data: [1, 4, 2, 5, 7, 2, 4, 6],
        dataColor: 'black',
    },
    {
        title: "Total Revenue Gauge",
        value: "1,234",
        change: "+1.0%",
        status: true,
        color: 'green',
        data: [8, 5, 2, 5, 9, 2, 8, 1],
        dataColor: 'black',
    },
];

const StateCrad = ({ title, value, change, status, color, data, dataColor }) => {

    const [showHighlight, setShowHighlight] = React.useState(true);
    const [showTooltip, setShowTooltip] = React.useState(true);

    const handleHighlightChange = (event) => {
        setShowHighlight(event.target.checked);
    };

    const handleTooltipChange = (event) => {
        setShowTooltip(event.target.checked);
    };
    // console.log(data);

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="subtitle2">
                {title}
            </Typography>

            <Grid container sx={{ alignItems: 'end' }}>
                <Grid size={8}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {value}
                    </Typography>
                </Grid>
                <Grid size={4}>
                    <SparkLineChart
                        plotType="bar"
                        data={data}
                        color={color}
                        height={60}
                        showHighlight={showHighlight}
                        showTooltip={showTooltip}
                    />
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', mt: 2, color: status ? 'green' : 'black' }}>
                {
                    status ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
                }
                <Typography sx={{ ml: 2 }}>
                    {change} last 7 days
                </Typography>
            </Box>
        </Paper>
    )
}

function DeshBoard(props) {
    return (

        <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
                {
                    stats.map((v) => (
                        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                            <StateCrad {...v} />
                        </Grid>
                    ))
                }

                <Grid size={12}>
                    <BarChartData />
                </Grid>


                <Grid size={8}>
                    <LineChartData />
                </Grid>
                <Grid size={4}>



                </Grid>
            </Grid>
        </Box >

    );
}

export default DeshBoard;