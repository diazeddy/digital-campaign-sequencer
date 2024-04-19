export const ItemType = {
    email: "email",
    time_delay: "time_delay"
} as const;

export interface Email {
    id: number;
    title: string;
    description: string;
}

export interface TimeDelay {
    id: number;
    period: number;
}

export interface SequenceItem {
    id: number;
    itemType: string;
    email?: Email;
    time_delay?: TimeDelay;
}

export interface Sequencer {
    id: number;
    title: string;
    trigger: string;
    sequence_items: SequenceItem[]
}