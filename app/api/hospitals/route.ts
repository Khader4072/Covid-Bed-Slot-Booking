import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const hospitals = await prisma.hospital.findMany({
      orderBy: { rating: "desc" },
    });

    const shaped = hospitals.map((h) => ({
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
    }));

    return NextResponse.json(shaped);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
