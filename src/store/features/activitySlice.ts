import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { IActivity } from "../../models/IActivity";
import { filterStatusPayload, IDateRange } from "../../models/ISortOptions";
import { determineStatus } from "../../helpers/activityHelpers";

interface ActivityState {
  activities: IActivity[];
  filteredActivities: IActivity[];
  loading: boolean;
  error: string | undefined;
}

const initialState: ActivityState = {
  activities: [],
  filteredActivities: [],
  loading: false,
  error: undefined,
};

export const fetchActivity = createAsyncThunk("activity/fetch", async () => {
  const response = await fetch("http://localhost:3000/activitiesList", {
    method: "GET",
  });
  const data = await response.json();
  return data;
});

export const saveActivity = createAsyncThunk(
  "activity/save",
  async (activity: IActivity) => {
    //use [::1] instead of local host
    const response = await fetch("http://localhost:3000/activitiesList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: v4(),
        name: activity.name,
        description: activity.description,
        status: activity.status,
        creationDate: new Date().toISOString(),
        deadline: activity.deadline,
      }),
    });
    const data = await response.json();
    return data;
  }
);

export const deleteActivity = createAsyncThunk(
  "activity/delete",
  async (activityId: string) => {
    const response = await fetch(
      `http://localhost:3000/activitiesList/${activityId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: activityId,
        }),
      }
    );
    const data = await response.json();
    return data;
  }
);

export const editActivity = createAsyncThunk(
  "activity/edit",
  async (activity: IActivity) => {
    console.log(activity);
    const response = await fetch(
      `http://localhost:3000/activitiesList/${activity.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: activity.id,
          name: activity.name,
          description: activity.description,
          status: activity.status,
          creationDate: activity.creationDate,
          deadline: activity.deadline,
        }),
      }
    );
    const data = await response.json();
    return data;
  }
);

export const ActivitySlice = createSlice({
  name: "activities",
  initialState: initialState,
  reducers: {
    addActivity: (state, action: PayloadAction<IActivity>) => {
      state.activities.push(action.payload);
    },
    editStateActivity: (state, action: PayloadAction<IActivity>) => {
      const { id, name, deadline, status } = action.payload;
      const foundActivity = state.activities.find(
        (activity) => activity.id === id
      );
      if (foundActivity) {
        foundActivity.name = name;
        foundActivity.status = status;
        foundActivity.deadline = deadline;
      }
    },
    searchByDescription: (state, action: PayloadAction<string>) => {
      const searchedActivities = state.activities.filter((activity) =>
        activity.name
          .toLocaleLowerCase()
          .includes(action.payload.toLocaleLowerCase())
      );
      return {
        ...state,
        filteredActivities:
          action.payload.length > 0
            ? searchedActivities
            : [...state.activities],
      };
    },
    searchByDateRange: (state, action: PayloadAction<IDateRange>) => {
      const { firstDate, secondDate } = action.payload;
      const conditions = [firstDate, secondDate];
      const filteredArray = state.filteredActivities.filter((activity) =>
        conditions.some((el) => activity.deadline.includes(el))
      );
      state.filteredActivities = filteredArray;
    },
    filterStatus: (state, action: PayloadAction<filterStatusPayload>) => {
      const { status, checked } = action.payload;
      const initialFilterState = state.filteredActivities;
      const filteredArray = state.filteredActivities.filter(
        (activity) => activity.status !== status
      );
      return {
        ...state,
        filteredActivities: checked ? filteredArray : initialFilterState,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchActivity.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchActivity.fulfilled, (state, action) => {
      state.loading = false;
      state.activities = action.payload;
      state.filteredActivities = action.payload;
    });
    builder.addCase(fetchActivity.rejected, (state, action) => {
      state.loading = false;
      state.activities = [];
      state.error = action.error.message || "Ha ocurrido un error.";
    });
    builder.addCase(saveActivity.fulfilled, (state, action) => {
      state.activities.push(action.payload);
      for (let i = 0; i < state.activities.length; i++) {
        determineStatus(state.activities[i]);
      }
      state.filteredActivities = state.activities;
    });
    builder.addCase(deleteActivity.fulfilled, (state, action) => {
      state.activities.filter((activity) => activity.id !== action.payload.id);
      state.filteredActivities = state.activities;
    });
    builder.addCase(editActivity.fulfilled, (state, action) => {
      const { id, name, deadline, status } = action.payload;
      const foundActivity = state.activities.find(
        (activity) => activity.id === id
      );
      if (foundActivity) {
        foundActivity.name = name;
        foundActivity.status = status;
        foundActivity.deadline = deadline;
      }
      state.filteredActivities = state.activities;
    });
  },
});

export default ActivitySlice.reducer;
export const {
  addActivity,
  searchByDescription,
  searchByDateRange,
  filterStatus,
} = ActivitySlice.actions;
