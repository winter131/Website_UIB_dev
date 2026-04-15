interface LoadingBoxProps {
  open: boolean;
  icon: string;
  title: string;
  message: string;
}
export default function LoadingBox({
  open,
  icon,
  title,
  message,
}: LoadingBoxProps) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-9999 backdrop-blur confirm-dialog">
        <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
          <div className="bg-white dark:bg-[#212121] text-black dark:text-white rounded-xl md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg border">
            <div className="md:flex items-center">
              <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 shrink-0 mx-auto">
                <i className={`bx ${icon} text-3xl`}></i>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <p className="font-bold">{title}</p>
                <div className="flex flex-row">
                  <p className="text-sm mt-1 flex flex-row">{message}...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
