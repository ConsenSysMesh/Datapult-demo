import * as React from "react";

function Upload(props) {
  return (
    <svg
      width={39}
      height={45}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.667 31.23V8.296L28.8 15.43l3.065-3.065L19.5 0 7.135 12.365l3.064 3.065 7.135-7.135V31.23h4.333zM39 39.898v-19.5h-4.333v19.5H4.333v-19.5H0v19.5a4.333 4.333 0 004.333 4.334h30.334A4.333 4.333 0 0039 39.897z"
        fill="#CC3B1E"
      />
    </svg>
  );
}

export default Upload;
