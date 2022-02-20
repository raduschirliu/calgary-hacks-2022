import React, { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/solid';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Icon, IconButton, Menu, MenuItem } from '@mui/material';

export default function Header() {
  const { user, logout } = useAuth0();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return !!user ? (
    <div className="flex flex-row justify-end">
      <button
        className="flex align-center leading-loose p-2 bg-white hover:bg-peach shadow-sm rounded-md transition duration-150 ease-in-out"
        data-mdb-ripple="true"
        onClick={handleClick}
      >
        <div>{user.given_name}</div>
        <UserCircleIcon className="ml-2 w-6 h-6 m-auto" />
      </button>
      <Menu
        open={menuOpen}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            logout();
            setAnchorEl(null);
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  ) : (
    <p>loading!!</p>
  );
}
