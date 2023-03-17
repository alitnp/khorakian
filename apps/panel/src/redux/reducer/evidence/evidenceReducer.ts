import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { evidences } from 'global/Models/genericRoutesModels/EvidencesModel';

type intitalState = { list: null | evidences[] };
const initialStateValue: intitalState = { list: null };
export const evidenceSlice = createSlice({
  name: 'evidence',
  initialState: initialStateValue,
  reducers: {
    setEvidenceList: (state, action: PayloadAction<evidences[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setEvidenceList } = evidenceSlice.actions;

export default evidenceSlice.reducer;
