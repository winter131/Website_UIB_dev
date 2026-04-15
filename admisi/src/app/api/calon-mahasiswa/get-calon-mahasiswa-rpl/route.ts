import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const params = req.nextUrl.searchParams;
  const selGelombang = params.get("selGelombang") || "";
  const selPeriode = params.get("selPeriode") || "";
  const selJenjang = params.get("selJenjang") || "";
  const lokasiUjian = params.get("lokasiUjian") || "all";
  const justDaftarUlang = params.get("justDaftarUlang") || "";
  const justDiterima = params.get("justDiterima") || "";
  const isLoa = params.get("isLoa") || "";
  try {
    const res = await axios.get(`${process.env.SERVICE_URL}/v2/rpl-camhs`, {
      headers: {
        Authorization: `${authHeader}`,
      },
      params: {
        selGelombang,
        selPeriode,
        selJenjang,
        lokasiUjian,
        justDaftarUlang,
        justDiterima,
        isLoa,
      },
    });

    if (res.data.status === 200) {
      return NextResponse.json(
        { message: "Success", data: res.data },
        { status: 200 },
      );
    } else if (res.data.status === 401) {
      return NextResponse.json({ error: res.data.error }, { status: 401 });
    } else {
      return NextResponse.json(
        {
          message: res.data.error || "Gagal mengambil data calon mahasiswa rpl",
        },
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
