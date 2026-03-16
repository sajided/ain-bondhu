const KEYS = {
  PROFILE_ID: 'pas_profile_id'
};

export const storage = {
  getProfileId: () => localStorage.getItem(KEYS.PROFILE_ID),
  setProfileId: (id: string) => localStorage.setItem(KEYS.PROFILE_ID, id),
};
