import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const h = await prisma.hospital.findUnique({ where: { id: params.id } });
    if (!h) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({
      id: h.id,
      name: h.name,
      city: h.city,
      state: h.state,
      address: h.address,
      phone: h.phone,
      email: h.email,
      isVerified: h.isVerified,
      totalBeds: h.totalBeds,
      availableBeds: {
        general: h.generalBeds,
        icu: h.icuBeds,
        oxygen: h.oxygenBeds,
        ventilator: h.ventilatorBeds,
      },
      rating: h.rating,
      imageUrl: h.imageUrl ?? "",
      pincode: h.pincode ?? "",
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
