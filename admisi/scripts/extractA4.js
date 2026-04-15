const fs = require("fs");
const path = require("path");

function extractA4Component(
  sourcePath,
  destPath,
  componentName,
  typeName,
  isMagister,
) {
  let content = fs.readFileSync(sourcePath, "utf-8");
  const startIndex = content.indexOf(
    '<div\n                ref={modalContentRef}\n                className="bg-white shadow-2xl w-full max-w-[21cm] p-[1.5cm] font-serif"',
  );

  if (startIndex === -1) {
    console.error("Start index not found in", sourcePath);
    return;
  }

  let endIndex = startIndex;
  let openDivs = 0;
  let foundFirstDiv = false;

  // A simple HTML tag counter string parsing to find the matching closing </div>
  for (let i = startIndex; i < content.length; i++) {
    if (content.substr(i, 4) === "<div") {
      openDivs++;
      foundFirstDiv = true;
    } else if (content.substr(i, 6) === "</div" && foundFirstDiv) {
      openDivs--;
      if (openDivs === 0) {
        endIndex = i + 6; // Include '</div>'
        break;
      }
    }
  }

  // Now find the closing tag `>` of the matched `</div>`
  endIndex = content.indexOf(">", endIndex) + 1;

  let divContent = content.substring(startIndex, endIndex);

  // Create the new component
  const calculations = isMagister
    ? `
  // Calculate total biaya
  const totalBiayaMahasiswaBaru = data.biaya_matrikulasi;
  const totalBiayaKuliahSemester =
    data.biaya_semester_1 + data.biaya_semester_2 + data.biaya_semester_3;
  const totalUangMasuk = totalBiayaMahasiswaBaru + totalBiayaKuliahSemester;
`
    : `
  // Calculate total biaya
  const totalBiayaMahasiswaBaru = data.biaya_spp + data.biaya_ppl;
  const totalBiayaKuliahSemester =
    data.biaya_bpp + data.biaya_sks + data.biaya_praktikum + data.biaya_toeic;
  const totalUangMasuk = totalBiayaMahasiswaBaru + totalBiayaKuliahSemester;

  // Calculate potongan
  const totalPotongan =
    data.potongan_spp +
    data.potongan_bpp +
    data.potongan_sks +
    data.potongan_praktikum;
  const totalSetelahPotongan = totalUangMasuk - totalPotongan;

  // Calculate persentase potongan
  const persenPotonganSPP =
    data.biaya_spp > 0
      ? Math.round((data.potongan_spp / data.biaya_spp) * 100)
      : 0;
  const persenPotonganBPP =
    data.biaya_bpp > 0
      ? Math.round((data.potongan_bpp / data.biaya_bpp) * 100)
      : 0;
  const persenPotonganSKS =
    data.biaya_sks > 0
      ? Math.round((data.potongan_sks / data.biaya_sks) * 100)
      : 0;
  const persenPotonganPraktikum =
    data.biaya_praktikum > 0
      ? Math.round((data.potongan_praktikum / data.biaya_praktikum) * 100)
      : 0;
`;

  const componentCode = `"use client";
import { ${typeName} } from "@/types/TagihanLOATypes";
import { IndonesianCurrency } from "@/utils/IndonesianCurrency";
import { IndonesianDateFormat } from "@/utils/IndonesianDateFormat";
import { ucFirst } from "@/utils/UcFirst";
import Image from "next/image";
import { forwardRef } from "react";

interface Props {
  data: ${typeName};
}

const ${componentName} = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
${calculations}

  return (
    ${divContent.replace("ref={modalContentRef}", "ref={ref}")}
  );
});

${componentName}.displayName = "${componentName}";
export default ${componentName};
`;

  fs.writeFileSync(destPath, componentCode, "utf-8");

  // Replace in original file
  const newContent =
    content.substring(0, startIndex) +
    `<${componentName} ref={modalContentRef} data={data} />` +
    content.substring(endIndex);

  // Auto import
  let importStatement = `import ${componentName} from "@/components/${componentName}";\n`;
  let hookIndex = newContent.indexOf("import");
  const finalContent =
    newContent.substring(0, hookIndex) +
    importStatement +
    newContent.substring(hookIndex);

  fs.writeFileSync(sourcePath, finalContent, "utf-8");
  console.log("Successfully extracted", componentName);
}

const frontendDir = path.resolve(__dirname, "..");

extractA4Component(
  path.join(frontendDir, "src/components/TagihanLOASarjanaCard.tsx"),
  path.join(frontendDir, "src/components/PreviewLOASarjanaA4.tsx"),
  "PreviewLOASarjanaA4",
  "TagihanLOASarjanaType",
  false,
);

extractA4Component(
  path.join(frontendDir, "src/components/TagihanLOAMagisterCard.tsx"),
  path.join(frontendDir, "src/components/PreviewLOAMagisterA4.tsx"),
  "PreviewLOAMagisterA4",
  "TagihanLOAMagisterType",
  true,
);
