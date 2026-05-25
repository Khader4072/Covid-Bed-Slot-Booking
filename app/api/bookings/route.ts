import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = session.user as any;
    let bookings;

    if (user.role === "patient") {
      bookings = await prisma.booking.findMany({
        where: { patientId: user.id },
        include: { hospital: true, patient: true },
        orderBy: { bookedAt: "desc" },
      });
    } else if (user.role === "hospital_admin") {
      bookings = await prisma.booking.findMany({
        where: { hospitalId: user.hospitalId },
        include: { hospital: true, patient: true },
        orderBy: { bookedAt: "desc" },
      });
    } else {
      bookings = await prisma.booking.findMany({
        include: { hospital: true, patient: true },
        orderBy: { bookedAt: "desc" },
      });
    }

    const shaped = bookings.map((b) => ({
      id: b.id,
      patientId: b.patientId,
      patientName: b.patient.name,
      patientPhone: b.patient.phone ?? "",
      hospitalId: b.hospitalId,
      hospitalName: b.hospital.name,
      bedType: b.bedType,
      status: b.status,
      admissionDate: b.admissionDate,
      covidSeverity: b.covidSeverity,
      notes: b.notes ?? undefined,
      bookedAt: b.bookedAt.toISOString(),
    }));

    return NextResponse.json(shaped);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = session.user as any;
    const body = await req.json();
    const { hospitalId, bedType, admissionDate, covidSeverity, notes } = body;

    if (!hospitalId || !bedType || !admissionDate || !covidSeverity) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const hospital = await prisma.hospital.findUnique({ where: { id: hospitalId } });
    if (!hospital) return NextResponse.json({ error: "Hospital not found" }, { status: 404 });

    const bedField = bedType === "general" ? "generalBeds"
      : bedType === "icu" ? "icuBeds"
      : bedType === "oxygen" ? "oxygenBeds"
      : "ventilatorBeds";

    const available = hospital[bedField as keyof typeof hospital] as number;
    if (available <= 0) {
      return NextResponse.json({ error: "No beds available for this type" }, { status: 409 });
    }

    const [booking] = await prisma.$transaction([
      prisma.booking.create({
        data: {
          patientId: user.id,
          hospitalId,
          bedType,
          admissionDate,
          covidSeverity,
          notes,
          status: "pending",
        },
        include: { hospital: true, patient: true },
      }),
      prisma.hospital.update({
        where: { id: hospitalId },
        data: { [bedField]: { decrement: 1 } },
      }),
    ]);

    await prisma.notification.create({
      data: {
        userId: user.id,
        title: "Booking Submitted",
        message: `Your ${bedType} bed request at ${hospital.name} is under review.`,
        type: "booking",
      },
    });

    return NextResponse.json({
      id: booking.id,
      patientId: booking.patientId,
      patientName: (booking as any).patient.name,
      patientPhone: (booking as any).patient.phone ?? "",
      hospitalId: booking.hospitalId,
      hospitalName: (booking as any).hospital.name,
      bedType: booking.bedType,
      status: booking.status,
      admissionDate: booking.admissionDate,
      covidSeverity: booking.covidSeverity,
      notes: booking.notes ?? undefined,
      bookedAt: booking.bookedAt.toISOString(),
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
