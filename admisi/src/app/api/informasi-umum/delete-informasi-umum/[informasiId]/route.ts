import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { informasiId: string } },
) {
  const auth = req.headers.get("authorization");
  const pathname = req.nextUrl.pathname;
  const pathSegments = pathname.split("/");
  const informasiId = pathSegments[pathSegments.length - 1];

  try {
    const res = await axios.delete(
      `${process.env.SERVICE_URL}/v2/pengumuman-pendaftaran/${informasiId}`,
      {
        headers: {
          Authorization: `${auth}`,
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
        { message: res.data.error || "Gagal menghapus pengumuman pendaftaran" },
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
