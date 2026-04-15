import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const { pathname } = new URL(req.url);
  const pathSegments = pathname.split("/");
  const usergroupId = pathSegments[pathSegments.length - 1];

  try {
    const res = await axios.delete(
      `${process.env.SERVICE_URL}/v2/user-group/admisi/${usergroupId}`,
      {
        headers: {
          Authorization: auth,
        },
      },
    );

    if (res.data.status === 200) {
      return NextResponse.json(
        {
          message: "Usergroup berhasil dihapus",
          data: res.data.data,
        },
        { status: 200 },
      );
    } else if (res.data.status === 401) {
      return NextResponse.json({ error: res.data.error }, { status: 401 });
    } else {
      console.log("Error delete usergroup", res.data);
      return NextResponse.json(
        {
          message: res.data.error || "Gagal menghapus usergroup",
        },
        { status: res.data.status || 500 },
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
