import useTopics from "./useTopics";

import {
  getTopicOptions,
  handleTopicChange,
  handleSortByChange,
  handleOrderChange,
  isValidTopic,
} from "./functions";

export default function Filter({
  setPage,
  setSearchParams,
  topic,
  sortBy,
  order,
  hasArticlesError,
}) {
  const { topics } = useTopics();

  const topicValue = isValidTopic(topic, topics) ? topic : "select";

  return (
    <section className="flex flex-col gap-4 md:mx-auto md:w-fit md:flex-row md:gap-16">
      <DropDown
        label="Topic"
        onChange={(e) => handleTopicChange(e, setPage, setSearchParams)}
        value={topicValue}
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
      {hasArticlesError && (
        <p className="self-end rounded-xl bg-red-200 px-4 py-2">
          Please select valid options here
        </p>
      )}
    </section>
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
        className="w-fit appearance-none rounded-xl bg-gray-200 py-2 pl-4 pr-8"
        id={id}
        {...restProps}
      >
        {children}
      </select>
    </div>
  );
}

function Options({ options }) {
  return Object.entries(options).map(([value, label]) => {
    return (
      <option key={value} value={value} disabled={value === "select"}>
        {label}
      </option>
    );
  });
}
