import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const nomorDaftar = req.nextUrl.searchParams.get("nomor_daftar");

  try {
    const res = await axios.get(
      `${process.env.SERVICE_URL}/v2/wawancara/pewawancara/${nomorDaftar}`,
      {
        headers: {
          Authorization: `${authHeader}`,
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
        {
          message:
            res.data.error ||
            "Gagal mengambil data list calon mahasiswa untuk wawancara",
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
