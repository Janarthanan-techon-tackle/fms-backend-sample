import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createNewCountry = async (countryDetails: any) => {
  try {
    await prisma.country.create({
      data: {
        countryCode: countryDetails.countryCode,
        name: countryDetails.countryName,
      },
    });
  } catch (err) {
    throw err;
  }
};

const isCountryExistWithSameName = async (countryName: string) => {
  try {
    const countryDetails = await prisma.country.findUnique({
      where: {
        name: countryName,
      },
    });
    return countryDetails;
  } catch (err) {
    throw err;
  }
};
const isCountryExistWithSameNameExceptId = async (
  countryName: string,
  id: number
) => {
  try {
    const countryDetails = await prisma.country.findUnique({
      where: {
        name: countryName,
        NOT: [
          {
            id: id,
          },
        ],
      },
    });
    return countryDetails;
  } catch (err) {
    throw err;
  }
};

const isCountryExistWithSamCountryCode = async (countryCode: string) => {
  try {
    const countryDetails = await prisma.country.findUnique({
      where: {
        countryCode,
        isActive: true,
      },
    });
    return countryDetails;
  } catch (err) {
    throw err;
  }
};
const isCountryExistWithSamCountryCodeExceptId = async (
  countryCode: string,
  id: number
) => {
  try {
    const countryDetails = await prisma.country.findUnique({
      where: {
        countryCode,
        isActive: true,
        NOT: [
          {
            id: id,
          },
        ],
      },
    });
    return countryDetails;
  } catch (err) {
    throw err;
  }
};

const updateCountry = async (country: any) => {
  await prisma.country.update({
    where: {
      id: country.id,
    },
    data: {
      countryCode: country.countryCode,
      name: country.countryName,
      isActive: country.isActive,
    },
  });
};

const getAllCountryDetails = async (searchTerm: any) => {
  const countries = await prisma.country.findMany({
    where: {
      isActive: true,
      OR: [
        { countryCode: { contains: searchTerm } },
        { name: { contains: searchTerm } },
      ],
    },
  });

  return countries;
};
const CountryRepository = {
  createNewCountry,
  isCountryExistWithSameName,
  isCountryExistWithSameNameExceptId,
  updateCountry,
  isCountryExistWithSamCountryCode,
  isCountryExistWithSamCountryCodeExceptId,
  getAllCountryDetails,
};

export default CountryRepository;
