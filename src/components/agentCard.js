import { Fragment, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react';
import { Switch } from '@headlessui/react';

const AgentCard = ({ avatar, title, description }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [enableFleet, setIsEnableFleet] = useState(false);

  return (
    <>
      <div
        className={isExpanded ? 'absolute grid w-full h-full min-h-screen justify-items-center items-center backdrop-blur-sm z-10 backdrop-opacity-100 transition duration-500' : 'w-64 h-32'}
      >
        <div
          onClick={() => setIsExpanded(true)}
          className={`relative p-4 border rounded-lg shadow-md cursor-pointer transition-all duration-500 ease-in-out 
            ${isExpanded ? 'w-full max-w-5xl h-auto' : 'w-64 h-32'}`}
        >
          <div className="flex items-center justify-center">
            <img src={avatar} alt="Agent Avatar" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>

          {isExpanded && (
            <div className="mt-4 space-y-4">
              <input
                type="text"
                placeholder="Enter something..."
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
              <div className='flex mx-auto space-x-5'>
                <p>
                  Connect to fleet?
                </p>
                <Switch
                  checked={enableFleet}
                  onChange={setIsEnableFleet}
                  className={`${
                    enableFleet ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Connect to Fleet</span>
                  <span
                    className={`${
                      enableFleet ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
                </Switch>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="py-2 px-4 bg-black text-white font-semibold rounded-3xl hover:bg-blue-600"
              >
                Spawn
              </button>
            </div>
          )}
        </div>
      </div>
      {/* <div 
        onClick={() => setIsOpen(true)} 
        className={`w-80 p-4 flex space-x-10 border rounded-lg shadow-md cursor-pointer hover:bg-gray-100 hover:shadow-2xl transition duration-300`}
      >
        <img src={avatar} alt="Agent Avatar" className="w-16 h-16 rounded-lg mx-auto my-auto mb-2" />
        <div className="space-y-2">
          <h3 className="text-lg font-zen font-semibold text-center">{title}</h3>
          <p className="text-xs font-zen text-left">{description}</p>
        </div>
      </div> */}

      {/* <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
            <Description className="mt-2 text-gray-600">{description}</Description>

            <input
              type="text"
              placeholder="Enter something..."
              className="w-full p-2 mt-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />

            <button 
              onClick={() => setIsOpen(false)} 
              className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </DialogPanel>
        </div>
      </Dialog> */}
    </>
  );
}

export default AgentCard;
