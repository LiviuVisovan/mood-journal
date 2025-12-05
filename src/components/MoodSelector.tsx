import { useState } from "react";

type moodSelector = { selector: (mood: string) => void };

export default function MoodSelector(props: moodSelector) {
  const [mood, setMood] = useState("anxious");
  const moodsList = ["anxious", "curious", "brave", "sleepy", "focused"];
  return (
    <div>
      Mood:{" "}
      <div className="filter-select">
        <select
          value={mood}
          onChange={(e) => {
            setMood(e.target.value);
            props.selector(e.target.value);
          }}
        >
          {moodsList.map((mood) => (
            <option>{mood}</option>
          ))}
        </select>
      </div>
      <p>You chose: {mood}</p>
    </div>
  );
}
