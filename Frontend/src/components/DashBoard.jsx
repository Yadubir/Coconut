import React, { useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import '../styles.css';
import * as Avatar from "@radix-ui/react-avatar";
import { LinkedInLogoIcon, GitHubLogoIcon, Link2Icon, ChevronDownIcon,ChevronUpIcon } from "@radix-ui/react-icons"
import * as Collapsible from "@radix-ui/react-collapsible";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,Cell } from "recharts";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Navbar from "./Navbar";

// const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="custom-tooltip bg-gray-400 px-1 bg-opacity-75 rounded-sm shadow-md">
//           <p className="label">{`${label} : ${payload[0].value}`}</p>
//         </div>
//       );
//     }
  
//     return null;
//   };
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [open, setOpen] = React.useState(false);
    const [probSolved, setProbSolved] = useState(null);
    const [username, setUsername] = useState("");

    const values = [
        { date: '2025-01-01', count: 3 },
        { date: '2025-01-02', count: 5 },
        { date: '2025-01-03', count: 2 },
        { date: '2025-02-04', count: 3 },
        { date: '2025-02-05', count: 4 },
        { date: '2025-02-06', count: 5 },
        // Add more data points
      ];

    //   const difficultyData = [
    //     { name: 'Easy', value: data?.easy || 0 },
    //     { name: 'Medium', value: data?.medium || 0 },
    //     { name: 'Hard', value: data?.hard || 0 },
    //   ];
    const difficultyData = [
        { name: "Easy", value: 10, color: "#4CAF50" }, // Green
        { name: "Medium", value: 5, color: "#FFC107" }, // Yellow
        { name: "Hard", value: 1, color: "#F44336" }, // Red
      ];
      const COLORS = ['#4ade80', '#fb923c', '#ef4444'];


useEffect(() => {

    const fetchUserData = async () => {
        try {
            console.log("User ID:", id);
            const response = await axios.get(`http://localhost:3000/api/user/${id}`);
            console.log(response.data);
            
            setUser(response);
            // setUsername(response.data.username);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        console.log(user);
    };

    fetchUserData();
}, [id]);

useEffect(() => {
    const fetchProblemsSolved = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:3000/api/submit/problems-solved", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            setProbSolved(response.data.problemsSolved);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    fetchProblemsSolved();
}, []);




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
            <div className=" sidebar bg-lightbg p-4 rounded-lg shadow mx-auto w-full md:w-1/4">
            
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
                <p className="text-center mb-5 mt-5 font-semibold text-gray-600">{user.data.name}</p>

                <p className="text-pretty my-5 text-gray-600">{user.data.about}</p>
                <hr className="my-4 border-gray-500" />
                <a href={user.data.linkedin} target="_blank" className="block text-blue-600 hover:underline"> <LinkedInLogoIcon className="social-logo"/>LinkedIn URL</a>
                <a href={user.data.github} target="_blank" className="block text-olive hover:underline"> <GitHubLogoIcon className="social-logo"/>GitHub URL</a>
                <a href={user.data.profile} target="_blank" className="block text-blue-600 hover:underline"> <Link2Icon className="social-logo"/>Portfolio URL</a>
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
                        <span className="text-sm"> No of problems solved : {probSolved > 0 ? probSolved : 0}</span>
                        <span className="text-sm"> No of problems attempted : 100</span>
                        <span className="text-sm">Rank : 14,625</span>
                        <span className="text-sm"> No of contests : 100</span>
                    </div>
                </div>
                <div className="flex-row flex gap-4 w-full">
                <div aria-label="topics solved" className="md:container bg-white p-4 rounded-lg shadow mx-0 w-1/2 md:w-1/2 mt-4">
                    <h3 className="text-xl text-gray-700 font-semibold text-left">Topics</h3>
                        {/* <div class="mx-auto grid max-w-lg grid-cols-4 text-center items-center gap-x-8 gap-y-5 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5"> */}
                    <div className="mx-auto gap-4 flex max-w-lg text-center items-center sm:max-w-xl lg:mx-0 lg:max-w-none mt-4 flex-wrap">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-100/20">Array x78</span>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-100/20">Strings-32</span>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/20">Graph : 12</span>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/20">Badge</span>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/20">Badge</span>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/20">Badge</span>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/20">Badge</span>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/20">Badge</span>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/20">Badge</span>
                    </div>
                </div>
                
                <div aria-label="difficulty stats" className="md:container bg-white px-4 pt-4 rounded-lg shadow mx-0 w-1/2 md:w-1/2 mt-4">
                    <h3 className="text-xl text-gray-700 font-semibold text-left">Difficulty Levels</h3>
                {/* <ResponsiveContainer width="70%" height={200} className="mt-1" >
                    <BarChart data={difficultyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip/>}/>
                        <Bar dataKey="value" barSize={40}>
                            {difficultyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer> */}
                <div className="flex-row flex gap-4 w-full">
                  <ResponsiveContainer className="w-3/5" height={200}>
                    <PieChart >
        
                    <Pie
                    data={user.data.difficultystats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    >
                    {difficultyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  {/* <div aria-label="legend" width="25%" className="w-1/4"> 
                    <p className="text-sm">Easy</p>
                    <p className="text-sm">Medium</p>
                    <p className="text-sm">Hard</p>
                  </div> */}
                  <div className="w-2/5 flex flex-col justify-center">
                  <div className="flex items-center">
                    <span className="inline-block w-4 h-4 mb-2 mr-2 bg-green-500"></span>
                    <p className="text-sm ">Easy - {difficultyData[0].value}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-4 h-4 mr-2 mb-2 bg-yellow-500"></span>
                    <p className="text-sm">Medium - {difficultyData[1].value}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-4 h-4 mr-2 mb-2 bg-red-500"></span>
                    <p className="text-sm">Hard - {difficultyData[2].value}</p>
                  </div>
                </div>
                </div>
                
                </div>
                </div>
                <div aria-label="problems solved" className="md:container bg-white p-4 rounded-lg shadow mx-0  mt-4" >
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
);
};
export default Dashboard;