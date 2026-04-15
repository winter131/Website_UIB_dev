import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  try {
    const body = await req.json();

    const res = await axios.post(
      `${process.env.SERVICE_URL}/v2/calon-mahasiswa/validate-loa-camhs`,
      body,
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
    } else {
      return NextResponse.json(
        {
          message:
            res.data.message || "Gagal melakukan validasi LOA calon mahasiswa",
        },
        { status: 400 },
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
        {
          message:
            error.response?.data?.message ||
            "Terjadi kesalahan internal peladen",
        },
        { status: 500 },
      );
    }
  }
}
