import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
  dayOfWeek: String,
  shifts: {
    morning: String,
    noon: String,
    night: String,
  },
});

const Schedule = mongoose.model("Schedule", ScheduleSchema);

export default Schedule;
