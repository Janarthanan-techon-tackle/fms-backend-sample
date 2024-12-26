import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBranch = async (branch: any) => {
  return await prisma.branch.create({
    data: {
      name: branch.branchName,
      countryId: branch.countryId,
    },
  });
};

const updateBranch = async (branch: any) => {
  await prisma.branch.update({
    where: {
      id: branch.id,
    },
    data: {
      name: branch.branchName,
      isActive: branch.isActive,
    },
  });
};

const getAllBranchDetails = async (countryId: any, search: string) => {
  const branchDetails = await prisma.branch.findMany({
    where: {
      countryId: countryId === 0 ? undefined : countryId,
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          country: {
            name: {
              contains: search,
            },
          },
        },
      ],
    },
    select: {
      id: true,
      country: true,
      name: true,
      isActive: true,
    },
  });
  return branchDetails;
};

// const isBranchExistWithSameName = async (branchName: string) => {
//   const branchDetails = await prisma.branch.findMany({
//     where: {
//       name: branchName,
//       isActive: true,
//     },
//   });
//   return branchDetails
// };
const BranchRepository = {
  createBranch,
  updateBranch,
  getAllBranchDetails,
};

export default BranchRepository;
