import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';

function ConversionsData(props) {
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: 450 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 2, pb: 2.5 }}>
                <Avatar alt="Remy Sharp" src='' />

                <Box>
                    <Typography variant='h6'>
                        Conversions
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex' }}>
                <Box>
                    <Typography variant='h3' sx={{ color: '#50ADC7', pb: 1 }}>
                        +5%
                    </Typography>
                    <Typography variant='subtitle1' sx={{ fontSize: '18px', color: 'gray',pb:20 }}>
                        increase in conversions compared
                        to last year
                    </Typography>
                    <Typography variant='subtitle2' sx={{ color: 'gray' }}>
                        This year is forecasted to increase in your conversion by 0.5% the end of the current year.
                    </Typography>
                </Box>
                <Box>
                    
                </Box>
            </Box>

        </Paper>
    );
}

export default ConversionsData;