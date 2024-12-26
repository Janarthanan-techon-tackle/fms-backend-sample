import CountryRepository from "../repository/country.repository";
import { HttpError, HttpStatus } from "../utils/httpError";

const createNewCountry = async (country: any) => {
  const isCountryExistWithSameName =
    await CountryRepository.isCountryExistWithSameName(country.countryName);

  if (isCountryExistWithSameName) {
    throw new HttpError(
      HttpStatus.BAD_REQUEST,
      "Country already exist with the same Name"
    );
  }

  const isCountryCodeExistWithDifferentCountry =
    await CountryRepository.isCountryExistWithSamCountryCode(
      country.countryCode
    );

  if (isCountryCodeExistWithDifferentCountry) {
    throw new HttpError(
      HttpStatus.BAD_REQUEST,
      "Country  already exist with the same country code "
    );
  }

  return CountryRepository.createNewCountry(country);
};

const updateCountryDetails = async (country: any) => {
  const isCountryExistWithSameNameExceptId =
    await CountryRepository.isCountryExistWithSameNameExceptId(
      country.countryName,
      country.id
    );

  if (isCountryExistWithSameNameExceptId) {
    throw new HttpError(HttpStatus.BAD_REQUEST, "Country name already exist");
  }

  const isCountryCodeExistWithSameCountryExceptId =
    await CountryRepository.isCountryExistWithSamCountryCodeExceptId(
      country.countryCode,
      country.id
    );

  if (isCountryCodeExistWithSameCountryExceptId) {
    throw new HttpError(
      HttpStatus.BAD_REQUEST,
      "Country code already exist with different country"
    );
  }
  return CountryRepository.updateCountry(country);
};

const getAllCountryDetails = async (search: any) => {
  return await CountryRepository.getAllCountryDetails(search);
};

const CountryService = {
  createNewCountry,
  updateCountryDetails,
  getAllCountryDetails,
};

export default CountryService;
