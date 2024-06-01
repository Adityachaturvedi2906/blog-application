import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import icon from "../assets/logo.png";
import { MdOutlineLogin } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdAdd } from "react-icons/io";
import { UserContext } from "../contexts/UserContext";

const Header = () => {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="bg-[#DDD0C8] w-full">
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center">
          <Link to="/">
            <img
              className="w-32 sm:w-40 md:w-48 lg:w-20 xl:w-20 mx-4"
              src={icon}
              alt="icon"
            />
          </Link>
        </div>
        <div className="flex items-center mx-4">
          {isUser ? (
            <>
            <Link to="/add">
                <button className="flex items-center mx-2 font-semibold text-[#323232] hover:bg-[#323232] hover:text-[#ddd0c8] border-[1px] border-[#323232] px-2 py-1 sm:px-3 sm:py-1 rounded-md text-sm sm:text-base">
                  <span className="hidden sm:block">ADD</span>
                  <span className="sm:ms-1 ms-0">
                    <IoMdAdd />
                  </span>
                </button>
              </Link>
              <div className="h-9 border-l border-[#32323223] mx-5 hidden sm:block"></div>
              <div className="relative">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <span className="me-2">
                    <FaUser />
                  </span>
                  <h2>{user?.displayName || "User Name"}</h2>
                  <span className="text-sm ms-2">
                    {dropdownVisible ? (
                      <IoMdArrowDropup />
                    ) : (
                      <IoMdArrowDropdown />
                    )}
                  </span>
                </div>
                {dropdownVisible && (
                  <div className="absolute right-4 mt-2 w-32 bg-[#ddd0c8] border text-[#323232] hover:bg-[#323232]   border-[#323232] shadow-lg">
                    <button
                      className="p-2 mx-2 text-[#323232] font-semibold flex items-center text-base hover:text-[#e2dad5]"
                      onClick={handleSignOut}
                    >
                      <span className="me-1">
                        <PiSignOutBold />
                      </span>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/login">
              <button className="uppercase text-lg flex items-center text-[#323232] hover:text-[#a89090]">
                <span className="me-2">
                  <MdOutlineLogin />
                </span>
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
