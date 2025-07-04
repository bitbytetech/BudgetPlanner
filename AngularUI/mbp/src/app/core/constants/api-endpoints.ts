// src/app/core/constants/api-endpoints.ts

//export const ApiBaseUrl = 'http://localhost:5109/api';
export const ApiSwagger = 'http://mbp.bitprosofttech.com/swagger/index.html';
export const ApiBaseUrl = 'http://mbp.bitprosofttech.com/api';
export const ApiEndpoints = {
    userAccount: {
        login: `${ApiBaseUrl}/UserAccount/Login`,
        UserRegistration: `${ApiBaseUrl}/UserAccount/UserRegistration`,
    },
    Categories: {
        getAllCategories: `${ApiBaseUrl}/Categories`,
        getCategoriesById: (id: number) => `${ApiBaseUrl}/Categories/${id}  `,
        SaveCategories: `${ApiBaseUrl}/Categories/CreateOrEdit`
    },
    // Add more modules here
};
