import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function SnackAlert(props) {

    return(
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={props.open} autoHideDuration={600} >
                <Alert onClose={props.handleClose} severity="error" sx={{ width: '100%' }}>
                    Choose your {props.name} plz
                </Alert>
            </Snackbar>
        </Stack>
    );
}