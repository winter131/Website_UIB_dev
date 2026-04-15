import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const params = req.nextUrl.searchParams;
  const tanggalAwal = params.get("tanggalAwal") || "";
  const tanggalAkhir = params.get("tanggalAkhir") || "";

  try {
    const res = await axios.get(
      `${process.env.SERVICE_URL}/v2/manajemen-usm/sesi-usm`,
      {
        headers: {
          Authorization: `${authHeader}`,
        },
        params: {
          startDate: tanggalAwal,
          endDate: tanggalAkhir,
        },
      },
    );

    if (res.data.status === 200) {
      return NextResponse.json(
        { message: "Success", data: res.data },
        { status: 200 },
      );
    } else if (res.data.status === 401) {
      return NextResponse.json({ error: res.data.error }, { status: 401 });
    } else {
      return NextResponse.json(
        { message: res.data.error || "Gagal mengambil data soal USM" },
        { status: 500 },
      );
    }
  } catch (error: any) {
    if (error.status === 401) {
      return NextResponse.json(
        { error: error.message, status: 401 },
        { status: 401 },
      );
    } else {
      return NextResponse.json(
        { message: error.response.data },
        { status: 500 },
      );
    }
  }
}
