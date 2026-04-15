import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { nomorDaftar: string } },
) {
  const authHeader = req.headers.get("authorization");
  const queryParams = req.nextUrl.searchParams;
  const { nomorDaftar } = await params;
  const isKepala = queryParams.get("isKepala");

  try {
    const endpoint =
      isKepala === "true"
        ? `/v2/calon-mahasiswa/detail-camhs/${nomorDaftar}/y`
        : `/v2/calon-mahasiswa/detail-camhs/${nomorDaftar}`;
    const res = await axios.get(`${process.env.SERVICE_URL}${endpoint}`, {
      headers: {
        Authorization: `${authHeader}`,
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
        { message: res.data.error || "Gagal mengambil data calon mahasiswa" },
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
