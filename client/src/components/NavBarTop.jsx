//import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@heroui/react";
import Logo from '../components/Logo'
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { replace, useNavigate } from "react-router-dom";

function NavBarTop() {

  const nav = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  var uname = "Kanchon Sen Gupta"
  if (isLoggedIn) uname = sessionStorage.getItem("u_name");
  // console.log(uname)

  const logoutClick = async () => {
    //e.preventDefault();

    sessionStorage.removeItem("id");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("u_name");

    dispatch(authActions.logout());
    nav(-1);
  };
  return (
    <Navbar className="bg-olive" maxWidth="full">
      <NavbarBrand>
        <Logo size={40}></Logo>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <h1 className='font-bold text-2xl p-0 text-olive-text'>Tasks.</h1>
        </NavbarItem>
      </NavbarContent>
      {isLoggedIn && (<NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              radius="lg"
              as="button"
              className="transition-transform"
              name="Kanchon"
              size="md"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoZaU_o60IwNkACgp-ym8ntEBLKs9oM8Qwcg&s"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat" onAction={(key) => {
            if (key == "logout") {
              logoutClick().then(() => {
                console.log('successful logout');

              })
            }
            else {
              console.log("Task not yet registered ... ");

            }
          }}>
            <DropdownItem key="profile" className="h-14 gap-2 font-inter">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{uname}</p>
            </DropdownItem>
            <DropdownItem key="settings" className="font-inter">Settings</DropdownItem>

            <DropdownItem key="logout" color="danger"
              className="font-inter">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>)}
    </Navbar>
  );
}

export default NavBarTop