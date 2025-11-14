import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ModalSize = "xs" | "sm" | "md" | "lg";

interface ModalState {
  formModal: {
    isOpen: boolean;
    type?: string;
    data?: unknown | null;
    size?: ModalSize;
  };
  loader: {
    status: boolean;
  };
}

const initialState: ModalState = {
  formModal: {
    isOpen: false,
    type: "",
    data: null,
    size: "md",
  },
  loader: {
    status: false,
  },
};

interface SetFormModalPayload {
  isOpen: boolean;
  type?: string;
  data?: unknown;
  size?: ModalSize;
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setFormModal(state, action: PayloadAction<SetFormModalPayload>) {
      const { isOpen, type, data, size } = action.payload;
      state.formModal.isOpen = isOpen;
      state.formModal.type = type;
      state.formModal.data = data ?? null;
      if (size) {
        state.formModal.size = size;
      }
    },
    setLoader: (state, action: PayloadAction<{ status: boolean }>) => {
      state.loader = {
        status: action.payload.status,
      };
    },
  },
});

export const { setFormModal, setLoader } = modalSlice.actions;

export default modalSlice.reducer;
