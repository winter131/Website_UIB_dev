import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { FormIsiWawancaraType } from "@/types/MulaiWawancaraTypes";

export default function WawancaraInformasiDisabilitas({
  formData,
  setFormData,
  readOnly = false,
}: {
  formData: FormIsiWawancaraType;
  setFormData: (value: any, key: string) => void;
  readOnly?: boolean;
}) {
  const disabilityOptions = [
    "Tuna Netra",
    "Tuna Runggu",
    "Tuna Grahitan Ringan",
    "Tuna Daksa Ringan",
    "Tuna Daksa Sedang",
    "Tuna Laras",
    "Tuna Wicara",
    "Hiperaktif",
    "Cerdas Istimewa",
    "Bakat Istimewa",
    "Kesulitan Belajar",
    "Narkoba",
    "Indigo",
    "Down Syndrome",
    "Autis",
  ];

  const handleCheckboxChange = (
    type: "CaMaba" | "Ayah" | "Ibu",
    option: string,
  ) => {
    let currentValues: string[] = [];
    let key: keyof FormIsiWawancaraType;

    if (type === "CaMaba") {
      currentValues = formData.disabilitasCaMaba || [];
      key = "disabilitasCaMaba";
    } else if (type === "Ayah") {
      currentValues = formData.disabilitasAyah || [];
      key = "disabilitasAyah";
    } else {
      currentValues = formData.disabilitasIbu || [];
      key = "disabilitasIbu";
    }

    const newValues = currentValues.includes(option)
      ? currentValues.filter((item) => item !== option)
      : [...currentValues, option];

    setFormData(newValues, key);
  };

  const isChecked = (type: "CaMaba" | "Ayah" | "Ibu", option: string) => {
    if (type === "CaMaba")
      return formData.disabilitasCaMaba?.includes(option) || false;
    if (type === "Ayah")
      return formData.disabilitasAyah?.includes(option) || false;
    return formData.disabilitasIbu?.includes(option) || false;
  };

  return (
    <Card className="border-slate-100 dark:border-zinc-800 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
            <i className="bx bx-body text-xl"></i>
          </div>
          <div>
            <CardTitle className="text-lg">Disabilitas</CardTitle>
            <CardDescription className="text-xs">
              Informasi disabilitas calon mahasiswa dan orang tua calon
              mahasiswa.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(["CaMaba", "Ayah", "Ibu"] as const).map((type) => (
            <div key={type} className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-50 dark:border-zinc-900">
                <span className="text-[10px] font-black uppercase text-slate-400">
                  Disabilitas {type}
                </span>
              </div>
              <div className="space-y-2.5">
                {disabilityOptions.map((option) => (
                  <div
                    key={`${type}-${option}`}
                    className="flex items-center space-x-3 group cursor-pointer"
                  >
                    <Checkbox
                      id={`${type}-${option}`}
                      className="border-slate-300 data-[state=checked]:bg-black data-[state=checked]:text-white data-[state=checked]:border-black"
                      value={option}
                      onCheckedChange={() => handleCheckboxChange(type, option)}
                      checked={isChecked(type, option)}
                    />
                    <Label
                      htmlFor={`${type}-${option}`}
                      className="text-[13px] font-normal text-slate-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
