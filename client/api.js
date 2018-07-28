import axios from "axios";

const qaUrl = "http://www.qa.getchatwith.com";
const prodUrl = "https://www.api.getchatwith.com";

const qa = 'qa';
const prod = 'api';

const apiUrl = `https://www.${prod}.getchatwith.com`

export default {
  user: {
    login: credentials => {
      return axios.post(`${apiUrl}/auth/AuthenticateAppUserByEmail`, credentials).then(res => res.data.Response)
    },
    loginFB: credentials => {
      return axios.post(`${apiUrl}/auth/AuthenticateAppUserByFacebook`, credentials).then(res => res.data.Response)
    },
    signup: user => {
      return axios.post(`${apiUrl}/auth/CreateAppUser`, user).then(res => res.data)
    },
    signupFB: user => {
      return axios.post(`${apiUrl}/auth/CreateAppUserFacebook`, user).then(res => res.data)
    },
    fetchUser: credentials => {
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = credentials.Token;
      return axios.post(`${apiUrl}/api/GetAppUserById`, credentials.data).then(res => res.data.Response)
    },
    updateProfile: credentials => {
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = credentials.Token;
      return axios.post(`${apiUrl}/api/UpdateAppUserAttribute`, credentials.data).then(res => res.data)
    },
    updatePassword: credentials => {
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = credentials.Token;
      return axios.post(`${apiUrl}/api/UpdateAppUserPassword`, credentials.data).then(res => res.data)
    },
    resetPasswordRequest: data => {
      return axios.post(`${apiUrl}/password/CreateUserResetPasswordEmail`, data).then(res => res.data)
    },
    resetPassword: data => {
      return axios.post(`${apiUrl}/password/AuthenticateResetPasswordLink`, data).then(res => res.data)
    }
  },
  product: {
    optionsByTalent: data => {
      return axios.post(`${apiUrl}/home/GetProductOptionByTalent`, data).then(res => res.data.Response)
    },
    getDateSlot: data => {
      return axios.post(`${apiUrl}/home/GetProductOptionDateSlotByProductOption`, data).then(res => res.data.Response)
    },
    notification: data => {
      return axios.post(`${apiUrl}/home/CreateNotificationGuest`, data)
    }
  },
  payment: {
    fetchCards: credentials => {
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = credentials.Token;
      return axios.post(`${apiUrl}/api/GetAppUserCreditCards`, credentials.data).then(res => res.data.Response)
    },
    update: credentials => {
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = credentials.Token;
      return axios.post(`${apiUrl}/api/UpdateAppUserPaymentMethod`, credentials.data).then(res => res.data)
    }
  },
  orderHistory: {
    fetchOrders: credentials => {
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = credentials.Token;
      return axios.post(`${apiUrl}/api/GetAppUserOrderHistory`, credentials.data).then(res => res.data.Response)
    },
    activeSubs: credentials => {
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = credentials.Token;
      return axios.post(`${apiUrl}/api/GetProductByUser`, credentials.data).then(res => res.data.Response)
    },
    deleteSub: credentials => {
      console.log(credentials);
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = credentials.Token;
      return axios.post(`${apiUrl}/api/DeleteProduct`, credentials.data).then(res => res.data.Response)
    }
  },
  search: {
    knownfor: data => {
      return axios.post(`${apiUrl}/home/GetAppTalentBySearch`, data).then(res => res.data.Response)
    },
    appTalent: data => {
      return axios.post(`${apiUrl}/home/GetAppTalentBySearch`, data).then(res => res.data.Response)
    },
    appTalentByCategory: data => {
      return axios.post(`${apiUrl}/home/GetAppTalentByCategoryWeb`, data).then(res => res.data.Response)
    }
  },
  checkout: {
    guest: data => {
      return axios.post(`${apiUrl}/home/CreateWebTransactionGuest`, data).then(res => res.data)
    },
    existing: data => {
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = data.Token;
      return axios.post(`${apiUrl}/api/CreateWebTransactionExisting`, data.checkout).then(res => res.data)
    },
    new: data => {
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = data.Token;
      return axios.post(`${apiUrl}/api/CreateWebTransactionNew`, data.checkout).then(res => res.data)
    },
    update: data => {
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = data.Token;
      return axios.post(`${apiUrl}/api/CreateWebTransactionUpdate`, data.checkout).then(res => res.data)
    }
  }
};