import { useState, ChangeEvent } from "react";

import { CreateViewProps } from "./CreateView.type";
import { ItemType, SequenceItem } from "../../type";
import SequencerView from "../SequencerView";

const CreateView = ({ add }: CreateViewProps) => {
    const [title, setTitle] = useState("");
    const [trigger, setTrigger] = useState("");
    const [emailTitle, setEmailTitle] = useState("");
    const [emailDescription, setEmailDescription] = useState("");
    const [period, setPeriod] = useState(0);
    const [items, setItems] = useState<SequenceItem[]>([]);
    const [loading, setLoading] = useState(false);

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const onChangeTrigger = (e: ChangeEvent<HTMLInputElement>) => setTrigger(e.target.value);
    const onChangeEmailTitle = (e: ChangeEvent<HTMLInputElement>) => setEmailTitle(e.target.value);
    const onChangeEmailDescription = (e: ChangeEvent<HTMLInputElement>) => setEmailDescription(e.target.value);
    const onChangePeriod = (e: ChangeEvent<HTMLInputElement>) => setPeriod(Number(e.target.value));
    const onEmailAdd = () => {
        if (emailTitle && emailDescription) {
            setItems([
                ...items,
                {
                    id: -1,
                    itemType: ItemType.email,
                    email: { title: emailTitle, description: emailDescription, id: -1 },
                },
            ]);
        } else {
            if (!emailTitle) {
                alert("Email title is empty.");
            } else {
                alert("Email description is empty.");
            }
        }
    };
    const onTimeDelayAdd = () => {
        if (period > 0) {
            setItems([
                ...items,
                {
                    id: -1,
                    itemType: ItemType.time_delay,
                    time_delay: { period: period, id: -1 },
                },
            ]);
        } else {
            alert("Period should be bigger than 0.")
        }
    };
    const onClickCreate = async () => {
        if (title && trigger && items.length > 0) {
            setLoading(true);
            await add(title, trigger, items);
            setLoading(false);
        } else {
            if (!title) {
                alert("Title is empty.");
            } else if (!trigger) {
                alert("Trigger is empty.")
            } else {
                alert("Should add at least 1 email or time delay")
            }
        }
    }

    return (
        <div className="flex w-full h-full">
            <div className="grid grid-cols-4 p-10 gap-y-5 w-1/2 h-fit self-center">
                <div className="text-xl col-span-1 flex items-center">Title:</div>
                <div className="text-xl col-span-3">
                    <input
                        value={title}
                        className="p-2 focus:outline-none border border-black rounded-md w-full"
                        onChange={onChangeTitle}
                    />
                </div>
                <div className="text-xl col-span-1 flex items-center">Trigger:</div>
                <div className="text-xl col-span-3">
                    <input
                        value={trigger}
                        className="p-2 focus:outline-none border border-black rounded-md w-full"
                        onChange={onChangeTrigger}
                    />
                </div>
                <div className="text-xl col-span-1 pt-2">Email:</div>
                <div className="col-span-3 flex flex-col gap-4 items-center border border-black p-4 rounded-lg">
                    <input
                        className="p-2 focus:outline-none border border-black rounded-md w-full"
                        placeholder="Title"
                        value={emailTitle}
                        onChange={onChangeEmailTitle}
                    />
                    <input
                        className="p-2 focus:outline-none border border-black rounded-md w-full"
                        placeholder="Description"
                        value={emailDescription}
                        onChange={onChangeEmailDescription}
                    />
                    <button className="bg-stone-800 py-2 px-8 text-white rounded-md" onClick={onEmailAdd}>Add</button>
                </div>
                <div className="text-xl col-span-1 pt-2">Time Delay:</div>
                <div className="col-span-3 flex flex-col gap-4 items-center border border-black p-4 rounded-lg">
                    <input
                        className="p-2 focus:outline-none border border-black rounded-md w-full"
                        placeholder="Period"
                        type="number"
                        value={period}
                        onChange={onChangePeriod}
                    />
                    <button className="bg-stone-800 py-2 px-8 text-white rounded-md" onClick={onTimeDelayAdd}>Add</button>
                </div>
                <div className="col-span-4 flex justify-center">
                    <button className="flex gap-2 items-center bg-stone-800 py-2 px-8 text-white rounded-md text-xl" onClick={onClickCreate}>
                        {
                            loading &&
                            <span className="loader" />
                        }
                        Create
                    </button>
                </div>
            </div>
            <div className="overflow-auto w-1/2 h-full p-5 border border-l-gray-300">
                <div className="text-3xl font-black top-0 sticky">Preview:</div>
                <SequencerView sequencer={{title: title, trigger: trigger, sequence_items: items, id: -1}}/>
            </div>
        </div>
    );
};

export default CreateView;
