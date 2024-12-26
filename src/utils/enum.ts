export enum Roles {
  LeadershipRole = 1,
  CountryLeaderShipRole = 2,
  CountryManagerRole = 3,
  BranchManagerRole = 4,
}

// - Leadership team (Superadmin Access)
// - Country Leadership team (Full Access to 1 or more countries -- All branches)
// - Country Manager team (Key information hidden, can make changes to website content)
// - Branch Manager (View Stats, Send request to country manager to make edits)
