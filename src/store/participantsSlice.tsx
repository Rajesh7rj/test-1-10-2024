import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Participant {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  attending: 'Yes' | 'No'; 
  adults: number;
  kids: number;
  kidsAges: (number | undefined)[];
  message?: string;
  profileImage: FileList;
}

interface ParticipantsState {
  participantsList: Participant[];
}

const initialState: ParticipantsState = {
  participantsList: [],
};

const participantsSlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {
    addParticipant(state, action: PayloadAction<Participant>) {
      state.participantsList.push(action.payload);
    },
  },
});

export const participantsListData = (state: RootState) => state.participants.participantsList;

export const { addParticipant } = participantsSlice.actions;
export default participantsSlice.reducer;
