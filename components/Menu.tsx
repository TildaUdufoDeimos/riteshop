import * as React from 'react';
import Logout from '@mui/icons-material/Logout';
import ProfileAvatar from '@/components/ProfileAvatar'
import NextLink from 'next/link'
import { Divider, MenuItem, Menu, Avatar, Link, ListItemButton, ListItemIcon, Tooltip, IconButton, Typography } from '@mui/material';
import Cookies from 'js-cookie'
import { postData } from '@/utils/fetchData'
import { useSWRConfig } from 'swr';
import { useRouter } from 'next/router'

export default function AccountMenu({ name, role }: { name: string, role: string }) {
  const { mutate } = useSWRConfig()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    await postData('users/logout')
    Cookies.remove('authToken');
    mutate('users')
    router.reload()
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <ProfileAvatar name={name} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem sx={{ color: '#6c757d' }}>
          {name}
          {
            (role == 'admin' || role == 'salesagent') &&
            <Typography sx={{ pl: '3px' }}> - logged in as {role}</Typography>
          }
        </MenuItem>
        <MenuItem>
          <NextLink href='/profile' passHref>
            <Link underline="none" sx={{ display: 'flex' }}><Avatar /> Profile</Link>
          </NextLink>
        </MenuItem>
        {
          (role == 'admin' || role == 'salesagent') &&
          <MenuItem>
            Dashboard
          </MenuItem>
        }
        <MenuItem>
          Order History
        </MenuItem>
        <MenuItem>
          Requests
        </MenuItem>
        <Divider />
        <MenuItem sx={{ color: 'red' }}>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon sx={{ color: 'red' }}>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </ListItemButton>
        </MenuItem>
      </Menu>
    </>
  );
}