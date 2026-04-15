"use client";

import { DetailKeuanganDaftarUlangDataTagihanType } from "@/types/DetailKeuanganDaftarUlangTypes";
import { IndonesianCurrency } from "@/utils/IndonesianCurrency";

interface DetailTagihanProps {
  data: DetailKeuanganDaftarUlangDataTagihanType;
  isBeasiswa?: boolean;
  peringkatBeasiswa?: string;
}

export default function ValidasiKeuanganDaftarUlangDetailTagihanS2Card({
  data,
}: DetailTagihanProps) {
  const total =
    data.BiayaSemester1 +
    data.BiayaSemester2 +
    data.BiayaSemester3 +
    data.BiayaMatrikulasi;
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Detail Tagihan</h2>

      {/* Tabel Detail Tagihan */}
      <div className="card-body p-0">
        <table
          className="w-full"
          style={{
            fontSize: "8pt",
            border: "2px solid #666666",
            borderCollapse: "collapse",
            margin: "0.4cm 0px 0.4cm 0px",
            padding: "0px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#7D7D7D",
                fontSize: "9px",
                fontWeight: "bold",
                textTransform: "uppercase",
                padding: "4px",
              }}
            >
              <th style={{ border: "1px solid #666666", padding: "4px 8px" }}>
                Keterangan Komponen Biaya
              </th>
              <th style={{ border: "1px solid #666666", padding: "4px 8px" }}>
                Jumlah
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px 4px 16px",
                }}
              >
                1) Biaya Kuliah Semester Satu
              </td>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px",
                  textAlign: "right",
                }}
              >
                {IndonesianCurrency(data.BiayaSemester1)}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px 4px 16px",
                }}
              >
                2) Biaya Kuliah Semester Dua
              </td>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px",
                  textAlign: "right",
                }}
              >
                {IndonesianCurrency(data.BiayaSemester2)}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px 4px 16px",
                }}
              >
                3) Biaya Kuliah Semester Tiga
              </td>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px",
                  textAlign: "right",
                }}
              >
                {IndonesianCurrency(data.BiayaSemester3)}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px 4px 16px",
                }}
              >
                4) Biaya Matrikulasi
              </td>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px",
                  textAlign: "right",
                }}
              >
                {IndonesianCurrency(data.BiayaMatrikulasi)}
              </td>
            </tr>

            {/* Total Uang Masuk */}
            <tr>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px",
                  fontWeight: "bold",
                }}
              >
                Total yang harus dibayarkan
              </td>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                {IndonesianCurrency(total)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
