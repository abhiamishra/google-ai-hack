import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import React from 'react'
import Accordion from './components/Accordion'
import { clsx } from 'clsx'
import twMerge from 'tailwind-merge'
import ChecklistForm from "@layouts/ChecklistForm"
import Column from './components/Columns'


export default function Checklist() {
  const [open, setOpen] = useState(true)

  const [formComplete, setFormComplete] = useState(false)
  const [API_data, setAPI_data] = useState()


  const [openList, setOpenList] = React.useState(0);
  const [alwaysOpen, setAlwaysOpen] = React.useState(true);
 
  const handleAlwaysOpen = () => setAlwaysOpen((cur) => !cur);
  const handleOpen = (value) => setOpenList(openList === value ? 0 : value);



  const toggleAccordion = (accordionkey) => { 
    const updatedAccordions = API_data.map((accord) => { 
        if (accord.Task === accordionkey) { 
            return { ...accord, isOpen: !accord.isOpen }; 
        } else { 
            return { ...accord, isOpen: false }; 
        } 
    }); 

    setAPI_data(updatedAccordions); 
}; 

  // how to handle data
  
  //hide files: 'hidden'
  console.log("API DATA: ", API_data)
  //task type
    // subtask type
  

  return (
    <>
    <div className='flex flex-row justify-center items-center'>
      <h1>Checklist</h1>
    </div>
    <div className={clsx(formComplete === true && "hidden")}> 

    <ChecklistForm setFormComplete={setFormComplete} setAPI_data={setAPI_data}/>
    </div>
    <div className={clsx(formComplete === false && "hidden", "p-2 m-8")}> 
      <h2 className='text-2xl mb-2 mx-auto text-green-800'>Accordion Using React and Tailwind</h2> 
      {API_data && API_data.map((Task) => ( 
          <Accordion 
              key={Task.Task} 
              title={Task.Task} 
              data={Task.Description} 
              isOpen={Task.isOpen} 
              toggleAccordion={() => toggleAccordion(Task.Task)}
              priority={Task.Priority}
              subTasks={Task.Subtasks}
          /> 
      ))} 
    </div> 
    

  </>
  )
}
