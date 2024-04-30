// Accordion.js 

export default function Accordion(props) { 

    var arr = props.subTasks
    console.log(arr)

	var priority = props.priority
	console.log("priority: ", priority)
	return ( 
		<div className="border rounded-md mb-1"> 
			<button 
				className="w-full p-4 text-left bg-gray-200 
						hover:bg-gray-300 transition duration-300"
				onClick={props.toggleAccordion} 
			> 
				{props.title} 
				<br/>
				Priority: {props.priority}
				<span className={`float-right transform ${props.isOpen ? 
								'rotate-180' : 'rotate-0'} 
								transition-transform duration-300`}> 
					&#9660; 
				</span> 
			</button> 
			{props.isOpen && ( 
				<div className="p-4 bg-white"> 
					{props.data} 
					{props.subTasks.map( (Task) => (
						<>
							<br/>
							<br/>
							<div className="bg-gray-300 text-red-200">
								{Task.Task}
								<br/>
								{Task.Priority}
								<br/>
								{Task.Description}
							</div>

						</>
					))}
				</div> 
			)} 
		</div> 
	); 
}; 
