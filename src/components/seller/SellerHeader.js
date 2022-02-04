import React, { useState } from "react";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SellIcon from "@mui/icons-material/Sell";
import SettingsIcon from "@mui/icons-material/Settings";
import ChatIcon from "@mui/icons-material/Chat";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import AddBoxIcon from "@mui/icons-material/AddBox";

import style from "../../styles/sellerHeader";

import SellerDashboard from "../seller/SellerDashboard";
import AccountMenu from "../AccountMenu";
//import SellerProduct from "./SellerProduct";
import ProductTab from "./product/ProductTab";
import AddProduct from "./product/AddProduct";
import OrderTab from "./order/OrderTab"
import FinanceDashboard from "./finance/FinanceDashboard";
import ChatSeller from "./chat/ChatSeller";
import logo from "../../assets/images/agri.png";
const drawerWidth = 240;
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function SellerHeader(props) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [area, setArea] = React.useState("dashboard");
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

//NestedList
const [open1, setOpen1] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (event, index, area) => {
    setSelectedIndex(index);
    setArea(area);
  };
  const handleListItemClick2 = (event, index, area) => {
    setSelectedIndex(index);
    setOpen1(!open1);
  };
  const handleListItemClick1 = (event, index, area) => {
    setSelectedIndex(index);
    setArea(area);
  };

  const handleListItemClick11 = (event, index, area) => {
    setArea(area);
  };
  const handleListItemClick12 = (event, index, area) => {
    setArea(area);
  };
  const drawer = (
    <Box>
      <Toolbar>
 
     
          <Img src={logo} sx={{ width: 50, height: 30,mr:1 }} />
         
          <ListItemText>
            <Typography sx={{ fontSize: 10, fontWeight: 500 }}>
              Agrishop
            </Typography>
            <Typography sx={{ fontSize: 8 }}>Bit</Typography>
          </ListItemText>

      </Toolbar>
      <Divider />

      <List>
        <ListItemButton
          selected={selectedIndex === 1}
          sx={style.listItemContainer}
          onClick={(event) => handleListItemClick(event, 1, "dashboard")}
        >
          <ListItemIcon>
            <DashboardIcon
              sx={{ fontSize: 20 }}
              color={selectedIndex === 1 ? "primary" : "none"}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ fontSize: 14 }}>Dashboard</Typography>
          </ListItemText>
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 2}
          sx={style.listItemContainer}
          onClick={(event) => handleListItemClick1(event, 2, "order")}
        >
          <ListItemIcon>
            <ShoppingBasketIcon
              sx={{ fontSize: 20 }}
              color={selectedIndex === 2 ? "primary" : "none"}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ fontSize: 14 }}>Oder</Typography>
          </ListItemText>
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 3}
          sx={style.listItemContainer}
          onClick={(event) => handleListItemClick2(event, 3, "product")}
        >
          <ListItemIcon>
            <SellIcon
              sx={{ fontSize: 20 }}
              color={selectedIndex === 3 ? "primary" : "none"}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ fontSize: 14 }}>Product</Typography>
          </ListItemText>
          {open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={(event) =>
                handleListItemClick11(event, 1, "allproduct")
              }
            >
              <ListItemIcon>
                <AllInboxIcon sx={{ fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText >
                <Typography sx={{ fontSize: 14 }}>All Product</Typography>
              </ListItemText>
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              onClick={(event) =>
                handleListItemClick12(event, 2, "addproduct")
              }
            >
              <ListItemIcon>
                <AddBoxIcon sx={{ fontSize: 20 }} />
              </ListItemIcon>

              <ListItemText >
                <Typography sx={{ fontSize: 14 }}>Add Product</Typography>
              </ListItemText>
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton
          selected={selectedIndex === 4}
          sx={style.listItemContainer}
          onClick={(event) => handleListItemClick1(event, 4, "chat")}
        >
          <ListItemIcon>
            <ChatIcon
              sx={{ fontSize: 20 }}
              color={selectedIndex === 4 ? "primary" : "none"}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ fontSize: 14 }}>Chat</Typography>
          </ListItemText>
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 5}
          sx={style.listItemContainer}
          onClick={(event) => handleListItemClick1(event, 5, "finance")}
        >
          <ListItemIcon>
            <AccountBalanceWalletIcon
              sx={{ fontSize: 20 }}
              color={selectedIndex === 5 ? "primary" : "none"}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ fontSize: 14 }}>Finance</Typography>
          </ListItemText>
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 6}
          sx={style.listItemContainer}
          onClick={(event) => handleListItemClick1(event, 6, "settings")}
        >
          <ListItemIcon>
            <SettingsIcon
              sx={{ fontSize: 20 }}
              color={selectedIndex === 6 ? "primary" : "none"}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ fontSize: 14 }}>Settings</Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <Divider />
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  function ChooseArea() {
    if (area === "dashboard") {
      return <SellerDashboard />;
    } else if (area === "order") {
      return <OrderTab />;
    } else if (area === "product") {
      return <ProductTab />;
    } else if (area === "chat") {
      return <ChatSeller/>;
    } else if (area === "finance") {
      return <FinanceDashboard />;
    } else if (area === "settings") {
      return <SellerDashboard />;
     } else if (area === "addproduct") {
      return <AddProduct />;
    } else if (area === "allproduct") {
      return <ProductTab />;
  } else{}
}
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography>Seller</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <AccountMenu />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <ChooseArea />
      </Box>
    </Box>
  );
}
