import React from 'react'
import { useMenu } from '../context/MenuContext'
import { IMAGES } from '../constans/constans'

import { styled } from '@mui/material/styles';

import './Header.scss'
import { Avatar, Badge, Stack } from '@mui/material';

type THeaderProps = {
    title: string,
    userName: string,
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export const Header = ({title, userName}: THeaderProps) => {
  const {toggleMenu} = useMenu();
  
  return (
    <div className="container">
      <div className="header-left">
        <div className="menu-icon" onClick={toggleMenu}>
          <IMAGES.Menu width="36px" height="36px" />
        </div>
        <div className="title">{title}</div>
      </div>
      <div className="avatar">
        <Stack direction="row" spacing={1}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar sx={{ width: 36, height: 36, bgcolor: "#202e44", fontSize: 16, color: "white" }}>{userName}</Avatar>
          </StyledBadge>
        </Stack>
      </div>
      {/* <div className='avatar'>{userName}</div> */}
    </div>
  );
}
