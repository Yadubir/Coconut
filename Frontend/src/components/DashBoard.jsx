import React, { useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import '../styles.css';
import * as Avatar from "@radix-ui/react-avatar";
import { LinkedInLogoIcon, GitHubLogoIcon, Link2Icon, ChevronDownIcon,ChevronUpIcon } from "@radix-ui/react-icons"
import * as Collapsible from "@radix-ui/react-collapsible";
import Navbar from "./Navbar";


const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [open, setOpen] = React.useState(false);
    const [probSolved, setProbSolved] = useState(null);

    const values = [
        { date: '2025-01-01', count: 3 },
        { date: '2025-01-02', count: 5 },
        { date: '2025-01-03', count: 2 },
        { date: '2025-02-04', count: 3 },
        { date: '2025-02-05', count: 4 },
        { date: '2025-02-06', count: 5 },
        // Add more data points
      ];

useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/user/${id}`);
            setUser(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchUserData();
}, []);

const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/submit/problems-solved`);
                setProbSolved(response.data);
            } catch (err) {
                setError(err.message);
            }
            }

// useEffect(() => {
//     const fetchUserData = async () => {
//         try {
//             const response = await axios.get(`http://localhost:3000/api/submit/problems-solved`);
//             setProbSolved(response.data);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     fetchUserData();
// }, []);



if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;

return (
    <div>
        <Navbar />
        {/* {user.name} for actual name */}
        {/* <h1 className="text-2xl font-bold mb-4 pl-5">Dashboard</h1> */}
        <div className="flex gap-4 w-screen px-10 sm:flex-row flex-col">
            <div className=" sidebar bg-green-100 p-4 rounded-lg shadow mx-auto w-full md:w-1/4">
            
                <Avatar.Root className="AvatarRoot ">
			        <Avatar.Image
				        className="AvatarImage"
				        // src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                        src="#"
				        alt="Colm Tuite"
			        />
			        <Avatar.Fallback className="AvatarFallback" delayMs={600}>
				    FL
			        </Avatar.Fallback>
		        </Avatar.Root>
                {/* <p className="text-center mt-5 mb-0 font-semibold">Display Name</p> */}
                <p className="text-center mb-5 mt-5 font-semibold text-gray-600">{user.username}</p>
                <p className="text-pretty my-5 text-gray-600">About yourself: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                <hr className="my-4 border-gray-500" />
                <a href="#" className="block text-blue-600 hover:underline"> <LinkedInLogoIcon className="social-logo"/>LinkedIn URL</a>
                <a href="#" className="block text-blue-600 hover:underline"> <GitHubLogoIcon className="social-logo"/>GitHub URL</a>
                <a href="#" className="block text-blue-600 hover:underline"> <Link2Icon className="social-logo"/>Portfolio URL</a>
            </div>
            <div className="stats md:w-3/4"> {/* p-4 rounded-lg md:container md:mx-auto w-full */}
                <div aria-label="activity calander" className="md:container bg-white p-4 rounded-lg shadow mx-0 w-full  md:w-full">
                    <h3 className="text-xl text-gray-700 font-semibold mb-2 text-left">Activity</h3>
                    <CalendarHeatmap
                        className="w-fit"
                        startDate={new Date('2025-01-01')}
                        endDate={new Date('2025-12-31')}
                        values={values}
                        gutterSize={2}
                        classForValue={(value) => {
                            if (!value) {
                                return 'color-empty';
                            }
                            return `color-scale-${value.count}`;
                        }}
                    />

                    <div className="flex justify-between mt-4 mx-4">
                        <span className="text-sm"> No of problems solved : {probSolved}</span>
                        <span className="text-sm"> No of problems attempted : 100</span>
                        <span className="text-sm">Rank : 14,625</span>
                        <span className="text-sm"> No of contests : 100</span>
                    </div>
                </div>
                <div className="flex-row flex gap-4 w-full">
                <div aria-label="topics solved" className="md:container bg-white p-4 rounded-lg shadow mx-0 w-1/2 md:w-1/2 mt-4">
                    <h3 className="text-xl text-gray-700 font-semibold text-left">Topics</h3>
                        {/* <div class="mx-auto grid max-w-lg grid-cols-4 text-center items-center gap-x-8 gap-y-5 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5"> */}
                    <div class="mx-auto gap-4 flex max-w-lg text-center items-center sm:max-w-xl lg:mx-0 lg:max-w-none mt-4 flex-wrap">
                        <span class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-100/20">Array x78</span>
                        <span class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-100/20">Strings-32</span>
                        <span class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/20">Graph : 12</span>
                        <span class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/20">Badge</span>
                        <span class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/20">Badge</span>
                        <span class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/20">Badge</span>
                        <span class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/20">Badge</span>
                        <span class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/20">Badge</span>
                        <span class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/20">Badge</span>
                    </div>
                </div>
                <div aria-label="problems solved" className="md:container bg-white p-4 rounded-lg shadow mx-0 w-1/2 md:w-1/2 mt-4" >
                    <Collapsible.Root
			            className="CollapsibleRoot"
			            open={open}
			            onOpenChange={setOpen}
		            >
			            <div className="flex justify-start items-center align-middle ">
				            <span className="text-xl mr-2 text-gray-700 font-semibold text-left " >
					        Problems solved
				            </span>
				            <Collapsible.Trigger asChild >
						            {open ? <ChevronDownIcon  /> : <ChevronUpIcon />}
				            </Collapsible.Trigger>
			            </div>

			            <div className="Repository">
				            <span className="text-base">Problem no 1: infinite rooms</span>
			            </div>

			            <Collapsible.Content>
				            <div className="Repository">
					            <span className="text-base">Next Problem </span>
				            </div>
				            <div className="Repository">
					            <span className="text-base">Next to next problem</span>
				            </div>
			            </Collapsible.Content>
		            </Collapsible.Root>

                        {/* <h3 className="text-xl text-gray-700 font-semibold my-2 text-left mt-6">Problems Solved</h3>
                        <p className="mb-1">Problem 1</p>
                        <p className="mb-1">Problem 2</p>
                        <p className="mb-1">Problem 3</p> */}
                </div>
                </div>
            </div>
        </div>
    </div>
);
};
export default Dashboard;