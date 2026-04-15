import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { nomorDaftar: string } },
) {
  const authHeader = req.headers.get("authorization");
  const queryParams = req.nextUrl.searchParams;
  const { nomorDaftar } = await params;

  try {
    const res = await axios.get(
      `${process.env.SERVICE_URL}/v2/calon-mahasiswa/detail-validasi-loa-camhs/${nomorDaftar}`,
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
            "Gagal mengambil data detail keuangan daftar ulang calon mahasiswa",
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
