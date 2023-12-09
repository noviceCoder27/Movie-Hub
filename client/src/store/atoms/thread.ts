import {atom} from 'recoil'
import { Thread } from '../../pages/threads/Thread';

export const threadState = atom({
    key: 'Thread',
    default: {} as Thread,
}); 