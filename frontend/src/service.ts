import axios from "axios";
import { Sequencer } from "./type"

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const createSequencer = async (title: string, trigger: string): Promise<number> => {
    const response = await axios.post(`/sequencer`, {title, trigger});
    return response.data.id;
}

export const getAllSequencers = async (): Promise<Sequencer[]> => {
    const response = await axios.get(`/sequencer`);
    return response.data;
}

export const createSequenceItem = async (itemType: string, sequencer: number): Promise<number> => {
    const response = await axios.post("/sequence_item", {itemType, sequencer});
    return response.data.id;
}

export const createEmail = async (title: string, description: string, sequence_item: number) => {
    await axios.post("/email", {title, description, sequence_item});
}

export const createTimeDelay = async (period: number, sequence_item: number) => {
    await axios.post("/time_delay", {period, sequence_item});
}