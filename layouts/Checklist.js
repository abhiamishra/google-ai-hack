import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import React from 'react'
import Accordion from './components/Accordion'

export default function Checklist() {
  const [open, setOpen] = useState(true)
  const items = [
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    // More items...
  ]
  const [accordions, setAccordion] = useState([ 
    { 
        key: 1, 
        title: 'What is GeeksforGeeks?', 
        data: `GeeksforGeeks is a one stop solution  
                  for all computer science students.`, 
        isOpen: false
    }, 
    { 
        key: 2, 
        title: 'What GeeksforGeeks offer us?', 
        data: `GeeksforGeeks offers Free Tutorials,  
                  Millions of Articles, Live, Online and  
                  Classroom Courses,Frequent Coding Competitions,  
                  Webinars by Industry Experts, Internship  
                  opportunities and Job Opportunities.`, 
        isOpen: false
    }, 
    { 
        key: 3, 
        title: 'Which is the best portal to study Computer Science?', 
        data: `GeeksforGeeks is the best Computer Science portal  
                  for geeks. It contains well written, well thought  
                  and well explained computer science and programming  
                  articles.`, 
        isOpen: false
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
    //
 

  return (
    <>
    <div className='flex flex-row justify-center items-center'>
      <h1>Checklist</h1>
    </div>
    <div className="p-2 m-8"> 
                <h2 className='text-2xl mb-2 mx-auto text-green-800'>Accordion Using React and Tailwind</h2> 
                {accordions.map((accordion) => ( 
                    <Accordion 
                        key={accordion.key} 
                        title={accordion.title} 
                        data={accordion.data} 
                        isOpen={accordion.isOpen} 
                        toggleAccordion={() => toggleAccordion(accordion.key)} 
                    /> 
                ))} 
    </div> 
    
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
                >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          Panel title
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                            >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">{/* Your content */}</div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  </>
  )
}
