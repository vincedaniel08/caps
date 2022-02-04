import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Breadcrumbs } from '@mui/material';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Link } from '@mui/material';
import NewOrder from './NewOrder';
import OrderStatus from './OrderStatus';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </Box>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ProductTab() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (

        <Box sx={{ width: '100%' }}>
            <Breadcrumbs sx={{ mb: 2 }} separator="◦">
                <Link underline="hover" color="inherit" href="/seller">
                    Home
                </Link>
                <Typography color="text.primary">Order</Typography>
            </Breadcrumbs>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="New Orders" {...a11yProps(0)} />
                    <Tab label="Order Status" {...a11yProps(1)} />
                 

                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <NewOrder />
            </TabPanel>
            <TabPanel value={value} index={1}>
               <OrderStatus/>
            </TabPanel>
           
        </Box>


    )
}
