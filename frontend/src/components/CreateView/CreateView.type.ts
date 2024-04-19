import { SequenceItem } from "../../type";

export interface CreateViewProps {
    add: (title: string, trigger: string, items: SequenceItem[]) => Promise<void>
}