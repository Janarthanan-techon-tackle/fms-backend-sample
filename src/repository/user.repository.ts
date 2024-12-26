import { PrismaClient, User, UserDetails } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (user: any): Promise<User | null> => {
  console.log({ user: user });
  try {
    const createdUser = await prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        password: {
          create: {
            password: user.password,
          },
        },
        userDetails: {
          create: {
            mobileNumber: user.mobileNumber,
            countryCode: user.countryCode,
            email: user.email,
            userRoleId: user.roleId,
          },
        },
      },
    });
    return createdUser;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
const findUserByEmail = async (email: string): Promise<UserDetails | null> => {
  try {
    return await prisma.userDetails.findUnique({
      where: {
        email,
      },
      include: {
        user: true,
        userRole: true,
      },
    });
  } catch (err) {
    throw err;
  }
};

const findAllUserDetails = async (search: any) => {
  const users = await prisma.user.findMany({
    where: {
      isActive: true,
      OR: [
        {
          firstName: {
            contains: search,
          },
        },
        {
          lastName: {
            contains: search,
          },
        },
        {
          userDetails: {
            some: {
              email: {
                contains: search,
              },
            },
          },
        },
      ],
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      isActive: true,
      userDetails: {
        where: {
          isActive: true,
        },
        select: {
          id: true,
          email: true,
          countryCode: true,
          isActive: true,
          createdAt: true,
          mobileNumber: true,
        },
      },
    },
  });
  return users;
};

const findUserWithMobileNumber = async (mobileNumber: string) => {
  const userDetails = await prisma.userDetails.findUnique({
    where: {
      mobileNumber,
    },
    include: {
      user: true,
    },
  });
  return userDetails;
};

const updateUserData = async (user: any) => {
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
      // userDetails: {
      //   update: {
      //     where: {
      //       id: user.userDetails.id,
      //     },
      // data: {
      //   countryCode: user.countryCode,
      //   mobileNumber: user.mobileNumber,
      //   email: user.email,
      //   isActive: user.isActive,
      // },
      //   },
      // },
    },
  });

  return await prisma.userDetails.update({
    where: {
      id: user.userDetails.id,
    },
    data: {
      countryCode: user.countryCode,
      mobileNumber: user.mobileNumber,
      email: user.email,
      isActive: user.isActive,
    },
    include: {
      user: true,
    },
  });
};
const isEmailBelongsToDifferentUser = async (userId: number, email: string) => {
  const userDetails = await prisma.userDetails.findUnique({
    where: {
      email,
      userId: {
        not: userId,
      },
    },
  });
  return userDetails;
};

const isMobileNumberBelongsToDifferentUser = async (
  userId: number,
  mobileNumber: string
) => {
  const userDetails = await prisma.userDetails.findUnique({
    where: {
      mobileNumber,
      userId: {
        not: userId,
      },
    },
  });
  return userDetails;
};

const UserRepository = {
  createUser,
  findUserByEmail,
  findAllUserDetails,
  findUserWithMobileNumber,
  isEmailBelongsToDifferentUser,
  updateUserData,
  isMobileNumberBelongsToDifferentUser,
};

export default UserRepository;
