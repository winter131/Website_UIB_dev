"use client";

import { DetailKeuanganDaftarUlangDataTagihanType } from "@/types/DetailKeuanganDaftarUlangTypes";
import { IndonesianCurrency } from "@/utils/IndonesianCurrency";

interface DetailTagihanProps {
  data: DetailKeuanganDaftarUlangDataTagihanType;
  isBeasiswa?: boolean;
  peringkatBeasiswa?: string;
}

export default function ValidasiKeuanganDaftarUlangDetailTagihanS1Card({
  data,
}: DetailTagihanProps) {
  // Hitung total komponen
  const totalBiayaMahasiswaBaru = data.BiayaSpp + data.BiayaPpl;
  const totalBiayaSemesterSatu =
    data.BiayaBpp + data.BiayaSks + data.BiayaPraktikum;
  const totalUangMasuk = totalBiayaMahasiswaBaru + totalBiayaSemesterSatu;

  const totalPotonganBeasiswa =
    data.PotonganSpp + data.PotonganBpp + data.PotonganSks;

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
            {/* Bagian A: Biaya Mahasiswa Baru */}
            <tr>
              <td
                colSpan={2}
                style={{ border: "1px solid #666666", padding: "4px 8px" }}
              >
                A. Biaya Mahasiswa Baru{" "}
                <span style={{ fontWeight: "bold" }}>
                  (hanya sekali di tahun pertama)
                </span>
              </td>
            </tr>

            <tr>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px 4px 16px",
                }}
              >
                1) Sumbangan Penyelenggaraan Pendidikan (SPP)/Uang Gedung
              </td>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px",
                  textAlign: "right",
                }}
              >
                {IndonesianCurrency(data.BiayaSpp)}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px 4px 16px",
                }}
              >
                2) Biaya PPL (Penyelenggaraan Pendidikan & Lain-lain)
              </td>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px",
                  textAlign: "right",
                }}
              >
                {IndonesianCurrency(data.BiayaPpl)}
              </td>
            </tr>

            {/* Bagian B: Biaya Semester Satu */}
            <tr>
              <td
                colSpan={2}
                style={{ border: "1px solid #666666", padding: "4px 8px" }}
              >
                B. Biaya Kuliah untuk{" "}
                <span style={{ fontWeight: "bold" }}>Semester Satu :</span>
              </td>
            </tr>

            <tr>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px 4px 16px",
                }}
              >
                1) Biaya Penyelenggaraan Pendidikan Pokok (BPP Pokok)
              </td>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px",
                  textAlign: "right",
                }}
              >
                {IndonesianCurrency(data.BiayaBpp)}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px 4px 16px",
                }}
              >
                2) BPP SKS Semester I
              </td>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px",
                  textAlign: "right",
                }}
              >
                {IndonesianCurrency(data.BiayaSks)}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px 4px 16px",
                }}
              >
                3) BPP Praktikum
              </td>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px",
                  textAlign: "right",
                }}
              >
                {IndonesianCurrency(data.BiayaPraktikum)}
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
                C. Total Uang Masuk (A+B)
              </td>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                {IndonesianCurrency(totalUangMasuk)}
              </td>
            </tr>

            {/* Beasiswa yang diraih */}
            <tr>
              <td
                colSpan={2}
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px",
                  fontWeight: "bold",
                }}
              >
                D. BEASISWA YANG DIRAIH: {data.PeringkaDicapai}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px 4px 16px",
                }}
              >
                1) Potongan Uang Gedung, sebesar 0%
              </td>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px",
                  textAlign: "right",
                }}
              >
                {IndonesianCurrency(data.PotonganBpp)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px 4px 16px",
                }}
              >
                2) Potongan BPP Pokok, sebesar 0%
              </td>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px",
                  textAlign: "right",
                }}
              >
                {IndonesianCurrency(data.PotonganBpp)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px 4px 16px",
                }}
              >
                3) Potongan BPP SKS, sebesar 0%
              </td>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px",
                  textAlign: "right",
                }}
              >
                {IndonesianCurrency(data.PotonganSks)}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px",
                  fontWeight: "bold",
                }}
              >
                JUMLAH POTONGAN BEASISWA
              </td>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                {IndonesianCurrency(totalPotonganBeasiswa)}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px",
                  fontWeight: "bold",
                }}
              >
                E. TOTAL BIAYA YANG HARUS DILUNASI (C-D)
              </td>
              <td
                style={{
                  border: "1px solid #666666",
                  padding: "4px 8px",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                {IndonesianCurrency(totalUangMasuk - totalPotonganBeasiswa)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
