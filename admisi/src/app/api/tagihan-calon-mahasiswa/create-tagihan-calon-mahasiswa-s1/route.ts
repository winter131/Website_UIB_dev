import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const body = await req.json();

  try {
    const res = await axios.put(
      `${process.env.SERVICE_URL}/v2/tagihan-camhs/save-ref-S1`,
      body,
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
        {
          message: res.data.error || "Gagal membuat atau mengedit tagihan LOA",
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
