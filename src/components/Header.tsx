import React from 'react'
import { useMenu } from '../context/MenuContext'
import { IMAGES } from '../constans/constans'

import './Header.scss'

type THeaderProps = {
    title: string,
    userName: string,
}

export const Header = ({title, userName}: THeaderProps) => {
  const {toggleMenu} = useMenu();
  
  return (
    <div className='container'>
        <div className='header-left'>
            <div className='menu-icon' onClick={toggleMenu}>
              <IMAGES.Menu width='36px' height='36px'/>
            </div>
            <div className='title'>{title}</div>
        </div>
        <div className='avatar'>{userName}</div>
    </div>
  )
}
