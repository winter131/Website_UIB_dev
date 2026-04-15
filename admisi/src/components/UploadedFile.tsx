interface UploadedFileViewProps {
  namaFile: string;
  linkFile: string;
  type: string;
  buttonText?: React.ReactNode;
  onClick?: () => void;
  size?: string;
}
export default function UploadedFile({
  namaFile,
  linkFile,
  type,
  buttonText = "Download",
  onClick,
  size,
}: UploadedFileViewProps) {
  return (
    <>
      <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dd className="mt-2 text-sm text-gray-900 sm:col-span-3 sm:mt-0">
          <ul
            role="list"
            className="divide-y divide-gray-100 rounded-md border border-gray-200"
          >
            <li className="flex items-center justify-between py-1 pl-4 pr-5 text-sm leading-6 dark:text-white">
              <b className="mr-2">Ter-upload</b>
              <div className="flex w-0 flex-1 items-center">
                <span className="bx bx-paperclip"></span>
                <div className="ml-4 flex min-w-0 flex-1 gap-2 dark:text-white">
                  <span className="truncate font-medium">{namaFile}</span>
                  {size && (
                    <span className="flex-shrink-0 text-gray-400">{size}</span>
                  )}
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                {type === "preview" ? (
                  <button
                    onClick={onClick}
                    type="button"
                    className="font-medium text-[#F8B600] cursor-pointer"
                  >
                    {buttonText}
                  </button>
                ) : (
                  <a
                    target="_blank"
                    download
                    href={linkFile}
                    className="font-medium text-[#F8B600] cursor-pointer"
                  >
                    {buttonText}
                  </a>
                )}
              </div>
            </li>
          </ul>
        </dd>
      </div>
    </>
  );
}
