import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts';
import React from 'react';
import MinimizeRoundedIcon from '@mui/icons-material/MinimizeRounded';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const data = [


    { label: "Strategy", value: 18, color: '#50ADC7' },
    { label: "Other", value: 28, color: '#F1F1F4' },
    { label: "Marketing", value: 34, color: '#635BFF' },
    { label: "Outsourcing", value: 22, color: '#FB9C0C' },



];

const settings = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    hideLegend: true,
};


function PieChartData2(props) {
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: 450 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 2 }}>
                <Avatar alt="Remy Sharp" src='' />
                
                <Box>
                    <Typography variant='h6'>
                        Cost breakdown
                    </Typography>
                    <Typography variant='subtitle' sx={{ color: 'grey' }}>
                        Based on selected period
                    </Typography>
                </Box>
            </Box>


            <PieChart
                sx={{ pt: 2, pb: 2 }}
                series={[{ innerRadius: 65, outerRadius: 100, data }]}
                {...settings}

            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'grid' }}>
                    <Box>
                        <Typography variant='subtitle1'>
                            <MinimizeRoundedIcon sx={{ color: '#15B79F' }} /> Strategy
                        </Typography>
                        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                            $14,859
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='subtitle1'>
                            <MinimizeRoundedIcon sx={{ color: '#635BFF' }} /> Marketing
                        </Typography>
                        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                            $45,120
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'grid' }}>
                    <Box>
                        <Typography variant='subtitle'>
                            <MinimizeRoundedIcon sx={{ color: '#FB9C0C' }} />  Outsourcing
                        </Typography>
                        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                            $35,690
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='subtitle'>
                            <MinimizeRoundedIcon sx={{ color: '#d3d3e8' }} /> Other
                        </Typography>
                        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                            $25,486
                        </Typography>
                    </Box>
                </Box>

            </Box>
        </Paper>
    );
}

export default PieChartData2;