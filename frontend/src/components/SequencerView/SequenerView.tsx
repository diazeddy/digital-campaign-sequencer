import { ItemType } from "../../type";
import { SequencerViewProps } from "./SequencerView.type";

const SequencerView = ({sequencer}: SequencerViewProps) => {
    return (
        <div className="flex flex-col items-center">
            {
                sequencer.trigger.length > 0 &&
                <div className="flex flex-col rounded-md border border-black py-2 px-5 gap-2">
                    <div className="text-3xl font-bold">Trigger</div>
                    <div className="text-xl">
                        {sequencer.trigger}
                    </div>
                </div>
            }
            {
                sequencer.sequence_items.map((item) => (
                    <>
                        <div className="w-0 border-r border-r-black h-10" />
                        <div className="flex flex-col rounded-md border border-black py-2 px-5 gap-2">
                            <div className="text-3xl font-bold">
                                {
                                    item.itemType === ItemType.email ? item.email?.title : "Time Delay"
                                }
                            </div>
                            <div className="text-xl">
                                {
                                    item.itemType === ItemType.email ? item.email?.description : `Delay ${item.time_delay?.period} day${item.time_delay?.period === 1 ? "" : "s"}`
                                }
                            </div>                            
                        </div>
                    </>
                ))
            }
            {
                sequencer.trigger.length > 0 &&
                <>
                    <div className="w-0 border-r border-r-black h-10" />
                    <div className="flex flex-col rounded-md border border-black py-2 px-5 gap-2">
                        <div className="text-3xl font-bold">Exit</div>
                    </div>
                </>
            }
        </div>
    )
}

export default SequencerView;
