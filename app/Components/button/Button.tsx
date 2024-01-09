"use client" 
import { useGlobalState } from '@/app/Context/GlobalProvider';
import { useClerk } from '@clerk/nextjs';
import React from 'react'
import styled from 'styled-components';

interface Props{
    icon?:React.ReactNode;
    name?:string;
    background?:string;
    selector?:string;
    padding?:string;
    borderRad?:string;
    fw?:string;
    fs?:string;
    click?:()=>void;
    type?:"submit" | "button" | "reset" | undefined;
    blob?: string;
    dClick?: ()=>void;
    border?: string;
    form?: string;
}
const Button = ({
    icon,
    name,
    background,
    padding,
    borderRad,
    fw,
    fs,
    click,
    type,
    border
}:Props) => {
    const {theme} = useGlobalState();
    const {signOut} = useClerk();
    
  return (
    <ButtonStyled
        style={{
            background:background,
            padding:padding || "0.5rem 1rem",
            borderRadius:borderRad || "0.5rem",
            fontWeight: fw || "500",
            fontSize:fs,
            border:border || "none"
        }}
            theme={theme}
            onClick={click}
        >
            {icon && icon}
            {name}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.white};
  z-index: 5;
  cursor: pointer;
  margin-top:1rem;
  transition: all 0.55s ease-in-out;

  i {
    margin-right: 1rem;
    color: ${(props) => props.theme.colorWhite};
    font-size: 1.5rem;
    transition: all 0.55s ease-in-out;
  }

  &:hover {
    color: ${(props) => props.theme.colorWhite};
    i {
      color: ${(props) => props.theme.colorWhite};
    }
  }
`;

export default Button