import { MenuItem } from "@mui/material";
import React from "react";
import { NavLink } from "react-router";

const MenuItemLink = ({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) => {
  return (
    <MenuItem
      component={NavLink}
      to={to}
      sx={{
        fontSize: "1.2rem",
        textTransform: "uppercase",
        fontWeight: "bold",
        color: "inherit",
        "&.active": {
          color: "yellow",
        },
      }}
    >
      {children}
    </MenuItem>
  );
};

export default MenuItemLink;
