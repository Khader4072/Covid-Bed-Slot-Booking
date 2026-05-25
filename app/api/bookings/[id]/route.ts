import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = session.user as any;
    const { status } = await req.json();

    const allowed = ["confirmed", "rejected", "cancelled", "completed"];
    if (!allowed.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: { patient: true, hospital: true },
    });

    if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

    if (user.role === "patient" && booking.patientId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    if (user.role === "hospital_admin" && booking.hospitalId !== user.hospitalId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updated = await prisma.booking.update({
      where: { id: params.id },
      data: { status },
    });

    await prisma.notification.create({
      data: {
        userId: booking.patientId,
        title: `Booking ${status.charAt(0).toUpperCase() + status.slice(1)}`,
        message: `Your ${booking.bedType} bed booking at ${booking.hospital.name} has been ${status}.`,
        type: "update",
      },
    });

    return NextResponse.json({ id: updated.id, status: updated.status });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
