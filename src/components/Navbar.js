import React, { useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiVideoOn } from "react-icons/ci";
import Avatar from "react-avatar";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux"
import { toggleSidebar, setCategory, setSearchSuggestion } from "../utils/appSlice";
import { useState } from "react";
import { SEARCH_SUGGESTIONS_API } from "../constant/youtube";
import axios from "axios";
 
const Navbar = () => {
    const [input, setInput] = useState("");
    const [suggestion, setSuggestion] = useState(false);
    const dispatch = useDispatch();
    const { searchSuggestion } = useSelector((store) => store.app);

    const searchVideo = () => {
        dispatch(setCategory(input));
        setInput("");
    }

    const toggleHandler = () => {
        dispatch(toggleSidebar());
    }

    const showSuggestion = async () => {
try {
            const res = await axios.get(SEARCH_SUGGESTIONS_API + input);
            console.log(res.data);
           dispatch(setSearchSuggestion(res?.data[1]))
        } catch (error) {
            console.log(error);
        }
    

 }

    const openSuggestion = () => {
        setSuggestion(true);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            showSuggestion();
        }, 200)

        return () => {
            clearTimeout(timer);
        }

    }, [input])

    return (
        <div className="flex fixed top-0 justify-center items-center w-[100%] z-10 bg-white">
            <div className="flex w-[96%] py-3 justify-between items-center">

                <div className="flex items-center ">
                    <GiHamburgerMenu onClick={toggleHandler} size="24px" className="cursor-pointer" />
                    <img className="px-4" width={"115px"} src="https://imgs.search.brave.com/yY6jYdzRyQmLGSJVa5B-Aqpm65zKLDWQUEAp_hKY9tQ/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy50ZXh0Z2lyYWZm/ZS5jb20vbG9nb3Mv/bG9nby1uYW1lL0lr/YmFsLWRlc2lnbnN0/eWxlLWtpZGRvLW0u/cG5n" alt="yt_logo" />
                </div>
                <div className="flex w-[40%] items-center">
                    <div className="flex w-[100%] ">
                        <input value={input} onFocus={openSuggestion} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Built by Riaj Ikbal" className="w-full py-2 px-4 border border-gray-400 rounded-l-full outline-none" />
                        <button onClick={searchVideo} className="py-2 border border-gray-400 rounded-r-full px-4"><CiSearch size="24px" /></button>
                    </div>
                    {
                        (suggestion && searchSuggestion.length !== 0) &&
                        <div className="absolute top-3 z-50 w-[30%] py-5 bg-white shadow-lg mt-12 rounded-lg border border-gray-200">
                            <ul>
                                {
                                    searchSuggestion.map((text, idx) => {
                                        return (
                                            <div className="flex items-center px-4 hover:bg-gray-100">
                                                <CiSearch size="24px" />
                                                <li className="px-2 py-1 cursor-pointer text-md font-medium">{text}</li>
                                            </div>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    }

                </div>



                <div className="flex w-[10%] justify-between items-center">
                    <IoIosNotificationsOutline size={"24px"} className="cursor-pointer" />
                    <CiVideoOn size={"24px"} className="cursor-pointer" />
                    <Avatar src="https://images.pexels.com/photos/48155/animal-owl-eagle-owl-wisdom-48155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" size={50} round={true} />
                </div>

            </div>
        </div>
    );
}
export default Navbar;
