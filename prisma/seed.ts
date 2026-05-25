import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const hash = (pw: string) => bcrypt.hashSync(pw, 10);

  const h1 = await prisma.hospital.upsert({
    where: { id: "h1" },
    update: {},
    create: {
      id: "h1",
      name: "Apollo Covid Care Center",
      city: "Mumbai",
      state: "Maharashtra",
      address: "123 Medical Avenue, Andheri West",
      phone: "+91-22-4005-1066",
      email: "covid@apollomumbai.com",
      isVerified: true,
      totalBeds: 200,
      generalBeds: 45,
      icuBeds: 8,
      oxygenBeds: 22,
      ventilatorBeds: 3,
      rating: 4.7,
      imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400",
      pincode: "400053",
    },
  });

  const h2 = await prisma.hospital.upsert({
    where: { id: "h2" },
    update: {},
    create: {
      id: "h2",
      name: "Fortis Covid Hospital",
      city: "Delhi",
      state: "Delhi",
      address: "44 Shalimar Bagh, North Delhi",
      phone: "+91-11-4277-6222",
      email: "covid@fortisdelhi.com",
      isVerified: true,
      totalBeds: 150,
      generalBeds: 12,
      icuBeds: 2,
      oxygenBeds: 9,
      ventilatorBeds: 0,
      rating: 4.5,
      imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400",
      pincode: "110088",
    },
  });

  const h3 = await prisma.hospital.upsert({
    where: { id: "h3" },
    update: {},
    create: {
      id: "h3",
      name: "Manipal Covid Treatment Centre",
      city: "Bangalore",
      state: "Karnataka",
      address: "98 Old Airport Road, Kodihalli",
      phone: "+91-80-2502-4444",
      email: "covid@manipalbangalore.com",
      isVerified: true,
      totalBeds: 300,
      generalBeds: 78,
      icuBeds: 15,
      oxygenBeds: 34,
      ventilatorBeds: 7,
      rating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400",
      pincode: "560008",
    },
  });

  await prisma.hospital.upsert({
    where: { id: "h4" },
    update: {},
    create: {
      id: "h4",
      name: "AIIMS Covid Emergency Wing",
      city: "New Delhi",
      state: "Delhi",
      address: "Sri Aurobindo Marg, Ansari Nagar",
      phone: "+91-11-2658-8500",
      email: "covid@aiims.edu",
      isVerified: true,
      totalBeds: 500,
      generalBeds: 102,
      icuBeds: 18,
      oxygenBeds: 55,
      ventilatorBeds: 12,
      rating: 4.9,
      imageUrl: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400",
      pincode: "110029",
    },
  });

  await prisma.hospital.upsert({
    where: { id: "h5" },
    update: {},
    create: {
      id: "h5",
      name: "Narayana Health Covid Unit",
      city: "Kolkata",
      state: "West Bengal",
      address: "258/3A AJC Bose Road, Kolkata",
      phone: "+91-33-7122-2222",
      email: "covid@narayana.com",
      isVerified: true,
      totalBeds: 180,
      generalBeds: 31,
      icuBeds: 5,
      oxygenBeds: 18,
      ventilatorBeds: 2,
      rating: 4.6,
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400",
      pincode: "700020",
    },
  });

  await prisma.hospital.upsert({
    where: { id: "h6" },
    update: {},
    create: {
      id: "h6",
      name: "Max Super Specialty Covid Center",
      city: "Gurgaon",
      state: "Haryana",
      address: "W3, Sector 1, Mehrauli-Gurgaon Road",
      phone: "+91-124-4141-414",
      email: "covid@maxhospitals.com",
      isVerified: false,
      totalBeds: 120,
      generalBeds: 0,
      icuBeds: 0,
      oxygenBeds: 3,
      ventilatorBeds: 0,
      rating: 4.3,
      imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400",
      pincode: "122001",
    },
  });

  const patient = await prisma.user.upsert({
    where: { email: "patient@demo.com" },
    update: {},
    create: {
      id: "u1",
      name: "Rahul Sharma",
      email: "patient@demo.com",
      password: hash("password123"),
      role: "patient",
      phone: "+91-9876543210",
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@demo.com" },
    update: {},
    create: {
      id: "u2",
      name: "Dr. Priya Mehta",
      email: "admin@demo.com",
      password: hash("password123"),
      role: "hospital_admin",
      hospitalId: h1.id,
      phone: "+91-9876543211",
    },
  });

  await prisma.user.upsert({
    where: { email: "superadmin@demo.com" },
    update: {},
    create: {
      id: "u3",
      name: "Super Admin",
      email: "superadmin@demo.com",
      password: hash("password123"),
      role: "super_admin",
      phone: "+91-9876543212",
    },
  });

  const b1 = await prisma.booking.upsert({
    where: { id: "b1" },
    update: {},
    create: {
      id: "b1",
      patientId: patient.id,
      hospitalId: h1.id,
      bedType: "oxygen",
      status: "confirmed",
      admissionDate: "2021-05-11",
      covidSeverity: "moderate",
      notes: "Oxygen saturation dropping, needs monitoring",
    },
  });

  await prisma.booking.upsert({
    where: { id: "b2" },
    update: {},
    create: {
      id: "b2",
      patientId: patient.id,
      hospitalId: h3.id,
      bedType: "general",
      status: "completed",
      admissionDate: "2021-04-21",
      covidSeverity: "mild",
    },
  });

  await prisma.notification.upsert({
    where: { id: "n1" },
    update: {},
    create: {
      id: "n1",
      userId: patient.id,
      title: "Booking Confirmed",
      message: "Your bed booking at Apollo Covid Care Center has been confirmed.",
      isRead: false,
      type: "booking",
    },
  });

  await prisma.notification.upsert({
    where: { id: "n2" },
    update: {},
    create: {
      id: "n2",
      userId: patient.id,
      title: "Admission Reminder",
      message: "Your admission at Apollo is scheduled for tomorrow, May 11.",
      isRead: true,
      type: "update",
    },
  });

  await prisma.notification.upsert({
    where: { id: "n3" },
    update: {},
    create: {
      id: "n3",
      userId: adminUser.id,
      title: "New Booking Request",
      message: "A new oxygen bed request has been received from Rahul Sharma.",
      isRead: false,
      type: "booking",
    },
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
