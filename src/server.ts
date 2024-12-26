import { PrismaClient } from "@prisma/client";
import app from "./app";
import { config } from "./config/config";
import hashPassWord from "./utils/hashedPassWord";
import { Roles } from "./utils/enum";

const initDbFunction = async (prisma: PrismaClient) => {
  const roleCount = await prisma.userRole.count({});

  const rolesDetails = [
    { id: 1, name: "LeadershipRole" },
    { id: 2, name: "CountryLeaderShipRole" },
    { id: 3, name: "CountryManagerRole" },
    { id: 4, name: "BranchManagerRole" },
    { id: 5, name: "UserRole" },
  ];

  if (roleCount === 0) {
    for (const role of rolesDetails) {
      console.log(`creating role name ${role.name} initiated `);
      await prisma.userRole.create({
        data: {
          roleName: role.name,
        },
      });
    }
  }
  const userCount = await prisma.user.count({});
  if (userCount == 0) {
    console.log("Creating admin Initiated");
    const hashedPassWord = await hashPassWord("Password123!");
    await prisma.user.create({
      data: {
        firstName: "Admin",
        lastName: "user",
        password: {
          create: {
            password: hashedPassWord,
          },
        },
        userDetails: {
          create: {
            email: "janarthanan.b@technotackle.com",
            countryCode: "+91",
            mobileNumber: "9566606092",
            userRoleId: Roles.LeadershipRole,
          },
        },
      },
    });
  }
};
app.listen(config.PORT, () => {
  const prisma = new PrismaClient();

  initDbFunction(prisma);
  console.log(`app running in the port ${config.PORT} successfully`);
});
