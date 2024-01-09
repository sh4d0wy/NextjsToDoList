"use client";

import { useGlobalState } from "@/app/Context/GlobalProvider";
import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import menu from "../../utils/menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Button from "../button/Button";
import { arrowLeft, bars, logout } from "@/app/utils/Icons";
import { UserButton, auth, useClerk, useUser } from "@clerk/nextjs";
import { Span } from "next/dist/trace";

export default function Sidebar() {
  const [loggout,setLogout] = useState(false);
  const { theme,collapsed,collapsedMenu} = useGlobalState();
  const router = useRouter();
  const pathName = usePathname();
  const {signOut} = useClerk();
  const {user} = useUser();
  const {firstName, lastName,imageUrl} = user || {
    firstName:"",
    lastName : "",
    imageUrl:"",
  };
  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <>
      <SidebarStyled theme={theme} collapsed={collapsed}>
        <button className="toggle-nav"
          onClick={collapsedMenu}
        >
            {collapsed? bars:arrowLeft}
        </button>
        <div className="profile">
          <div className="profile-overlay"></div>
            <div className="image">
              <Image width={50} height={50} src={imageUrl} alt="profile" />
            </div>
            <div className="user-btn absolute z-30 top-0 w-full h-full">
              <UserButton/>
            </div>
            <span>
              {firstName} {lastName}
            </span>
          </div>
        <ul className="nav-items">
          {menu.map((items) => {
            return (
              <li
                className={`nav-item ${pathName===items.link?"active":""}`}
                onClick={() => handleClick(items.link)}
                key={items.title}
              >
                {items.icon}
                <Link href={items.link}>{items.title}</Link>
              </li>
            );
          })}
        </ul>
        <div className="sign-out relative m-6">
          <Button
            name={"Sign Out"}
            type={"submit"}
            padding={"0.4rem 0.8rem"}
            borderRad = {"0.8rem"}
            fw={"500"}
            fs={"1.2rem"}
            icon={logout}
            click={()=>{
              signOut(()=>{
                router.push("/signin");
                setLogout(true);
              })
            }}
            />
        </div>
      </SidebarStyled>
    </>
  );
}

const SidebarStyled = styled.nav<{collapsed:Boolean}>`
  width: ${({ theme }) => theme.sidebarWidth};
  position: relative;
  background-color: ${({ theme }) => theme.colorBg2};
  border: 2px solid ${({ theme }) => theme.borderColor2};
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: ${({ theme }) => theme.colorGrey3};

  .toggle-nav{
    display:none;
    position:absolute;
    right:-69px;
    top:5rem;
    padding:0.8rem 0.9rem;
    border-top-right-radius:0.5rem;
    border-bottom-right-radius:0.5rem;
    background-color:${({theme})=>theme.colorBg2};
    border-right:2px solid ${({theme})=>theme.borderColor2};
    border-top:2px solid ${({theme})=>theme.borderColor2};
    border-bottom:2px solid ${({theme})=>theme.borderColor2};

  }
  @media screen and (max-width:768px){
      position:fixed;
      z-index:1000;
      height:calc(100vh - 2rem);
      transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);
    transform: ${(props) =>
      props.collapsed ? "translateX(-107%)" : "translateX(0)"};

    .toggle-nav {
      display: block !important;
    }
  }
  .user-btn{
    width:100%;
    height:100%;

    .cl-rootBox{
      width:100%;
      height:100%;

      .cl-userButtonTrigger{
        width:100%;
        height:100%;
        opacity:0;
      }
    }
  }
  .profile {
    box-sizing:border-box;
    margin: 1.5rem;
    padding: 1rem 0.8rem;
    position: relative;

    border-radius: 1rem;
    cursor: pointer;

    font-weight: 500;
    color: ${(props) => props.theme.colorGrey0};

    display: flex;
    align-items: center;
    
    .profile-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      z-index: 0;
      background: ${(props) => props.theme.colorBg3};
      transition: all 0.55s linear;
      border-radius: 1rem;
      border: 2px solid ${(props) => props.theme.borderColor2};

      opacity: 0.2;
    }

    span {
      display: flex;
      flex-direction: column;
      margin-left:0.4rem;
      font-size:0.5rem
      line-height: 1.4rem;
    }

    .image,
    span {
      position: relative;
      z-index: 1;
    }

    .image {
      flex-shrink: 0;
      display: inline-block;
      overflow: hidden;
      transition: all 0.5s ease;
      border-radius:100%;
      width: 50px;
      height: 50px;

      img {
        border-radius: 100%;
        transition: all 0.5s ease;
      }
    }

    > h1 {
      margin-left: 0.8rem;
      font-size: clamp(1.2rem, 4vw, 1.4rem);
      line-height: 100%;
    }

    &:hover {
      .profile-overlay {
        opacity: 1;
        border: 2px solid ${(props) => props.theme.borderColor2};
      }

      img {
        transform: scale(1.1);
      }
    }
  }

  .nav-item{
    position:relative;
    padding: 0.8rem 1rem 0.9rem 2.1rem;
    margin: 0.3rem 0;
    display: grid;
    grid-template-columns: 40px 1fr;
    cursor: pointer;
    align-items: center;

    &::after{
      position:absolute;
      content:"";
      left:0;
      top:0;
      width:0;
      height:100%;
      background-color:${({theme})=>theme.activeNavLinkHover};
      z-index:1;
      transition:all 0.2s ease-in-out;

    }
    &::before{
      position:absolute;
      content:"";
      right:0;
      top:0;
      width:0;
      height:100%;
      background-color:${({theme})=>theme.colorGreenDark};
      border-bottom-left-radius:5px;
      border-top-left-radius:5px;
      transition:all 0.2s ease-in-out;
    }
    a{
      font-weight:500;
      transition:all 0.2s ease-in-out;
      z-index:1;
    }
    &:hover{
      &::after{
        width:100%;
      }
    }

  }
  .active{
    background-color:${({theme})=>theme.activeNavLink};
    a,i{
      color:${({theme})=>theme.colorIcons2};
    }
    &::before{
      width:2%;
    }
  }
  > button{
    margin:1.5rem;
  }
    }
  }
`;
