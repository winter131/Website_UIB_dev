import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const params = req.nextUrl.searchParams;
  const selGelombang = params.get("gelombangId") || "";
  const selPeriode = params.get("periodeId") || "";
  const lokasiUjian = params.get("lokasiUjian") || "";
  const selJenjang = params.get("jenjang") || "";

  try {
    const res = await axios.get(`${process.env.SERVICE_URL}/v2/wawancara`, {
      headers: {
        Authorization: `${authHeader}`,
      },
      params: {
        selGelombang,
        selPeriode,
        selJenjang,
        lokasiUjian,
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
        { message: res.data.error || "Gagal mengambil data hasil USM" },
        { status: 500 },
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.response.data }, { status: 500 });
  }
}
