import useTopics from "./useTopics";

import {
  handleTopicChange,
  handleSortByChange,
  handleOrderChange,
} from "./functions";

import getTopicOptions from "../../utilities/getTopicOptions";

export default function Filter({
  setPage,
  setSearchParams,
  topic,
  sortBy,
  order,
}) {
  const { topics } = useTopics();

  return (
    <>
      <DropDown
        label="Topic"
        onChange={(e) => handleTopicChange(e, setPage, setSearchParams)}
        value={topic}
      >
        <Options options={getTopicOptions(topics)} />
      </DropDown>
      <DropDown
        label="Sort by"
        onChange={(e) => handleSortByChange(e, setPage, setSearchParams)}
        value={sortBy}
      >
        <Options
          options={{
            created_at: "Date",
            title: "Title",
            votes: "Votes",
            comment_count: "Comments",
          }}
        />
      </DropDown>
      <DropDown
        label="Order by"
        onChange={(e) => handleOrderChange(e, setPage, setSearchParams)}
        value={order}
      >
        <Options options={{ desc: "Descending", asc: "Ascending" }} />
      </DropDown>
    </>
  );
}

function DropDown({ children, label, ...restProps }) {
  const id = label.split(" ").join("-").toLowerCase();
  return (
    <div className="flex w-fit flex-row items-center gap-4 self-end">
      <label htmlFor={id} className="">
        {label}
      </label>
      <select
        className="w-fit appearance-none py-2 pl-4 pr-8"
        id={id}
        {...restProps}
      >
        {children}
      </select>
    </div>
  );
}

function Options({ options }) {
  return Object.keys(options).map((value) => (
    <option key={value} value={value}>
      {options[value]}
    </option>
  ));
}
