import { selector } from "recoil";
import {threadState} from './../atoms/thread';


export const getThreadId = selector({
    key: "getThreadId",
    get: ({get}) => {
        const state = get(threadState);
        return state?._id;
    }
})