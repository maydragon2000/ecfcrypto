import axios from "axios";

//auth api
const postRegister = (user) => {
    const formData = new FormData();
    formData.append('address', user.address);
    formData.append('birthday', user.birthday);
    formData.append('city', user.city);
    formData.append('country', user.country);
    formData.append('email', user.email);
    formData.append('fullName', user.fullName);
    formData.append('password', user.password);
    formData.append('recoveryPhrase', JSON.stringify(user.recoveryPhrase));
    formData.append('region', user.region);
    formData.append('userName', user.userName);
    formData.append('zipCode', user.zipCode);
    formData.append('idFrontImage', user.idFrontImage);
    formData.append('idBackImage', user.idBackImage);
    formData.append('realPhoto', user.realPhoto);
    return axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/users/register`, formData);
};
const postLogin = (user) => {
    return axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/users/login`, user);
}
const postRecoveryPhrase = (data) => {
    return axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/users/recoveryphrase`, data);
}
const resetPassword = (user) =>
    axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/users/resetPassword`, user);
const resetUser = (user) =>
    axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/users/resetuser`, user);
const changePassword = (data) =>
    axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/users/changePassword`, data);
const uploadImage = (data) => {
    const formData = new FormData();
    formData.append('userName', data.userName);
    formData.append('photo', data.image);
    return axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/users/addImage`, formData);
}

const getUser = (token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
    return axios.get(`${process.env.REACT_APP_SERVER_HOST}:8000/api/user`);
};

//wallet
const postCreateWallet = (userName) => axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/wallet/createwallet`, { userName: userName });
const getWalletAddress = (userName) => axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/wallet/getwalletaddress/${userName}`);
const postWalletTokenList = (data) => axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/wallet/savetokenlist`, data);
const getWalletData = (userName) => axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/wallet/getwalletdata/${userName}`);

// wallet history

const postRemoveCoin = (name, tokenName) => axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/wallet/removeToken`, {name:name, tokenName: tokenName });

//sendCrypto
const postSendCrypto = (data) => axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/wallet/sendcrypto`, data);
const getGasFee = () => axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/wallet/getgasfee`);

//send email

const sendEmail = (data) => axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/email/send`, data);
const checkEmail = (data) => axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/email/checkemailid`, data);

//admin

const getAlluser = (data) => axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/users/getalluser`, data);
const setPermission = (data) => axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/users/permission`, data);
const adminUpdateUser = (data) => axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/users/adminUpdate`, data);
const deleteUser = (data) => axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/users/delete`, data);

export {
    postRegister,
    postLogin,
    postRecoveryPhrase,
    resetPassword,
    resetUser,
    changePassword,
    uploadImage,
    getUser,
    postCreateWallet,
    getWalletAddress,
    postWalletTokenList,
    getWalletData,
    postSendCrypto,
    getGasFee,
    postRemoveCoin,
    sendEmail,
    checkEmail,
    getAlluser,
    setPermission,
    adminUpdateUser,
    deleteUser
};
