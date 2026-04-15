import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const body = await req.json();
  // const body = {
  //   sel_camhs: "202344127",
  // };

  try {
    const response = await axios.post(
      `${process.env.SERVICE_URL}/v2/calon-mahasiswa/cetak-loa-camhs`,
      body,
      {
        headers: {
          Authorization: `${auth}`,
        },
        responseType: "stream",
      },
    );

    const headers = new Headers();
    headers.set(
      "Content-Type",
      response.headers["content-type"] || "application/pdf",
    );
    headers.set(
      "Content-Disposition",
      response.headers["content-disposition"] ||
        'attachment; filename="loa_camhs.pdf"',
    );

    return new NextResponse(response.data, {
      status: 200,
      headers,
    });
  } catch (error: any) {
    console.log("error", error);
    return NextResponse.json(
      {
        message: error.response?.data?.message || "Gagal mengunduh file loa",
      },
      { status: 500 },
    );
  }
}
