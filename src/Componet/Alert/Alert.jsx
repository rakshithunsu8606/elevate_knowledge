import { enqueueSnackbar, useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetALert } from '../../Redux/Slice/alert.Slice';

function Alert(props) {
    const { enqueueSnackbar } = useSnackbar();

    const alert = useSelector(state => state.alert)

    console.log(alert);

    const dispatch=useDispatch()

    useEffect(() => {
        if (alert.text !== '') {
            enqueueSnackbar(alert.text, {
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                variant: alert.variant
            }),
            dispatch(resetALert())

        }
    }, [alert.text])

    return (
        <></>
    );
}
export default Alert;