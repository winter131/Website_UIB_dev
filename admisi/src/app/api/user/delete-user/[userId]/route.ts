import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const { pathname } = new URL(req.url);
  const pathSegments = pathname.split("/");
  const userId = pathSegments[pathSegments.length - 1];

  console.log("Deleting user with ID:", userId);

  try {
    const res = await axios.delete(
      `${process.env.SERVICE_URL}/v2/user/admisi/${userId}`,
      {
        headers: {
          Authorization: `${auth}`,
        },
      },
    );

    if (res.data.status === 200) {
      return NextResponse.json(
        {
          message: "Berhasil menghapus user",
          data: res.data.data,
        },
        { status: 200 },
      );
    } else if (res.data.status === 401) {
      return NextResponse.json({ error: res.data.error }, { status: 401 });
    } else {
      return NextResponse.json(
        {
          message: "Gagal menghapus user",
          error: res.data.error,
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
