export const config = {
    api: {
        getItems : 'getAll',
        uploadItems : 'uploadItem',
        auth: 'authenticate',
        feedback: 'feedback',
        addToCart: 'add-to-cart',
        getProfile: 'get-profile',
        getCart: 'get-cart',
        callApi: 'temp',
        updateItem : 'update-item',
        deleteItem: 'delete-item',
        signUp: 'sign-up',
        uploadImage: 'uploadImage',
    }

};

export enum alertType  {
    success = 'success',
    warning = 'warning',
    info = 'info',
    danger = 'danger',
    primary = 'primary',
    secondary = 'secondary',
    light = 'light',
    dark = 'dark'
  }

export const alertMsg ={
    itemAdded: 'Item added in the cart..',
    cartUpadted: 'Cart updated..',
    alreadyAdded: 'Already added in cart..',
    feedback: 'Thanks for your feedback..',
    addQty: 'Please add quantity..',
    internalError: 'Internal Server error. Please try after some time...',
    saveCart: 'Cart saved successfully',
    noCartChange: 'No change on cart',
    uploadSuccess: 'Item uploaded successfully',
    editNoChangeItem: 'No item where updated',
    fillDetails: 'Please fill all details',
    mobno: 'Please enter 10 digit mob no',
    shopName: 'Please fill shop name',
    max25Char: 'Shop Name: Character limit less than 25 Character'
}
