import { useState, useEffect } from "react"

import { getAllSequencers, createSequencer, createSequenceItem, createEmail, createTimeDelay } from "./service"
import { Sequencer, SequenceItem, ItemType } from "./type"
import SequencerView from "./components/SequencerView";
import CreateView from "./components/CreateView";

const App = () => {
  const [sequencers, setSequencers] = useState<Sequencer[]>([]);
  const [currentSequencer, setCurrentSequencer] = useState<Sequencer | null>(null);
  const [displayCreateView, setDisplayCreateView] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log("start fetching")
      const data = await getAllSequencers();
      setSequencers(data);
    }
    fetchData();
  }, []);

  const addNewSequencer = async (title: string, trigger: string, items: SequenceItem[]) => {
    const sequencer = await createSequencer(title, trigger);
    await Promise.all(items.map(async (item) => {
      const sequence_item = await createSequenceItem(item.itemType, sequencer);
      if (item.itemType === ItemType.email) {
        await createEmail(item.email?.title ?? "", item.email?.description ?? "", sequence_item);
      } else {
        await createTimeDelay(item.time_delay?.period ?? 0, sequence_item);
      }
    }));
    const data = await getAllSequencers();
    setSequencers(data);
    setDisplayCreateView(false);
  }

  return (
    <div className="w-screen h-screen grid grid-cols-3 grid-rows-1">
      <div className="flex flex-col items-center justify-center col-span-1 border-r border-r-black gap-4">
        <div className="h-4/6 w-1/2 border border-black p-2 flex flex-col">
          {
            sequencers.length > 0 ?
            sequencers.map((item) => (
              <div
                key={item.id}
                className={`w-full px-4 py-1 hover:bg-gray-300 ${item.id === currentSequencer?.id ? "bg-gray-300" : ""} text-black text-xl`}
                onClick={() => setCurrentSequencer(item)}
              >
                {item.title}
              </div>
            )) :
            <div className="flex self-center">No Data</div>
          }
        </div>
        <button
          className="py-1 px-4 text-white text-xl bg-stone-800"
          onClick={() => setDisplayCreateView(true)}
        >
          Create New Sequencer
        </button>
      </div>
      <div className="flex items-center justify-center col-span-2">
        {
          currentSequencer !== null && !displayCreateView &&
          <SequencerView sequencer={currentSequencer} />
        }
        {
          displayCreateView &&
          <CreateView add={addNewSequencer} />
        }
      </div>
    </div>
  )
}

export default App
