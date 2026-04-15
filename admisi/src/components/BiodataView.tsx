import UploadedFile from "./UploadedFile";

interface BiodataProps {
  title: string;
  value: string;
  type: "text" | "file";
  dataFile?: FileDataProps;
  isLoading?: boolean;
}

interface FileDataProps {
  namaFile: string;
  linkFile: string;
  type: "preview" | "download";
  buttonText?: React.ReactNode;
  onClick?: () => void;
  size?: string;
}

export default function BiodataView({
  type,
  title,
  value,
  dataFile,
  isLoading,
}: BiodataProps) {
  return type === "text" ? (
    <TextView title={title} value={value} isLoading={isLoading} />
  ) : type === "file" ? (
    <FileView
      title={title}
      value={value}
      dataFile={dataFile}
      isLoading={isLoading}
    />
  ) : null;
}

function TextView({
  title,
  value,
  isLoading,
}: {
  title: string;
  value: string;
  isLoading?: boolean;
}) {
  return (
    <div className="p-4">
      <p className="font-bold text-slate-400 dark:text-white text-sm">
        {title}
      </p>
      {isLoading ? (
        <div className="w-full skeleton h-5 mt-2 bg-gray-200"></div>
      ) : (
        <p className="text-sm font-semibold text-dark dark:text-white mt-4">
          {value}
        </p>
      )}
    </div>
  );
}

function FileView({
  value,
  title,
  dataFile,
  isLoading,
}: {
  value: string;
  title: string;
  dataFile?: FileDataProps;
  isLoading?: boolean;
}) {
  return value === "" ? (
    <div className="p-4">
      <p className="font-bold text-slate-400 dark:text-white text-sm">
        {title}
      </p>
      <p className="text-sm font-semibold text-dark dark:text-white mt-4">
        Belum diisi
      </p>
    </div>
  ) : (
    <div className="p-4">
      <p className="font-bold text-slate-400 dark:text-white text-sm">
        {title}
      </p>
      <UploadedFile
        namaFile={dataFile?.namaFile || ""}
        linkFile={dataFile?.linkFile || "#"}
        type={dataFile?.type || ""}
        buttonText={dataFile?.buttonText || ""}
        onClick={dataFile?.onClick || (() => {})}
        size={dataFile?.size || ""}
      />
    </div>
  );
}
