import { api, clearToken, setToken } from './api.js';

export const applyUser = (setData, user) => {
  if (!user) return;
  setData((prev) => ({
    ...prev,
    wallet: user.wallet || prev.wallet || null,
    Access: {
      ...prev.Access,
      haveaccess: 'true',
      accountInfo: {
        ...prev.Access.accountInfo,
        userName: user.name || '',
        userEmail: user.email || '',
        userAvatar: user.avatar || prev.Access.accountInfo.userAvatar,
        userPassword: '',
        userBio: user.bio || prev.Access.accountInfo.userBio || '',
      },
      systemRequerd: {
        ...prev.Access.systemRequerd,
        userID: user.id,
        Verified: user.verified ? 1 : 0,
        userAcountDetalise: {
          Volume: user.stats?.volumeHub || 0,
          NFTsSold: user.stats?.licensesSold || 0,
          Followers: user.stats?.followers || 0,
        },
      },
    },
  }));
};

export const clearSession = (setData) => {
  clearToken();
  setData((prev) => ({
    ...prev,
    wallet: null,
    Access: {
      ...prev.Access,
      haveaccess: '',
      accountInfo: {
        userAvatar: '',
        userName: '',
        userEmail: '',
        userLinks: {
          FaceBookLink: '',
          disCordLink: '',
          youtubeLink: '',
          xLink: '',
          instgramLink: '',
        },
        userBio: '',
        userPassword: '',
      },
    },
  }));
};

export const hydrateSession = async (setData) => {
  try {
    const user = await api('/api/auth');
    applyUser(setData, user);
    return user;
  } catch (err) {
    clearToken();
    return null;
  }
};

export const saveSession = (setData, { token, user }) => {
  setToken(token);
  applyUser(setData, user);
};

export const refreshWallet = async (setData) => {
  try {
    const body = await api('/api/wallet');
    setData((prev) => ({ ...prev, wallet: body.data }));
    return body.data;
  } catch (err) {
    return null;
  }
};

export const loadCatalog = async (setData) => {
  try {
    const body = await api('/api/protocol/catalog', { auth: false });
    const cards = body.data || [];
    if (!cards.length) return [];
    setData((prev) => ({
      ...prev,
      NFTsMarket: {
        ...prev.NFTsMarket,
        NFTs: cards,
      },
    }));
    return cards;
  } catch (err) {
    return [];
  }
};
