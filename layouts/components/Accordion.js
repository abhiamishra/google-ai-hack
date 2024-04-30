// Accordion.js
import React, { useState } from 'react';

export default function Accordion(props) { 
	const [checkedItems, setCheckedItems] = useState({});

	const handleCheckboxChange = (id) => {
	  setCheckedItems((prevCheckedItems) => ({
		...prevCheckedItems,
		[id]: !prevCheckedItems[id],
	  }));
	};

    var arr = props.list
    console.log(arr)
	return ( 
		<div className="h5 border rounded-md mb-1"> 
			<button 
				className="w-full p-4 text-left bg-gray-200 
						hover:bg-gray-300 transition duration-300"
				onClick={props.toggleAccordion} 
			> 
				{props.title} 
				<span className={`float-right transform ${props.isOpen ? 
								'rotate-180' : 'rotate-0'} 
								transition-transform duration-300`}> 
					&#9660; 
				</span> 
			</button> 
			{props.isOpen && ( 
				<div className="p-4 bg-white"> 
					{/* {props.data}  */}
					<ul>
						{props.subTasks.map((subtask, index) => (
							<li key={index} className="mb-4">
							<div className="flex items-center mr-2">
								<input
									type="checkbox"
									id={`subtask-${index}`}
									checked={checkedItems[`subtask-${index}`]}
									onChange={() => handleCheckboxChange(`subtask-${index}`)}
									className = "mr-5"
								/>
								<label htmlFor={`subtask-${index}`}></label>
								<h5 className ="inline-block"> {subtask.Task}</h5>
							</div>
							<div className="ml-10 mt-2 text-left"> {/* Adjusted margin-left for indentation */}
								<p>Priority: {subtask.Priority}</p>
								<p3>{subtask.Description}</p3> {/* Added mb-2 class for margin-bottom */}
								
							</div>
							{/* </label> */}
						  </li>
						// <li key={index}>
						// 	<h3>{subtask.Task}</h3>
						// 	<p>{subtask.Description}</p>
						// 	<p>Priority: {subtask.Priority}</p>
						// </li>
						))}
					</ul>
				</div> 
			)} 
		</div> 
	); 
}; 