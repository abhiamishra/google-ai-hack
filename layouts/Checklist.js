import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import React from 'react'
import Accordion from './components/Accordion'
import { clsx } from 'clsx'
import twMerge from 'tailwind-merge'
import Test from "@layouts/Test"


export default function Checklist() {
  const [open, setOpen] = useState(true)

  const [formComplete, setFormComplete] = useState(false)
  const [API_data, setAPI_data] = useState()

  const [accordions, setAccordion] = useState([ 
    { 
        key: 1, 
        title: 'What is GeeksforGeeks?', 
        data: `GeeksforGeeks is a one stop solution  
                  for all computer science students.`, 
        isOpen: false,
        list: ['apple', 'sick']
    }, 
    { 
        key: 2, 
        title: 'What GeeksforGeeks offer us?', 
        data: `GeeksforGeeks offers Free Tutorials,  
                  Millions of Articles, Live, Online and  
                  Classroom Courses,Frequent Coding Competitions,  
                  Webinars by Industry Experts, Internship  
                  opportunities and Job Opportunities.`, 
        isOpen: false,
        list: ['a', 'b', 'c']
    }, 
    { 
        key: 3, 
        title: 'Which is the best portal to study Computer Science?', 
        data: `GeeksforGeeks is the best Computer Science portal  
                  for geeks. It contains well written, well thought  
                  and well explained computer science and programming  
                  articles.`, 
        isOpen: false,
        list: ['Abhi smells like lavendar', 'Mike smells like peaches', 'Ryan smells like whiskey']
    }, 
]); 



  const [openList, setOpenList] = React.useState(0);
  const [alwaysOpen, setAlwaysOpen] = React.useState(true);
 
  const handleAlwaysOpen = () => setAlwaysOpen((cur) => !cur);
  const handleOpen = (value) => setOpenList(openList === value ? 0 : value);



  const toggleAccordion = (accordionkey) => { 
    const updatedAccordions = accordions.map((accord) => { 
        if (accord.key === accordionkey) { 
            return { ...accord, isOpen: !accord.isOpen }; 
        } else { 
            return { ...accord, isOpen: false }; 
        } 
    }); 

    setAccordion(updatedAccordions); 
}; 

  // how to handle data
  
  //hide files: 'hidden'
  console.log("API DATA: ", API_data)

  return (
    <>
    <div className='flex flex-row justify-center items-center'>
      <h1>Checklist</h1>
    </div>
    <div className={clsx(formComplete === true && "hidden")}> 

    <Test setFormComplete={setFormComplete} setAPI_data={setAPI_data}/>
    </div>
    <div className={clsx(formComplete === false && "hidden", "p-2 m-8")}> 
      <h2 className='text-2xl mb-2 mx-auto text-green-800'>Accordion Using React and Tailwind</h2> 
      {accordions.map((accordion) => ( 
          <Accordion 
              key={accordion.key} 
              title={accordion.title} 
              data={accordion.data} 
              isOpen={accordion.isOpen} 
              toggleAccordion={() => toggleAccordion(accordion.key)}
              list={accordion.list}
          /> 
      ))} 
    </div> 
    

  </>
  )
}
