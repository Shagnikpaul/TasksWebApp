//import React from 'react'
import { Navbar, NavbarBrand, useDisclosure, NavbarContent, NavbarItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@heroui/react";
import Logo from '../components/Logo'
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { replace, useNavigate } from "react-router-dom";
import SettingsMainPage from "./settingspage/SettingsMainPage";
import { useEffect, useState } from "react";
import { getSettings } from "../api/calls";

function NavBarTop() {
  const [settingsData, setSettingsData] = useState({
    avatar_link: "https://cdn.7tv.app/emote/01FDQX2W4G000CM9KGHJPMM403/2x.avif",
    user_name: "Kanchon Sen Gupta",
    theme: "dark",
  });
  const nav = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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

  useEffect(() => {
    getSettings(sessionStorage.getItem("id")).then((r) => {
      if (r['settings']) {
        setSettingsData(r['settings'])

      }
      else {
        console.log('settings data error');
      }
    });
  }, [])

  const updateSettingsData = function ({ new_username, new_theme, new_avatarlink } = {}) {
    //console.log("updating settings data in navbar");

    setSettingsData({
      user_name: new_username,
      theme: new_theme,
      avatar_link: new_avatarlink
    })
  };
  return (
    <Navbar className="bg-olive/0" maxWidth="full" isBlurred={false} shouldHideOnScroll>
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
              radius="lg"
              isBordered
              color="primary"
              as="button"
              className="transition-transform"
              name="Kanchon"
              size="md"
              src={settingsData.avatar_link}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat" onAction={(key) => {
            if (key == "logout") {
              logoutClick().then(() => {
                console.log('successful logout');
              })
            }
            // else if (key == "settings") {
            //   console.log("Task not yet registered ... ");

            // }
          }}>
            <DropdownItem key="profile" className="h-14 gap-2 font-inter">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{uname}</p>
            </DropdownItem>
            <DropdownItem key="settings" className="font-inter" onPress={() => {
              onOpenChange()
            }}>Settings</DropdownItem>

            <DropdownItem key="logout" color="danger"
              className="font-inter">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>)}
      <SettingsMainPage settingsData={settingsData} settingsUpdateFunction={updateSettingsData} onOpen={onOpen} onOpenChange={onOpenChange} isOpen={isOpen} />
    </Navbar>
  );
}

export default NavBarTop


NavBarTop.propTypes = {
  settingsData: PropTypes.object,
  updateSettingsFunction: PropTypes.func
}