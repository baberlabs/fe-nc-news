import capitaliseString from "./capitaliseString";

export default function getTopicOptions(topics) {
  const array = Object.values(topics).map((topic) => topic.slug);
  const object = { all: "All" };
  for (const item of array) {
    object[item] = capitaliseString(item);
  }
  return object;
}
