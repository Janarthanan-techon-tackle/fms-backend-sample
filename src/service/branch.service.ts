import BranchRepository from "../repository/branch.repository";

const createNewBranch = async (branch: any) => {
  return BranchRepository.createBranch(branch);
};

const updateBranchDetails = async (branch: any) => {
  return BranchRepository.updateBranch(branch);
};

const getAllBranchDetails = async (query: any) => {
  const { countryId, search } = query;
  const branchDetails = await BranchRepository.getAllBranchDetails(
    +countryId,
    search
  );
  return branchDetails;
};
const BranchService = {
  createNewBranch,
  updateBranchDetails,
  getAllBranchDetails,
};

export default BranchService;
