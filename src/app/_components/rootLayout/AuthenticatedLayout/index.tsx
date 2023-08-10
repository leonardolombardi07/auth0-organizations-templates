"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SailingIcon from "@mui/icons-material/Sailing";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SchoolIcon from "@mui/icons-material/School";
import Menu from "@mui/material/Menu";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Header setIsOpen={setIsMobileDrawerOpen} />

      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        setIsOpen={setIsMobileDrawerOpen}
      />

      {children}
    </Box>
  );
}

const LINKS = [
  { text: "Page 1", href: "/coaches", icon: SchoolIcon },
  { text: "Page 2", href: "/practices", icon: SailingIcon },
];

interface HeaderProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ setIsOpen }: HeaderProps) {
  return (
    <AppBar component="nav" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => setIsOpen(true)}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ mr: 2 }}>
          <Logo />
        </Box>

        <HeaderNavigationLinks />

        <Box sx={{ flexGrow: 1 }} />

        <ProfileTriggerAvatar />
      </Toolbar>
    </AppBar>
  );
}

function Logo() {
  const pathname = usePathname();
  const isHome = pathname === "";

  return (
    <Link
      href="/"
      style={{
        textDecoration: isHome ? "underline" : "none",
        color: "inherit",
        textUnderlineOffset: "0.4em",
      }}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{
          fontFamily: "Montserrat",
        }}
      >
        LOGO
      </Typography>
    </Link>
  );
}

function HeaderNavigationLinks() {
  const pathname = usePathname();

  return (
    <Box sx={{ display: { xs: "none", sm: "block", flexGrow: 1 } }}>
      {LINKS.map(({ href, text, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Button
            endIcon={<Icon />}
            component={Link}
            href={href}
            key={href}
            color="primary"
            variant="text"
            sx={{
              mr: 1,
              backgroundColor: (t) =>
                isActive ? t.palette.action.selected : "transparent",
              color: (t) => t.palette.text.primary,
            }}
          >
            {text}
          </Button>
        );
      })}
    </Box>
  );
}

function ProfileTriggerAvatar() {
  const { user } = useUser();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleSignOut() {
    setAnchorElUser(null);
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Configurações">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={user?.name || "User"}
            src="/static/images/avatar/2.jpg"
          />
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: "45px" }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <a
          href="/api/auth/logout"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <MenuItem onClick={handleSignOut}>
            <Typography textAlign="center">Sair</Typography>
          </MenuItem>
        </a>
      </Menu>
    </Box>
  );
}

const DRAWER_WIDTH = 240;

interface MobileDrawerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileDrawer({ isOpen, setIsOpen }: MobileDrawerProps) {
  return (
    <Box component="nav">
      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
          },
          zIndex: (theme) => theme.zIndex.appBar * 10,
        }}
      >
        <DrawerContent onClick={() => setIsOpen(false)} />
      </Drawer>
    </Box>
  );
}

interface DrawerContentProps {
  onClick: () => void;
}

function DrawerContent({ onClick }: DrawerContentProps) {
  return (
    <Box onClick={onClick} sx={{ textAlign: "center" }}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ my: 1 }}
      >
        <Logo />
      </Box>

      <Divider />
      <DrawerNavigationList />
    </Box>
  );
}

function DrawerNavigationList() {
  const pathname = usePathname();
  return (
    <List>
      {LINKS.map(({ href, icon: Icon, text }) => (
        <ListItem key={href} disablePadding>
          <ListItemButton
            component={Link}
            href={href}
            selected={href === pathname}
          >
            <ListItemIcon>
              <Icon />
            </ListItemIcon>

            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
