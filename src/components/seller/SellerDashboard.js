import React, { useState } from "react";
import {
  Box,
  Typography,
  Link,
  Breadcrumbs,
  Grid,
  Paper,
  Card,
  CardContent,
  IconButton,
  //LinearProgress,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Chart from "react-apexcharts";

import { useSelector } from "react-redux";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 10,
  width: "100%",
}));

export default function SellerDashboard() {
    const ui = useSelector((state) => state.ui);
    //const userData = useSelector((state) => state.user);
    
  const [optionsLine] = useState({
    chart: {
      id: "apexchart",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      toolbar: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },

    grid: {
      show: false,
    },
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      colors: undefined,
      width: 2,
      dashArray: 0,
    },
    colors: ["#5DDC9A", "#E91E63"],
    tooltip:{
        theme: ui.isDarkMode === true ? "light" : "dark",
    }
  });

  const [optionsRadialBar] = useState({
    plotOptions: {
      radialBar: {
        track: {
          opacity: 0.5,
        },
        dataLabels: {
            
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w) {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return 249;
              
            },
            
          },
        
         
        },
      },
    },
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "bottom",
      horizontalAlign: "center",
      floating: false,
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 400,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors:  ui.isDarkMode === true ? "black" : "white",
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: undefined,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 0,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },

    stroke: {
      lineCap: "round",
    },
    labels: ["Meat", "Vegetables", "Fruits", "Cereal"],
  });

  const [optionsArea] = useState({
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "Month",
      categories: [
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
      ],
      labels: {
          style:{
        colors:  ui.isDarkMode === true ? "gray" : "gray",
          }
      }
    },
   
  

    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "top",
      horizontalAlign: "right",
      floating: false,
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 400,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors:  ui.isDarkMode === true ? "black" : "white",
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: undefined,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 0,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },

    grid: {
      borderColor: "#90A4AE",
      strokeDashArray: 10,

      yaxis: {
        lines: {
          show: false,
        },

        labels: {
            style:{
          colors:  ui.isDarkMode === true ? "gray" : "gray",
            }
        }
      },
    },

    colors: ["#5DDC9A", "#E91E63"],
    tooltip:{
      
        theme: ui.isDarkMode === true ? "light" : "dark",

    }
  });

  const [series] = useState([
    {
      name: "series-1",
      data: [30, 20, 50, 10, 30],
    },
  ]);
  const [seriesRadialBar] = useState([44, 55, 67, 83]);
  const [seriesArea] = useState([
    {
      name: "Total Income",
      data: [30, 20, 50, 10, 30, 29, 19, 5, 2, 20, 30, 29],
      
    },
    {
      name: "Total Expenses",
      data: [11, 5, 32, 50, 40, 2, 1, 30, 5, 5, 2, 10],
    },
  ]);
  return (
    <Box>
      <Breadcrumbs sx={{ mb: 2 }} separator="◦">
        <Link underline="hover" color="inherit" href="/seller">
          Home
        </Link>
        <Typography color="text.primary">Dashboard</Typography>
      </Breadcrumbs>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Item>
            <Card sx={{ display: "flex", boxShadow: 0 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography variant="subtitle1">Product Sold</Typography>
                  <Typography
                    variant="h4"
                    color="text.primary"
                    sx={{ fontWeight: 700 }}
                  >
                    545
                  </Typography>
                </CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  <IconButton aria-label="play/pause">
                    <TrendingUpIcon
                      color="primary"
                      sx={{ height: 15, width: 15, borderRadius: 10 }}
                    />
                  </IconButton>
                  <Typography sx={{ fontSize: 12 }}>
                    +2.6% than last week
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  width: 200,
                }}
              >
                <Chart options={optionsLine} series={series} type="line" />
              </Box>
            </Card>
          </Item>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Item>
            <Card sx={{ display: "flex", boxShadow: 0 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography variant="subtitle1">Total Balance</Typography>
                  <Typography
                    variant="h4"
                    color="text.primary"
                    sx={{ fontWeight: 700 }}
                  >
                    545
                  </Typography>
                </CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  <IconButton aria-label="play/pause">
                    <TrendingUpIcon
                      color="primary"
                      sx={{ height: 15, width: 15, borderRadius: 10 }}
                    />
                  </IconButton>
                  <Typography sx={{ fontSize: 12 }}>
                    +2.6% than last week
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  width: 200,
                }}
              >
                <Chart options={optionsLine} series={series} type="line" />
              </Box>
            </Card>
          </Item>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Item>
            <Card sx={{ display: "flex", boxShadow: 0 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography variant="subtitle1">Sales Profit</Typography>
                  <Typography
                    variant="h4"
                    color="text.primary"
                    sx={{ fontWeight: 700 }}
                  >
                    545
                  </Typography>
                </CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  <IconButton aria-label="play/pause">
                    <TrendingDownIcon
                      color="error"
                      sx={{ height: 15, width: 15, borderRadius: 10 }}
                    />
                  </IconButton>
                  <Typography sx={{ fontSize: 12 }}>
                    +2.6% than last week
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  width: 200,
                }}
              >
                <Chart options={optionsLine} series={series} type="line" />
              </Box>
            </Card>
          </Item>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Item>
            <Typography
              color="textPrimary"
              sx={{ textAlign: "left", ml: 1, fontWeight: 600, my: 1 }}
            >
              Sales by Category
            </Typography>
            <Chart
              options={optionsRadialBar}
              series={seriesRadialBar}
              type="radialBar"
            />
          </Item>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Item>
            <Typography
              color="textPrimary"
              sx={{ textAlign: "left", ml: 1, fontWeight: 600, my: 1 }}
            >
              Monthly Sales
            </Typography>
            <Chart
              options={optionsArea}
              series={seriesArea}
              type="area"
              height={255}
            />
          </Item>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Item>
            <Typography
              color="textPrimary"
              sx={{ textAlign: "left", ml: 1, fontWeight: 600, my: 1 }}
            >
              Sales Overview
            </Typography>
            <Box sx={{my:2}}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  color="textPrimary"
                  sx={{ textAlign: "left", ml: 1, my: 1 ,fontSize:14 }}
                >
                  Total Profit
                </Typography>
                <Box sx={{ flexGrow: 1 }} />

                <Typography
                  color="textPrimary"
                  sx={{ textAlign: "right", ml: 1, my: 1 ,fontSize:14 }}
                >
                  P 200,200.00
                </Typography>
                <Typography
                  color="textSecondary"
                  sx={{ textAlign: "right", ml: 1, my: 1,fontSize:14  }}
                >
                  (20%)
                </Typography>
              </Box>
              {/* <LinearProgress
                variant="determinate"
                value={20}
                sx={{ borderRadius: 5,ml:1 }}
              /> */}
            </Box>

            <Box sx={{my:2}}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  color="textPrimary"
                  sx={{ textAlign: "left", ml: 1, my: 1,fontSize:14  }}
                >
                  Total Income
                </Typography>
                <Box sx={{ flexGrow: 1 }} />

                <Typography
                  color="textPrimary"
                  sx={{ textAlign: "right", ml: 1, my: 1 ,fontSize:14 }}
                >
                  P 50,200.00
                </Typography>
                <Typography
                  color="textSecondary"
                  sx={{ textAlign: "right", ml: 1, my: 1,fontSize:14 }}
                >
                  (70%)
                </Typography>
              </Box>
              {/* <LinearProgress
                variant="determinate"
                value={70}
                sx={{ borderRadius: 5,ml:1 }}
                color="tertiary"
              /> */}
            </Box>

            <Box sx={{my:2}}>
              <Box sx={{ display: "flex", alignItems: "center", }}>
                <Typography
                  color="textPrimary"
                  sx={{ textAlign: "left", ml: 1, my: 1 ,fontSize:14}}
                >
                  Total Expenses
                </Typography>
                <Box sx={{ flexGrow: 1 }} />

                <Typography
                  color="textPrimary"
                  sx={{ textAlign: "right", ml: 1, my: 1,fontSize:14 }}
                >
                  P 20,200.00
                </Typography>
                <Typography
                  color="textSecondary"
                  sx={{ textAlign: "right", ml: 1, my: 1,fontSize:14 }}
                >
                  (50%)
                </Typography>
              </Box>
              {/* <LinearProgress
                variant="determinate"
                value={50}
                sx={{ borderRadius: 5,ml:1 }}
                color="secondary"
                
              /> */}
            </Box>
          </Item>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Item>
          <Typography
              color="textPrimary"
              sx={{ textAlign: "left", ml: 1, fontWeight: 600, my: 1 }}
            >
            Latest Product
            </Typography>
            <Box sx={{display:"flex",ml:1, textAlign:"center",justifyItems:"center",alignItems:"center",my:2}}>
                <Avatar/>
                <Typography color="textPrimary" sx={{fontSize:14, ml:2}}>Red Chilli</Typography>
                <Box sx={{flexGrow:1}}/>
                <Typography sx={{fontSize:12, ml:1}}>P 90.00</Typography>
            </Box>

            <Box sx={{display:"flex",ml:1, textAlign:"center",justifyItems:"center",alignItems:"center",my:2}}>
                <Avatar/>
                <Typography color="textPrimary" sx={{fontSize:14, ml:2}}>Red Chilli</Typography>
                <Box sx={{flexGrow:1}}/>
                <Typography sx={{fontSize:12, ml:1}}>P 90.00</Typography>
            </Box>
            <Box sx={{display:"flex",ml:1, textAlign:"center",justifyItems:"center",alignItems:"center",my:2}}>
                <Avatar/>
                <Typography color="textPrimary" sx={{fontSize:14, ml:2}}>Red Chilli</Typography>
                <Box sx={{flexGrow:1}}/>
                <Typography sx={{fontSize:12, ml:1}}>P 90.00</Typography>
            </Box>

          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
