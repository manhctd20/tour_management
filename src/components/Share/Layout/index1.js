import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import Footer from "../Footer/index";
import { useSelector } from "react-redux";
import Header from "../Header/index";
import SideMenu from "../../Admin/SideMenu";

const Layout = () => {
  //   const userInfo = useSelector((state) => state.auth.user);
  return (
    <>
      {/* {userInfo && userInfo.role === "admin" ? ( */}
				<div className='App'>
					<Header />
					<div className='SideMenuAndPageContent'>
						<SideMenu></SideMenu>
						<div className='PageContent'>
							<Outlet />
						</div>
					</div>
					{/* <Footer /> */}
				</div>
			{/* ) 
      : (
				<Navigate to='/' />
			)} */}
    </>
  );
};

export default Layout;
