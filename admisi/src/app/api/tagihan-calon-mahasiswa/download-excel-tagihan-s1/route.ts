import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const { searchParams } = new URL(req.url);
  const sel_periode = searchParams.get("sel_periode");

  try {
    const response = await axios.get(
      `${process.env.SERVICE_URL}/v2/tagihan-camhs/generate-excel-tagihan-s1`,
      {
        headers: {
          Authorization: `${auth}`,
        },
        params: {
          sel_periode: sel_periode,
        },
        responseType: "stream",
      },
    );

    const headers = new Headers();
    headers.set(
      "Content-Type",
      response.headers["content-type"] ||
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    headers.set(
      "Content-Disposition",
      response.headers["content-disposition"] ||
        'attachment; filename="tagihan_loa_s1.xlsx"',
    );

    return new NextResponse(response.data, {
      status: 200,
      headers,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message:
          error.response?.data?.message || "Gagal mengunduh file format excel",
      },
      { status: 500 },
    );
  }
}
