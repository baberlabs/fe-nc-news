import { DriveFileRenameOutline } from "@mui/icons-material";

export default function InputField({ text, id, value }) {
  return (
    <div className="relative flex flex-col gap-2">
      <label htmlFor={id}>{text}</label>
      <div className="flex flex-row gap-2">
        <input
          type="text"
          id={id}
          value={value}
          disabled
          className="rounded bg-gray-200 px-4 py-2"
        />
        <button className="right-4 top-10">
          <DriveFileRenameOutline />
        </button>
      </div>
    </div>
  );
}
