import { PrismaClient, UserDetails, UserPassword } from "@prisma/client";

const prisma = new PrismaClient();

const getUserDetailsWithPassWordByEmail = async (
  email: string
): Promise<UserPassword | null> => {
  try {
    return prisma.userPassword.findFirst({
      where: {
        user: {
          isActive: true,
          userDetails: {
            some: {
              email,
            },
          },
        },
        isActive: true,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            id: true,
            createdAt: true,
            isActive: true,
            userDetails: {
              where: {
                isActive: true,
              },
              select: {
                id: true,
                user: true,
                mobileNumber: true,
                istwoFactorEnabled: true,
                countryCode: true,
                isMobileNumberVerified: true,
                email: true,
                userRole: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (err) {
    throw err;
  }
};

const isUserExistWithEmail = async (email: string): Promise<boolean> => {
  const userDetails = await prisma.userDetails.count({
    where: {
      email,
    },
  });

  return userDetails > 0;
};

const forgotPassWordOtpInsert = async (otp: string, userId: number) => {
  await prisma.forgotPassWordOtpRequest.create({
    data: {
      otp,
      userId,
      isActive: true,
    },
  });
};

const verifyForgotPassWordOtp = async (
  otp: string,
  userId: number
): Promise<Boolean> => {
  const now = new Date();
  const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);

  const count = await prisma.forgotPassWordOtpRequest.count({
    where: {
      userId,
      otp,
      isActive: true,
      createdAt: {
        gte: fifteenMinutesAgo,
        lte: now,
      },
    },
  });
  return count > 0;
};

const resetPassWord = async (password: string, userId: number) => {
  {
    try {
      await prisma.$transaction([
        prisma.userPassword.updateMany({
          where: { userId: userId },
          data: { isActive: false },
        }),
        prisma.userPassword.create({
          data: {
            password,
            user: {
              connect: {
                id: userId,
              },
            },
          },
        }),
      ]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

const createLoginOtpRequest = async (otp: string, userId: number) => {
  await prisma.loginOtpRequest.updateMany({
    where: {
      userId,
    },
    data: {
      isActive: false,
      isLoggedIn: true,
    },
  });

  await prisma.loginOtpRequest.create({
    data: {
      isActive: true,
      isLoggedIn: false,
      otp,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

const isUserHavesUnUsedLoginRequestOtp = async (
  userId: number
): Promise<Boolean> => {
  const now = new Date();
  const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);

  const count = await prisma.loginOtpRequest.count({
    where: {
      userId,
      isActive: true,
      isLoggedIn: false,
      createdAt: {
        gte: fifteenMinutesAgo,
        lte: now,
      },
    },
  });
  return count > 0;
};

const verifyLoginOtpRequest = async (
  otp: string,
  userId: number
): Promise<Boolean> => {
  const now = new Date();
  const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);
  const count = await prisma.loginOtpRequest.count({
    where: {
      userId: {
        equals: userId,
      },
      otp: {
        equals: otp,
      },
      isActive: true,
      isLoggedIn: false,
      createdAt: {
        gte: fifteenMinutesAgo,
        lte: now,
      },
    },
  });

  return count > 0;
};

const markLoginOtpAsUsed = async (otp: string, userId: number) => {
  await prisma.loginOtpRequest.updateMany({
    where: {
      userId,
      otp,
    },
    data: {
      isActive: false,
      isLoggedIn: true,
    },
  });
};

const markForgotPassWordOtpAsUsed = async (otp: string, userId: number) => {
  await prisma.forgotPassWordOtpRequest.updateMany({
    where: {
      userId,
      otp,
    },
    data: {
      isActive: false,
    },
  });
};

const deleteUserExistingPasswordDetails = async (userId: number) => {
  await prisma.userPassword.updateMany({
    where: {
      userId: userId,
    },
    data: {
      isActive: false,
    },
  });
};

const isUserExistWithEmailDetails = async (email: string) => {
  return prisma.userDetails.findUnique({
    where: {
      email,
      isActive: true,
    },
    select: {
      email: true,
      isActive: true,
      user: {
        select: {
          id: true,
          firstName: true,

          password: {
            where: {
              isActive: true,
            },
          },
        },
      },
    },
  });
};
const AuthRepository = {
  getUserDetailsWithPassWordByEmail,
  isUserExistWithEmail,
  forgotPassWordOtpInsert,
  verifyForgotPassWordOtp,
  resetPassWord,
  createLoginOtpRequest,
  isUserHavesUnUsedLoginRequestOtp,
  verifyLoginOtpRequest,
  markLoginOtpAsUsed,
  markForgotPassWordOtpAsUsed,
  deleteUserExistingPasswordDetails,
  isUserExistWithEmailDetails,
};

export default AuthRepository;
