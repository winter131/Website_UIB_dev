import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const body = await req.json();

  try {
    const res = await axios.patch(
      `${process.env.SERVICE_URL}/v2/user/admisi`,
      body,
      {
        headers: {
          Authorization: `${auth}`,
        },
      },
    );

    console.log("edit user response data:", res.data);

    if (res.data.status === 200) {
      return NextResponse.json(
        {
          message: "Berhasil mengedit user",
          data: res.data.data,
        },
        { status: 200 },
      );
    } else if (res.data.status === 401) {
      return NextResponse.json({ error: res.data.error }, { status: 401 });
    } else {
      return NextResponse.json(
        {
          message: "Gagal mengedit user",
          error: res.data.error,
        },
        { status: res.data.status },
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
